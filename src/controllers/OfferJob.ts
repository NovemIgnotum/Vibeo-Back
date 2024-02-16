import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import axios from 'axios';

// Models
import OfferJob from '../models/OfferJob';
import Utilisateur from '../models/Utilisateur';
import Interlocutor from '../models/Interlocutor';
import Usager from '../models/Usager';
import Partenaire from '../models/Partenaire';
import WorkStation from '../models/WorkStation';
import Entreprise from '../models/Entreprise';
import JobInterview from '../models/JobInterview';
import Decouverte from '../models/Decouverte';
import EmploymentContract from '../models/EmploymentContract';

// Functions
import {
    createOfferJobForExtracting,
    readOfferJobForExtracting,
    updateOfferJobForExtracting,
    deleteOfferJobForExtracting
} from '../functions/OfferJobData';
import { createJobInterviewForExtracting } from '../functions/JobInterview';
import { UpdateOfferJobIn24h } from '../functions/UpdateOfferJobAtTime';
import { createOfferJobForSpontaneousExtracting, updateOfferJobForSpontaneousExtracting } from '../functions/OfferJobSpontaneous';
import { createDecouverteForExtracting } from '../functions/DecouverteData';
import { createEmploymentContractForExtracting } from '../functions/EmploymentContract';

// Library
import Retour from '../library/Response';
import SmsSended from '../library/SendSms';
import OfferJobSpontaneous from '../models/OfferJobSpontaneous';
import Convention from '../models/Convention';

const createOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            contractType,
            numberHoursPerWeek,
            offerName,
            salary,
            skillsAddedFromWorkStation,
            knowHowAddedFromWorkStation,
            skillsRemovedFromWorkStation,
            knowHowRemovedFromWorkStation,
            jobContextAddedFromWorkStation,
            jobContextRemovedFromWorkStation,
            jobAccessAdded,
            isForIrisJob,
            conventionAboutIrisJob
        } = req.body;
        const workStationFinded = await WorkStation.findById(req.params.workStationId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(req.body.usagerId);
        if (!workStationFinded || !utilisateurFinded) {
            Retour.error('The utilisateur or the entreprise has been not found');
            return res.status(404).json({ error: 'The utilisateur or the entreprise has been not found' });
        } else {
            if (!contractType || !numberHoursPerWeek || !offerName) {
                Retour.warn('One or more values are missing');
                return res.status(405).json({ error: 'One or more values are missing' });
            } else {
                const conventionFinded = await Convention.findById(conventionAboutIrisJob);
                if (isForIrisJob === true && !conventionFinded) {
                    Retour.warn('The conventionAboutIrisJob is missing');
                    return res.status(405).json({ error: 'The conventionAboutIrisJob is missing' });
                } else {
                    const offerJob = new OfferJob({
                        contractType,
                        numberHoursPerWeek,
                        createdBy: Object(utilisateurFinded?._id),
                        offerName,
                        salary,
                        history: {
                            title: "Création de l'offre",
                            date: new Date().setHours(new Date().getHours() + 1),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            comment: req.body.comment
                        },
                        skillsAddedFromWorkStation,
                        knowHowAddedFromWorkStation,
                        skillsRemovedFromWorkStation,
                        knowHowRemovedFromWorkStation,
                        jobContextAddedFromWorkStation,
                        jobContextRemovedFromWorkStation,
                        jobAccess: jobAccessAdded && jobAccessAdded,
                        isForIrisJob: isForIrisJob,
                        status: usagerFinded
                            ? `Offre soumise le ${new Date().toLocaleDateString('fr-FR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: 'numeric'
                              })}`
                            : 'Disponible'
                    });

                    usagerFinded && usagerFinded.offerJobReceived.push(Object(offerJob._id));
                    usagerFinded && offerJob.usagerPositioned.push(Object(usagerFinded));
                    usagerFinded &&
                        offerJob.history.push({
                            title: 'Offre soumise',
                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                            comment: req.body.comment
                        });
                    usagerFinded ? (offerJob.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1))) : null;
                    usagerFinded ? (offerJob.offerBlockedAutomaticaly = true) : (offerJob.offerBlockedAutomaticaly = false);
                    usagerFinded && UpdateOfferJobIn24h(offerJob._id);
                    workStationFinded.offerJobs.push(Object(offerJob._id));
                    isForIrisJob && offerJob.conventionAboutIrisJob.push(conventionAboutIrisJob);
                    createOfferJobForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJob._id));
                    await offerJob.save();
                    usagerFinded && (await usagerFinded.save());
                    await workStationFinded.save();
                    Retour.info('the offer job has been created');
                    return res.status(201).json({ message: 'the offer job has been created' });
                }
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
};
const createOfferJobSpontaneous = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary, skillsAdded, knowHowAdded, skillsRemoved, knowHowRemoved } = req.body;
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(req.body.usagerId);
        if (!utilisateurFinded || !usagerFinded) {
            Retour.error('The utilisateur or the usager has been not found');
            return res.status(404).json({ error: 'The utilisateur or the usager has been not found' });
        } else {
            if (!contractType || !numberHoursPerWeek || !offerName) {
                Retour.warn('One or more values are missing');
                return res.status(405).json({ error: 'One or more values are missing' });
            } else {
                const offerJob = new OfferJobSpontaneous({
                    contractType,
                    numberHoursPerWeek,
                    createdBy: Object(utilisateurFinded?._id),
                    offerName,
                    salary,
                    history: {
                        title: "Création de l'offre d'emploi spontanée",
                        date: new Date().setHours(new Date().getHours() + 1),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        comment: req.body.comment
                    },
                    skillsAddedFromWorkStation: skillsAdded,
                    knowHowAddedskillsAddedFromWorkStation: knowHowAdded,
                    skillsRemovedskillsAddedFromWorkStation: skillsRemoved,
                    knowHowRemovedskillsAddedFromWorkStation: knowHowRemoved,
                    status: `Offre spontanée crée le ${new Date().toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`
                });

                usagerFinded.offerJobsSpontaneous.push(Object(offerJob._id));
                offerJob.usagerPositioned.push(Object(usagerFinded));
                createOfferJobForSpontaneousExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJob._id));
                await offerJob.save();
                await usagerFinded.save();
                Retour.info('the offer job has been created');
                return res.status(201).json({ message: 'the offer job spontaneous has been created' });
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
};
const readOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const offerJobId = req.params.offerJobId;
        const offerJobFinded = await OfferJob.findById(offerJobId);
        const offerJobSpontaneousFinded = await OfferJobSpontaneous.findById(offerJobId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const partenaireFinded = await Partenaire.findById(req.headers.requesterid);
        const usagerFinded = await Usager.findById(req.headers.requesterid);
        const interlocutorFinded = await Interlocutor.findById(req.headers.requesterid);

        if (!offerJobFinded && !offerJobSpontaneousFinded) {
            Retour.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        } else {
            if (!utilisateurFinded && !partenaireFinded && !usagerFinded && !interlocutorFinded) {
                Retour.error('The requester has been not found');
                return res.status(404).json({ error: 'The requester has been not found' });
            } else {
                if (offerJobFinded) {
                    const workStationfinded = await WorkStation.findOne({ offerJobs: offerJobFinded?._id });
                    const usagerFindedAboutOfferJobIsFor = await Usager.findById(offerJobFinded?.usagerPositioned).select('account');
                    offerJobFinded?.history.push({
                        title: "Consultation de l'offre",
                        date: new Date(),
                        by:
                            (utilisateurFinded && `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`) ||
                            (partenaireFinded && `${partenaireFinded.account.firstname} ${partenaireFinded.account.name}`) ||
                            (usagerFinded && `${usagerFinded.account.firstname} ${usagerFinded.account.name}`) ||
                            (interlocutorFinded
                                ? `${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name}`
                                : 'some interlocutor but not reconized'),
                        for:
                            usagerFindedAboutOfferJobIsFor !== null
                                ? `${usagerFindedAboutOfferJobIsFor?.account.firstname} ${usagerFindedAboutOfferJobIsFor?.account.name}`
                                : 'undefined',
                        comment: req.body.comment
                    });
                    await offerJobFinded?.save();
                    utilisateurFinded && readOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJobId));
                    partenaireFinded && readOfferJobForExtracting(Object(partenaireFinded?.datas[0].mounths[0]), Object(offerJobId));
                    usagerFinded && readOfferJobForExtracting(Object(usagerFinded?.datas[0].mounths[0]), Object(offerJobId));
                    interlocutorFinded && readOfferJobForExtracting(Object(interlocutorFinded?.datas[0].mounths[0]), Object(offerJobId));
                    Retour.info('An offer job has been created');
                    return res
                        .status(200)
                        .json({ message: 'The offer job has been found', offerJob: offerJobFinded, workStation: workStationfinded });
                } else {
                    const usagerFindedAboutOfferJobIsFor = await Usager.findById(offerJobSpontaneousFinded?.usagerPositioned).select('account');
                    offerJobSpontaneousFinded?.history.push({
                        title: "Consultation de l'offre",
                        date: new Date(),
                        by:
                            (utilisateurFinded && `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`) ||
                            (partenaireFinded && `${partenaireFinded.account.firstname} ${partenaireFinded.account.name}`) ||
                            (usagerFinded && `${usagerFinded.account.firstname} ${usagerFinded.account.name}`) ||
                            (interlocutorFinded
                                ? `${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name}`
                                : 'some interlocutor but not reconized'),
                        for: `${usagerFindedAboutOfferJobIsFor?.account.firstname} ${usagerFindedAboutOfferJobIsFor?.account.name}`,
                        comment: req.body.comment
                    });
                    await offerJobSpontaneousFinded?.save();
                    utilisateurFinded && readOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJobId));
                    partenaireFinded && readOfferJobForExtracting(Object(partenaireFinded?.datas[0].mounths[0]), Object(offerJobId));
                    usagerFinded && readOfferJobForExtracting(Object(usagerFinded?.datas[0].mounths[0]), Object(offerJobId));
                    interlocutorFinded && readOfferJobForExtracting(Object(interlocutorFinded?.datas[0].mounths[0]), Object(offerJobId));
                    Retour.info('The offer job spontaneous has been foundd');
                    return res
                        .status(200)
                        .json({ message: 'The offer job spontaneous has been found', offerJobSpontaneous: offerJobSpontaneousFinded });
                }
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error(`${error}`);
        return res.status(500).json({ message: 'error catched', error: error });
    }
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.workstationid) {
        return WorkStation.findOne({ _id: req.headers.workstationid })
            .populate('offerJobs')
            .then((offerJob) => res.status(200).json({ count: offerJob?.offerJobs.length, offerJobs: offerJob }))
            .catch((error) => res.status(500).json({ error: error.message }));
    } else {
        const count = await OfferJobSpontaneous.countDocuments();
        return OfferJobSpontaneous.find()
            .then((offerJob) => res.status(200).json({ count: count, offerJobSpontaneous: offerJob }))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
};
const updateOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const offerJobFinded = await OfferJob.findById(req.params.offerJobId);
        const offerJobFindedSpontaneous = await OfferJobSpontaneous.findById(req.params.offerJobId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Retour.error({ message: 'requester was not found' });
            return res.status(401).json({ message: 'requester was not found' });
        } else {
            if (offerJobFinded) {
                offerJobFinded.set(req.body);
                offerJobFinded.history.push({
                    title: "Modification de l'offre",
                    date: new Date(),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: '',
                    comment: req.body.comment
                });
                return offerJobFinded
                    .save()
                    .then((offerJob) => res.status(200).json(offerJob))
                    .finally(() => {
                        updateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJobFinded._id));
                    })
                    .catch((error) => {
                        Retour.error(`${error}`), res.status(500).json({ error: error.message });
                    });
            } else if (offerJobFindedSpontaneous) {
                offerJobFindedSpontaneous.set(req.body);
                offerJobFindedSpontaneous.history.push({
                    title: "Modification de l'offre",
                    date: new Date(),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: '',
                    comment: req.body.comment
                });
                return offerJobFindedSpontaneous
                    .save()
                    .then((offerJob) => res.status(200).json(offerJob))
                    .finally(() => {
                        updateOfferJobForSpontaneousExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJobFindedSpontaneous._id));
                    })
                    .catch((error) => {
                        Retour.error(`${error}`), res.status(500).json({ error: error.message });
                    });
            } else {
                Retour.error({ message: 'offer job was not found' });
                return res.status(400).json({ message: 'offer job was not found' });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

const deleteOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const offerFinded = await OfferJob.findById(req.params.offerJobId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const workStationFinded = await WorkStation.findOne({
            offerJobs: req.params.offerJobId
        }).select('offerJobs offerJobArchiveds');

        if (!offerFinded || !utilisateurFinded) {
            Retour.error(`'the offer job or utilisateur has been not found'`);
            return res.status(404).json({ error: 'the offer job or utilisateur has been not found' });
        } else {
            const { hasBeenTakenByOurServices, dateAboutOfferJobAlreadyTaken, offerJobComment } = req.body;
            if (!hasBeenTakenByOurServices) {
                Retour.warn("the hasBeenTakenByOurServices's value has been not found");
                return res.status(404).json({ error: "the hasBeenTakenByOurServices's value has been not found" });
            } else {
                if (offerFinded.usagerPositioned.length >= 1) {
                    Retour.warn('An usager is positioned on offer job');
                    return res.status(404).json({ error: 'An usager is positioned on offer job' });
                } else {
                    offerFinded.history.push({
                        title: `Offre déja pourvu par l'entreprise le ${new Date(
                            dateAboutOfferJobAlreadyTaken && dateAboutOfferJobAlreadyTaken
                        ).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`,
                        date: new Date(),
                        by: hasBeenTakenByOurServices === true ? JSON.stringify(utilisateurFinded._id) : "Par l'employeur",
                        for:
                            hasBeenTakenByOurServices === true
                                ? JSON.stringify(offerFinded.usagerPositioned)
                                : "Pour un(e) usager(e) sélectionné(e) l'employeur",
                        comment: offerJobComment
                    });
                    const archive = await axios.post(`${config.mongooseUrlArchived}/offerJob/create`, {
                        _id: offerFinded._id,
                        contractType: offerFinded.contractType,
                        numberHoursPerWeek: offerFinded.numberHoursPerWeek,
                        createdBy: offerFinded.createdBy,
                        offerName: offerFinded.offerName,
                        salary: Object(offerFinded).salary,
                        hasBeenTakenByOurServices,
                        status: `Offre déja pourvu par l'entreprise le ${new Date(
                            dateAboutOfferJobAlreadyTaken && dateAboutOfferJobAlreadyTaken
                        ).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`,
                        history: offerFinded.history,
                        usagerPositioned: hasBeenTakenByOurServices === true ? offerFinded.usagerPositioned : null,
                        usagerAcceptedByEntreprise: Object(offerFinded).usagerAcceptedByEntreprise,
                        usagerRefusedByEntreprise: Object(offerFinded).usagerRefusedByEntreprise,
                        usagerWhoAcceptedTheOfferJob: Object(offerFinded).usagerWhoAcceptedTheOfferJob,
                        usagerWhoRefusedTheOfferJob: Object(offerFinded).usagerWhoRefusedTheOfferJob,
                        jobInterviews: Object(offerFinded).jobInterviews,
                        decouvertes: Object(offerFinded).decouvertes,
                        employmentContracts: Object(offerFinded).employmentContracts
                    });
                    if (archive.data.message !== 'the offer job has been archived') {
                        Retour.warn('Something went wrong in BDD Archive');
                        return res.status(400).json('Something went wrong in BDD Archive');
                    } else {
                        const newArray = workStationFinded?.offerJobs.filter((el) => JSON.stringify(el) !== JSON.stringify(offerFinded._id));
                        Object(workStationFinded).offerJobs = newArray;
                        workStationFinded?.offerJobArchiveds.push(Object(offerFinded._id));
                        await workStationFinded?.save();
                        deleteOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), offerFinded._id);
                        await offerFinded.deleteOne();
                        Retour.info('The offer job has been archived');
                        return res.status(200).json({ message: 'The offer job has been archived' });
                    }
                }
            }
        }
    } catch (error) {
        console.error({ error: error });
        Retour.error(`${error}`);
        return res.status(500).json({ error: error });
    }
};
const offerJobProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            requesterId,
            usagerIsInterested,
            entrepriseIsInterested,
            usagerId,
            comment,
            dateOfJobInterview,
            startingDateOfDecouverte,
            endingDateOfDecouverte,
            startingDateEmploymentContract,
            endingDateEmploymentContract,
            contractType,
            numberHourPerWeek,
            tasksList,
            skillsList,
            endingTryPeriodeDate,
            continuityOfThepreviousContract,
            previousContractId
        } = req.body;

        const offerJobFinded = await OfferJob.findById(req.params.offerJobId);
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        const usagerFindedForPositioning = await Usager.findById(usagerId);
        const workStationFinded = await WorkStation.findOne({ offerJobs: offerJobFinded?._id });
        const entrepriseFinded = await Entreprise.findOne({ workStations: workStationFinded?._id });

        // Usager(e) positionné(e) trouvé(e) à partir de l'offre
        const usagerPositionnedFoundByOfferJobTab = await Usager.findOne({
            offerJobReceived: req.params.offerJobId
        }).select('offerJobReceived offerJobAccepted offerJobDenied jobInterviews decouvertes employmentContracts');
        // Usager qui intéragi avec l'offre
        const usagerFinded = await Usager.findById(requesterId);

        if (!offerJobFinded) {
            Retour.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        } else {
            if (
                (offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") === true &&
                    offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise sans dates définies") === false) ||
                offerJobFinded.status.includes("Entretien d'embauche prévu") === true
            ) {
                Retour.error(`The entreprise and the Usager(e) are already agree, please process next step`);
                return res.status(500).json({
                    message: 'The entreprise and the Usager(e) are already agree, please process next step'
                });
            } else {
                /**========================================================================
                 **                            SECTION UTILISATEUR
                 *========================================================================**/
                if (utilisateurFinded) {
                    // Si c'est un Utilisateur qui traite l'offre
                    // SI un Usager est deja positionnée sur l'offre d'emploi
                    if (!usagerPositionnedFoundByOfferJobTab) {
                        //*------------------------------------------------------- (ETAPE 1) Afin de soumettre l'offre à un(e) Usager(e) -------------------------------------------------------*/
                        if (usagerFindedForPositioning) {
                            offerJobFinded.usagerPositioned = Object(usagerFindedForPositioning);
                            offerJobFinded.status = `Offre soumise le ${new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`;
                            offerJobFinded.history.push({
                                title: 'Offre soumise',
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: usagerFindedForPositioning._id,
                                comment: comment
                            });
                            offerJobFinded.offerBlockedAutomaticaly = true;
                            offerJobFinded.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1));
                            UpdateOfferJobIn24h(offerJobFinded._id);
                            usagerFindedForPositioning.offerJobReceived.push(Object(offerJobFinded));
                            await offerJobFinded.save();
                            await usagerFindedForPositioning.save();
                            SmsSended("Bonjour, Nous avons une offre d'emploi à vous proposer", Object(usagerFindedForPositioning)._id);
                            return res.status(200).json({ message: 'Offer job submited' });
                        } else {
                            Retour.info('Offer job has been not submited');
                            return res.status(200).json({ message: 'Offer job has been not submited' });
                        }
                    } else {
                        if (
                            offerJobFinded.status.includes("Offre réservée par l'usager(e)") === true ||
                            offerJobFinded.status.includes('Offre soumise le') === true
                        ) {
                            //*------------------------------------------------------- (ETAPE 2) afin d'attribuer une date de rdv -------------------------------------------------------*/
                            const dateOfAppointment = req.body.dateOfAppointment;

                            if (dateOfAppointment !== undefined) {
                                Object(offerJobFinded).status = `Proposition prévue le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}`;

                                offerJobFinded.history.push({
                                    title: `Proposition prévue le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: usagerPositionnedFoundByOfferJobTab._id,
                                    comment: req.body.comment
                                });
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.usagerWhoAcceptedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                await offerJobFinded.save();
                                Retour.info('the date of the appointment has been submitted');
                                return res.status(200).json({ message: 'the date of the appointment has been submitted' });
                            } else if (usagerIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre refusée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByOfferJobTab?.offerJobDenied.push(Object(offerJobFinded));
                                await usagerPositionnedFoundByOfferJobTab.save();
                                await offerJobFinded.save();
                                SmsSended(
                                    "nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible",
                                    usagerPositionnedFoundByOfferJobTab?._id
                                );
                                Retour.warn('The usager is not interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is not interested about this offer job'
                                });
                            } else {
                                Retour.error("the date of the appointment or 'usagerIsInterested: false' is missing");
                                return res.status(400).json({
                                    message: "the date of the appointment or 'usagerIsInterested: false' is missing"
                                });
                            }
                            //*------------------------------------------------------- (ETAPE 3) Proposition de l'offre d'emploi à l'usager -------------------------------------------------------*/
                        } else if (offerJobFinded.status.includes('Proposition prévue le') === true) {
                            if (usagerIsInterested === true) {
                                // Si L'Utilisateur(ice) interagi(e) sur l'offre et que l'Usager est intéressé(e)
                                Object(offerJobFinded).status = "Proposition à l'entreprise";
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre acceptée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                usagerPositionnedFoundByOfferJobTab.offerJobAccepted.push(Object(offerJobFinded));
                                await usagerPositionnedFoundByOfferJobTab.save();
                                await offerJobFinded.save();
                                SmsSended(
                                    "l'offre d'emlpoi n°12345678 vous a été réservé nous reviendrons vers vous des que possible",
                                    usagerPositionnedFoundByOfferJobTab?._id
                                );
                                Retour.info('The usager is interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is interested about this offer job'
                                });
                            } else if (usagerIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre refusée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByOfferJobTab?.offerJobDenied.push(Object(offerJobFinded));
                                await usagerPositionnedFoundByOfferJobTab.save();
                                await offerJobFinded.save();
                                SmsSended(
                                    "nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible",
                                    usagerPositionnedFoundByOfferJobTab?._id
                                );
                                Retour.warn('The usager is not interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is not interested about this offer job'
                                });
                            } else {
                                Retour.error('usagerIsInterested for Utilisateur is missing');
                                return res.status(401).json({
                                    error: "'usagerIsInterested' about etape 3 is missing"
                                });
                            }
                            //*------------------------------------------------------- (ETAPE 4) Afin de donner une reponse favorable de l'entreprise -------------------------------------------------------*/
                        } else if (
                            offerJobFinded.status.includes("Proposition à l'entreprise") === true ||
                            offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise sans dates définies") === true
                        ) {
                            if (entrepriseIsInterested === true) {
                                if (usagerIsInterested === true) {
                                    /**============================================
                                     **               SECTION ENTRETIEN D'EMBAUCHE
                                     *=============================================**/
                                    if (dateOfJobInterview !== undefined) {
                                        offerJobFinded.status = `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString(
                                            'fr-FR',
                                            {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            }
                                        )}`;
                                        offerJobFinded.history.push({
                                            title: `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`,
                                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerPositionnedFoundByOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByOfferJobTab._id));
                                        const newJobInterview = new JobInterview({
                                            datePlanned: dateOfJobInterview,
                                            status: `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`,
                                            usager: Object(usagerPositionnedFoundByOfferJobTab._id),
                                            entreprise: Object(entrepriseFinded?._id)
                                        });
                                        offerJobFinded.jobInterviews.push(Object(newJobInterview));
                                        usagerPositionnedFoundByOfferJobTab.jobInterviews.push(Object(newJobInterview));
                                        await offerJobFinded.save();
                                        await newJobInterview.save();
                                        await usagerPositionnedFoundByOfferJobTab.save();
                                        createJobInterviewForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(offerJobFinded._id),
                                            Object(usagerPositionnedFoundByOfferJobTab._id),
                                            Object(entrepriseFinded?._id)
                                        );
                                        Retour.info('The entreprise are interested and would like a job intervew');
                                        return res.status(200).json({
                                            message: 'The entreprise are interested and would like a job intervew'
                                        });
                                    } else if (startingDateOfDecouverte !== undefined || endingDateOfDecouverte !== undefined) {
                                        /**============================================
                                         **               SECTION DÉCOUVERTE
                                         *=============================================**/
                                        if (startingDateOfDecouverte !== undefined && endingDateOfDecouverte !== undefined) {
                                            const newDecouverte = new Decouverte({
                                                isFromAnEvent: false,
                                                jobName: offerJobFinded.offerName,
                                                startingDate: startingDateOfDecouverte,
                                                endingDate: endingDateOfDecouverte,
                                                entreprise: Object(entrepriseFinded?._id),
                                                usager: Object(usagerPositionnedFoundByOfferJobTab._id)
                                            });
                                            offerJobFinded.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString(
                                                'fr-FR',
                                                {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                }
                                            )} au ${new Date(endingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            offerJobFinded.history.push({
                                                title: `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })} au ${new Date(endingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`,
                                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                for: usagerPositionnedFoundByOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.decouvertes.push(Object(newDecouverte));
                                            usagerPositionnedFoundByOfferJobTab.decouvertes.push(Object(newDecouverte));
                                            await newDecouverte.save();
                                            await offerJobFinded.save();
                                            await usagerPositionnedFoundByOfferJobTab.save();
                                            createDecouverteForExtracting(
                                                Object(utilisateurFinded.datas[0].mounths[0]),
                                                Object(newDecouverte._id),
                                                Object(usagerPositionnedFoundByOfferJobTab.id),
                                                Object(entrepriseFinded?._id)
                                            );
                                            Retour.info('entreprise are interested about a decouverte');
                                            return res.status(200).json({
                                                message: 'entreprise are interested about a decouverte'
                                            });
                                        } else {
                                            Retour.warn("entreprise are interested about a decouverte but starting's or ending's date is missing");
                                            return res.status(200).json({
                                                message: "entreprise are interested about a decouverte but starting's or ending's date is missing"
                                            });
                                        }
                                    } else if (startingDateEmploymentContract !== undefined) {
                                        /**============================================
                                         **               SECTION CONTRAT DE TRAVAIL
                                         *=============================================**/
                                        if (continuityOfThepreviousContract === true && !previousContractId) {
                                            Retour.info('PreviousContractId is missing');
                                            return res.status(200).json({ message: 'PreviousContractId is missing' });
                                        } else {
                                            const newContract = await new EmploymentContract({
                                                contractType: contractType,
                                                workName: offerJobFinded.offerName,
                                                numberOfHour: numberHourPerWeek,
                                                tasksList,
                                                skillsList,
                                                startingDate: startingDateEmploymentContract,
                                                endingDate: endingDateEmploymentContract && endingDateEmploymentContract,
                                                endingTryPeriodeDate,
                                                continuityOfThepreviousContract,
                                                previousContract: previousContractId && Object(previousContractId),
                                                usager: Object(usagerPositionnedFoundByOfferJobTab._id),
                                                entreprise: Object(entrepriseFinded)._id
                                            });
                                            offerJobFinded.status = `Démarrage du contrat prevu le ${new Date(
                                                startingDateEmploymentContract
                                            ).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            offerJobFinded.history.push({
                                                title: `Démarrage du contrat prevu le ${new Date(startingDateEmploymentContract).toLocaleDateString(
                                                    'fr-FR',
                                                    {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    }
                                                )}`,
                                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                for: usagerPositionnedFoundByOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.employmentContracts.push(Object(newContract._id));
                                            usagerPositionnedFoundByOfferJobTab.employmentContracts.push(Object(newContract._id));
                                            createEmploymentContractForExtracting(
                                                Object(utilisateurFinded.datas[0].mounths[0]),
                                                Object(newContract._id),
                                                Object(usagerPositionnedFoundByOfferJobTab._id),
                                                Object(entrepriseFinded?._id)
                                            );
                                            await newContract.save();
                                            await usagerPositionnedFoundByOfferJobTab.save();
                                            await offerJobFinded.save();
                                            Retour.info('Employment contract has been created');
                                            return res.status(200).json({
                                                message: 'Employment contract has been created'
                                            });
                                        }
                                    } else {
                                        offerJobFinded.status = `Usager(e) accepté(e) par l'entreprise sans dates définies`;
                                        offerJobFinded.history.push({
                                            title: `Usager(e) accepté(e) par l'entreprise sans dates définies`,
                                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerPositionnedFoundByOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByOfferJobTab._id));
                                        await offerJobFinded.save();
                                        Retour.info(
                                            'entreprise is interested but without date of job interview or decouverte or employment contract'
                                        );
                                        return res.status(200).json({
                                            message: 'entreprise is interested but without date of job interview or decouverte or employment contract'
                                        });
                                    }
                                } else if (usagerIsInterested === false) {
                                    // Si l'usager(e) n'est plus intéressé(e) alors qu'il/elle a quand meme été proposé(e) a l'entreprise
                                    offerJobFinded.status = 'Disponible';
                                    offerJobFinded.history.push({
                                        title: `Usager(e) accepté(e) par l'entreprise mais l'usager(e) n'est plus intéressé(e)`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: usagerPositionnedFoundByOfferJobTab._id,
                                        comment: req.body.comment
                                    });
                                    const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter(
                                        (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab?._id)
                                    );
                                    Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                    offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                    const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter(
                                        (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                    );
                                    Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                    await offerJobFinded.save();
                                    await usagerPositionnedFoundByOfferJobTab.save();
                                    Retour.info('entreprise is interested but the Usager is not anymore');
                                    return res.status(200).json({
                                        message: 'entreprise is interested but the Usager is not anymore'
                                    });
                                } else {
                                    Retour.error('entreprise is interested but the UsagerIsInterested is missing');
                                    return res.status(400).json({
                                        message: 'entreprise is interested but the UsagerIsInterested is missing'
                                    });
                                }
                                //*------------------------------------------------------- (ETAPE 4) Afin de donner une reponse defavorable de l'entreprise -------------------------------------------------------*/
                            } else if (entrepriseIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Usager(e) refusé(e) par l'Entreprise",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                offerJobFinded.usagerRefusedByEntreprise.push(Object(usagerPositionnedFoundByOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                await usagerPositionnedFoundByOfferJobTab.save();
                                await offerJobFinded.save();
                                Retour.info('entreprise is not interested');
                                return res.status(200).json({ message: 'entreprise is not interested' });
                            } else {
                                Retour.error('entrepriseIsInterested has been not found');
                                return res.status(404).json({ error: 'entrepriseIsInterested has been not found' });
                            }
                        } else {
                            Retour.error('The entreprise and the usager are already agree');
                            return res.status(401).json({ error: 'The entreprise and the usager are already agree' });
                        }
                    }

                    /**========================================================================
                     **                            SECTION USAGER
                     *========================================================================**/
                } else if (usagerFinded) {
                    //*------------------------------------------------------- (ETAPE 1) Si c'est un Usager(e) qui traite l'offre -------------------------------------------------------*/
                    // o-o-o Il peut seulement réserver l'offre pour lui (pour l'instant) o-o-o
                    //
                    // Si l'offre d'emploi lui est réservée
                    if (JSON.stringify(usagerPositionnedFoundByOfferJobTab?._id) === JSON.stringify(usagerFinded?._id)) {
                        // Si le statut de l'offre d'emploi est "en proposition à l'entreprise"
                        // --------- HAUT DE SECTION RRESERVER POUR LA SUITE ------------
                        // if (offerJobFinded.status.includes('Proposé') !== true || offerJobFinded.status.includes('autopositionné') !== true) {
                        //     Retour.error('The process is already started');
                        //     return res.status(401).json({ error: 'The process is already started' });
                        // } else {
                        //     if (usagerIsInterested === true) {
                        //         // Si l'Usagerest intéressé par l'offre d'emploi
                        //         Object(offerJobFinded).status = "Proposition à l'entreprise";
                        //         offerJobFinded.offerBlockedAutomaticaly = false;
                        //         offerJobFinded.history.push({
                        //             title: "Offre acceptée par l'Usager",
                        //             date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        //             by: Object(usagerPositionnedFoundByOfferJobTab)._id,
                        //             for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                        //             comment: req.body.comment
                        //         });
                        //         Object(usagerPositionnedFoundByOfferJobTab).offerJobAccepted.push(Object(offerJobFinded));
                        //         await Object(usagerPositionnedFoundByOfferJobTab).save();
                        //         await offerJobFinded.save();
                        //         SmsSended("l'offre d'emlpoi n°12345678 à bien été acceptée", usagerFinded?._id);
                        //         Retour.info("l'offre d'emlpoi n°12345678 à bien été acceptée");
                        //         return res.status(200).json({ message: "l'offre d'emlpoi n°12345678 à bien été acceptée" });
                        //     } else if (usagerIsInterested === false) {
                        //         // Si l'Usager n'est pas intéréssé par l'offre d'emploi
                        //         Object(offerJobFinded).status = 'Disponible';
                        //         offerJobFinded.offerBlockedAutomaticaly = false;
                        //         offerJobFinded.history.push({
                        //             title: "Offre refusée par l'Usager",
                        //             date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        //             by: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                        //             for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                        //             comment: req.body.comment
                        //         });
                        //         const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab?._id));
                        //         Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                        //         offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                        //         const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab?.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id));
                        //         Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                        //         usagerPositionnedFoundByOfferJobTab?.offerJobDenied.push(Object(offerJobFinded));
                        //         await Object(usagerPositionnedFoundByOfferJobTab).save();
                        //         await offerJobFinded.save();
                        //         SmsSended("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByOfferJobTab?._id);
                        //         Retour.info('The usager is not interested about this offer job');
                        //         return res.status(200).json({ message: 'The usager is not interested about this offer job' });
                        //     } else {
                        //         Retour.error('usagerIsInterested for Usager is missing');
                        //         return res.status(401).json({ error: 'usagerIsInterested for Usager is missing' });
                        //     }
                        // }
                        // --------- BAS DE SECTION RRESERVER POUR LA SUITE ------------
                        Retour.error("fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter");
                        return res.status(200).json({
                            message: "fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter"
                        });
                    } else {
                        // Si l'offre d'emploi est disponible
                        if (Object(offerJobFinded).usagerPositioned.length !== 0) {
                            Retour.warn("(non autorisé) usager(e) déja positionné(e) sur l'offre");
                            return res.status(401).json({ message: "(non autorisé) usager(e) deja positionné(e) sur l'offre" });
                        } else {
                            if (usagerIsInterested === false) {
                                Retour.warn("Usager(e) pas intéressé(e) par l'offre d'emploi");
                                return res.status(400).json({
                                    message: "Usager(e) pas intéressé(e) par l'offre d'emploi"
                                });
                            } else if (usagerIsInterested === true) {
                                offerJobFinded.usagerPositioned.push(Object(usagerFinded));
                                offerJobFinded.status = `Offre réservée par l'usager(e)`;
                                offerJobFinded.history.push({
                                    title: "Offre réservée par l'usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                    for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                    comment: comment
                                });
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                usagerFinded.offerJobReceived.push(Object(offerJobFinded));
                                await offerJobFinded.save();
                                await usagerFinded.save();
                                SmsSended(
                                    "Bonjour, l'ofre N° 123456789 à bien été réservée nous reviendrons vers vous pour plus d'informations",
                                    Object(usagerFinded)._id
                                );
                                Retour.info("Le positionnement a l'offre d'emploi n°12345678 à bien été acceptée");
                                return res.status(200).json({
                                    message: "Le positionnement a l'offre d'emploi n°12345678 à bien été acceptée"
                                });
                            } else {
                                Retour.error("usagerIsInterested pour que l'Usager(e) se positionne is missing");
                                return res.status(404).json({
                                    error: "usagerIsInterested pour que l'Usager(e) se positionne is missing"
                                });
                            }
                        }
                    }
                } else {
                    Retour.error('requester has been not found');
                    return res.status(404).json({ error: 'requester has been not found' });
                }
            }
        }
    } catch (error) {
        console.error({ message: 'Error catched', error: error });
        Retour.error(`Error catched -> ${error}`);
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

export default {
    createOfferJob,
    createOfferJobSpontaneous,
    readOfferJob,
    readAll,
    updateOfferJob,
    deleteOfferJob,
    offerJobProcess
};
