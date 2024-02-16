import axios from 'axios';
import WorkStationsPoleEmploi from '../models/WorkStationsPoleEmploi';

const CreateWorkCode = async (token: String) => {
    await axios
        .post(
            'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire',
            {
                grant_type: 'client_credentials',
                client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
                client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
                scope: 'api_rome-fiches-metiersv1'
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then(async (result) => {
            const workStation = await axios.get('https://api.pole-emploi.io/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier', {
                headers: {
                    Authorization: `Bearer ${result.data.access_token}`
                }
            });
            workStation.data.map(async (item: Object, index: Number) => {
                const workStatiosPoleEmploi = new WorkStationsPoleEmploi({
                    name: Object(item).metier.libelle,
                    codeROME: Object(item).metier.code
                });
                await workStatiosPoleEmploi.save();
            });
        })
        .finally(async () => {
            let timer = 0;
            const workStations = await WorkStationsPoleEmploi.find();
            const handleStart = setInterval(async () => {
                const workStation = await axios.get(
                    `https://api.pole-emploi.io/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier/${Object(workStations[timer].codeROME)}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                Object(workStations)[timer].skills = workStation.data.groupesCompetencesMobilisees;
                Object(workStations)[timer].KnowHow = workStation.data.groupesSavoirs;
                await workStations[timer].save();
                timer = timer + 1;

                if (timer > workStations.length) {
                    clearInterval(handleStart);
                }
            }, 1200);
        })
        .catch((error) => console.error(error));
};
const updateWorkCode = async () => {
    const workStationPoleEmploi = await WorkStationsPoleEmploi.find();
    const token = await axios.post(
        'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire',
        {
            grant_type: 'client_credentials',
            client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
            client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
            scope: 'api_rome-metiersv1'
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    if (token) {
        let timer = 0;
        const workStationsFinded = await WorkStationsPoleEmploi.find();
        const handleStart = setInterval(async () => {
            const workStation = await axios.get(
                `https://api.pole-emploi.io/partenaire/rome-metiers/v1/metiers/metier/${workStationPoleEmploi[timer].codeROME}`,
                {
                    headers: {
                        Authorization: `Bearer ${Object(token.data.access_token)}`
                    }
                }
            );
            Object(workStationsFinded)[timer].definition = workStation.data.definition;
            Object(workStationsFinded)[timer].jobAccess = workStation.data.accesEmploi;
            Object(workStationsFinded)[timer].jobs = workStation.data.appellations;
            Object(workStationsFinded)[timer].jobContext = workStation.data.contextesTravail;
            await workStationsFinded[timer].save();
            timer = timer + 1;

            if (timer > workStationsFinded.length) {
                clearInterval(handleStart);
            }
        }, 1200);
    }
};
const searchSkills = async () => {
    const workStationFinded = await WorkStationsPoleEmploi.find();
    console.log('<-<-<-<workStationFinded->->->->->>', Object(workStationFinded)[0].jobs);
};
export { CreateWorkCode, updateWorkCode, searchSkills };
