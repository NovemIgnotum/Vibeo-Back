import { NextFunction, Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import Collectivity from '../models/Collectivity';
import Utilisateur from '../models/Utilisateur';
import Partenaire from '../models/Partenaire';
import Data from '../models/Data';
import Etablissement from '../models/Etablissement';

// Libraries
import Retour from '../library/Response';

// Functions
import {
    createCollectivityForExtracting,
    readCollectivityForExtracting,
    updateCollectivityForExtracting,
    deleteCollectivityForExtracting
} from '../functions/CollectivityData';
import axios from 'axios';
import { deletePartenaireForExtracting } from '../functions/PartenaireData';
import { Types } from 'mongoose';
import config from '../config/config';

const createCollectivity = async (req: Request, res: Response, next: NextFunction) => {
    const { requesterId, name, address, zip, city, location } = req.body;
    const utilisateurFinded = await Utilisateur.findById(requesterId);
    const etablissementFinded = await Etablissement.findById(req.params.etablissementId);

    if (!utilisateurFinded || !etablissementFinded) {
        Retour.error({ message: 'The requester has been not found' });
        return res.status(404).json({ message: 'The requester has been not found' });
    } else {
        if (!name) {
            Retour.error({ message: 'The name has been not found' });
            return res.status(404).json({ message: 'The name has been not found' });
        } else {
            const collectivityFinded = await Collectivity.findOne({ name: name, address: address, zip: zip, city: city });
            if (collectivityFinded) {
                Retour.warn({ message: 'This collectivity already exist' });
                return res.status(404).json({ message: 'This collectivity already exist' });
            } else {
                const collectivity = new Collectivity({
                    name,
                    address,
                    zip,
                    city,
                    location
                });
                etablissementFinded.collectivities.push(Object(collectivity));
                await etablissementFinded.save();
                return collectivity
                    .save()
                    .then((collectivity) => {
                        createCollectivityForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(collectivity._id));
                        res.status(201).json({ collectivity: collectivity });
                    })
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
    }
};

const readCollectivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const collectivityFinded = await Collectivity.findById(req.params.collectivityId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!collectivityFinded || !utilisateurFinded) {
            Retour.error('the collectivity or the utilisateur has been not found');
            return res.status(404).json({ error: 'the collectivity or the utilisateur has been not found' });
        } else {
            readCollectivityForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(collectivityFinded._id));
            Retour.info('The collectivity has been found ');
            return res.status(200).json({ collectivity: collectivityFinded });
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return await Etablissement.findById(req.params.etablissementId)
        .populate('collectivities')
        .select('collectivities')
        .then((collectivities) =>
            res.status(200).json({ count: Object(collectivities).collectivities.length, collectivities: Object(collectivities).collectivities })
        )
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateCollectivity = async (req: Request, res: Response, next: NextFunction) => {
    const collectivityId = req.params.collectivityId;
    const { male, name, firstname, mobileNum, landlineNum, email, password, passwordConfirmed } = req.body;
    return await Collectivity.findById(collectivityId).then(async (collectivity) => {
        if (!collectivity) {
            return res.status(404).json({ message: 'the collectivity has been not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                if (typeof male === 'boolean' || firstname) {
                    try {
                        if (typeof male !== 'boolean' || !name || !firstname) {
                            Retour.warn({ message: 'Name or firstname are missing' });
                            return res.status(404).json({ message: 'Name or firstname are missing' });
                        } else {
                            if ((!password && !passwordConfirmed) || password !== passwordConfirmed) {
                                Retour.warn({ message: 'password or passwordConfirmed are missing' });
                                return res.status(404).json({ message: 'password or passwordConfirmed are missing' });
                            } else {
                                const dateNow = new Date();
                                const newData = new Data({
                                    month: dateNow.getMonth() + 1
                                });
                                const token: string = uid2(26);
                                const salt: string = uid2(26);
                                const hash: string = SHA256(password + salt).toString(encBase64);
                                const partnerAlreadyExist = await Partenaire.findOne({ 'account.name': name, 'account.firstname': firstname });
                                const newPartenaire = new Partenaire({
                                    email,
                                    account: {
                                        male,
                                        name,
                                        firstname,
                                        mobileNum,
                                        landlineNum,
                                        collectivity: collectivity._id
                                    },
                                    datas: { year: dateNow.getFullYear() },
                                    token,
                                    salt,
                                    hash
                                });
                                newPartenaire.datas[0].mounths.push(newData._id);
                                collectivity.partenaires.push(Object(newPartenaire));
                                if (partnerAlreadyExist) {
                                    Retour.warn({ message: 'this partner already exist' });
                                    return res.status(404).json({ message: 'this partner already exist' });
                                } else {
                                    await newData.save();
                                    await newPartenaire.save();
                                    await collectivity.save();
                                    Retour.info('the collectivity has been updated, and the partner has been created');
                                    return res.status(201).json({ message: 'the collectivity has been updated, the partner has been created' });
                                }
                            }
                        }
                    } catch (error) {
                        Retour.error({ message: 'error catched', error });
                        return res.status(500).json({ message: 'error catched', error });
                    }
                } else {
                    collectivity.set(req.body);
                    return collectivity
                        .save()
                        .then((collectivity) => res.status(201).json({ collectivity: collectivity }))
                        .finally(() => {
                            updateCollectivityForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(collectivity._id));
                        })
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    });
};

const deleteCollectivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurFinded = await Utilisateur.findById(req.body.admin._id);
        const collectivityFinded = await Collectivity.findById(req.params.collectivityId);
        const etablissementFinded = await Etablissement.findOne({ collectivities: Object(collectivityFinded)._id });
        if (!collectivityFinded || !etablissementFinded || !utilisateurFinded) {
            Retour.error('The collectivity or etablissement, or requester has been not found');
            return res.status(404).json('The collectivity or etablissement, or requester has been not found');
        } else {
            // Si le partenaireId dans le tableau partenaires dans la collectivité n'a pas ete trouvé, alors je supprime l'id dans le tableau sinon j'archive le partenaire puis le suivant ...
            let count: number = collectivityFinded.partenaires.length;
            let newTab: { type: Types.ObjectId; ref: 'Partenaire' }[] = [];
            // Le call final pour archiver la collectivité
            const handleSubmit = async () => {
                const response = await axios.post(`${config.mongooseUrlArchived}/collectivity/create`, {
                    name: collectivityFinded.name,
                    address: collectivityFinded.address,
                    zip: collectivityFinded.zip,
                    city: collectivityFinded.city,
                    location: collectivityFinded.location,
                    _id: collectivityFinded._id,
                    partenaires: collectivityFinded.partenaires,
                    partenairesArchived: collectivityFinded.partenairesArchived,
                    usagers: collectivityFinded.usagers,
                    usagersOuted: collectivityFinded.usagersOuted
                });
                if (
                    response.data.message === `The collectivity ${collectivityFinded.name} has been created` ||
                    response.data.message === `The collectivity ${collectivityFinded.name} has been updated`
                ) {
                    Object(etablissementFinded).collectivities = etablissementFinded.collectivities.filter(
                        (element) => JSON.stringify(element) !== JSON.stringify(collectivityFinded._id)
                    );
                    await etablissementFinded.save();
                    await collectivityFinded.deleteOne();
                    return res.status(200).json('The collectivity has been archived');
                } else {
                    Retour.error({ message: 'Something went wrong about the submit' });
                    return res.status(500).json({ message: 'Something went wrong about the submit' });
                }
            };
            collectivityFinded.partenaires.forEach(async (el) => {
                const partenaireFinded = await Partenaire.findById(el);
                if (partenaireFinded?.account === undefined) {
                    Object(collectivityFinded).partenaires = collectivityFinded.partenaires.filter(
                        (element) => JSON.stringify(element) !== JSON.stringify(el)
                    );
                } else {
                    newTab.push(Object(el));
                    Object(collectivityFinded).partenaires = collectivityFinded.partenaires.filter(
                        (element) => JSON.stringify(element) !== JSON.stringify(el)
                    );
                }
                count--;
                if (count === 0) {
                    // Si la séquence est terminée alors je boucle sur mon tableau puis archive les partenaires pas encore archivés
                    for (let i = 0; i < newTab.length; i++) {
                        const partenaireToDelete = await Partenaire.findById(newTab[i]);
                        const archive = await axios.post(`${config.mongooseUrlArchived}/partenaire/create`, {
                            _id: partenaireToDelete && partenaireToDelete._id,
                            email: partenaireToDelete && partenaireToDelete.email,
                            male: partenaireToDelete && partenaireToDelete.account.male,
                            name: partenaireToDelete && partenaireToDelete.account.name,
                            firstname: partenaireToDelete && partenaireToDelete.account.firstname,
                            collectivity: partenaireToDelete && partenaireToDelete.account.collectivity,
                            usagersCreated: partenaireToDelete && partenaireToDelete.usagersCreated,
                            usagersAttribuated: partenaireToDelete && partenaireToDelete.usagersAttribuated,
                            contacts: partenaireToDelete && partenaireToDelete.contacts,
                            autorisations: partenaireToDelete && partenaireToDelete.autorisations,
                            datas: partenaireToDelete && partenaireToDelete.datas,
                            token: partenaireToDelete && partenaireToDelete.token,
                            hash: partenaireToDelete && partenaireToDelete.hash,
                            salt: partenaireToDelete && partenaireToDelete.salt
                        });
                        if (
                            archive.data.message ===
                                `The partenaire ${partenaireToDelete?.account.firstname} ${partenaireToDelete?.account.name} has been created` ||
                            archive.data.message ===
                                `The partenaire ${partenaireToDelete?.account.firstname} ${partenaireToDelete?.account.name} has been updated`
                        ) {
                            collectivityFinded.partenairesArchived.push(Object(partenaireToDelete?._id));
                            await partenaireToDelete?.deleteOne();
                            deletePartenaireForExtracting(utilisateurFinded?.datas[0].mounths[0], partenaireToDelete?._id);
                            Object(collectivityFinded).partenaires = collectivityFinded.partenaires.filter(
                                (element) => JSON.stringify(element) !== JSON.stringify(el)
                            );
                        } else {
                            Retour.info('Something went wrong');
                            return res.status(200).json('Something went wrong');
                        }
                    }
                    await collectivityFinded.save();
                    handleSubmit();
                }
            });
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

export default { createCollectivity, readCollectivity, readAll, updateCollectivity, deleteCollectivity };
