import { NextFunction, Request, Response } from 'express';
import Data from '../models/Data';

const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import Partenaire from '../models/Partenaire';
import Usager from '../models/Usager';
import {
    createPartenaireForExtracting,
    readPartenaireForExtracting,
    deletePartenaireForExtracting,
    updatePartenaireForExtracting
} from '../functions/PartenaireData';
import Utilisateur from '../models/Utilisateur';
import Retour from '../library/Response';
import Collectivity from '../models/Collectivity';
import axios from 'axios';
import config from '../config/config';
import Etablissement from '../models/Etablissement';

const createPartenaire = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { collectivityId, requesterId, email, male, name, firstname, mobileNum, landlineNum, civility, password, passwordConfirmed, usagerId } =
            req.body;
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        let tab: Object[] = [];

        usagerId.length !== 0 &&
            usagerId.map(async (item: string, index: number) => {
                const response = await Usager.findById(item);
                if (response) {
                    tab.push(Object(response));
                } else {
                    Retour.error('something went wrong about the usagers');
                    return res.status(400).json('something went wrong about the usagers');
                }
            });

        if (!utilisateurFinded) {
            Retour.error('Requester has been not found');
            return res.status(404).json('Requester has been not found');
        } else {
            const collectivityFinded = await Collectivity.findById(collectivityId);
            const etablissementFinded = await Etablissement.findOne({ collectivities: Object(collectivityFinded)._id });
            if (!collectivityFinded) {
                Retour.error('Convention has been not found');
                return res.status(404).json('Convention has been not found');
            } else {
                if (!name || !firstname || !civility) {
                    return res.status(400).json({ error: 'values missing' });
                } else {
                    const partenaireFinded = await Partenaire.findOne({
                        'account.name': name.toLowerCase(),
                        'account.firstname': firstname.toLowerCase()
                    });
                    if (partenaireFinded) {
                        Retour.warn('Partner already exist');
                        return res.status(400).json({ error: 'Partner already exist', partenaireFinded });
                    } else {
                        if (password !== passwordConfirmed) {
                            Retour.warn('the passwords anrent similare');
                            return res.status(400).json({ error: 'the passwords anrent similare' });
                        } else {
                            const dateNow = new Date();
                            const newData = new Data({
                                month: dateNow.getMonth() + 1
                            });
                            const token: string = uid2(26);
                            const salt: string = uid2(26);
                            const hash: string = SHA256(password + salt).toString(encBase64);
                            if (tab.length === usagerId.length) {
                                const partenaire = new Partenaire({
                                    email,
                                    account: {
                                        male,
                                        name,
                                        firstname,
                                        mobileNum,
                                        landlineNum,
                                        collectivity: collectivityFinded._id
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
                                    usagersAttribuated: tab,
                                    datas: { year: dateNow.getFullYear() },
                                    token,
                                    hash,
                                    salt
                                });
                                partenaire.datas[0].mounths.push(newData._id);
                                collectivityFinded.partenaires.push(Object(partenaire));
                                etablissementFinded?.partenaire.push(Object(partenaire));
                                await newData.save();
                                await partenaire.save();
                                await collectivityFinded.save();
                                await Object(etablissementFinded).save();
                                createPartenaireForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(partenaire._id));
                                Retour.info('Partenaire has been created');
                                return res.status(201).json('Partenaire has been created');
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readPartenaire = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const partenaireFinded = await Partenaire.findById(req.params.partenaireId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Retour.error('requester has been not found');
            return res.status(404).json('requester has been not found');
        } else {
            if (!partenaireFinded) {
                Retour.error('partenaire has been not found');
                return res.status(404).json('partenaire has been not found');
            } else {
                readPartenaireForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(partenaireFinded._id));
                Retour.info('partenaire has been found and returned');
                return res.status(200).json(partenaireFinded);
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const count = await Partenaire.countDocuments();
    return Partenaire.find()
        .then((partenaires) => res.status(200).json({ count: count, partenaire: partenaires }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updatePartenaire = async (req: Request, res: Response, next: NextFunction) => {
    const partenaireId = req.params.partenaireId;
    const {
        requesterId,
        name,
        firstname,
        collectivity,
        email,
        newArrayUsagerCretead,
        newArrayAttribuated,
        newArrayAutorisations,
        newPassword,
        newPasswordConfirmed
    } = req.body;
    const utilisateurFinded = await Utilisateur.findById(requesterId);
    if (!utilisateurFinded) {
        Retour.error('The requester has been nos not found');
        return res.status(400).json({ message: 'The requester has been nos not found' });
    } else {
        return await Partenaire.findById(partenaireId).then((partenaire) => {
            if (partenaire) {
                if (Object.keys(req.body).length === 0) {
                    Retour.error('Values not finded for an update');
                    return res.status(404).json({ message: 'values not finded for an update' });
                } else {
                    if (name || firstname || collectivity) {
                        name ? (partenaire.account.name = name) : (partenaire.account.name = partenaire.account.name);
                        firstname ? (partenaire.account.firstname = firstname) : (partenaire.account.firstname = partenaire.account.firstname);
                        collectivity
                            ? (partenaire.account.collectivity = collectivity)
                            : (partenaire.account.collectivity = partenaire.account.collectivity);
                    }
                    email ? (partenaire.email = email) : (partenaire.email = partenaire.email);
                    newArrayUsagerCretead
                        ? (partenaire.usagersCreated = newArrayUsagerCretead)
                        : (partenaire.usagersCreated = partenaire.usagersCreated);
                    newArrayAttribuated
                        ? (partenaire.usagersAttribuated = newArrayAttribuated)
                        : (partenaire.usagersAttribuated = partenaire.usagersAttribuated);
                    newArrayAutorisations
                        ? (partenaire.autorisations = newArrayAutorisations)
                        : (partenaire.autorisations = partenaire.autorisations);
                    if (newPassword) {
                        const newSalt: string = uid2(26);
                        const newHash: string = SHA256(newPassword + newSalt).toString(encBase64);

                        if (newPassword !== newPasswordConfirmed) {
                            Retour.error("newPassword and newPasswordConfirmed aren't similar");
                            return res.status(500).json("newPassword and newPasswordConfirmed aren't similar");
                        } else {
                            partenaire.salt = newSalt;
                            partenaire.hash = newHash;
                        }
                    }
                    updatePartenaireForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(partenaire._id));
                    return partenaire
                        .save()
                        .then((partenaire) => res.status(201).json({ partenaire: partenaire }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        });
    }
};

const deletePartenaire = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const partenaireFinded = await Partenaire.findById(req.params.partenaireId);
        const collectivityFinded = await Collectivity.findOne({ partenaires: Object(partenaireFinded)._id });
        const utilisateurFinded = await Utilisateur.findById(req.body.admin._id);
        const etablissementFinded = await Etablissement.findOne({ partenaire: Object(partenaireFinded)._id });
        if (!utilisateurFinded) {
            Retour.warn('The utilisateur has been not found');
            return res.status(404).json('The utilisateur has been not found');
        } else {
            if (!partenaireFinded || !collectivityFinded) {
                Retour.warn('The partenaire or the collectivity has been not found');
                return res.status(404).json('The partenaire or the collectivity has been not found');
            } else {
                const archive = await axios.post(`${config.mongooseUrlArchived}/partenaire/create`, {
                    _id: partenaireFinded && partenaireFinded._id,
                    email: partenaireFinded && partenaireFinded.email,
                    male: partenaireFinded && partenaireFinded.account.male,
                    name: partenaireFinded && partenaireFinded.account.name,
                    firstname: partenaireFinded && partenaireFinded.account.firstname,
                    collectivity: partenaireFinded && partenaireFinded.account.collectivity,
                    usagersCreated: partenaireFinded && partenaireFinded.usagersCreated,
                    usagersAttribuated: partenaireFinded && partenaireFinded.usagersAttribuated,
                    contacts: partenaireFinded && partenaireFinded.contacts,
                    autorisations: partenaireFinded && partenaireFinded.autorisations,
                    datas: partenaireFinded && partenaireFinded.datas,
                    token: partenaireFinded && partenaireFinded.token,
                    hash: partenaireFinded && partenaireFinded.hash,
                    salt: partenaireFinded && partenaireFinded.salt
                });
                if (
                    archive.data.message ===
                        `The partenaire ${partenaireFinded.account.firstname} ${partenaireFinded.account.name} has been created` ||
                    archive.data.message === `The partenaire ${partenaireFinded.account.firstname} ${partenaireFinded.account.name} has been updated`
                ) {
                    collectivityFinded.partenairesArchived.push(Object(partenaireFinded._id));
                    await partenaireFinded.deleteOne();
                    deletePartenaireForExtracting(Object(utilisateurFinded).datas[0].mounths[0], partenaireFinded._id);
                    const newPartenairesArray = collectivityFinded.partenaires.filter(
                        (el) => JSON.stringify(el) !== JSON.stringify(partenaireFinded._id)
                    );
                    Object(collectivityFinded).partenaires = newPartenairesArray;
                    const newEtablissementArray = Object(etablissementFinded).partenaire.filter(
                        (el: object) => JSON.stringify(el) !== JSON.stringify(partenaireFinded._id)
                    );
                    Object(etablissementFinded).partenaire = newEtablissementArray;
                    await collectivityFinded.save();
                    await Object(etablissementFinded).save();
                    Retour.info('the partenaire has been removed');
                    return res.status(200).json('the partenaire has been removed');
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

export default { createPartenaire, readPartenaire, readAll, updatePartenaire, deletePartenaire };
