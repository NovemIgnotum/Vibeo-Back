import { NextFunction, Request, Response } from 'express';
import Retour from '../library/Response';
// Models
import Prospecting from '../models/Prospecting';
import Usager from '../models/Usager';
import Entreprise from '../models/Entreprise';
import axios from 'axios';
import Prospect from '../models/Prospect';
import Utilisateur from '../models/Utilisateur';
import Etablissement from '../models/Etablissement';
import { ObjectId } from 'mongoose';
import { func } from 'joi';

const moment = require('moment');
// Pour creer une prospection pour un usager
const createProspecting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, codeRome, page, adress, city, zip, distance } = req.body;

        const usagerFinded = await Usager.findById(req.params.usagerId);

        // Fonction pour extraire le token de requete
        const options = {
            method: 'POST',
            url: 'https://api.insee.fr/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: `${process.env.API_SIRET_CLIENT_ID}`,
                client_secret: `${process.env.API_SIRET_CLIENT_SECRET}`
            })
        };

        // // Fonction pour requeter l'API d'état
        axios.request(options).then(async function (response) {
            // let entreprisesFromInsee;
            (async () => {
                try {
                    // recherche pour updater le tableau des prospections a faire pour  l'usager selectionné
                    const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
                    if (utilisateurFinded !== undefined) {
                        const responseApiGouv = await axios.get(
                            `https://api-adresse.data.gouv.fr/search/?q=${req.body.adress} ${req.body.zip} ${req.body.city}`
                        );
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
                            .then(async (responsePoleEmploi) => {
                                if (usagerFinded) {
                                    const utilisateurFindedForProspecting = await Utilisateur.findOne({ usagers: usagerFinded });
                                    if (utilisateurFindedForProspecting) {
                                        const newProspecting = new Prospecting({
                                            name: usagerFinded.account.name.toLocaleUpperCase(),
                                            codeRome: codeRome,
                                            workName: req.body.workName,
                                            entreprises: [],
                                            usagers: usagerFinded,
                                            createdBy: utilisateurFinded
                                        });
                                        let pageNum: number = 1;
                                        let entrepriseToProspect: object[] = [];
                                        let rest: number = 0;
                                        async function entrepriseReturn() {
                                            const entreprisesFromPoleEmploi = await axios.get(
                                                `https://api.pole-emploi.io/partenaire/labonneboite/v1/company/?distance=${req.body.distance}&latitude=${responseApiGouv.data.features[0].geometry.coordinates[1]}&longitude=${responseApiGouv.data.features[0].geometry.coordinates[0]}&rome_codes=${codeRome}&sort=distance&page=${pageNum}&page_size=100`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${responsePoleEmploi.data.access_token}`
                                                    }
                                                }
                                            );
                                            const totalPage: number = entreprisesFromPoleEmploi.data.companies_count / 100;

                                            const isLargerThan30Days = (el: object) => {
                                                const first = Object(el).createdAt;
                                                const second = new Date();
                                                // Compare la 1ere date et la date actuelle pour savoir combien de temps a eu entre la derniere prospection et maintenant
                                                const x = moment(first);
                                                const y = moment(second);
                                                const diffInDays = y.diff(x, 'days');
                                                if (el !== undefined && diffInDays <= 30) {
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            };

                                            // Si on retourne un objet dans le tableau alors cette entreprise a déja été prospectée dans les 30 jours
                                            if (entreprisesFromPoleEmploi.data.companies.length !== 0) {
                                                let count: number = 1;
                                                rest === 0 && (rest = totalPage * 100 - count * pageNum);

                                                entreprisesFromPoleEmploi.data.companies.map(async (element: object) => {
                                                    const prospectFinded = await Prospect.find({
                                                        siret: Object(element).siret
                                                    });

                                                    if (
                                                        isLargerThan30Days(Object(prospectFinded)[prospectFinded.length - 1]) === false ||
                                                        Object(prospectFinded) === null
                                                    ) {
                                                        entrepriseToProspect.push(element);
                                                    }

                                                    if (count === entreprisesFromPoleEmploi.data.companies.length) {
                                                        if (entrepriseToProspect.length >= 1) {
                                                            entrepriseToProspect.map(async (el: object, index: number) => {
                                                                // Verifie qu'on ne push pas plus de 20 résultat maximum
                                                                if (index < 20) {
                                                                    const enterpriseAlreadyExist = await Entreprise.findOne({
                                                                        siret: Object(el).siret
                                                                    });

                                                                    const result =
                                                                        Object(el).address.split(',').length !== 0 && Object(el).address.split(' ');
                                                                    const newProspect = new Prospect({
                                                                        siret: Object(el).siret,
                                                                        denomination: Object(el).name,
                                                                        adresse: enterpriseAlreadyExist
                                                                            ? Object(enterpriseAlreadyExist).adress
                                                                            : Object(el).address,
                                                                        zip: enterpriseAlreadyExist
                                                                            ? Object(enterpriseAlreadyExist).zip
                                                                            : result[result.length - 2],
                                                                        city: enterpriseAlreadyExist
                                                                            ? Object(enterpriseAlreadyExist).city
                                                                            : Object(el).city,
                                                                        distance: Object(el).distance,
                                                                        entreprise: enterpriseAlreadyExist && enterpriseAlreadyExist,
                                                                        codeNaf: enterpriseAlreadyExist
                                                                            ? Object(enterpriseAlreadyExist).codeNAF
                                                                            : Object(el).naf,
                                                                        usager: Object(usagerFinded)
                                                                    });

                                                                    // Résout le probleme du 0 pas pris en compte dans l'objet
                                                                    Object(el).siret.split('')[0] === '0' && newProspect.siret.length < 14
                                                                        ? (newProspect.siret = `0${newProspect.siret}`)
                                                                        : newProspect.siret;

                                                                    await newProspect.save();
                                                                    enterpriseAlreadyExist &&
                                                                        (enterpriseAlreadyExist.prospecting.push(Object(newProspect)),
                                                                        await enterpriseAlreadyExist?.save());
                                                                    Object(newProspecting).entreprises.length < 20 &&
                                                                        Object(newProspecting).entreprises.push(Object(newProspect));
                                                                    if (
                                                                        entrepriseToProspect.length >= 20 &&
                                                                        Object(newProspecting).entreprises.length === 20
                                                                    ) {
                                                                        // Plus de 20 enterprises
                                                                        Object(utilisateurFindedForProspecting).prospectings.push(
                                                                            Object(newProspecting)
                                                                        );
                                                                        Object(usagerFinded).prospectings.push(Object(newProspecting));
                                                                        await newProspecting.save();
                                                                        await Object(usagerFinded).save();
                                                                        await Object(utilisateurFindedForProspecting).save();
                                                                        return res.status(200).json({
                                                                            message: 'Prospection created with 20 entreprises maximum',
                                                                            utilisateur: Object(utilisateurFindedForProspecting)
                                                                        });
                                                                    } else if (
                                                                        entrepriseToProspect.length <= 20 &&
                                                                        Object(newProspecting).entreprises.length === entrepriseToProspect.length
                                                                    ) {
                                                                        // Moins de 20 enterprises
                                                                        Object(utilisateurFindedForProspecting).prospectings.push(
                                                                            Object(newProspecting)
                                                                        );
                                                                        Object(usagerFinded).prospectings.push(Object(newProspecting));
                                                                        enterpriseAlreadyExist &&
                                                                            (enterpriseAlreadyExist.prospecting.push(Object(newProspect)),
                                                                            await enterpriseAlreadyExist.save());
                                                                        await newProspecting.save();
                                                                        await Object(usagerFinded).save();
                                                                        await Object(utilisateurFindedForProspecting).save();
                                                                        return res.status(200).json({
                                                                            message: `Prospection created with ${entrepriseToProspect.length} ${
                                                                                entrepriseToProspect.length === 1 ? 'entreprise' : 'entreprises'
                                                                            }`,
                                                                            utilisateur: Object(utilisateurFindedForProspecting)
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            //  S'il reste des entreprise apres les X entreprises de la page en cours alors je change de page
                                                            if (pageNum <= Math.ceil(totalPage) && rest !== 0) {
                                                                count = 1;
                                                                pageNum += 1;
                                                                entrepriseReturn();
                                                            } else {
                                                                return res.status(200).json('0 entreprise after the filters');
                                                            }
                                                        }
                                                    }
                                                    count += 1;
                                                    rest -= 1;
                                                });
                                            } else {
                                                return res.status(200).json('Have 0 entreprise about this work station');
                                            }
                                        }
                                        entrepriseReturn();
                                    } else {
                                        Retour.error('UtilisateurAffiliated was not found');
                                        return res.status(400).json('UtilisateurAffiliated was not found');
                                    }
                                } else {
                                    Retour.error('Prospecting was not found');
                                    return res.status(400).json('Prospecting was not found');
                                }
                            });
                    } else {
                        Retour.error(`Error 404... requester was not found`);
                        return res.status(400).json({ error: 'Error 404... requester was not found' });
                    }
                } catch (err) {
                    Retour.error({ message: `Error catched`, error: Object(err) });
                    return res.status(400).json({ message: `Error catched`, error: Object(err) });
                }
            })();
        });
    } catch (error) {
        Retour.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};
// Afin de lire toutes prospections pour un usager sélectionné incluant les "réalisées" et "non réalisées"
const readProspecting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerFinded = await Usager.findById(req.params.usagerId);
        if (usagerFinded) {
            const prospectings = await Prospect.find({ usager: usagerFinded }).populate({
                path: 'entreprise',
                model: 'Entreprise',
                populate: {
                    path: 'interlocutors'
                }
            });
            const prospectingsDone = prospectings.filter((el) => Object(el).isDone === true);
            const prospectingsNotDone = prospectings.filter((el) => Object(el).isDone === false);
            Retour.info('Prospecting was found');
            return res.status(200).json({ message: 'Prospecting was found', isDone: prospectingsDone, isNotDone: prospectingsNotDone });
        } else {
            Retour.error('Prospecting was not found');
            return res.status(400).json('Prospecting was not found');
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};
// Afin de lire toutes entreprises à prospecter par utilisateur, retournant "forMyUsager" et "toDo"
const readAllByUtilisateur = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prospectingsFinded = await Utilisateur.findById(req.params.utilisateurId)
            .populate({
                path: 'prospectings',
                model: 'Prospecting',
                populate: [
                    {
                        path: 'entreprises'
                    }
                ]
            })
            .select('prospectings');
        const prospectFindedToDo = await Prospecting.find({ utilisateurAssigned: req.params.utilisateurId }).populate('entreprises');
        if (prospectingsFinded && prospectFindedToDo) {
            Retour.info('prospectings was found');
            return res.status(200).json({ message: 'prospectings was found', forMyUsager: prospectingsFinded, toDo: prospectFindedToDo });
        } else {
            Retour.error('prospectings was not found');
            return res.status(400).json('prospectings was not found');
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

const readAllByEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const etablissmentFinded = await Etablissement.findById(req.params.etablissementId)
            .populate([{ path: 'utilisateurs', select: 'name', populate: [{ path: 'prospectings', model: 'Prospecting' }] }])
            .select('utilisateurs name');
        if (etablissmentFinded) {
            let count: number = 1;
            let prospectingToAssign: object[] = [];
            let prospectingAssigned: object[] = [];

            etablissmentFinded?.utilisateurs.every(async (element: object) => {
                Object(element).prospectings.map((el: object) => {
                    if (Object(el).utilisateurAssigned.length === 0) {
                        prospectingToAssign.push(el);
                    } else {
                        prospectingAssigned.push(el);
                    }
                });
                count++;
                if (count === etablissmentFinded.utilisateurs.length) {
                    return res.status(200).json({
                        prospectingToAssign: { count: prospectingToAssign.length, prospectings: prospectingToAssign },
                        prospectingAssigned: { count: prospectingAssigned.length, prospectings: prospectingAssigned }
                    });
                }
            });
        } else {
            return res.status(400).json('Etlablissemment was not found');
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

const updateProspecting = async (req: Request, res: Response, next: NextFunction) => {
    return Prospecting.findById(req.params.prospectingId)
        .populate('entreprises')
        .then(async (prospecting) => {
            try {
                if (prospecting) {
                    const { requesterId, utilisateurIdAssigned, prospectingIdToAdding, prospectingIdToRemoved } = req.body;
                    // AFIN DE REGROUPER UNE OU PLUSIEURS PROSPECTIONS
                    const regex = /\//gi;
                    if (prospectingIdToAdding) {
                        let names: string = `${Object(prospecting).name}`;
                        let entreprises: object[] = Object(prospecting).entreprises;
                        let prospectingIdToUpdate: string[] = [];
                        let utilisateurAssigned: object[] = [];
                        // Afin de regrouper 2 ou plusieurs prospections SANS les attribuers
                        // FUNCTION
                        prospectingIdToAdding.map(async (el: object, i: number) => {
                            // Vérifie si un nom est deja dans la prospection
                            function isAlreadyExist(element: string) {
                                for (const item of Object(prospecting).name.split(' / ')) {
                                    return element === item;
                                }
                            }

                            // Recherche les models a updater
                            await Prospecting.findById(el).then(async (prospectingFindedToAdd) => {
                                // Si le nom n'est pas deja dans la prospection et si la prospection a ajouter n'est pas commune alors
                                if (
                                    prospectingFindedToAdd?.name.split(' / ').findIndex(isAlreadyExist) === -1 &&
                                    Object(prospectingFindedToAdd).name.split(' / ').length === 1
                                ) {
                                    Object(prospecting).name += ` / ${prospectingFindedToAdd?.name}`;
                                    entreprises.push(...Object(prospectingFindedToAdd).entreprises);
                                    names = names + ` / ${Object(prospectingFindedToAdd).name}`;
                                    prospectingIdToUpdate.push(Object(prospectingFindedToAdd)._id);
                                    // Recherche parmis toutes les prospections si des utilisateurs sont deja attribués
                                    [...Object(prospectingFindedToAdd).utilisateurAssigned].forEach((x, i) => {
                                        if (utilisateurAssigned.findIndex((element) => JSON.stringify(element) === JSON.stringify(x)) === -1) {
                                            utilisateurAssigned.push(Object(x));
                                        }
                                    });
                                    Object(prospecting).entreprises = [...entreprises];
                                    Object(prospecting).utilisateurAssigned = [...utilisateurAssigned];
                                    let counter: number = Object(prospecting).name.split(' / ').length;
                                    prospectingIdToUpdate.every(async (el) => {
                                        await Prospecting.findById(el).then(async (prospectingFinded) => {
                                            Object(prospectingFinded).name = names;
                                            Object(prospectingFinded).entreprises = [...entreprises];
                                            Object(prospectingFinded).utilisateurAssigned = [...utilisateurAssigned];
                                            await prospectingFinded?.save();
                                            counter++;
                                        });
                                    });
                                    // Si le compteur eest egal au nombre de personne dans la prospections alors j'enregriste
                                    counter === names.split(' / ').length &&
                                        (await Object(prospecting).save(), res.status(200).json('Prospection was updated'));
                                } else {
                                    return res.status(400).json('already esxist or is an prospecting shared');
                                }
                            });
                        });
                    } else if (prospectingIdToRemoved) {
                        await Prospecting.findById(prospectingIdToRemoved)
                            .populate('entreprises')
                            .then(async (prospectingToRemoved) => {
                                const usagerFinded = await Usager.findById(Object(prospectingToRemoved).usagers).select('account');
                                // Modifie le nom de la prospection
                                if (usagerFinded) {
                                    prospecting.name =
                                        prospecting.name.split(' ').filter((el) => el !== usagerFinded?.account.name.toUpperCase()).length === 2
                                            ? prospecting.name
                                                  .split(' ')
                                                  .filter((el) => el !== usagerFinded?.account.name.toUpperCase())
                                                  .join(' ')
                                                  .replace(regex, '')
                                                  .trim()
                                            : prospecting.name
                                                  .split(' ')
                                                  .filter((el) => el !== usagerFinded?.account.name.toUpperCase())
                                                  .join(' ')
                                                  .trim();

                                    Object(prospecting).entreprises = prospecting.entreprises.filter(
                                        (el: object) => JSON.stringify(Object(el).usager) !== JSON.stringify(Object(usagerFinded)._id)
                                    );
                                    Object(prospectingToRemoved).name = Object(usagerFinded).account.name.toUpperCase();
                                    Object(prospectingToRemoved).entreprises = Object(prospectingToRemoved).entreprises.filter(
                                        (el: object) => JSON.stringify(Object(el).usager) === JSON.stringify(Object(usagerFinded)._id)
                                    );

                                    await Object(prospectingToRemoved).save();
                                    await Object(prospecting).save();

                                    Retour.info('prospecting was updated');
                                    return res.status(400).json('prospecting was updated');
                                } else {
                                    Retour.error('usager was not found');
                                    return res.status(400).json('usager was not found');
                                }
                            });
                    } else if (utilisateurIdAssigned) {
                        const prospectingsToAssigned = await Prospecting.find({ name: prospecting.name });
                        if (utilisateurIdAssigned.length > Object(prospecting).utilisateurAssigned.length) {
                            let counter = prospectingsToAssigned.length - 1;
                            // Modifie toutes les prospections trouvées
                            prospectingsToAssigned.map(async (prospecting) => {
                                prospecting.utilisateurAssigned = utilisateurIdAssigned;
                                await prospecting.save();
                                // Modifie tous les utilisateurs qui n'ont pas deja la prospection dans leur tableau
                                utilisateurIdAssigned.map(async (element: object) => {
                                    let newArray: object[] = [];
                                    const utilisateurFound = await Utilisateur.findById(element)
                                        .populate('prospectings')
                                        .select('prospectings account');
                                    newArray = Object(utilisateurFound).prospectings;
                                    if (newArray.some((prospectingFound) => Object(prospectingFound).name === prospecting.name) === false) {
                                        newArray.push(Object(prospecting));
                                        Object(utilisateurFound).prospectings = newArray;
                                        await Object(utilisateurFound).save();
                                    }
                                });
                                if (counter !== 0) {
                                    counter--;
                                } else {
                                    Retour.info(`Prospecting ${prospecting.name} was assigned`);
                                    return res.status(200).json({ message: 'Prospecting assigned', prospecting });
                                }
                            });
                        } else if (utilisateurIdAssigned.length < Object(prospecting).utilisateurAssigned.length) {
                            let arrayIdToDelete: object[] = [];
                            let counter: number = prospecting.utilisateurAssigned.length;
                            prospecting.utilisateurAssigned.map((el: object) => {
                                utilisateurIdAssigned.findIndex((id: object) => JSON.stringify(id) === JSON.stringify(el)) === -1 &&
                                    arrayIdToDelete.push(el);
                                counter--;
                                // Il faut degager uniquement l'utilisateur qui n'a pas l'usager dans son tableau
                                if (counter === 0) {
                                    arrayIdToDelete.map(async (elToDelete: object) => {
                                        const UtilisateurAffiliatedToDelete = await Utilisateur.findById(elToDelete)
                                            .populate('prospectings')
                                            .select('prospectings usagers account');
                                        function isAlreadyExist(prospecting: object) {
                                            for (const usagers of Object(UtilisateurAffiliatedToDelete).usagers) {
                                                return JSON.stringify(Object(prospecting).usagers) === JSON.stringify(usagers);
                                            }
                                        }
                                        if (prospectingsToAssigned.findIndex(isAlreadyExist) === -1) {
                                            Object(UtilisateurAffiliatedToDelete).prospectings = UtilisateurAffiliatedToDelete?.prospectings.filter(
                                                (el: object) => Object(el).name !== prospecting.name
                                            );
                                        }
                                        await Object(UtilisateurAffiliatedToDelete).save();
                                    });
                                }
                            });
                            // Changement des tableau utilisateursAffiliated
                            prospectingsToAssigned.map(async (prospectingReturn) => {
                                prospectingReturn.utilisateurAssigned = utilisateurIdAssigned;
                                await prospectingReturn.save();
                            });

                            Retour.info('return with less length');
                            return res.status(200).json({ message: 'return with less length' });
                        } else {
                            Retour.info('return with same length');
                            return res.status(200).json({ message: 'return with same length' });
                        }
                    } else {
                        return res.status(200).json('returned without updating');
                    }
                } else {
                    return res.status(404).json({ message: 'The prospecting was not found' });
                }
            } catch (error) {
                Retour.error({ message: 'Error catched', error: error });
                return res.status(500).json({ message: 'Error catched', error: error });
            }
        });
};

const deleteProspecting = async (req: Request, res: Response, next: NextFunction) => {
    const prospectingId = req.params.prospectingId;

    return Prospecting.findByIdAndDelete(prospectingId)
        .then((prospecting) =>
            prospecting ? res.status(200).json({ message: 'Prospecting is deleted' }) : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => res.status(500).json({ error: error.message }));
};

export default { createProspecting, readProspecting, readAllByUtilisateur, readAllByEtablissement, updateProspecting, deleteProspecting };
