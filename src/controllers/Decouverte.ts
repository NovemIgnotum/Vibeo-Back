import { NextFunction, Request, Response } from 'express';
const moment = require('moment');

// Models
import Decouverte from '../models/Decouverte';
import Utilisateur from '../models/Utilisateur';
import OfferJob from '../models/OfferJob';
import WorkStation from '../models/WorkStation';
import Entreprise from '../models/Entreprise';
import Usager from '../models/Usager';
import Interlocutor from '../models/Interlocutor';

// Library
import Retour from '../library/Response';

// Functions
import {
    createDecouverteForExtracting,
    deleteDecouverteForExtracting,
    readDecouverteForExtracting,
    updateDecouverteForExtracting
} from '../functions/DecouverteData';
import { updateOfferJobForExtracting } from '../functions/OfferJobData';
import DecouverteSpontaneous from '../models/DecouverteSpontaneous';
import { createDecouverteSpontaneousForExtracting, updateDecouverteSpontaneousForExtracting } from '../functions/DecouverteSpontaneousData';
import { json } from 'stream/consumers';

const createDecouverte = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startingDate, endingDate, isFromAnEvent, skillsToAdd, usagerComment, entrepriseComment } = req.body;
        const offerJobFinded = await OfferJob.findById(req.params.offerJobId);
        const workStationFinded = await WorkStation.findOne({ offerJobs: offerJobFinded?._id });
        const entrepriseFinded = await Entreprise.findOne({ workStations: workStationFinded });
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(offerJobFinded?.usagerPositioned);

        if (!entrepriseFinded || !utilisateurFinded || !usagerFinded || !offerJobFinded) {
            return res.status(404).json({
                error: 'The entreprise, utilisateur, usager or the offer job has been not found'
            });
        } else {
            if (offerJobFinded?.status !== "Usager(e) accepté(e) par l'entreprise sans dates définies") {
                return res.status(401).json({ error: 'The status of the offer job is not available' });
            } else {
                if (!startingDate || !endingDate || typeof isFromAnEvent !== 'boolean') {
                    Retour.error({ message: 'some value(s) is missing' });
                    return res.status(500).json({ message: 'some value(s) is missing' });
                } else {
                    const decouverte = new Decouverte({
                        startingDate,
                        endingDate,
                        skillsAquired: workStationFinded?.skillsRequired,
                        isFromAnEvent,
                        jobName: offerJobFinded.offerName,
                        status: `Découverte prévu du ${new Date(startingDate).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })} au ${new Date(endingDate).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`,
                        usager: usagerFinded?._id,
                        entreprise: entrepriseFinded?._id,
                        usagerComment: usagerComment && { date: new Date(), comment: usagerComment },
                        entrepriseComment: entrepriseComment && { date: new Date(), comment: entrepriseComment }
                    });
                    skillsToAdd && (Object(decouverte).skillsAquired = Object(decouverte).skillsAquired.concat(skillsToAdd));
                    offerJobFinded.status = `Découverte prévu du ${new Date(startingDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })} au ${new Date(endingDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`;
                    offerJobFinded.history.push({
                        title: `Découverte prévu du ${new Date(startingDate).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })} au ${new Date(endingDate).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`,
                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                        comment: req.body.comment
                    });
                    offerJobFinded.decouvertes.push(Object(decouverte));
                    usagerFinded.decouvertes.push(Object(decouverte));
                    createDecouverteForExtracting(
                        Object(utilisateurFinded.datas[0].mounths[0]),
                        Object(offerJobFinded._id),
                        Object(usagerFinded._id),
                        Object(entrepriseFinded?._id)
                    );
                    await decouverte.save();
                    await offerJobFinded.save();
                    await usagerFinded.save();
                    return res.status(201).json({ message: 'The decouverte has been created', decouverte });
                }
            }
        }
    } catch (error) {
        console.error({ message: 'Error Catched', error });
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const createDecouverteSpontaneous = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            startingDate,
            endingDate,
            isFromAnEvent,
            usagerComment,
            entrepriseComment,
            skillsAquired,
            knowHowsAquired,
            contextesJobAquired,
            jobName
        } = req.body;
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(req.body.usagerId);
        const entrepriseFinded = await Entreprise.findById(req.body.entrepriseId);
        if (!utilisateurFinded || !usagerFinded || !entrepriseFinded) {
            Retour.error('The utilisateur, entreprise or the usager has been not found');
            return res.status(404).json({
                error: 'The utilisateur, entreprise or the usager has been not found'
            });
        } else {
            if (!startingDate || !endingDate || typeof isFromAnEvent !== 'boolean') {
                Retour.error({ message: 'some value(s) is missing' });
                return res.status(500).json({ message: 'some value(s) is missing' });
            } else {
                const decouverte = new DecouverteSpontaneous({
                    startingDate,
                    endingDate,
                    skillsAquired: skillsAquired,
                    knowHowsAquired: knowHowsAquired,
                    contextesJobAquired: contextesJobAquired,
                    isFromAnEvent,
                    jobName: jobName,
                    status: `Découverte prévu du ${new Date(startingDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })} au ${new Date(endingDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`,
                    usager: usagerFinded?._id,
                    entreprise: entrepriseFinded?._id,
                    usagerComment: usagerComment && { date: new Date(), comment: usagerComment },
                    entrepriseComment: entrepriseComment && { date: new Date(), comment: entrepriseComment }
                });
                usagerFinded.decouvertesSpontaneous.push(Object(decouverte));
                createDecouverteSpontaneousForExtracting(
                    Object(utilisateurFinded.datas[0].mounths[0]),
                    Object(decouverte._id),
                    Object(usagerFinded._id),
                    Object(entrepriseFinded._id)
                );
                await decouverte.save();
                await usagerFinded.save();
                Retour.info('The decouverte has been created');
                return res.status(201).json({ message: 'The decouverte has been created', decouverte });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const readDecouverte = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decouverteFinded = await Decouverte.findById(req.params.decouvertId);
        const decouverteSpontaneousFinded = await DecouverteSpontaneous.findById(req.params.decouvertId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const interlocutorFinded = await Interlocutor.findById(req.headers.requesterid);
        const usagerFinded = await Usager.findById(req.headers.requesterid);
        if (!decouverteFinded && !decouverteSpontaneousFinded) {
            return res.status(404).json({ error: 'the decouverte has been not found' });
        } else {
            if (decouverteFinded) {
                if (utilisateurFinded) {
                    readDecouverteForExtracting(
                        Object(utilisateurFinded.datas[0].mounths[0]),
                        Object(decouverteFinded._id),
                        Object(decouverteFinded.usager),
                        Object(decouverteFinded.entreprise)
                    );
                    return res.status(200).json(decouverteFinded);
                } else if (interlocutorFinded) {
                    const entrepriseFinded = await Entreprise.findOne({
                        interlocutors: interlocutorFinded._id
                    });
                    if (JSON.stringify(entrepriseFinded?._id) !== JSON.stringify(decouverteFinded.entreprise)) {
                        return res.status(401).json({ message: 'The interlocutor are not in this company' });
                    } else {
                        readDecouverteForExtracting(
                            Object(interlocutorFinded.datas[0].mounths[0]),
                            Object(decouverteFinded._id),
                            Object(decouverteFinded.usager),
                            Object(decouverteFinded.entreprise)
                        );
                        return res.status(200).json(decouverteFinded);
                    }
                } else if (usagerFinded) {
                    if (JSON.stringify(usagerFinded._id) !== JSON.stringify(decouverteFinded.usager)) {
                        return res.status(401).json({ message: 'The usager are not the candidate' });
                    } else {
                        readDecouverteForExtracting(
                            Object(usagerFinded.datas[0].mounths[0]),
                            Object(decouverteFinded._id),
                            Object(decouverteFinded.usager),
                            Object(decouverteFinded.entreprise)
                        );
                        return res.status(200).json(decouverteFinded);
                    }
                }
            } else if (decouverteSpontaneousFinded) {
                if (utilisateurFinded) {
                    readDecouverteForExtracting(
                        Object(utilisateurFinded.datas[0].mounths[0]),
                        Object(decouverteSpontaneousFinded._id),
                        Object(decouverteSpontaneousFinded.usager),
                        Object(decouverteSpontaneousFinded.entreprise)
                    );
                    return res.status(200).json(decouverteSpontaneousFinded);
                } else if (interlocutorFinded) {
                    const entrepriseFinded = await Entreprise.findOne({
                        interlocutors: interlocutorFinded._id
                    });
                    if (JSON.stringify(entrepriseFinded?._id) !== JSON.stringify(decouverteSpontaneousFinded.entreprise)) {
                        return res.status(401).json({ message: 'The interlocutor are not in this company' });
                    } else {
                        readDecouverteForExtracting(
                            Object(interlocutorFinded.datas[0].mounths[0]),
                            Object(decouverteSpontaneousFinded._id),
                            Object(decouverteSpontaneousFinded.usager),
                            Object(decouverteSpontaneousFinded.entreprise)
                        );
                        return res.status(200).json(decouverteSpontaneousFinded);
                    }
                } else if (usagerFinded) {
                    if (JSON.stringify(usagerFinded._id) !== JSON.stringify(decouverteSpontaneousFinded.usager)) {
                        return res.status(401).json({ message: 'The usager are not the candidate' });
                    } else {
                        readDecouverteForExtracting(
                            Object(usagerFinded.datas[0].mounths[0]),
                            Object(decouverteSpontaneousFinded._id),
                            Object(decouverteSpontaneousFinded.usager),
                            Object(decouverteSpontaneousFinded.entreprise)
                        );
                        return res.status(200).json(decouverteSpontaneousFinded);
                    }
                }
            } else {
                return res.status(200).json({ message: 'The requester has been found' });
            }
        }
    } catch (error) {
        Retour.error('Error catched');
        console.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Decouverte.find()
        .then((decouvertes) => res.status(200).json({ message: decouvertes }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateDecouverte = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decouverteFinded = await Decouverte.findById(req.params.decouverteId);
        const decouverteSpontaneousFinded = await DecouverteSpontaneous.findById(req.params.decouverteId);
        const { newStartingDate, newEndingDate, usagerComment, entrepriseComment } = req.body;
        if (decouverteFinded) {
            return Decouverte.findById(decouverteFinded._id).then(async (decouverte) => {
                if (!decouverte) {
                    return res.status(404).json({ message: 'Not found' });
                } else {
                    if (decouverte.validatedByUsager || decouverte.validatedByEntreprise) {
                        return res.status(400).json({ message: 'The decouverte is already passed' });
                    } else {
                        const offerJobFinded = await OfferJob.findOne({ decouvertes: decouverte._id });
                        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
                        const usagerFinded = await Usager.findById(offerJobFinded?.usagerPositioned[0]).select('account');

                        if (!utilisateurFinded) {
                            return res.status(404).json({ message: 'requester has been not found' });
                        } else {
                            if (newStartingDate || newEndingDate) {
                                const first = decouverte.startingDate;
                                const second = newStartingDate;
                                // Compare la 1ere date et la date recu pour savoir si on avance ou on recule le RDV
                                const x = moment(first);
                                const y = moment(second);
                                const diffInDays = y.diff(x, 'days');
                                decouverte.startingDate = newStartingDate;
                                decouverte.endingDate = newEndingDate;
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });

                                Object(offerJobFinded).status = `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(
                                    newStartingDate
                                ).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })} au ${new Date(newEndingDate).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}`;
                                Object(offerJobFinded).history.push({
                                    title: `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(newStartingDate).toLocaleDateString(
                                        'fr-FR',
                                        {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        }
                                    )} au ${new Date(newEndingDate).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                    comment: req.body.comment
                                });
                                await Object(offerJobFinded).save();
                                await decouverte.save();
                                updateDecouverteForExtracting(
                                    Object(utilisateurFinded?.datas[0].mounths[0]),
                                    Object(decouverte._id),
                                    Object(decouverte.usager),
                                    Object(decouverte.entreprise)
                                );
                                Retour.log({ Message: 'The dates has been updated' });
                                return res.status(200).json({ message: 'The dates has been updated' });
                            } else if (usagerComment || entrepriseComment) {
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });
                                offerJobFinded?.history.push({
                                    title: `Ajout d'un nouveau commentaire à la découverte ${decouverte._id}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                    comment: req.body.comment
                                });
                                await offerJobFinded?.save();
                                await decouverte.save();
                                Retour.log({ Message: 'Comment has been pushed' });
                                updateDecouverteForExtracting(
                                    Object(utilisateurFinded?.datas[0].mounths[0]),
                                    Object(decouverte._id),
                                    Object(decouverte.usager),
                                    Object(decouverte.entreprise)
                                );
                                return res.status(200).json({ Message: 'Comment has been pushed', decouverte });
                            } else {
                                Retour.error({ message: 'The dates or the comments is missing' });
                                return res.status(403).json({ message: 'The dates or the comments is missing' });
                            }
                        }
                    }
                }
            });
        } else if (decouverteSpontaneousFinded) {
            return DecouverteSpontaneous.findById(decouverteSpontaneousFinded._id).then(async (decouverte) => {
                if (!decouverte) {
                    return res.status(404).json({ message: 'Not found' });
                } else {
                    if (decouverte.validatedByUsager || decouverte.validatedByEntreprise) {
                        return res.status(400).json({ message: 'The decouverte is already passed' });
                    } else {
                        const offerJobFinded = await OfferJob.findOne({ decouvertes: decouverte._id });
                        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
                        const usagerFinded = await Usager.findById(offerJobFinded?.usagerPositioned[0]).select('account');

                        if (!utilisateurFinded) {
                            return res.status(404).json({ message: 'requester has been not found' });
                        } else {
                            if (newStartingDate || newEndingDate) {
                                const first = decouverte.startingDate;
                                const second = newStartingDate;
                                // Compare la 1ere date et la date recu pour savoir si on avance ou on recule le RDV
                                const x = moment(first);
                                const y = moment(second);
                                const diffInDays = y.diff(x, 'days');
                                decouverte.startingDate = newStartingDate;
                                decouverte.endingDate = newEndingDate;
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });

                                Object(offerJobFinded).status = `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(
                                    newStartingDate
                                ).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })} au ${new Date(newEndingDate).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}`;
                                Object(offerJobFinded).history.push({
                                    title: `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(newStartingDate).toLocaleDateString(
                                        'fr-FR',
                                        {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        }
                                    )} au ${new Date(newEndingDate).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                    comment: req.body.comment
                                });
                                await Object(offerJobFinded).save();
                                await decouverte.save();
                                updateDecouverteSpontaneousForExtracting(
                                    Object(utilisateurFinded?.datas[0].mounths[0]),
                                    Object(decouverte._id),
                                    Object(decouverte.usager),
                                    Object(decouverte.entreprise)
                                );
                                Retour.log({ Message: 'The dates has been updated' });
                                return res.status(200).json({ message: 'The dates has been updated' });
                            } else if (usagerComment || entrepriseComment) {
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });
                                offerJobFinded?.history.push({
                                    title: `Ajout d'un nouveau commentaire à la découverte ${decouverte._id}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                    comment: req.body.comment
                                });
                                await offerJobFinded?.save();
                                await decouverte.save();
                                Retour.log({ Message: 'Comment has been pushed' });
                                updateDecouverteSpontaneousForExtracting(
                                    Object(utilisateurFinded?.datas[0].mounths[0]),
                                    Object(decouverte._id),
                                    Object(decouverte.usager),
                                    Object(decouverte.entreprise)
                                );
                                return res.status(200).json({ Message: 'Comment has been pushed', decouverte });
                            } else {
                                Retour.error({ message: 'The dates or the comments is missing' });
                                return res.status(403).json({ message: 'The dates or the comments is missing' });
                            }
                        }
                    }
                }
            });
        } else {
            Retour.warn('decouverte was not found');
            return res.status(400).json('decouverte was not found');
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const deleteDecouverte = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decouverteFinded = await Decouverte.findById(req.params.decouverteId);
        const usagerFinded = await Usager.findOne({ decouvertes: Object(decouverteFinded)._id });
        const {
            requesterId,
            validatedByUsager,
            validatedByEntreprise,
            stillAvailable,
            dateOfCancel,
            usagerComment,
            entrepriseComment,
            offerJobComment
        } = req.body;
        if (!decouverteFinded) {
            Retour.error({ message: 'Decouverte has been not found' });
            return res.status(500).json({ message: 'Decouverte has been not found' });
        } else {
            if (decouverteFinded.validatedByUsager || decouverteFinded.validatedByEntreprise) {
                return res.status(400).json({ message: 'The decouverte is already passed' });
            } else {
                const utilisateurFinded = await Utilisateur.findById(requesterId);
                if (!utilisateurFinded) {
                    Retour.error({ message: 'The requester has been not found' });
                    return res.status(500).json({ message: 'The requester has been not found' });
                } else {
                    if (typeof validatedByUsager !== 'boolean' || typeof validatedByEntreprise !== 'boolean') {
                        Retour.error({ message: 'The validate return has been not found' });
                        return res.status(500).json({ message: 'The validate return has been not found' });
                    } else {
                        const offerJobFinded = await OfferJob.findOne({ decouvertes: Object(decouverteFinded)._id });
                        decouverteFinded.validatedByUsager = validatedByUsager;
                        decouverteFinded.validatedByEntreprise = validatedByEntreprise;
                        usagerComment && decouverteFinded.usagerComment.push({ date: new Date(), comment: usagerComment });
                        entrepriseComment && decouverteFinded.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });

                        if (validatedByUsager === true && validatedByEntreprise === true) {
                            Object(offerJobFinded).status = `Usager(e) accepté(e) par l'entreprise sans dates définies apres découverte`;
                            Object(offerJobFinded).history.push({
                                title: `Usager(e) accepté(e) par l'entreprise sans dates définies apres découverte`,
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                comment: offerJobComment
                            });
                        } else {
                            // Si l'un des 2 dit ne souhaite plus continuer
                            if (typeof stillAvailable !== 'boolean' && !dateOfCancel) {
                                Retour.error({ error: 'stillAvalaible is required' });
                                return res.status(500).json({ error: 'stillAvailable is required' });
                            } else {
                                if (stillAvailable) {
                                    Object(offerJobFinded).status = `Disponible`;
                                    Object(offerJobFinded).history.push({
                                        title: `Offre d'emploi redevenue disponible après une période de découverte`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    const newArrayOfferJob = Object(offerJobFinded).usagerPositioned.filter(
                                        (el: string) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id)
                                    );
                                    Object(offerJobFinded).usagerPositioned = newArrayOfferJob;
                                    const newArrrayUsager = Object(usagerFinded).offerJobReceived.filter(
                                        (el: string) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id)
                                    );
                                    Object(usagerFinded).offerJobReceived = newArrrayUsager;
                                    await Object(offerJobFinded).save();
                                    await Object(usagerFinded).save();
                                    await Object(decouverteFinded).deleteOne();
                                    updateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJobFinded)._id);
                                    deleteDecouverteForExtracting(
                                        Object(utilisateurFinded?.datas[0].mounths[0]),
                                        Object(decouverteFinded._id),
                                        Object(decouverteFinded).usager._id,
                                        Object(decouverteFinded).entreprise._id
                                    );
                                    Retour.log({ message: 'Decouverte has been deleted and the offer job is still available' });
                                    return res.status(200).json({ message: 'Decouverte has been deleted and the offer job is still available' });
                                } else {
                                    Object(offerJobFinded).status = `Offre déja pourvu par l'entreprise le ${new Date(
                                        dateOfCancel && dateOfCancel
                                    ).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`;
                                    Object(offerJobFinded).history.push({
                                        title: `Offre d'emploi redevenue disponible après une période de découverte`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    const newArrayOfferJob = Object(offerJobFinded).usagerPositioned.filter(
                                        (el: string) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id)
                                    );
                                    Object(offerJobFinded).usagerPositioned = newArrayOfferJob;
                                    const newArrrayUsager = Object(usagerFinded).offerJobReceived.filter(
                                        (el: string) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id)
                                    );
                                    Object(usagerFinded).offerJobReceived = newArrrayUsager;
                                    await Object(offerJobFinded).save();
                                    await Object(usagerFinded).save();
                                    await Object(decouverteFinded).deleteOne();
                                    updateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(decouverteFinded._id));
                                    deleteDecouverteForExtracting(
                                        Object(utilisateurFinded?.datas[0].mounths[0]),
                                        Object(decouverteFinded._id),
                                        Object(decouverteFinded).usager._id,
                                        Object(decouverteFinded).entreprise._id
                                    );
                                    Retour.log({ message: 'Decouverte has been deleted and the offer job is not still available' });
                                    return res.status(200).json({ message: 'Decouverte has been deleted and the offer job is not still available' });
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

export default { createDecouverte, createDecouverteSpontaneous, readDecouverte, readAll, updateDecouverte, deleteDecouverte };
