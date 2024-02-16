import express from 'express';
import axios from 'axios';
import WorkStationsPoleEmploi from '../models/WorkStationsPoleEmploi';
import Response from '../library/Response';
const router = express.Router();

router.post('/reload', async (req, res) => {
    const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${req.body.adress} ${req.body.zip} ${req.body.city}`);
    if (response.data !== undefined) {
        await axios
            .post(
                'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire',
                {
                    grant_type: 'client_credentials',
                    client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
                    client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
                    scope: 'api_labonneboitev1'
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            .then(async (resp) => {
                let timer = 0;
                let id = setInterval(frame, 1500);

                const workStationFinded = await WorkStationsPoleEmploi.find();

                async function frame() {
                    if (timer === workStationFinded.length) {
                        clearInterval(id);
                    } else {
                        let isLoading: boolean = false;
                        const entreprisesToProspect = await axios.get(
                            `https://api.pole-emploi.io/partenaire/labonneboite/v1/company/?distance=${req.body.distance}&latitude=${response.data.features[0].geometry.coordinates[1]}&longitude=${response.data.features[0].geometry.coordinates[0]}&rome_codes=${workStationFinded[timer].codeROME}&sort=distance&page=${req.body.page}&page_size=100`,
                            {
                                headers: {
                                    Authorization: `Bearer ${resp.data.access_token}`
                                }
                            }
                        );
                        Object(entreprisesToProspect).data.companies.map((el: object, index: number) => {
                            // Recherche dans la BDD s'il existe deja, puis alimente à chaque recherche Les code NAF dans les workStations
                            workStationFinded[timer].nafCodes.includes(Object(el).naf) === false &&
                                workStationFinded[timer].nafCodes.push(Object(el).naf);
                        });
                        await workStationFinded[timer].save();
                        Response.info(
                            `poste de travail avec le code ROME ${workStationFinded[timer].codeROME} -- temps restant -> ${
                                workStationFinded.length - timer
                            } sec ...`
                        );
                        timer++;
                    }
                }
                return res.status(200).json('Procedure démarrée');
            });
    } else {
        return res.status(404).json({ error: 'statusText doesnt OK', statusText: response.statusText });
    }
});
export default router;
