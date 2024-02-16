import { NextFunction, Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
import axios from 'axios';
import config from '../config/config';

// Models
import Utilisateur from '../models/Utilisateur';
import Data from '../models/Data';
import Etablissement from '../models/Etablissement';

// Library
import Logging from '../library/Logging';
import {
    createUtilisateurForExtracting,
    deleteUtilisateurForExtracting,
    readUtilisateurForExtracting,
    updateUtilisateurForExtracting
} from '../functions/Utilisateur';
import Retour from '../library/Response';

const createUtilisateur = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, firstname, mobileNum, male, password, passwordConfirmed, isAdmin, autorisations } = req.body;
        const etablissementFinded = await Etablissement.findById(req.params.etablissementId);
        const adminFinded = await Utilisateur.findById(req.body.admin._id);

        const token: string = uid2(26);
        const salt: string = uid2(26);
        const hash: string = SHA256(password + salt).toString(encBase64);

        const dateNow = new Date();
        const newData = new Data({
            month: dateNow.getMonth() + 1
        });

        const utilisateur = new Utilisateur({
            email,
            account: {
                male,
                name,
                firstname,
                mobileNum
            },
            datas: { year: dateNow.getFullYear() },
            admin: isAdmin,
            autorisations,
            etablissement: etablissementFinded?._id,
            appointments: [
                {
                    month: 'Janvier',
                    appointments: []
                },
                {
                    month: 'Fevrier',
                    appointments: []
                },
                {
                    month: 'Mars',
                    appointments: []
                },
                {
                    month: 'Avril',
                    appointments: []
                },
                {
                    month: 'Mai',
                    appointments: []
                },
                {
                    month: 'Juin',
                    appointments: []
                },
                {
                    month: 'Juillet',
                    appointments: []
                },
                {
                    month: 'Aout',
                    appointments: []
                },
                {
                    month: 'Septembre',
                    appointments: []
                },
                {
                    month: 'octobre',
                    appointments: []
                },
                {
                    month: 'Novembre',
                    appointments: []
                },
                {
                    month: 'Decembre',
                    appointments: []
                }
            ],
            token,
            salt,
            hash
        });

        if (!etablissementFinded || !adminFinded) {
            Retour.error('Etablissement or Admin has been not found');
            return res.status(404).json({ message: 'Etablissement or Admin has been not found' });
        } else {
            if (!email || !name || !firstname || !mobileNum || !isAdmin) {
                Retour.error(`One or more values are missing`);
                return res.status(400).json({ message: 'One or more values are missing' });
            } else {
                if (password !== passwordConfirmed) {
                    Retour.error('the passwords are not similar !');
                    return res.status(400).json({ message: 'the passwords are not similar !' });
                } else {
                    const alreadyExist = await Utilisateur.findOne({ email: email });
                    if (!alreadyExist) {
                        utilisateur.datas[0].mounths.push(newData._id);
                        await newData.save();
                        await utilisateur.save();
                        etablissementFinded.utilisateurs.push(Object(utilisateur));
                        createUtilisateurForExtracting(Object(adminFinded.datas[0].mounths[0]), Object(utilisateur._id));
                        await etablissementFinded.save();
                        Logging.info(`The utilisateur ${utilisateur.account.firstname} ${utilisateur.account.name} has been created`);
                        Retour.log(`The utilisateur ${utilisateur.account.firstname} ${utilisateur.account.name} has been created`);
                        return res.status(201).json({
                            message: `The utilisateur ${utilisateur.account.firstname} ${utilisateur.account.name} has been created`,
                            Utilisateur: utilisateur
                        });
                    } else {
                        Retour.warn('utilisateur already exist');
                        return res.status(403).json({ message: 'utilisateur already exist' });
                    }
                }
            }
        }
    } catch (error) {
        if (typeof error === 'string') {
            error.toUpperCase();
        } else if (error instanceof Error) {
            error.message;
        }
    }
};

const readUtilisateur = async (req: Request, res: Response, next: NextFunction) => {
    const utilisateurId = req.params.utilisateurId;
    const requesterFinded = await Utilisateur.findById(req.headers.requesterid);
    try {
        const utilisateurFinded = await Utilisateur.findById(utilisateurId);
        if (!utilisateurFinded || !requesterFinded) {
            return res.status(404).json({ message: 'utilisateur or Requester has been not found' });
        } else {
            readUtilisateurForExtracting(Object(requesterFinded?.datas[0].mounths[0]), Object(utilisateurFinded));
            return res.status(200).json({ message: utilisateurFinded });
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        return res.status(500).json({ message: 'error catched', error: error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurs = await Utilisateur.find();
        const counter = await Utilisateur.countDocuments();
        let tab: Object[] = [];
        utilisateurs.map(async (item, index) => {
            const etablissementFinded = await Etablissement.findOne({ utilisateurs: item._id }).select('_id name');
            tab.push({
                utilisateur: item,
                etablissement: etablissementFinded
            });
            if (tab.length === utilisateurs.length) {
                return res.status(200).json({ count: counter, utilisateurs: tab });
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const updateUtilisateur = async (req: Request, res: Response, next: NextFunction) => {
    const utilisateurId = req.params.utilisateurId;
    const adminFinded = await Utilisateur.findById(req.body.admin._id);
    if (!adminFinded) {
        return res.status(404).json({ error: 'admin has been not found' });
    } else {
        return await Utilisateur.findById(utilisateurId).then(async (utilisateur) => {
            if (!utilisateur) {
                return res.status(404).json({ message: 'the utilisateur has been not found' });
            } else {
                if (req.body.account) {
                    utilisateur.account = req.body.account;
                } else if (req.body.password) {
                    if (req.body.password !== req.body.passwordConfirmed) {
                        return res.status(401).json({ error: 'password and passwordConfirmed arent similare' });
                    } else {
                        const newHash: string = SHA256(req.body.password + utilisateur.salt).toString(encBase64);
                        utilisateur.hash = newHash;
                    }
                }
                if (req.body.isAdmin) {
                    utilisateur.admin = req.body.isAdmin;
                }
                updateUtilisateurForExtracting(Object(adminFinded.datas[0].mounths[0]), Object(utilisateur._id));
                return utilisateur
                    .save()
                    .then((utilisateur) => res.status(201).json({ message: 'Utilisateur updated', utilisateur: utilisateur }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        });
    }
};

const deleteUtilisateur = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurFinded = await Utilisateur.findById(req.params.utilisateurId);
        const requesterFinded = await Utilisateur.findById(req.body.admin._id);
        if (!utilisateurFinded || !requesterFinded) {
            return res.status(400).json({ message: 'utilisateur or the requester has been not found' });
        } else {
            const archive = await axios.post(`${config.mongooseUrlArchived}/utilisateur/create/`, {
                _id: utilisateurFinded._id,
                male: utilisateurFinded.account.male,
                email: utilisateurFinded.email,
                name: utilisateurFinded.account.name,
                firstname: utilisateurFinded.account.firstname,
                mobileNum: utilisateurFinded.account.mobileNum,
                datas: utilisateurFinded.datas,
                admin: utilisateurFinded.admin,
                appointment: utilisateurFinded.appointments,
                autorisations: utilisateurFinded.autorisations,
                token: utilisateurFinded.token,
                salt: utilisateurFinded.salt,
                hash: utilisateurFinded.hash
            });
            if (
                archive.data.message ===
                    `The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been created` ||
                archive.data.message === `The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been updated`
            ) {
                await Etablissement.findOne({ utilisateurs: utilisateurFinded._id }).then((etablissement) => {
                    const newArray = etablissement?.utilisateurs.filter((el) => JSON.stringify(el) !== JSON.stringify(utilisateurFinded._id));
                    Object(etablissement).utilisateurs = newArray;
                    Object(etablissement).save();
                });
                deleteUtilisateurForExtracting(Object(requesterFinded.datas[0].mounths[0]), Object(utilisateurFinded._id));
                await utilisateurFinded.deleteOne();
                Retour.info(`The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been created`);
                return res
                    .status(200)
                    .json({ message: `The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been created` });
            } else {
                Retour.info('the Utilisateur was not archived');
                return res.status(400).json({ message: 'the Utilisateur was not archived' });
            }
        }
    } catch (error) {
        Retour.error('Error catched');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

export default { createUtilisateur, readUtilisateur, readAll, updateUtilisateur, deleteUtilisateur };
