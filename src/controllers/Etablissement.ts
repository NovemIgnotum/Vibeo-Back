import { NextFunction, Request, Response } from 'express';
const uid2 = require('uid2');
// import cloudinary from 'cloudinary';

// MODELS
import Etablissement from '../models/Etablissement';
import Utilisateur from '../models/Utilisateur';

// FUNCTIONS
import { DataCreateEtablissement, DeleteEtablissement, ReadEtablissement, UpdateEtablissement } from '../functions/EtablissementData';

// Library
import Retour from '../library/Response';
import axios from 'axios';
import config from '../config/config';

// Creer un nouvel établissement puis l'enregistre dans ses datas
const createEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    const { name, adress, zip, location, city, admin } = req.body;
    const etablissementAlreadyExist = await Etablissement.findOne({ name: name });
    const etablissementArchived = await axios.get(`${config.mongooseUrlArchived}/etablissement/get/?name=${name}`);
    // const path = Object(req.files).file[0].path;
    // const result = await cloudinary.v2.uploader.upload(path);

    const etablissement = new Etablissement({
        name,
        adress,
        zip,
        location,
        city,
        token: uid2(26)
    });

    if (!admin) {
        Retour.error('admin not found');
        return res.status(401).json({ message: 'admin not found' });
    } else {
        if (!name || !adress || !zip || !city) {
            Retour.error('some values is missed');
            return res.status(422).json({ message: 'some values is missed' });
        } else {
            if (etablissementAlreadyExist) {
                Retour.error('etablissement already exist');
                return res.status(400).json({ message: 'etablissement already exist' });
            } else {
                if (!etablissementArchived.data.etablissement) {
                    DataCreateEtablissement(admin?.datas[0].mounths[0], etablissement._id);
                    await admin?.save();
                    Retour.info('etablissement has been created');
                    return etablissement
                        .save()
                        .then(
                            (etablissement) => (
                                DataCreateEtablissement(admin?.datas[0].mounths[0], etablissement._id),
                                res.status(201).json({ etablissement: etablissement })
                            )
                        )
                        .catch((error) => res.status(500).json({ error: error.message }));
                } else {
                    const newEtablissement = new Etablissement({
                        _id: etablissementArchived.data.etablissement._id,
                        name: etablissementArchived.data.etablissement.name,
                        adress: etablissementArchived.data.etablissement.adress,
                        zip: etablissementArchived.data.etablissement.zip,
                        city: etablissementArchived.data.etablissement.city,
                        location: etablissementArchived.data.etablissement.location,
                        logo: etablissementArchived.data.etablissement.logo,
                        collectivities: etablissementArchived.data.etablissement.collectivities,
                        conventions: etablissementArchived.data.etablissement.conventions,
                        utilisateurs: etablissementArchived.data.etablissement.utilisateurs,
                        partenaire: etablissementArchived.data.etablissement.partenaire,
                        usagers: etablissementArchived.data.etablissement.usagers,
                        entreprises: etablissementArchived.data.etablissement.entreprises,
                        conventionArchiveds: etablissementArchived.data.etablissement.conventionArchiveds,
                        utillisateurArchiveds: etablissementArchived.data.etablissement.utillisateurArchiveds,
                        UsagerOuts: etablissementArchived.data.etablissement.UsagerOuts,
                        collectivitiesArchived: etablissementArchived.data.etablissement.collectivitiesArchived,
                        token: etablissementArchived.data.etablissement.token
                    });
                    DataCreateEtablissement(admin?.datas[0].mounths[0], newEtablissement._id);
                    await admin.save();
                    Retour.info('etablissement has been created');
                    return etablissement
                        .save()
                        .then((etablissement) =>
                            res.status(201).json({ message: 'The etablissement returned from the archiveds', etablissement: etablissement })
                        )
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    }
};
// Doit recuperer l'id du demandeur puis enregistre la demande dans ses datas
const readEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminFinded = await Utilisateur.findById(req.headers.requesterid);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const etablissement = await Etablissement.findById(req.params.etablissementId).populate('conventions utilisateurs collectivities');
        if (!etablissement) {
            Retour.error('Etablissement has been not found');
            return res.status(404).json({ message: 'Etablissement has been not found' });
        } else {
            if (adminFinded) {
                ReadEtablissement(Object(adminFinded?.datas[0].mounths[0]), Object(etablissement._id));
                Retour.info('etablissement has been readed');
                return res.send(etablissement);
            } else if (utilisateurFinded) {
                ReadEtablissement(Object(utilisateurFinded?.datas[0].mounths[0]), Object(etablissement._id));
                Retour.info('etablissement has been readed');
                return res.send({ etablissement: etablissement });
            } else {
                Retour.error('Requester has been not found');
                return res.status(404).json({ message: 'Requester has been not found' });
            }
        }
    } catch (error) {
        Retour.error('error catched');
        return res.status(500).json({ error: 'error catched' });
    }
};
// Recoit en reponse tous les établissements, avec un select() des informations
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const count = await Etablissement.find().countDocuments();
    Retour.info('All Etablissement have been consulted');
    return Etablissement.find()
        .select('_id name adress zip city')
        .then((etablissements) => res.status(200).json({ count: count, etablissements: etablissements }))
        .catch((error) => {
            Retour.error('error catched'), res.status(500).json({ error: error.message });
        });
};
// Remplace les anciens éléments par les éléments recus puis l'enregistre dans les datas
const updateEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    const adminFinded = await Utilisateur.findById(req.body.admin._id);
    const etablissementFinded = await Etablissement.findById(req.params.etablissementId);
    if (etablissementFinded) {
        etablissementFinded.set(req.body);
        Retour.info('The Etablissement has been updated');
        return etablissementFinded
            .save()
            .then((etablissement) => {
                UpdateEtablissement(Object(adminFinded?.datas[0].mounths[0]), Object(etablissementFinded._id)),
                    res.status(201).json({ etablissement: etablissement });
            })
            .catch((error) => {
                Retour.info('Error catched'), res.status(500).json({ message: 'Error catched', error: error.message });
            });
    } else {
        return res.status(404).json({ message: 'Not found' });
    }
};
// Recherche l'établissement a supprimer, archive l'établissement puis l'enregistre dans les datas
const deleteEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const etablissement = await Etablissement.findById(req.params.etablissementId);
        if (!etablissement) {
            Retour.error('etablissement has been not found');
            return res.status(404).json({ message: 'etablissement has been not found' });
        } else {
            const adminFinded = await Utilisateur.findById(req.body.admin._id);
            const newEtablissementArchived = await axios.post(`${config.mongooseUrlArchived}/etablissement/create`, {
                _id: etablissement._id,
                name: etablissement.name,
                adress: etablissement.adress,
                zip: etablissement.zip,
                city: etablissement.city,
                conventions: etablissement.conventions,
                utilisateurs: etablissement.utilisateurs,
                partenaire: etablissement.partenaire,
                usagers: etablissement.usagers,
                entreprises: etablissement.entreprises,
                conventionArchiveds: etablissement.conventionArchiveds,
                utillisateurArchiveds: etablissement.utillisateurArchiveds,
                UsagerOuts: etablissement.UsagerOuts,
                token: etablissement.token
            });
            if (newEtablissementArchived.data.message === 'etablissement has been archived') {
                DeleteEtablissement(Object(adminFinded?.datas[0].mounths[0]), Object(etablissement)._id);
                await etablissement?.deleteOne().then(() => {
                    Retour.info('The etablissement has been deleted'), res.status(200).json({ message: 'The etablissement has been deleted' });
                });
            } else {
                Retour.warn('Something went wrong in the archives');
                res.status(200).json('Something went wrong in the archives');
            }
        }
    } catch (error) {
        Retour.error('error catched');
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

export default { createEtablissement, readEtablissement, readAll, updateEtablissement, deleteEtablissement };
