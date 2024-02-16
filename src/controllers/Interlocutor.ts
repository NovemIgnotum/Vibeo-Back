import { NextFunction, Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import Interlocutor from '../models/Interlocutor';
import Entreprise from '../models/Entreprise';
import {
    createInterlocuteurForExtracting,
    deleteInterlocuteurForExtracting,
    interlocuteurAddedForExtracting,
    interlocuteurRemovedForExtracting,
    readInterlocuteurForExtracting,
    updateInterlocuteurForExtracting
} from '../functions/InterlocutorData';
import Utilisateur from '../models/Utilisateur';
import Data from '../models/Data';
import Retour from '../library/Response';
import axios from 'axios';
import config from '../config/config';

const createInterlocutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requesterId, email, name, firstname, male, positionHeld, mobileNum, landlineNum, workSpot, password, passwordConfirmed } = req.body;
        const entrepriseId = req.params.entrepriseId;
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        const entrepriseFinded = await Entreprise.findById(entrepriseId);
        if (!utilisateurFinded) {
            return res.status(400).json({ message: 'The "requesterId" parameter is required or the Utilisateur has been not found' });
        } else {
            if (!entrepriseFinded) {
                return res.status(400).json({ message: 'Entreprise has been not found' });
            } else {
                if (!name || !firstname || !email || !password || !passwordConfirmed) {
                    Retour.warn(`One or more values are missing`);
                    return res.status(400).json(`One or more values are missing`);
                } else {
                    const dateNow = new Date();
                    const newData = new Data({
                        month: dateNow.getMonth() + 1
                    });

                    const token: string = uid2(26);
                    const salt: string = uid2(26);
                    const hash: string = SHA256(password + salt).toString(encBase64);

                    const newInterlocutor = new Interlocutor({
                        email: email,
                        account: {
                            male: male,
                            name: name,
                            firstname: firstname,
                            positionHeld: positionHeld,
                            mobileNum: mobileNum,
                            landlineNum: landlineNum
                        },
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
                        datas: { year: dateNow.getFullYear() },
                        token,
                        salt,
                        hash
                    });
                    if (password !== passwordConfirmed) {
                        return res.status(400).json({ message: 'the passwords arent similar' });
                    } else {
                        const interlocutorFinded = await Interlocutor.findOne({ 'account.name': name, 'account.firstname': firstname, email: email });
                        if (interlocutorFinded) {
                            return res.status(400).json({ message: 'this interlocutor already exist', interlocutor: interlocutorFinded });
                        } else {
                            entrepriseFinded.interlocutors.push(Object(newInterlocutor));
                            newInterlocutor.datas[0].mounths.push(newData._id);
                            newInterlocutor.entreprises.push(Object(entrepriseFinded));
                            await entrepriseFinded.save();
                            await newInterlocutor.save();
                            await newData.save();
                            createInterlocuteurForExtracting(utilisateurFinded?.datas[0].mounths[0], newInterlocutor._id);
                            Retour.info('Interlocutor has been created');
                            return res.status(201).json({ message: 'Interlocutor has been created', interlocuteur: newInterlocutor });
                        }
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ error: 'error catched', message: error });
        return res.status(400).json({ error: 'error catched', message: error });
    }
};

const readInterlocutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const interlocutorId = req.params.interlocutorId;
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const interlocutorFinded = await Interlocutor.findById(interlocutorId);
        if (!utilisateurFinded) {
            return res.status(400).json({ message: 'The "requesterId" parameter is required or the Utilisateur has been not found' });
        } else {
            if (!interlocutorFinded) {
                Retour.warn('The Interlocutor has been not found');
                return res.status(400).json({ message: 'The Interlocutor has been not found' });
            } else {
                readInterlocuteurForExtracting(utilisateurFinded?.datas[0].mounths[0], interlocutorFinded._id);
                Retour.info('An interlocutor has readed');
                return res.status(200).json({ interlocuteur: interlocutorFinded });
            }
        }
    } catch (error) {
        Retour.error({ error: 'error catched', message: error });
        return res.status(500).json({ message: 'The error has been catched', error: error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const entrepriseFinded = await Entreprise.findById(req.params.entrepriseId).populate('interlocutors').select('interlocutors');
        if (!entrepriseFinded) {
            Retour.warn('The entreprise has been not found');
            return res.status(400).json('The entreprise has been not found');
        } else {
            return res.status(200).json({ count: entrepriseFinded.interlocutors.length, interlocuteurs: entrepriseFinded });
        }
    } catch (error) {
        Retour.error({ error: 'error catched', message: error });
        return res.status(500).json({ message: 'The error has been catched', error: error });
    }
};

const updateInterlocutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const interlocutorId = req.params.interlocutorId;
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        return Interlocutor.findById(interlocutorId).then(async (interlocutor) => {
            if (!interlocutor || !req.body.requesterId) {
                res.status(404).json({ message: 'The interlocutor or the requester has been not found' });
            } else {
                if (!req.body.password) {
                    if (req.body.entrepriseIdToAdded) {
                        const entrepriseFinded = await Entreprise.findById(req.body.entrepriseIdToAdded);
                        if (!entrepriseFinded) {
                            Retour.warn('the entreprise has been not found');
                            return res.status(404).json({ message: 'the entreprise has been not found' });
                        } else {
                            const isAlreadyInThere = (el: any) => JSON.stringify(el) === JSON.stringify(req.body.entrepriseIdToAdded);
                            if (interlocutor.entreprises.findIndex(isAlreadyInThere) === -1) {
                                interlocutor.entreprises.push(Object(entrepriseFinded));
                                entrepriseFinded?.interlocutors.push(Object(interlocutor));
                                await interlocutor.save();
                                await entrepriseFinded?.save();
                                interlocuteurAddedForExtracting(
                                    Object(utilisateurFinded?.datas[0].mounths[0]),
                                    Object(interlocutor._id),
                                    Object(entrepriseFinded._id)
                                );
                                Retour.info('The entreprise has been added to the interlocutor');
                                return res.status(200).json({ message: 'The entreprise has been added to the interlocutor' });
                            } else {
                                Retour.warn('The entreprise already exist in this interlocutor');
                                return res.status(400).json({ message: 'The entreprise already exist in this interlocutor' });
                            }
                        }
                    } else if (req.body.entrepriseIdToRemove) {
                        const entrepriseFinded = await Entreprise.findById(req.body.entrepriseIdToRemove);
                        if (entrepriseFinded) {
                            const isInThere = (el: any) => JSON.stringify(el) === JSON.stringify(req.body.entrepriseIdToRemove);
                            if (interlocutor.entreprises.findIndex(isInThere) !== -1) {
                                entrepriseFinded?.interlocutorsArchiveds.push(Object(interlocutor));
                                const entrepriseArray = entrepriseFinded?.interlocutors.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(interlocutor._id)
                                );
                                const interlocutorArray = interlocutor.entreprises.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(Object(entrepriseFinded)._id)
                                );
                                Object(entrepriseFinded).interlocutors = entrepriseArray;
                                Object(interlocutor).entreprises = interlocutorArray;
                                await entrepriseFinded?.save();
                                await interlocutor?.save();
                                interlocuteurRemovedForExtracting(
                                    Object(utilisateurFinded?.datas[0].mounths[0]),
                                    Object(interlocutor._id),
                                    Object(entrepriseFinded._id)
                                );
                                Retour.info('The interlocutor has been removed');
                                return res.status(200).json('the interlocutor has been removed');
                            } else {
                                Retour.warn('The interlocutor is not in this company');
                                return res.status(404).json('The interlocutor is not in this company');
                            }
                        } else {
                            Retour.warn('the entreprise has been not found');
                            return res.status(404).json('the entreprise has been not found');
                        }
                    } else {
                        interlocutor.set(req.body);
                        utilisateurFinded
                            ? updateInterlocuteurForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(interlocutor._id))
                            : updateInterlocuteurForExtracting(Object(interlocutor?.datas[0].mounths[0]), Object(interlocutor._id));

                        return interlocutor
                            .save()
                            .then((interlocutor) => {
                                Retour.info('Interlocutor has been updated'), res.status(201).json({ interlocutor: interlocutor });
                            })
                            .catch((error) => res.status(500).json({ error: error.message }));
                    }
                } else {
                    if (req.body.password !== req.body.passwordConfirmed) {
                        Retour.warn('the passords arent similare');
                        return res.status(401).json('the passords arent similare');
                    } else {
                        const newHash: string = SHA256(req.body.password + interlocutor.salt).toString(encBase64);
                        interlocutor.hash = newHash;
                        await interlocutor.save();
                        Retour.info('the passord has been updated');
                        return res.status(201).json('the passord has been updated');
                    }
                }
            }
        });
    } catch (error) {
        Retour.error({ error: 'error catched', message: error });
        return res.status(500).json({ error: 'error catched', message: error });
    }
};

const deleteInterlocutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const interlocutorFinded = await Interlocutor.findById(req.params.interlocutorId);
        const entrepriseFinded = await Entreprise.findOne({ interlocutors: req.params.interlocutorId });
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Retour.warn('The utilisateur has been not found');
            return res.status(404).json('The utilisateur has been not found');
        } else {
            if (!interlocutorFinded || !entrepriseFinded) {
                Retour.warn('The interlocutor or the entreprise has been not found');
                return res.status(404).json('The interlocutor or the entreprise has been not found');
            } else {
                const archive = await axios.post(`${config.mongooseUrlArchived}/interlocutor/create`, {
                    _id: interlocutorFinded._id,
                    email: interlocutorFinded.email,
                    male: interlocutorFinded.account.male,
                    name: interlocutorFinded.account.name,
                    firstname: interlocutorFinded.account.firstname,
                    positionHeld: interlocutorFinded.account.positionHeld,
                    mobileNum: interlocutorFinded.account.mobileNum,
                    landlineNum: interlocutorFinded.account.landlineNum,
                    workSpot: interlocutorFinded.account.workSpot,
                    datas: interlocutorFinded.datas,
                    token: interlocutorFinded.token,
                    salt: interlocutorFinded.salt,
                    hash: interlocutorFinded.hash
                });
                if (
                    archive.data.message ===
                        `The interlocutor ${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name} has been created` ||
                    archive.data.message ===
                        `The interlocutor ${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name} has been updated`
                ) {
                    entrepriseFinded.interlocutorsArchiveds.push(Object(interlocutorFinded._id));
                    await interlocutorFinded.deleteOne();
                    deleteInterlocuteurForExtracting(utilisateurFinded?.datas[0].mounths[0], interlocutorFinded._id);
                    const newInterlocutorsArray = entrepriseFinded.interlocutors.filter(
                        (el) => JSON.stringify(el) !== JSON.stringify(interlocutorFinded._id)
                    );
                    Object(entrepriseFinded).interlocutors = newInterlocutorsArray;
                    await entrepriseFinded.save();
                    Retour.info('the interlocutor has been removed');
                    return res.status(200).json('the interlocutor has been removed');
                } else {
                    Retour.info('Something went wrong');
                    return res.status(200).json('Something went wrong');
                }
            }
        }
    } catch (error) {
        Retour.error({ error: 'error catched', message: error });
        return res.status(500).json({ error: 'error catched', message: error });
    }
};

export default { createInterlocutor, readInterlocutor, readAll, updateInterlocutor, deleteInterlocutor };
