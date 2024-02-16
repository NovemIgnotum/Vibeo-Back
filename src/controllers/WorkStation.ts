import { NextFunction, Request, Response } from 'express';

// Models
import WorkStation from '../models/WorkStation';
import Utilisateur from '../models/Utilisateur';
import Entreprise from '../models/Entreprise';
import Etablissement from '../models/Etablissement';

// Functions
import {
    createWorkStationForExtracting,
    deleteWorkStationForExtracting,
    readWorkStationForExtracting,
    updateWorkStationForExtracting
} from '../functions/WorkStationData';
import WorkStationsPoleEmploi from '../models/WorkStationsPoleEmploi';
import axios from 'axios';
import config from '../config/config';
import Retour from '../library/Response';

const createWorkStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            codeRome,
            workname,
            comments,
            definition,
            jobAccess,
            descriptionJobContext,
            precisionKnowHow,
            jobContextRequired,
            skillsRequired,
            knowHowRequired,
            precisionSkills,
            precisionJobContext
        } = req.body;
        const entrepriseFinded = await Entreprise.findById(req.params.entrepriseId)
            .populate('workStations interlocutors')
            .select('workStations interlocutors');
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        if (!entrepriseFinded || !utilisateurFinded) {
            Retour.warn('Utilisateur or Interlocutor has been not found');
            return res.status(404).json({ error: 'Utilisateur or Interlocutor has been not found' });
        } else {
            if (!workname) {
                Retour.warn('One or more values are missing');
                return res.status(404).json({ error: 'One or more values are missing' });
            } else {
                const etablissementFinded = await Etablissement.findOne({ utilisateurs: utilisateurFinded._id });
                if (!etablissementFinded) {
                    Retour.warn('Etablissement has been not found');
                    return res.status(404).json({ error: 'Etablissement has been not found' });
                } else {
                    const workStation = new WorkStation({
                        workname,
                        codeRome,
                        etablissementFrom: Object(etablissementFinded._id),
                        comments,
                        definition,
                        jobAccess,
                        descriptionJobContext,
                        precisionKnowHow,
                        jobContextRequired,
                        skillsRequired,
                        knowHowRequired,
                        precisionSkills,
                        precisionJobContext
                    });
                    const workStationFinded = entrepriseFinded.workStations.find(
                        (element) =>
                            Object(element).workname === workStation.workname &&
                            JSON.stringify(Object(element).etablissementFrom) === JSON.stringify(workStation.etablissementFrom)
                    );
                    if (workStationFinded !== undefined) {
                        Retour.error('this work station already exist');
                        return res.status(400).json({ error: 'this work station already exist', workStation: workStationFinded });
                    } else {
                        entrepriseFinded.workStations.push(Object(workStation));
                        await workStation.save();
                        await entrepriseFinded.save();
                        createWorkStationForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(workStation._id));
                        Retour.info('the work station has been created');
                        return res.status(201).json({ message: 'the work station has been created', workStation: workStation });
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const readWorkStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workStationFinded = await WorkStation.findById(req.params.workStationId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!workStationFinded || !utilisateurFinded) {
            Retour.warn('the work station or the utilisateur has been not found');
            return res.status(404).json({ error: 'the work station or the utilisateur has been not found' });
        } else {
            readWorkStationForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(workStationFinded._id));
            Retour.info('workstation finded');
            return res.status(200).json({ workStation: workStationFinded });
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Entreprise.findOne({ _id: req.params.entrepriseId })
        .populate('workStations')
        .select('workStations')
        .then((workStations) => res.status(200).json({ count: workStations?.workStations.length, workStations: workStations }))

        .catch((error) => {
            Retour.error({ message: 'Error catched', error }), res.status(500).json({ error: error.message });
        });
};

const readAllPoleEmploi = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const responseToUpdate = await WorkStationsPoleEmploi.find().select('name jobs codeROME');
        return res.status(200).json(responseToUpdate);
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const readOneWorkStationPoleEmploi = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return WorkStationsPoleEmploi.findById(req.params.workStationPoleEmploiId).then((workStation) => {
            if (workStation !== null) {
                Retour.info(`work station ${workStation.name} readed`);
                res.status(200).json(workStation);
            } else {
                Retour.warn('Work Station was not found');
                res.status(404).json('Work Station was not found');
            }
        });
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const updateWorkStation = async (req: Request, res: Response, next: NextFunction) => {
    const workStationId = req.params.workStationId;
    const workStationPoleEmploiFinded = await WorkStationsPoleEmploi.find();

    return WorkStation.findById(workStationId).then(async (workStation) => {
        if (!workStation) {
            Retour.warn('The work station has been not found');
            return res.status(404).json({ message: 'The work station has been not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                Retour.warn('requester has been not found');
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                workStation.set(req.body);
                Retour.info('workstation updated');
                return workStation
                    .save()
                    .then((workStation) => res.status(201).json({ workStation: workStation }))
                    .finally(() => {
                        updateWorkStationForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(workStation._id));
                    })

                    .catch((error) => {
                        Retour.error({ message: 'Error catched', error }), res.status(500).json({ error: error.message });
                    });
            }
        }
    });
};
// il faut reprendre le model des archives afin de le modifier comme ce model ci
const deleteWorkStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workStationFinded = await WorkStation.findById(req.params.workStationId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const entrepriseFinded = await Entreprise.findOne({ workStations: req.params.workStationId }).select('workStations workStationsArchiveds');
        if (!workStationFinded || !utilisateurFinded) {
            Retour.warn('the work station or utilisateur wan not found');
            return res.status(404).json({ error: 'the work station or utilisateur wan not found' });
        } else {
            if (Object(workStationFinded).offerJobs.length !== 0 || Object(workStationFinded).eventOfferJobs.length !== 0) {
                Retour.warn('The workstation still have an or many offer jobs');
                return res.status(400).json('The workstation still have an or many offer jobs');
            } else {
                const archived = await axios.post(`${config.mongooseUrlArchived}/workstation/create`, {
                    _id: workStationFinded._id,
                    etablissementFrom: workStationFinded.etablissementFrom,
                    workname: workStationFinded.workname,
                    knowHowRequired: workStationFinded.knowHowRequired,
                    skillsRequired: workStationFinded.skillsRequired,
                    picture: workStationFinded.picture,
                    video: workStationFinded.video,
                    definition: workStationFinded.definition,
                    jobAccess: workStationFinded.jobAccess,
                    precisionJobContext: workStationFinded.precisionJobContext,
                    precisionKnowHow: workStationFinded.precisionKnowHow,
                    jobContext: workStationFinded.jobContextRequired,
                    precisionSkills: workStationFinded.precisionSkills,
                    offerJobs: workStationFinded.offerJobs,
                    offerJobArchiveds: workStationFinded.offerJobArchiveds,
                    eventOfferJobs: workStationFinded.eventOfferJobs,
                    eventOfferJobArchiveds: workStationFinded.eventOfferJobArchiveds
                });
                if (archived.data.message !== 'the work station has been archived') {
                    Retour.warn('Something wane wrong in BDD Archive');
                } else {
                    const newArray = entrepriseFinded?.workStations.filter((el) => JSON.stringify(el) !== JSON.stringify(workStationFinded._id));
                    Object(entrepriseFinded).workStations = newArray;
                    entrepriseFinded?.workStationsArchiveds.push(Object(workStationFinded._id));
                    await entrepriseFinded?.save();
                    deleteWorkStationForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), workStationFinded._id);
                    await workStationFinded.deleteOne();
                    Retour.info('The work station has been archived');
                    return res.status(200).json({ message: 'The work station has been archived' });
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

export default { createWorkStation, readWorkStation, readAllPoleEmploi, readOneWorkStationPoleEmploi, readAll, updateWorkStation, deleteWorkStation };
