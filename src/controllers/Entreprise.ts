import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import {
    createEntrepriseForExtracting,
    deleteEntrepriseForExtracting,
    readEntrepriseForExtracting,
    updateEntrepriseForExtracting
} from '../functions/EntrepriseData';
import cloudinary from 'cloudinary';

// Models
import Entreprise from '../models/Entreprise';
import Utilisateur from '../models/Utilisateur';
import DataEntreprise from '../models/DataEntreprise';
import Etablissement from '../models/Etablissement';
// Library
import Retour from '../library/Response';
import config from '../config/config';

const createEntreprise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            society,
            currentName,
            siret,
            adress,
            zip,
            city,
            adressComplement,
            activityarea,
            administratifStateOpen,
            headquartersSociety,
            numberOfEmployed,
            codeNAF,
            details,
            comments
        } = req.body;
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const etablissementFinded = await Etablissement.findById(req.params.etablissementId);
        if (!etablissementFinded) {
            return res.status(401).json({ error: 'etablissement has been not found' });
        } else {
            if ((!society && !currentName) || !siret || !adress || !zip || !city) {
                return res.status(400).json({ message: 'One or more values are missing' });
            } else {
                const entrepriseFinded = await Entreprise.findOne({ siret: siret });
                let location = {};
                const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${adress} ${city} ${zip}`);
                if (response) {
                    location = {
                        lng: response.data.features[0].geometry.coordinates[0],
                        lat: response.data.features[0].geometry.coordinates[1]
                    };
                }
                const dateNow = new Date();
                const newDataEntreprise = new DataEntreprise({
                    month: dateNow.getMonth() + 1
                });

                if (!Object(req.files).file) {
                    const entreprise = new Entreprise({
                        society,
                        currentName,
                        siret,
                        adressLabel: `${adress} ${zip} ${city}`,
                        adress,
                        zip,
                        location,
                        city,
                        adressComplement,
                        activityarea,
                        administratifStateOpen,
                        headquartersSociety,
                        numberOfEmployed,
                        codeNAF,
                        details,
                        datas: { year: dateNow.getFullYear() },
                        comments
                    });
                    if (!entreprise) {
                        return res.status(400).json({ message: "entreprise aren't created" });
                    } else {
                        if (entrepriseFinded) {
                            return res.status(400).json({ message: 'entreprise already exist', entreprise: entrepriseFinded });
                        } else {
                            if (!utilisateurFinded) {
                                return res.status(400).json({ message: 'utilisateur has been not finded' });
                            } else {
                                entreprise.datas[0].mounths.push(newDataEntreprise._id);
                                await newDataEntreprise.save();
                                createEntrepriseForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), entreprise._id);
                                etablissementFinded.entreprises.push(Object(entreprise));
                                await etablissementFinded.save();
                                return entreprise
                                    .save()
                                    .then((entreprise) => res.status(201).json({ messsage: 'entreprise is created', entreprise: entreprise }))
                                    .catch((error) => res.status(500).json({ error: error.message }));
                            }
                        }
                    }
                } else {
                    const path = Object(req.files).file[0].path;
                    const result = await cloudinary.v2.uploader.upload(path);

                    const entreprise = new Entreprise({
                        society,
                        currentName,
                        siret,
                        adressLabel: `${adress} ${zip} ${city}`,
                        adress,
                        zip,
                        location,
                        logo: result && result.secure_url,
                        city,
                        activityarea,
                        administratifStateOpen,
                        headquartersSociety,
                        numberOfEmployed,
                        codeNAF,
                        details,
                        datas: { year: dateNow.getFullYear() },
                        comments
                    });
                    if (entrepriseFinded) {
                        return res.status(400).json({ message: 'entreprise already exist', entreprise: entrepriseFinded });
                    } else {
                        if (!entreprise) {
                            return res.status(400).json({ message: "entreprise aren't created" });
                        } else {
                            if (!utilisateurFinded) {
                                return res.status(400).json({ message: 'utilisateur has been not finded' });
                            } else {
                                entreprise.datas[0].mounths.push(newDataEntreprise._id);
                                await newDataEntreprise.save();
                                createEntrepriseForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(entreprise._id));
                                etablissementFinded.entreprises.push(Object(entreprise));
                                await etablissementFinded.save();
                                return entreprise
                                    .save()
                                    .then((entreprise) => res.status(201).json({ messsage: 'entreprise is created', entreprise: entreprise }))
                                    .catch((error) => res.status(500).json({ error: error.message }));
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
// Affiche l'entreprise demandée, puis push dans le data de l'utilisateur demandeur
const readEntreprise = async (req: Request, res: Response, next: NextFunction) => {
    const entrepriseId = req.params.entrepriseId;
    const requesterId = req.headers.requesterid;
    const utilisateurFinded = await Utilisateur.findById(requesterId);
    if (!utilisateurFinded) {
        return res.status(400).json({ message: 'utilisteur not finded' });
    } else {
        readEntrepriseForExtracting(utilisateurFinded.datas[0].mounths[0], Object(entrepriseId));
        return Entreprise.findById(entrepriseId)
            .populate('interlocutors workStations missions')
            .populate({
                path: 'interlocutors',
                model: 'Interlocutor',
                populate: {
                    path: 'contacts'
                }
            })
            .then((entreprise) =>
                entreprise ? res.status(200).json({ message: entreprise }) : res.status(404).json({ message: 'Entreprise not found' })
            )
            .catch((error) => res.status(500).json({ error: error.message }));
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await Entreprise.countDocuments();
        const entreprises = await Entreprise.find();
        return res.status(200).json({ count: count, message: entreprises });
    } catch (error) {
        return res.status(500).json(error);
    }
};
const readAllByEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let sort = {};
        let limit = 100;
        let page = Number(req.query.page);
        if (!page) {
            page = 1;
        }
        const requesterFinded = await Utilisateur.findById(req.headers.requesterid);
        const etablissementFinded = await Etablissement.findById(Object(requesterFinded).etablissement);
        const count = (await Entreprise.find({ _id: Object(etablissementFinded).entreprises })).length;
        const entreprisesFinded = await Entreprise.find({ _id: Object(etablissementFinded).entreprises })
            .populate('interlocutors')
            .skip(Number(page * limit) - 1 * limit)
            .limit(limit)
            .sort(sort);
        if (!etablissementFinded) {
            Retour.error('requester was not found');
            return res.status(400).json('requester was not found');
        } else {
            if (req.query.sort === 'date-desc') {
                sort = { updatedAt: 'desc' };
            } else if (req.query.sort === 'date-asc') {
                sort = { updatedAt: 'asc' };
            }
            if (req.query.society) {
                return res.status(200).json({
                    count: entreprisesFinded.filter(({ society }) => society.match(new RegExp(`^${req.query.society}`, 'gi'))).length,
                    entreprises: entreprisesFinded.filter(({ society }) => society.match(new RegExp(`^${req.query.society}`, 'gi')))
                });
            } else if (req.query.adressLabel) {
                return res.status(200).json({
                    count: entreprisesFinded.filter(({ adressLabel }) => adressLabel.match(new RegExp(`${req.query.adressLabel}`, 'gi'))).length,
                    entreprises: entreprisesFinded.filter(({ adressLabel }) => adressLabel.match(new RegExp(`${req.query.adressLabel}`, 'gi')))
                });
            } else if (req.query.interlocutor) {
                return res.status(200).json({
                    count: entreprisesFinded.filter((entreprise) =>
                        entreprise.interlocutors.find((interlocutor) =>
                            Object(interlocutor).account.name.match(new RegExp(`^${req.query.interlocutor}`, 'gi'))
                        )
                    ).length,
                    entreprises: entreprisesFinded.filter((entreprise) =>
                        entreprise.interlocutors.find((interlocutor) =>
                            Object(interlocutor).account.name.match(new RegExp(`^${req.query.interlocutor}`, 'gi'))
                        )
                    )
                });
            } else {
                return res.status(200).json({ companiesRemaining: count - (Number(page * limit) - 1 * limit), entreprises: entreprisesFinded });
            }
        }
    } catch (error) {
        console.error({ error: error });
        return res.status(400).json({ error: error });
    }
};

const updateEntreprise = async (req: Request, res: Response, next: NextFunction) => {
    const entrepriseId = req.params.entrepriseId;
    const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
    if (!utilisateurFinded) {
        return res.status(400).json({ message: 'Utilisateur has been not found' });
    } else {
        return Entreprise.findById(entrepriseId).then(async (entreprise) => {
            if (entreprise) {
                if (Object(req.files).file) {
                    const path = Object(req.files).file[0].path;
                    const result = await cloudinary.v2.uploader.upload(path);
                    entreprise.set({ logo: result.secure_url });
                    updateEntrepriseForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(entrepriseId));
                    return entreprise
                        .save()
                        .then((entreprise) => res.status(201).json({ message: 'Image has been uploaded', entreprise: entreprise }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                } else {
                    if (req.body.adress) {
                        if (!req.body.adress || !req.body.zip || !req.body.zip) {
                            return res.status(400).json({ message: 'adress , city and zip is required' });
                        } else {
                            let location = {};
                            const response = await axios.get(
                                `https://api-adresse.data.gouv.fr/search/?q=${req.body.adress} ${req.body.city} ${req.body.zip}`
                            );
                            if (response) {
                                location = {
                                    lng: response.data.features[0].geometry.coordinates[0],
                                    lat: response.data.features[0].geometry.coordinates[1]
                                };
                            }
                            entreprise.set({
                                adressLabel: `${req.body.adress} ${req.body.zip} ${req.body.city} `,
                                adress: req.body.adress,
                                city: req.body.city,
                                zip: req.body.zip,
                                location: location
                            });
                            updateEntrepriseForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(entrepriseId));
                            return entreprise
                                .save()
                                .then((entreprise) => res.status(201).json({ messgae: 'Entreprise has been updated', entreprise: entreprise }))
                                .catch((error) => res.status(500).json({ error: error.message }));
                        }
                    } else {
                        entreprise.set(req.body);
                        updateEntrepriseForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(entrepriseId));

                        return entreprise
                            .save()
                            .then((entreprise) => res.status(201).json({ messgae: 'Entreprise has been updated', entreprise: entreprise }))
                            .catch((error) => res.status(500).json({ error: error.message }));
                    }
                }
            } else {
                res.status(404).json({ message: 'Entreprise has been not found' });
            }
        });
    }
};

const deleteEntreprise = async (req: Request, res: Response, next: NextFunction) => {
    const entrepriseId = req.params.entrepriseId;
    const requesterId = req.body;
    const utilisateurFinded = await Utilisateur.findById(requesterId.admin._id);
    const entrepriseFinded = await Entreprise.findById(entrepriseId);

    if (!entrepriseFinded) {
        return res.status(400).json({ error: 'the entreprise has been not found' });
    } else {
        const archive = await axios.post(`${config.mongooseUrlArchived}/entreprise/create`, {
            society: entrepriseFinded?.society,
            currentName: entrepriseFinded?.currentName,
            siret: entrepriseFinded?.siret,
            adressLabel: entrepriseFinded?.adressLabel,
            adress: entrepriseFinded?.adress,
            adressComplement: entrepriseFinded.adressComplement,
            zip: entrepriseFinded?.zip,
            lng: entrepriseFinded?.location.lng,
            lat: entrepriseFinded?.location.lat,
            city: entrepriseFinded?.city,
            logo: entrepriseFinded.logo,
            activityArea: entrepriseFinded?.activityArea,
            administratifStateOpen: entrepriseFinded?.administratifStateOpen,
            headquartersSociety: entrepriseFinded?.headquartersSociety,
            numberOfEmployed: entrepriseFinded?.numberOfEmployed,
            codeNAF: entrepriseFinded?.codeNAF,
            details: entrepriseFinded?.details,
            comments: entrepriseFinded?.comments,
            activityarea: entrepriseFinded.activityArea,
            interlocutors: entrepriseFinded.interlocutors,
            workStations: entrepriseFinded.workStations,
            missions: entrepriseFinded.missions,
            events: entrepriseFinded.events,
            datas: entrepriseFinded.datas,
            employmentContracts: entrepriseFinded.employmentContracts,
            interlocutorsArchiveds: entrepriseFinded.interlocutorsArchiveds,
            workStationsArchiveds: entrepriseFinded.workStationsArchiveds,
            missionsArchived: entrepriseFinded.missionsArchived,
            eventsManagements: entrepriseFinded.eventsManagements
        });
        if (archive.data.message === 'entreprise is archived' || archive.data.message === 'entreprise updated in the archive') {
            deleteEntrepriseForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(entrepriseId));
            await entrepriseFinded.deleteOne();
            Retour.info('The entreprise has been deleted');
            return res.status(200).json({ message: 'The entreprise has been deleted' });
        } else {
            Retour.warn('Something went wrong in archive');
            return res.status(400).json({ message: 'Something went wrong in archive' });
        }
    }
};

const fetchSiretEntreprise = (req: Request, res: Response, next: NextFunction) => {
    try {
        const siret = req.params.siret;
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

        // Fonction pour requeter l'API d'état
        axios.request(options).then(async function (response) {
            let entreprise: object = {};
            (async () => {
                try {
                    entreprise = await axios.get(`https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`, {
                        headers: {
                            Authorization: `Bearer ${response.data.access_token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (err) {
                    Retour.error(`Error 404... entreprise ${siret} not found`);
                    console.error(Object(err).data);
                } finally {
                    if (Object(entreprise).data === undefined) {
                        Retour.error('error catched');
                        return res.status(204).json({ message: 'error catched' });
                    } else {
                        let codes = [
                            { code: 'NN', value: 'Unité non employeuse' },
                            { code: 0, value: ' 0 salarié' },
                            { code: 1, value: '1 ou 2 salariés' },
                            { code: 2, value: '3 à 5 salariés' },
                            { code: 3, value: '6 à 9 salariés' },
                            { code: 11, value: '10 à 19 salariés' },
                            { code: 12, value: '20 à 49 salariés' },
                            { code: 21, value: '50 à 99 salariés' },
                            { code: 22, value: '100 à 199 salariés' },
                            { code: 31, value: '200 à 249 salariés' },
                            { code: 32, value: '250 à 499 salariés' },
                            { code: 41, value: '500 à 999 salariés' },
                            { code: 42, value: '1 000 à 1 999 salariés' },
                            { code: 51, value: '2 000 à 4 999 salariés' },
                            { code: 52, value: '5 000 à 9 999 salariés' },
                            { code: 53, value: '10 000 salariés et plus' }
                        ];

                        const entrepriseFinded = await Entreprise.findOne({ siret: siret });
                        entrepriseFinded
                            ? Retour.info(`entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} already exist`)
                            : Retour.info(`entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} does'nt exist`);
                        return res.status(200).json({
                            entrepriseFinded: entrepriseFinded
                                ? `entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} already exist`
                                : `entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} does'nt exist`,
                            etablissement: {
                                society: Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale,
                                currentName:
                                    Object(entreprise).data.etablissement.uniteLegale.denominationUsuelle1UniteLegale === null
                                        ? Object(entreprise).data.etablissement.periodesEtablissement[0].enseigne1Etablissement
                                        : Object(entreprise).data.etablissement.uniteLegale.denominationUsuelle1UniteLegale,
                                siret,
                                adressLabel: `${
                                    Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement === null
                                        ? ''
                                        : Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement
                                } ${Object(entreprise).data.etablissement.adresseEtablissement.typeVoieEtablissement} ${
                                    Object(entreprise).data.etablissement.adresseEtablissement.libelleVoieEtablissement
                                } ${Object(entreprise).data.etablissement.adresseEtablissement.codePostalEtablissement} ${
                                    Object(entreprise).data.etablissement.adresseEtablissement.libelleCommuneEtablissement
                                }`.trim(),
                                adress: `${
                                    Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement === null
                                        ? ''
                                        : Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement
                                } ${Object(entreprise).data.etablissement.adresseEtablissement.typeVoieEtablissement} ${
                                    Object(entreprise).data.etablissement.adresseEtablissement.libelleVoieEtablissement
                                }`.trim(),
                                zip: `${Object(entreprise).data.etablissement.adresseEtablissement.codePostalEtablissement}`,
                                city: `${Object(entreprise).data.etablissement.adresseEtablissement.libelleCommuneEtablissement}`,
                                adressComplement: `${Object(entreprise).data.etablissement.adresseEtablissement.complementAdresseEtablissement}`,
                                administratifStateOpen: `${
                                    Object(entreprise).data.etablissement.periodesEtablissement[0].dateFin === null ? true : false
                                }`,
                                headquartersSociety: `${Object(entreprise).data.etablissement.etablissementSiege}`,
                                numberOfEmployed:
                                    Object(entreprise).data.etablissement.trancheEffectifsEtablissement !== 'NN'
                                        ? `${
                                              codes[
                                                  codes.findIndex(
                                                      (code) =>
                                                          code.code === Number(Object(entreprise).data.etablissement.trancheEffectifsEtablissement)
                                                  )
                                              ].value
                                          }`
                                        : 'Unité non employeuse',
                                codeNAF: `${Object(entreprise).data.etablissement.uniteLegale.activitePrincipaleUniteLegale}`
                            }
                        });
                    }
                }
            })();
        });
    } catch (error) {
        console.error({
            message: 'error catched',
            error: {
                message: Object(error).message,
                method: Object(error).config.method,
                url: Object(error).config.url,
                code: Object(error).code
            }
        });
        return res.status(500).json({
            message: 'error catched',
            error: {
                message: Object(error).message,
                method: Object(error).config.method,
                url: Object(error).config.url,
                code: Object(error).code
            }
        });
    }
};
export default { createEntreprise, readEntreprise, readAll, readAllByEtablissement, updateEntreprise, deleteEntreprise, fetchSiretEntreprise };
