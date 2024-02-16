import { NextFunction, Request, Response } from 'express';

// Models
import Mission from '../models/Mission';
import Utilisateur from '../models/Utilisateur';
import Entreprise from '../models/Entreprise';

// Functions
import {
    createMissionForExtracting,
    deleteMissionForExtracting,
    readMissionForExtracting,
    updateMissionForExtracting
} from '../functions/MissionData';
import Etablissement from '../models/Etablissement';
import Retour from '../library/Response';
import axios from 'axios';
import config from '../config/config';

const createMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, codeRome, workname, knowHowRequired, skillsRequired, comments } = req.body;
        const entrepriseFinded = await Entreprise.findById(req.params.entrepriseId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        if (!entrepriseFinded || !utilisateurFinded) {
            return res.status(404).json({ error: 'Utilisateur or Interlocutor has been not found' });
        } else {
            if (!date || !workname) {
                return res.status(404).json({ error: 'One or more values are missing' });
            } else {
                const etablissementFinded = await Etablissement.findOne({ utilisateurs: utilisateurFinded._id });
                if (!etablissementFinded) {
                    return res.status(404).json({ error: 'Etablissement has been not found' });
                } else {
                    const workStation = new Mission({
                        date,
                        workname,
                        codeRome,
                        etablissementFrom: Object(etablissementFinded._id),
                        knowHowRequired,
                        skillsRequired,
                        comments
                    });
                    const missionFinded = entrepriseFinded.missions.find(
                        (element) =>
                            Object(element).workname === workStation.workname &&
                            JSON.stringify(Object(element).etablissementFrom) === JSON.stringify(workStation.etablissementFrom)
                    );
                    if (missionFinded !== undefined) {
                        return res.status(400).json({ error: 'this mission already exist', workStation: missionFinded });
                    } else {
                        entrepriseFinded.missions.push(Object(workStation));
                        await workStation.save();
                        await entrepriseFinded.save();
                        createMissionForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(workStation._id));
                        Retour.info('the mission has been created');
                        return res.status(201).json({ message: 'the mission has been created', workStation: workStation });
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const missionFinded = await Mission.findById(req.params.missionId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!missionFinded || !utilisateurFinded) {
            return res.status(404).json({ error: 'the mission or the utilisateur has been not found' });
        } else {
            readMissionForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(missionFinded._id));
            Retour.info('misson has been found');
            return res.status(200).json({ workStation: missionFinded });
        }
    } catch (error) {
        Retour.error({ error: error });
        return res.status(500).json({ error: error });
    }
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Entreprise.findOne({ _id: req.params.entrepriseId })
        .populate('missions')
        .select('missions')
        .then((missions) => {
            Retour.info('All the missions has been readed'), res.status(200).json({ count: missions?.missions.length, missions: missions });
        })
        .catch((error) => {
            Retour.error('error catched'), res.status(500).json({ message: 'error catched', error: error.message });
        });
};

const updateMission = (req: Request, res: Response, next: NextFunction) => {
    const missionId = req.params.missionId;
    return Mission.findById(missionId).then(async (workStation) => {
        if (!workStation) {
            return res.status(404).json({ message: 'The mission has been not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                workStation.set(req.body);
                return workStation
                    .save()
                    .then((workStation) => {
                        Retour.info('Mission has been updated'), res.status(201).json({ workStation: workStation });
                    })
                    .finally(() => {
                        updateMissionForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(workStation._id));
                    })
                    .catch((error) => {
                        Retour.error('error catched'), res.status(500).json({ error: error.message });
                    });
            }
        }
    });
};

const deleteMission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const missionFinded = await Mission.findById(req.params.missionId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const entrepriseFinded = await Entreprise.findOne({ missions: req.params.missionId }).select('missions missionsArchived');
        if (!missionFinded || !utilisateurFinded) {
            return res.status(404).json({ error: 'the mission or utilisateur wan not found' });
        } else {
            const archived = await axios.post(`${config.mongooseUrlArchived}/mission/create`, {
                _id: missionFinded._id,
                date: missionFinded.date,
                etablissementFrom: missionFinded.etablissementFrom,
                workname: missionFinded.workname,
                knowHowRequired: missionFinded.knowHowRequired,
                skillsRequired: missionFinded.skillsRequired,
                comments: missionFinded.comments,
                intermediateOfferJob: missionFinded.intermediateOfferJob,
                intermediateOfferJobArchiveds: missionFinded.intermediateOfferJobArchiveds
            });
            if (archived.data.message === 'the mission has been archived') {
                const newArray = entrepriseFinded?.missions.filter((el) => JSON.stringify(el) !== JSON.stringify(missionFinded._id));
                Object(entrepriseFinded).missions = newArray;
                entrepriseFinded?.missionsArchived.push(Object(missionFinded._id));
                await entrepriseFinded?.save();
                deleteMissionForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), missionFinded._id);
                await missionFinded.save();
                await missionFinded.deleteOne();
                Retour.info('mission deleted');
                return res.status(200).json({ message: 'The mission has been archived' });
            } else {
                Retour.warn('Something went wrong in archives');
                return res.status(400).json('Something went wrong in archives');
            }
        }
    } catch (error) {
        Retour.error({ error: error });
        return res.status(500).json({ error: error });
    }
};

export default { createMission, readMission, readAll, updateMission, deleteMission };
