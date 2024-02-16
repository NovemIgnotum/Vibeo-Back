import { NextFunction, Request, Response } from 'express';

// Models
import EventOfferJob from '../models/EventOfferJob';
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
    createEventOfferJobForExtracting,
    readEventOfferJobForExtracting,
    updateEventOfferJobForExtracting,
    deleteEventOfferJobForExtracting
} from '../functions/EventOfferJobData';
import { createJobInterviewForExtracting } from '../functions/JobInterview';
import { UpdateEventOfferJobIn24h } from '../functions/UpdateEventOfferJobAtTime';
import { createDecouverteForExtracting } from '../functions/DecouverteData';
import { createEmploymentContractForExtracting } from '../functions/EmploymentContract';

// Library
import Retour from '../library/Response';
import SmsSended from '../library/SendSms';
import axios from 'axios';
import config from '../config/config';

const createEventOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary } = req.body;
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
                const eventOfferJob = new EventOfferJob({
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

                usagerFinded && usagerFinded.offerJobReceived.push(Object(eventOfferJob._id));
                usagerFinded && eventOfferJob.usagerPositioned.push(Object(usagerFinded));
                usagerFinded &&
                    eventOfferJob.history.push({
                        title: 'Offre soumise',
                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        for: usagerFinded._id,
                        comment: req.body.comment
                    });
                usagerFinded ? (eventOfferJob.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1))) : null;
                usagerFinded ? (eventOfferJob.offerBlockedAutomaticaly = true) : (eventOfferJob.offerBlockedAutomaticaly = false);
                usagerFinded && UpdateEventOfferJobIn24h(eventOfferJob._id);
                workStationFinded.eventOfferJobs.push(Object(eventOfferJob._id));
                createEventOfferJobForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(eventOfferJob._id));
                await eventOfferJob.save();
                usagerFinded && (await usagerFinded.save());
                await workStationFinded.save();
                Retour.info('the offer job has been created');
                return res.status(201).json({ message: 'the offer job has been created' });
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
};

const readEventOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventOfferJobId = req.params.eventOfferJobId;
        const eventOfferJobFinded = await EventOfferJob.findById(eventOfferJobId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const partenaireFinded = await Partenaire.findById(req.headers.requesterid);
        const usagerFinded = await Usager.findById(req.headers.requesterid);
        const interlocutorFinded = await Interlocutor.findById(req.headers.requesterid);

        if (!eventOfferJobFinded) {
            Retour.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        } else {
            if (!utilisateurFinded && !partenaireFinded && !usagerFinded && !interlocutorFinded) {
                Retour.error('The requester has been not found');
                return res.status(404).json({ error: 'The requester has been not found' });
            } else {
                const creatorFinded = await Utilisateur.findById(eventOfferJobFinded?.createdBy).select('account');
                eventOfferJobFinded.history.push({
                    title: "Consultation de l'offre",
                    date: new Date(),
                    by:
                        (utilisateurFinded && utilisateurFinded._id) ||
                        (partenaireFinded && partenaireFinded._id) ||
                        (usagerFinded && usagerFinded._id) ||
                        (interlocutorFinded && interlocutorFinded._id),
                    for: '',
                    comment: req.body.comment
                });
                await eventOfferJobFinded.save();
                Object(eventOfferJobFinded).createdBy = creatorFinded;

                utilisateurFinded && readEventOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(eventOfferJobId));
                partenaireFinded && readEventOfferJobForExtracting(Object(partenaireFinded?.datas[0].mounths[0]), Object(eventOfferJobId));
                usagerFinded && readEventOfferJobForExtracting(Object(usagerFinded?.datas[0].mounths[0]), Object(eventOfferJobId));
                interlocutorFinded && readEventOfferJobForExtracting(Object(interlocutorFinded?.datas[0].mounths[0]), Object(eventOfferJobId));
                Retour.info('An offer job has been created');
                return res.status(200).json({ message: 'The offer job has been found', eventOfferJob: eventOfferJobFinded });
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error(`${error}`);
        return res.status(500).json({ message: 'error catched', error: error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return WorkStation.findOne({ _id: req.params.workStationId })
        .populate('eventOfferJobs')
        .then((workStation) => {
            if (!workStation) {
                Retour.warn('the work station has been not found');
                return res.status(404).json('the work station has been not found');
            } else {
                Retour.info(`Event job offers from ${workStation._id} has been readed`);
                return res.status(200).json({ count: workStation?.eventOfferJobs.length, eventOfferJobs: workStation?.eventOfferJobs });
            }
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateEventOfferJob = (req: Request, res: Response, next: NextFunction) => {
    const eventOfferJobId = req.params.eventOfferJobId;
    return EventOfferJob.findById(eventOfferJobId).then(async (eventOfferJob) => {
        if (!eventOfferJob) {
            return res.status(404).json({ message: 'The offer job from event was not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                eventOfferJob.set(req.body);
                eventOfferJob.history.push({
                    title: "Modification de l'offre",
                    date: new Date(),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: '',
                    comment: req.body.comment
                });
                return eventOfferJob
                    .save()
                    .then((eventOfferJob) => res.status(200).json({ eventOfferJob: eventOfferJob }))
                    .finally(() => {
                        updateEventOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(eventOfferJob._id));
                    })
                    .catch((error) => {
                        Retour.error(`${error}`), res.status(500).json({ error: error.message });
                    });
            }
        }
    });
};

const deleteEventOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const offerFinded = await EventOfferJob.findById(req.params.eventOfferJobId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const workStationFinded = await WorkStation.findOne({
            eventOfferJobs: req.params.eventOfferJobId
        }).select('eventOfferJobs eventOfferJobArchiveds');

        if (!offerFinded || !utilisateurFinded) {
            Retour.error(`'the offer job or utilisateur has been not found'`);
            return res.status(404).json({ error: 'the offer job or utilisateur has been not found' });
        } else {
            const { hasBeenTakenByOurServices, dateAboutEventOfferJobAlreadyTaken, eventOfferJobComment } = req.body;
            if (!hasBeenTakenByOurServices && !dateAboutEventOfferJobAlreadyTaken) {
                return res.status(404).json({ error: "the hasBeenTakenByOurServices's value has been not found" });
            } else {
                if (offerFinded.usagerPositioned.length >= 1) {
                    return res.status(404).json({ error: 'An usager is positioned on offer job' });
                } else {
                    offerFinded.history.push({
                        title: `Offre déja pourvu par l'entreprise le ${new Date(
                            dateAboutEventOfferJobAlreadyTaken && dateAboutEventOfferJobAlreadyTaken
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
                        comment: eventOfferJobComment
                    });

                    const archived = await axios.post(`${config.mongooseUrlArchived}/eventOfferJob/create/`, {
                        _id: offerFinded._id,
                        contractType: offerFinded.contractType,
                        numberHoursPerWeek: offerFinded.numberHoursPerWeek,
                        createdBy: offerFinded.createdBy,
                        offerName: offerFinded.offerName,
                        salary: Object(offerFinded).salary,
                        hasBeenTakenByOurServices,
                        status: `Offre déja pourvu par l'entreprise le ${new Date(
                            dateAboutEventOfferJobAlreadyTaken && dateAboutEventOfferJobAlreadyTaken
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
                        usagerWhoAcceptedTheEventOfferJob: Object(offerFinded).usagerWhoAcceptedTheEventOfferJob,
                        usagerWhoRefusedTheEventOfferJob: Object(offerFinded).usagerWhoRefusedTheEventOfferJob,
                        jobInterviews: Object(offerFinded).jobInterviews,
                        decouvertes: Object(offerFinded).decouvertes,
                        employmentContracts: Object(offerFinded).employmentContracts
                    });
                    if (archived.data.message === 'the offer job has been archived') {
                        const newArray = workStationFinded?.eventOfferJobs.filter((el) => JSON.stringify(el) !== JSON.stringify(offerFinded._id));
                        Object(workStationFinded).eventOfferJobs = newArray;
                        workStationFinded?.eventOfferJobArchiveds.push(Object(offerFinded._id));
                        await workStationFinded?.save();
                        deleteEventOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), offerFinded._id);
                        await offerFinded.deleteOne();
                        Retour.info('The offer job has been archived');
                        return res.status(200).json({ message: 'The offer job has been archived' });
                    } else {
                        Retour.error('Something went wrong in Archive');
                        return res.status(200).json({ message: 'Something went wrong in Archive' });
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

const eventOfferJobProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            requesterId,
            usagerIsInterested,
            usagerPositionnedId,
            usagerIdWhoRefusedTheOfferJob,
            usagerIdWhoAcceptTheOfferJob,
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

        const eventOfferJobFinded = await EventOfferJob.findById(req.params.eventOfferJobId);
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        const workStationFinded = await WorkStation.findOne({ eventOfferJobs: eventOfferJobFinded?._id });
        const entrepriseFinded = await Entreprise.findOne({ workStations: workStationFinded?._id });
        // L'usager qui accepete ou refuse l'offre d'emploi
        const usagerWhoRefusedTheOfferJob = await Usager.findById(usagerIdWhoRefusedTheOfferJob);
        const usagerWhoAcceptTheOfferJob = await Usager.findById(usagerIdWhoAcceptTheOfferJob);

        // Usager(e) positionné(e) trouvé(e) à partir de l'offre
        const usagerPositionnedFoundByEventOfferJobTab = await Usager.findById(usagerPositionnedId);
        // Usager qui intéragi avec l'offre
        const usagerFinded = await Usager.findById(usagerId);

        if (!eventOfferJobFinded) {
            Retour.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        } else {
            if (
                eventOfferJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") === true ||
                eventOfferJobFinded.status.includes("Entretien d'embauche prévu") === true
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
                    //*------------------------------------------------------- (ETAPE 1) Afin de soumettre l'offre à un(e) Usager(e) -------------------------------------------------------*/
                    if (usagerFinded) {
                        eventOfferJobFinded.usagerPositioned.push(Object(usagerFinded));
                        eventOfferJobFinded.history.push({
                            title: `Offre soumise a ${usagerFinded.account.male === true ? 'Mr' : 'Mme'} ${usagerFinded.account.name.toUpperCase()} ${
                                usagerFinded.account.firstname
                            }`,
                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: usagerFinded._id,
                            comment: comment
                        });
                        eventOfferJobFinded.offerBlockedAutomaticaly = true;
                        eventOfferJobFinded.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1));
                        UpdateEventOfferJobIn24h(eventOfferJobFinded._id);
                        usagerFinded.offerJobReceived.push(Object(eventOfferJobFinded));
                        await eventOfferJobFinded.save();
                        await usagerFinded.save();
                        SmsSended("Bonjour, Nous avons une offre d'emploi à vous proposer", Object(usagerFinded)._id);
                        return res.status(200).json({ message: 'Offer job submited' });
                    } else if (
                        eventOfferJobFinded.status.includes("Offre réservée par l'usager(e)") === true ||
                        eventOfferJobFinded.status.includes('Offre soumise le') === true
                    ) {
                        //*------------------------------------------------------- (ETAPE 2) afin d'attribuer une date de rdv -------------------------------------------------------*/
                        const dateOfAppointment = req.body.dateOfAppointment;

                        if (dateOfAppointment !== undefined) {
                            Object(eventOfferJobFinded).status = `Proposition prévue le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`;

                            eventOfferJobFinded.history.push({
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
                                for: usagerPositionnedFoundByEventOfferJobTab?._id,
                                comment: req.body.comment
                            });
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.usagerWhoAcceptedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            await eventOfferJobFinded.save();
                            Retour.info('the date of the appointment has been submitted');
                            return res.status(200).json({ message: 'the date of the appointment has been submitted' });
                        } else if (usagerIsInterested === false) {
                            Object(eventOfferJobFinded).status = 'Disponible';
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Offre refusée par l'Usager(e)",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter(
                                (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab?._id)
                            );
                            Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                            eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab?.offerJobReceived.filter(
                                (el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded?._id)
                            );
                            Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                            usagerPositionnedFoundByEventOfferJobTab?.offerJobDenied.push(Object(eventOfferJobFinded));
                            await usagerPositionnedFoundByEventOfferJobTab?.save();
                            await eventOfferJobFinded.save();
                            SmsSended(
                                "nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible",
                                usagerPositionnedFoundByEventOfferJobTab?._id
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
                    } else if (eventOfferJobFinded.status.includes('Proposition prévue le') === true) {
                        if (usagerIsInterested === true) {
                            // Si L'Utilisateur(ice) interagi(e) sur l'offre et que l'Usager est intéressé(e)
                            Object(eventOfferJobFinded).status = "Proposition à l'entreprise";
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Offre acceptée par l'Usager(e)",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            usagerPositionnedFoundByEventOfferJobTab?.offerJobAccepted.push(Object(eventOfferJobFinded));
                            await usagerPositionnedFoundByEventOfferJobTab?.save();
                            await eventOfferJobFinded.save();
                            SmsSended(
                                "l'offre d'emlpoi n°12345678 vous a été réservé nous reviendrons vers vous des que possible",
                                usagerPositionnedFoundByEventOfferJobTab?._id
                            );
                            Retour.info('The usager is interested about this offer job');
                            return res.status(200).json({
                                message: 'The usager is interested about this offer job'
                            });
                        } else if (usagerIsInterested === false) {
                            Object(eventOfferJobFinded).status = 'Disponible';
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Offre refusée par l'Usager(e)",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter(
                                (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab?._id)
                            );
                            Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                            eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab?.offerJobReceived.filter(
                                (el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded?._id)
                            );
                            Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                            usagerPositionnedFoundByEventOfferJobTab?.offerJobDenied.push(Object(eventOfferJobFinded));
                            await usagerPositionnedFoundByEventOfferJobTab?.save();
                            await eventOfferJobFinded.save();
                            SmsSended(
                                "nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible",
                                usagerPositionnedFoundByEventOfferJobTab?._id
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
                    } else if (eventOfferJobFinded.status.includes("Proposition à l'entreprise") === true) {
                        if (entrepriseIsInterested === true) {
                            if (usagerIsInterested === true) {
                                /**============================================
                                 **               SECTION ENTRETIEN D'EMBAUCHE
                                 *=============================================**/
                                if (dateOfJobInterview !== undefined) {
                                    eventOfferJobFinded.status = `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString(
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
                                    eventOfferJobFinded.history.push({
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
                                        for: usagerPositionnedFoundByEventOfferJobTab?._id,
                                        comment: req.body.comment
                                    });
                                    eventOfferJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByEventOfferJobTab?._id));
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
                                        usager: Object(usagerPositionnedFoundByEventOfferJobTab?._id),
                                        entreprise: Object(entrepriseFinded?._id)
                                    });
                                    eventOfferJobFinded.jobInterviews.push(Object(newJobInterview));
                                    usagerPositionnedFoundByEventOfferJobTab?.jobInterviews.push(Object(newJobInterview));
                                    await eventOfferJobFinded.save();
                                    await newJobInterview.save();
                                    await usagerPositionnedFoundByEventOfferJobTab?.save();
                                    createJobInterviewForExtracting(
                                        Object(utilisateurFinded.datas[0].mounths[0]),
                                        Object(eventOfferJobFinded._id),
                                        Object(usagerPositionnedFoundByEventOfferJobTab?._id),
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
                                            jobName: eventOfferJobFinded.offerName,
                                            startingDate: startingDateOfDecouverte,
                                            endingDate: endingDateOfDecouverte,
                                            entreprise: Object(entrepriseFinded?._id),
                                            usager: Object(usagerPositionnedFoundByEventOfferJobTab?._id)
                                        });
                                        eventOfferJobFinded.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString(
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
                                        eventOfferJobFinded.history.push({
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
                                            for: usagerPositionnedFoundByEventOfferJobTab?._id,
                                            comment: req.body.comment
                                        });
                                        eventOfferJobFinded.decouvertes.push(Object(newDecouverte));
                                        usagerPositionnedFoundByEventOfferJobTab?.decouvertes.push(Object(newDecouverte));
                                        await newDecouverte.save();
                                        await eventOfferJobFinded.save();
                                        await usagerPositionnedFoundByEventOfferJobTab?.save();
                                        createDecouverteForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(newDecouverte._id),
                                            Object(usagerPositionnedFoundByEventOfferJobTab?.id),
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
                                            workName: eventOfferJobFinded.offerName,
                                            numberOfHour: numberHourPerWeek,
                                            tasksList,
                                            skillsList,
                                            startingDate: startingDateEmploymentContract,
                                            endingDate: endingDateEmploymentContract && endingDateEmploymentContract,
                                            endingTryPeriodeDate,
                                            continuityOfThepreviousContract,
                                            previousContract: previousContractId && Object(previousContractId),
                                            usager: Object(usagerPositionnedFoundByEventOfferJobTab?._id),
                                            entreprise: Object(entrepriseFinded)._id
                                        });
                                        eventOfferJobFinded.status = `Démarrage du contrat prevu le ${new Date(
                                            startingDateEmploymentContract
                                        ).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`;
                                        eventOfferJobFinded.history.push({
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
                                            for: usagerPositionnedFoundByEventOfferJobTab?._id,
                                            comment: req.body.comment
                                        });
                                        eventOfferJobFinded.employmentContracts.push(Object(newContract._id));
                                        usagerPositionnedFoundByEventOfferJobTab?.employmentContracts.push(Object(newContract._id));
                                        createEmploymentContractForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(newContract._id),
                                            Object(usagerPositionnedFoundByEventOfferJobTab?._id),
                                            Object(entrepriseFinded?._id)
                                        );
                                        await newContract.save();
                                        await usagerPositionnedFoundByEventOfferJobTab?.save();
                                        await eventOfferJobFinded.save();
                                        Retour.info('Employment contract has been created');
                                        return res.status(200).json({
                                            message: 'Employment contract has been created'
                                        });
                                    }
                                } else {
                                    eventOfferJobFinded.status = `Usager(e) accepté(e) par l'entreprise sans dates définies`;
                                    eventOfferJobFinded.history.push({
                                        title: `Usager(e) accepté(e) par l'entreprise sans dates définies`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: usagerPositionnedFoundByEventOfferJobTab?._id,
                                        comment: req.body.comment
                                    });
                                    eventOfferJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByEventOfferJobTab?._id));
                                    await eventOfferJobFinded.save();
                                    Retour.info('entreprise is interested but without date of job interview or decouverte or employment contract');
                                    return res.status(200).json({
                                        message: 'entreprise is interested but without date of job interview or decouverte or employment contract'
                                    });
                                }
                            } else if (usagerIsInterested === false) {
                                // Si l'usager(e) n'est plus intéressé(e) alors qu'il/elle a quand meme été proposé(e) a l'entreprise
                                eventOfferJobFinded.status = 'Disponible';
                                eventOfferJobFinded.history.push({
                                    title: `Usager(e) accepté(e) par l'entreprise mais l'usager(e) n'est plus intéressé(e)`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: usagerPositionnedFoundByEventOfferJobTab?._id,
                                    comment: req.body.comment
                                });
                                const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab?._id)
                                );
                                Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                                eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab?.offerJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                                await eventOfferJobFinded.save();
                                await usagerPositionnedFoundByEventOfferJobTab?.save();
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
                            Object(eventOfferJobFinded).status = 'Disponible';
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Usager(e) refusé(e) par l'Entreprise",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter(
                                (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab?._id)
                            );
                            Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                            eventOfferJobFinded.usagerRefusedByEntreprise.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab?.offerJobReceived.filter(
                                (el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded?._id)
                            );
                            Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                            await usagerPositionnedFoundByEventOfferJobTab?.save();
                            await eventOfferJobFinded.save();
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

                    /**========================================================================
                     **                            SECTION USAGER
                     *========================================================================**/
                } else if (usagerFinded) {
                    //*------------------------------------------------------- (ETAPE 1) Si c'est un Usager(e) qui traite l'offre -------------------------------------------------------*/
                    // o-o-o Il peut seulement réserver l'offre pour lui (pour l'instant) o-o-o
                    //
                    // Si l'offre d'emploi lui est réservée
                    if (JSON.stringify(usagerPositionnedFoundByEventOfferJobTab?._id) === JSON.stringify(usagerFinded?._id)) {
                        // Si le statut de l'offre d'emploi est "en proposition à l'entreprise"
                        // --------- HAUT DE SECTION RRESERVER POUR LA SUITE ------------
                        // if (eventOfferJobFinded.status.includes('Proposé') !== true || eventOfferJobFinded.status.includes('autopositionné') !== true) {
                        //     Retour.error('The process is already started');
                        //     return res.status(401).json({ error: 'The process is already started' });
                        // } else {
                        //     if (usagerIsInterested === true) {
                        //         // Si l'Usagerest intéressé par l'offre d'emploi
                        //         Object(eventOfferJobFinded).status = "Proposition à l'entreprise";
                        //         eventOfferJobFinded.offerBlockedAutomaticaly = false;
                        //         eventOfferJobFinded.history.push({
                        //             title: "Offre acceptée par l'Usager",
                        //             date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        //             by: Object(usagerPositionnedFoundByEventOfferJobTab)._id,
                        //             for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                        //             comment: req.body.comment
                        //         });
                        //         Object(usagerPositionnedFoundByEventOfferJobTab).offerJobAccepted.push(Object(eventOfferJobFinded));
                        //         await Object(usagerPositionnedFoundByEventOfferJobTab).save();
                        //         await eventOfferJobFinded.save();
                        //         SmsSended("l'offre d'emlpoi n°12345678 à bien été acceptée", usagerFinded?._id);
                        //         Retour.info("l'offre d'emlpoi n°12345678 à bien été acceptée");
                        //         return res.status(200).json({ message: "l'offre d'emlpoi n°12345678 à bien été acceptée" });
                        //     } else if (usagerIsInterested === false) {
                        //         // Si l'Usager n'est pas intéréssé par l'offre d'emploi
                        //         Object(eventOfferJobFinded).status = 'Disponible';
                        //         eventOfferJobFinded.offerBlockedAutomaticaly = false;
                        //         eventOfferJobFinded.history.push({
                        //             title: "Offre refusée par l'Usager",
                        //             date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        //             by: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                        //             for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                        //             comment: req.body.comment
                        //         });
                        //         const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab?._id));
                        //         Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                        //         eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                        //         console.log('The usager is not interested about this offer job');
                        //         const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab?.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded?._id));
                        //         Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                        //         usagerPositionnedFoundByEventOfferJobTab?.offerJobDenied.push(Object(eventOfferJobFinded));
                        //         await Object(usagerPositionnedFoundByEventOfferJobTab).save();
                        //         await eventOfferJobFinded.save();
                        //         SmsSended("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByEventOfferJobTab?._id);
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
                        if (Object(eventOfferJobFinded).usagerPositioned.length !== 0) {
                            Retour.warn("(non autorisé) usager(e) déja positionné(e) sur l'offre");
                            return res.status(401).json({ message: "usager(e) deja positionné(e) sur l'offre" });
                        } else {
                            if (usagerIsInterested === false) {
                                Retour.warn("Usager(e) pas intéressé(e) par l'offre d'emploi");
                                return res.status(400).json({
                                    message: "Usager(e) pas intéressé(e) par l'offre d'emploi"
                                });
                            } else if (usagerIsInterested === true) {
                                eventOfferJobFinded.usagerPositioned.push(Object(usagerFinded));
                                eventOfferJobFinded.status = `Offre réservée par l'usager(e)`;
                                eventOfferJobFinded.history.push({
                                    title: "Offre réservée par l'usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                    for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                    comment: comment
                                });
                                eventOfferJobFinded.offerBlockedAutomaticaly = false;
                                usagerFinded.offerJobReceived.push(Object(eventOfferJobFinded));
                                await eventOfferJobFinded.save();
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
    createEventOfferJob,
    readEventOfferJob,
    readAll,
    updateEventOfferJob,
    deleteEventOfferJob,
    eventOfferJobProcess
};
