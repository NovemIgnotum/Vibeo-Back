import { NextFunction, Request, Response } from 'express';
const uid2 = require('uid2');
const cloudinary = require('cloudinary');

// Models
import Convention from '../models/Convention';
import Utilisateur from '../models/Utilisateur';
import Logging from '../library/Logging';
import Etablissement from '../models/Etablissement';

// Functions
import { CreateConvention, ReadConvention, UpdateConvention, DeleteConvention } from '../functions/ConventionData';
import dataConvention from '../models/DataConvention';
import axios from 'axios';
import Retour from '../library/Response';
import config from '../config/config';

const createConvention = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = uid2(26);
        const fileKeys = Object(req.files).file;

        const etablissementFinded = await Etablissement.findById(req.body.etablissementId);

        async function isAlreadyExist(name: String, startingDate: Date, endingDate: Date) {
            const allConvention = await Convention.find({ name: name, endingDate: endingDate, startingDate: startingDate });
            if (allConvention.length !== 0) {
                return true;
            } else {
                return false;
            }
        }
        if ((await isAlreadyExist(req.body.name, req.body.startingDate, req.body.endingDate)) === true) {
            Logging.error("the convention's already exist");
            return res.status(400).json({ message: "the convention's already exist" });
        } else if (!etablissementFinded) {
            Logging.error('the etablissement has been not found');
            return res.status(400).json({ message: 'the etablissement has been not found' });
        } else {
            // enregistrement d'une nouvelle convention SANS photo(s)
            if (fileKeys === undefined) {
                const dateNow = new Date();
                const newData = new dataConvention({
                    month: dateNow.getMonth() + 1
                });

                const convention = new Convention({
                    name: req.body.name,
                    startingDate: req.body.startingDate,
                    endingDate: req.body.endingDate,
                    objectifs: {
                        numberOfEntries: req.body.numberOfEntries,
                        numberOfActivityStarted: req.body.numberOfActivityStarted,
                        numberOfActivityStartedForLongTime: req.body.numberOfActivityStartedForLongTime,
                        NumberOfExitForGood: req.body.NumberOfExitForGood
                    },
                    actionSheet: {
                        description: req.body.description,
                        public: req.body.public,
                        actionObjectif: req.body.actionObjectif,
                        positiveExitCriteria: req.body.positiveExitCriteria,
                        balanceSheetPreparation: req.body.balanceSheetPreparation
                    },
                    managements: {
                        responsibleOfTheConvention: req.body.responsibleOfTheConvention,
                        adjointResponsibleOfTheConvention: req.body.adjointResponsibleOfTheConvention,
                        AdministrativeOfficer: req.body.AdministrativeOfficer,
                        TheTeam: req.body.TheTeam
                    },
                    datas: { year: dateNow.getFullYear() },
                    orientations: req.body.orientations,
                    entrees: req.body.entrees,
                    usagersOuted: req.body.usagersOuted,
                    token: token
                });
                etablissementFinded.conventions.push(Object(convention._id));
                convention.datas[0].mounths.push(newData._id);
                CreateConvention(req.body.admin?.datas[0].mounths[0], convention._id);
                await newData.save();
                await etablissementFinded.save();
                return await convention
                    .save()
                    .then((convention) => {
                        Logging.info('Convention created'), res.status(201).json({ convention: convention });
                    })
                    .catch((error) => res.status(500).json({ message: 'error catched', error: error.message }));
            } else {
                // enregistrement d'une nouvelle convention AVEC photo(s)
                let results = [];
                for (const path of fileKeys) {
                    const result = await cloudinary.v2.uploader.upload(path.path);
                    results.push({ public_id: result.public_id, url: result.secure_url });

                    if (fileKeys.length === results.length) {
                        // tous les uploads sont terminés, on peut donc envoyer la réponse au client
                        const dateNow = new Date();
                        const newData = new dataConvention({
                            month: dateNow.getMonth() + 1
                        });
                        const convention = new Convention({
                            name: req.body.name,
                            startingDate: req.body.startingDate,
                            endingDate: req.body.endingDate,
                            objectifs: {
                                numberOfEntries: req.body.numberOfEntries,
                                numberOfActivityStarted: req.body.numberOfActivityStarted,
                                numberOfActivityStartedForLongTime: req.body.numberOfActivityStartedForLongTime,
                                NumberOfExitForGood: req.body.NumberOfExitForGood
                            },
                            logos: results,
                            actionSheet: {
                                description: req.body.description,
                                public: req.body.public,
                                actionObjectif: req.body.actionObjectif,
                                positiveExitCriteria: req.body.positiveExitCriteria,
                                balanceSheetPreparation: req.body.balanceSheetPreparation
                            },
                            managements: {
                                responsibleOfTheConvention: req.body.responsibleOfTheConvention,
                                adjointResponsibleOfTheConvention: req.body.adjointResponsibleOfTheConvention,
                                AdministrativeOfficer: req.body.AdministrativeOfficer,
                                TheTeam: req.body.TheTeam
                            },
                            datas: { year: dateNow.getFullYear() },
                            orientations: req.body.orientations,
                            entrees: req.body.entrees,
                            usagersOuted: req.body.usagersOuted,
                            token: token
                        });
                        etablissementFinded.conventions.push(Object(convention));
                        convention.datas[0].mounths.push(newData._id);
                        await newData.save();
                        await etablissementFinded.save();
                        CreateConvention(req.body.admin?.datas[0].mounths[0], convention);
                        return await convention
                            .save()
                            .then((convention) => {
                                Logging.info('Convention created'), res.status(201).json({ convention: convention });
                            })
                            .catch((error) => res.status(500).json({ message: 'error catched', error: error.message }));
                    }
                }
            }
        }
    } catch (error) {
        return res.status(422).json({ message: 'error catched', error: error });
    }
};

const readConvention = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conventionId = req.params.conventionId;
        const requester = req.headers.requesterid;
        const utilisateurFinded = await Utilisateur.findById(requester);
        const conventionFinded = await Convention.findById(conventionId).populate('prescriptions orientations entrees usagersOuted');
        if (!conventionFinded) {
            return res.status(404).json({ message: 'Convention has been not found' });
        } else {
            if (utilisateurFinded) {
                ReadConvention(Object(utilisateurFinded?.datas[0].mounths[0]), Object(conventionId));
                return res.status(200).json({ convention: conventionFinded });
            } else {
                return res.status(404).json({ message: "the requester's id has been not found" });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'error catched' });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return await Etablissement.findById(req.params.etablissementId)
        .populate('conventions')
        .select('conventions')
        .then((conventions) => res.status(200).json({ count: Object(conventions).conventions.length, conventions: Object(conventions).conventions }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateConvention = async (req: Request, res: Response, next: NextFunction) => {
    const conventionId = req.params.conventionId;
    const conventionFinded = await Convention.findById(conventionId);

    const fileKeys = Object(req.files).file;
    const numLogoStarted = conventionFinded?.logos.length;

    if (conventionFinded) {
        if (req.body.objectifs) {
            conventionFinded.objectifs = req.body.objectifs;
        }

        // Pour changer les valuers dans la fiche d'action;
        req.body.description && (conventionFinded.actionSheet.description = req.body.description);
        req.body.public && (conventionFinded.actionSheet.public = req.body.public);
        req.body.actionObjectif && (conventionFinded.actionSheet.actionObjectif = req.body.actionObjectif);
        req.body.positiveExitCriteria && (conventionFinded.actionSheet.positiveExitCriteria = req.body.positiveExitCriteria);
        req.body.balanceSheetPreparation && (conventionFinded.actionSheet.balanceSheetPreparation = req.body.balanceSheetPreparation);

        // Pour ajouter un nouveau logo;
        if (fileKeys !== undefined) {
            for (const path of fileKeys) {
                const result = await cloudinary.v2.uploader.upload(path.path);
                const logo = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
                Object(conventionFinded).logos.push(logo);
            }
            if (numLogoStarted === Object(conventionFinded).logos.length - fileKeys.length) {
                await conventionFinded?.save();
                UpdateConvention(Object(req.body.admin?.datas[0].mounths[0]), Object(conventionFinded));
                return res.status(200).json({ message: 'Pictures uploaded', convention: Object(conventionFinded) });
            } else {
                return res.status(400).json({ message: 'Pictures arent uploaded' });
            }
        } else if (req.body.logoIdToDelete) {
            const newArray = conventionFinded.logos.filter((el: object) => Object(el).public_id !== req.body.logoIdToDelete);
            Object(conventionFinded).logos = newArray;
            const result = await cloudinary.v2.uploader.destroy(req.body.logoIdToDelete);
            if (result.result !== 'not found') {
                await conventionFinded.save();
                UpdateConvention(Object(req.body.admin?.datas[0].mounths[0]), Object(conventionFinded));
                return res.status(200).json({ message: "logo's deleted" });
            } else {
                return res.status(400).json({ message: "logo's not finded" });
            }
        }
        // Pour changer les valuers dans l'équipe de la conventionFinded;
        if (req.body.responsibleOfTheConvention) {
            const adminFinded = await Utilisateur.findById(req.body.responsibleOfTheConvention);
            const utilisateurFinded = await Utilisateur.findById(req.body.responsibleOfTheConvention);
            if (adminFinded) {
                conventionFinded.managements.responsibleOfTheConvention = Object(adminFinded)._id;
            } else {
                conventionFinded.managements.responsibleOfTheConvention = Object(utilisateurFinded)._id;
            }
        }
        if (req.body.adjointResponsibleOfTheConvention) {
            const adminFinded = await Utilisateur.findById(req.body.adjointResponsibleOfTheConvention);
            const utilisateurFinded = await Utilisateur.findById(req.body.adjointResponsibleOfTheConvention);
            if (adminFinded) {
                conventionFinded.managements.adjointResponsibleOfTheConvention = Object(adminFinded)._id;
            } else {
                conventionFinded.managements.adjointResponsibleOfTheConvention = Object(utilisateurFinded)._id;
            }
        }
        if (req.body.AdministrativeOfficer) {
            const adminFinded = await Utilisateur.findById(req.body.AdministrativeOfficer);
            const utilisateurFinded = await Utilisateur.findById(req.body.AdministrativeOfficer);
            if (adminFinded) {
                conventionFinded.managements.AdministrativeOfficer = Object(adminFinded)._id;
            } else {
                conventionFinded.managements.AdministrativeOfficer = Object(utilisateurFinded)._id;
            }
        }
        if (req.body.TheTeam) {
            if (typeof req.body.TheTeam === 'string') {
                const adminFinded = await Utilisateur.findById(req.body.TheTeam);
                const utilisateurFinded = await Utilisateur.findById(req.body.TheTeam);
                if (adminFinded) {
                    conventionFinded.managements.TheTeam = Object(adminFinded)._id;
                } else {
                    conventionFinded.managements.TheTeam = Object(utilisateurFinded)._id;
                }
            } else {
                let newArray = [];
                for (const key of req.body.TheTeam) {
                    const adminFinded = await Utilisateur.findById(key);
                    const utilisateurFinded = await Utilisateur.findById(key);
                    if (adminFinded) {
                        newArray.push(Object(adminFinded)._id);
                    } else {
                        newArray.push(Object(utilisateurFinded)._id);
                    }
                }
                Object(conventionFinded).managements.TheTeam = newArray;
            }
        }
        conventionFinded.set(req.body);

        return conventionFinded
            .save()
            .then((convention) => {
                UpdateConvention(Object(req.body.admin?.datas[0].mounths[0]), Object(conventionFinded)),
                    res.status(201).json({ convention: convention });
            })
            .catch((error) => res.status(500).json({ error: error.message }));
    } else {
        res.status(404).json({ message: 'Not found' });
    }
};

const deleteConvention = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conventionId = req.params.conventionId;
        const conventionToArchived = await Convention.findById(conventionId);
        const etablissementFinded = await Etablissement.findOne({ conventions: conventionId });
        const newTabOfConventions = etablissementFinded?.conventions.filter((el) => JSON.stringify(el) !== JSON.stringify(conventionId));
        if (conventionToArchived === null) {
            return res.status(400).json({ message: 'The convention has been not found' });
        } else if (!etablissementFinded) {
            return res.status(400).json({ message: 'The etablissement has been not found' });
        } else {
            const archived = await axios.post(`${config.mongooseUrlArchived}/convention/create`, {
                _id: conventionToArchived && conventionToArchived._id,
                name: conventionToArchived.name,
                startingDate: conventionToArchived.startingDate,
                endingDate: conventionToArchived.endingDate ? conventionToArchived.endingDate : new Date(),
                numberOfEntries: conventionToArchived.objectifs.numberOfEntries,
                numberOfActivityStarted: conventionToArchived.objectifs.numberOfActivityStarted,
                numberOfActivityStartedForLongTime: conventionToArchived.objectifs.numberOfActivityStartedForLongTime,
                NumberOfExitForGood: conventionToArchived.objectifs.NumberOfExitForGood,
                logos: conventionToArchived.logos,
                description: conventionToArchived.actionSheet.description,
                public: conventionToArchived.actionSheet.public,
                actionObjectif: conventionToArchived.actionSheet.actionObjectif,
                positiveExitCriteria: conventionToArchived.actionSheet.positiveExitCriteria,
                balanceSheetPreparation: conventionToArchived.actionSheet.balanceSheetPreparation,
                responsibleOfTheConvention: conventionToArchived.managements.responsibleOfTheConvention,
                adjointResponsibleOfTheConvention: conventionToArchived.managements.adjointResponsibleOfTheConvention,
                AdministrativeOfficer: conventionToArchived.managements.AdministrativeOfficer,
                TheTeam: conventionToArchived.managements.TheTeam,
                orientations: conventionToArchived.orientations,
                entrees: conventionToArchived.entrees,
                usagersOuted: conventionToArchived.usagersOuted,
                token: conventionToArchived.token
            });
            if (
                archived.data.message === `The convention ${conventionToArchived.name} has been archived` ||
                archived.data.message === `The convention ${conventionToArchived.name} has been updated in the archives`
            ) {
                Object(etablissementFinded).conventions = newTabOfConventions;
                etablissementFinded?.conventionArchiveds.push(Object(conventionToArchived));
                await etablissementFinded?.save();
                return Convention.findByIdAndDelete(conventionId)
                    .then(() => {
                        DeleteConvention(Object(req.body.admin?.datas[0].mounths[0]), Object(conventionToArchived)),
                            res.status(200).json({ message: 'It has been deleted' });
                    })
                    .catch((error) => res.status(500).json({ error: error.message }));
            } else {
                return res.status(400).json({ error: 'the new convetionArchived has been not created' });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json(error);
    }
};

export default { createConvention, readConvention, readAll, updateConvention, deleteConvention };
