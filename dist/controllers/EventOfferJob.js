"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventOfferJob_1 = __importDefault(require("../models/EventOfferJob"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const JobInterview_1 = __importDefault(require("../models/JobInterview"));
const Decouverte_1 = __importDefault(require("../models/Decouverte"));
const EmploymentContract_1 = __importDefault(require("../models/EmploymentContract"));
const EventOfferJobData_1 = require("../functions/EventOfferJobData");
const JobInterview_2 = require("../functions/JobInterview");
const UpdateEventOfferJobAtTime_1 = require("../functions/UpdateEventOfferJobAtTime");
const DecouverteData_1 = require("../functions/DecouverteData");
const EmploymentContract_2 = require("../functions/EmploymentContract");
const Response_1 = __importDefault(require("../library/Response"));
const SendSms_1 = __importDefault(require("../library/SendSms"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const createEventOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary } = req.body;
        const workStationFinded = yield WorkStation_1.default.findById(req.params.workStationId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(req.body.usagerId);
        if (!workStationFinded || !utilisateurFinded) {
            Response_1.default.error('The utilisateur or the entreprise has been not found');
            return res.status(404).json({ error: 'The utilisateur or the entreprise has been not found' });
        }
        else {
            if (!contractType || !numberHoursPerWeek || !offerName) {
                Response_1.default.warn('One or more values are missing');
                return res.status(405).json({ error: 'One or more values are missing' });
            }
            else {
                const eventOfferJob = new EventOfferJob_1.default({
                    contractType,
                    numberHoursPerWeek,
                    createdBy: Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded._id),
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
                usagerFinded && (0, UpdateEventOfferJobAtTime_1.UpdateEventOfferJobIn24h)(eventOfferJob._id);
                workStationFinded.eventOfferJobs.push(Object(eventOfferJob._id));
                (0, EventOfferJobData_1.createEventOfferJobForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(eventOfferJob._id));
                yield eventOfferJob.save();
                usagerFinded && (yield usagerFinded.save());
                yield workStationFinded.save();
                Response_1.default.info('the offer job has been created');
                return res.status(201).json({ message: 'the offer job has been created' });
            }
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        Response_1.default.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const readEventOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventOfferJobId = req.params.eventOfferJobId;
        const eventOfferJobFinded = yield EventOfferJob_1.default.findById(eventOfferJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const partenaireFinded = yield Partenaire_1.default.findById(req.headers.requesterid);
        const usagerFinded = yield Usager_1.default.findById(req.headers.requesterid);
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.headers.requesterid);
        if (!eventOfferJobFinded) {
            Response_1.default.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        }
        else {
            if (!utilisateurFinded && !partenaireFinded && !usagerFinded && !interlocutorFinded) {
                Response_1.default.error('The requester has been not found');
                return res.status(404).json({ error: 'The requester has been not found' });
            }
            else {
                const creatorFinded = yield Utilisateur_1.default.findById(eventOfferJobFinded === null || eventOfferJobFinded === void 0 ? void 0 : eventOfferJobFinded.createdBy).select('account');
                eventOfferJobFinded.history.push({
                    title: "Consultation de l'offre",
                    date: new Date(),
                    by: (utilisateurFinded && utilisateurFinded._id) ||
                        (partenaireFinded && partenaireFinded._id) ||
                        (usagerFinded && usagerFinded._id) ||
                        (interlocutorFinded && interlocutorFinded._id),
                    for: '',
                    comment: req.body.comment
                });
                yield eventOfferJobFinded.save();
                Object(eventOfferJobFinded).createdBy = creatorFinded;
                utilisateurFinded && (0, EventOfferJobData_1.readEventOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(eventOfferJobId));
                partenaireFinded && (0, EventOfferJobData_1.readEventOfferJobForExtracting)(Object(partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.datas[0].mounths[0]), Object(eventOfferJobId));
                usagerFinded && (0, EventOfferJobData_1.readEventOfferJobForExtracting)(Object(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.datas[0].mounths[0]), Object(eventOfferJobId));
                interlocutorFinded && (0, EventOfferJobData_1.readEventOfferJobForExtracting)(Object(interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.datas[0].mounths[0]), Object(eventOfferJobId));
                Response_1.default.info('An offer job has been created');
                return res.status(200).json({ message: 'The offer job has been found', eventOfferJob: eventOfferJobFinded });
            }
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        Response_1.default.error(`${error}`);
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return WorkStation_1.default.findOne({ _id: req.params.workStationId })
        .populate('eventOfferJobs')
        .then((workStation) => {
        if (!workStation) {
            Response_1.default.warn('the work station has been not found');
            return res.status(404).json('the work station has been not found');
        }
        else {
            Response_1.default.info(`Event job offers from ${workStation._id} has been readed`);
            return res.status(200).json({ count: workStation === null || workStation === void 0 ? void 0 : workStation.eventOfferJobs.length, eventOfferJobs: workStation === null || workStation === void 0 ? void 0 : workStation.eventOfferJobs });
        }
    })
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updateEventOfferJob = (req, res, next) => {
    const eventOfferJobId = req.params.eventOfferJobId;
    return EventOfferJob_1.default.findById(eventOfferJobId).then((eventOfferJob) => __awaiter(void 0, void 0, void 0, function* () {
        if (!eventOfferJob) {
            return res.status(404).json({ message: 'The offer job from event was not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
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
                    (0, EventOfferJobData_1.updateEventOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(eventOfferJob._id));
                })
                    .catch((error) => {
                    Response_1.default.error(`${error}`), res.status(500).json({ error: error.message });
                });
            }
        }
    }));
};
const deleteEventOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offerFinded = yield EventOfferJob_1.default.findById(req.params.eventOfferJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const workStationFinded = yield WorkStation_1.default.findOne({
            eventOfferJobs: req.params.eventOfferJobId
        }).select('eventOfferJobs eventOfferJobArchiveds');
        if (!offerFinded || !utilisateurFinded) {
            Response_1.default.error(`'the offer job or utilisateur has been not found'`);
            return res.status(404).json({ error: 'the offer job or utilisateur has been not found' });
        }
        else {
            const { hasBeenTakenByOurServices, dateAboutEventOfferJobAlreadyTaken, eventOfferJobComment } = req.body;
            if (!hasBeenTakenByOurServices && !dateAboutEventOfferJobAlreadyTaken) {
                return res.status(404).json({ error: "the hasBeenTakenByOurServices's value has been not found" });
            }
            else {
                if (offerFinded.usagerPositioned.length >= 1) {
                    return res.status(404).json({ error: 'An usager is positioned on offer job' });
                }
                else {
                    offerFinded.history.push({
                        title: `Offre déja pourvu par l'entreprise le ${new Date(dateAboutEventOfferJobAlreadyTaken && dateAboutEventOfferJobAlreadyTaken).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`,
                        date: new Date(),
                        by: hasBeenTakenByOurServices === true ? JSON.stringify(utilisateurFinded._id) : "Par l'employeur",
                        for: hasBeenTakenByOurServices === true
                            ? JSON.stringify(offerFinded.usagerPositioned)
                            : "Pour un(e) usager(e) sélectionné(e) l'employeur",
                        comment: eventOfferJobComment
                    });
                    const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/eventOfferJob/create/`, {
                        _id: offerFinded._id,
                        contractType: offerFinded.contractType,
                        numberHoursPerWeek: offerFinded.numberHoursPerWeek,
                        createdBy: offerFinded.createdBy,
                        offerName: offerFinded.offerName,
                        salary: Object(offerFinded).salary,
                        hasBeenTakenByOurServices,
                        status: `Offre déja pourvu par l'entreprise le ${new Date(dateAboutEventOfferJobAlreadyTaken && dateAboutEventOfferJobAlreadyTaken).toLocaleDateString('fr-FR', {
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
                        const newArray = workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.eventOfferJobs.filter((el) => JSON.stringify(el) !== JSON.stringify(offerFinded._id));
                        Object(workStationFinded).eventOfferJobs = newArray;
                        workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.eventOfferJobArchiveds.push(Object(offerFinded._id));
                        yield (workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.save());
                        (0, EventOfferJobData_1.deleteEventOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), offerFinded._id);
                        yield offerFinded.deleteOne();
                        Response_1.default.info('The offer job has been archived');
                        return res.status(200).json({ message: 'The offer job has been archived' });
                    }
                    else {
                        Response_1.default.error('Something went wrong in Archive');
                        return res.status(200).json({ message: 'Something went wrong in Archive' });
                    }
                }
            }
        }
    }
    catch (error) {
        console.error({ error: error });
        Response_1.default.error(`${error}`);
        return res.status(500).json({ error: error });
    }
});
const eventOfferJobProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId, usagerIsInterested, usagerPositionnedId, usagerIdWhoRefusedTheOfferJob, usagerIdWhoAcceptTheOfferJob, entrepriseIsInterested, usagerId, comment, dateOfJobInterview, startingDateOfDecouverte, endingDateOfDecouverte, startingDateEmploymentContract, endingDateEmploymentContract, contractType, numberHourPerWeek, tasksList, skillsList, endingTryPeriodeDate, continuityOfThepreviousContract, previousContractId } = req.body;
        const eventOfferJobFinded = yield EventOfferJob_1.default.findById(req.params.eventOfferJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const workStationFinded = yield WorkStation_1.default.findOne({ eventOfferJobs: eventOfferJobFinded === null || eventOfferJobFinded === void 0 ? void 0 : eventOfferJobFinded._id });
        const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded._id });
        const usagerWhoRefusedTheOfferJob = yield Usager_1.default.findById(usagerIdWhoRefusedTheOfferJob);
        const usagerWhoAcceptTheOfferJob = yield Usager_1.default.findById(usagerIdWhoAcceptTheOfferJob);
        const usagerPositionnedFoundByEventOfferJobTab = yield Usager_1.default.findById(usagerPositionnedId);
        const usagerFinded = yield Usager_1.default.findById(usagerId);
        if (!eventOfferJobFinded) {
            Response_1.default.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        }
        else {
            if (eventOfferJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") === true ||
                eventOfferJobFinded.status.includes("Entretien d'embauche prévu") === true) {
                Response_1.default.error(`The entreprise and the Usager(e) are already agree, please process next step`);
                return res.status(500).json({
                    message: 'The entreprise and the Usager(e) are already agree, please process next step'
                });
            }
            else {
                if (utilisateurFinded) {
                    if (usagerFinded) {
                        eventOfferJobFinded.usagerPositioned.push(Object(usagerFinded));
                        eventOfferJobFinded.history.push({
                            title: `Offre soumise a ${usagerFinded.account.male === true ? 'Mr' : 'Mme'} ${usagerFinded.account.name.toUpperCase()} ${usagerFinded.account.firstname}`,
                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: usagerFinded._id,
                            comment: comment
                        });
                        eventOfferJobFinded.offerBlockedAutomaticaly = true;
                        eventOfferJobFinded.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1));
                        (0, UpdateEventOfferJobAtTime_1.UpdateEventOfferJobIn24h)(eventOfferJobFinded._id);
                        usagerFinded.offerJobReceived.push(Object(eventOfferJobFinded));
                        yield eventOfferJobFinded.save();
                        yield usagerFinded.save();
                        (0, SendSms_1.default)("Bonjour, Nous avons une offre d'emploi à vous proposer", Object(usagerFinded)._id);
                        return res.status(200).json({ message: 'Offer job submited' });
                    }
                    else if (eventOfferJobFinded.status.includes("Offre réservée par l'usager(e)") === true ||
                        eventOfferJobFinded.status.includes('Offre soumise le') === true) {
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
                                for: usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id,
                                comment: req.body.comment
                            });
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.usagerWhoAcceptedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            yield eventOfferJobFinded.save();
                            Response_1.default.info('the date of the appointment has been submitted');
                            return res.status(200).json({ message: 'the date of the appointment has been submitted' });
                        }
                        else if (usagerIsInterested === false) {
                            Object(eventOfferJobFinded).status = 'Disponible';
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Offre refusée par l'Usager(e)",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id));
                            Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                            eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded === null || eventOfferJobFinded === void 0 ? void 0 : eventOfferJobFinded._id));
                            Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                            usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobDenied.push(Object(eventOfferJobFinded));
                            yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                            yield eventOfferJobFinded.save();
                            (0, SendSms_1.default)("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id);
                            Response_1.default.warn('The usager is not interested about this offer job');
                            return res.status(200).json({
                                message: 'The usager is not interested about this offer job'
                            });
                        }
                        else {
                            Response_1.default.error("the date of the appointment or 'usagerIsInterested: false' is missing");
                            return res.status(400).json({
                                message: "the date of the appointment or 'usagerIsInterested: false' is missing"
                            });
                        }
                    }
                    else if (eventOfferJobFinded.status.includes('Proposition prévue le') === true) {
                        if (usagerIsInterested === true) {
                            Object(eventOfferJobFinded).status = "Proposition à l'entreprise";
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Offre acceptée par l'Usager(e)",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobAccepted.push(Object(eventOfferJobFinded));
                            yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                            yield eventOfferJobFinded.save();
                            (0, SendSms_1.default)("l'offre d'emlpoi n°12345678 vous a été réservé nous reviendrons vers vous des que possible", usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id);
                            Response_1.default.info('The usager is interested about this offer job');
                            return res.status(200).json({
                                message: 'The usager is interested about this offer job'
                            });
                        }
                        else if (usagerIsInterested === false) {
                            Object(eventOfferJobFinded).status = 'Disponible';
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Offre refusée par l'Usager(e)",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id));
                            Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                            eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded === null || eventOfferJobFinded === void 0 ? void 0 : eventOfferJobFinded._id));
                            Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                            usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobDenied.push(Object(eventOfferJobFinded));
                            yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                            yield eventOfferJobFinded.save();
                            (0, SendSms_1.default)("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id);
                            Response_1.default.warn('The usager is not interested about this offer job');
                            return res.status(200).json({
                                message: 'The usager is not interested about this offer job'
                            });
                        }
                        else {
                            Response_1.default.error('usagerIsInterested for Utilisateur is missing');
                            return res.status(401).json({
                                error: "'usagerIsInterested' about etape 3 is missing"
                            });
                        }
                    }
                    else if (eventOfferJobFinded.status.includes("Proposition à l'entreprise") === true) {
                        if (entrepriseIsInterested === true) {
                            if (usagerIsInterested === true) {
                                if (dateOfJobInterview !== undefined) {
                                    eventOfferJobFinded.status = `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`;
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
                                        for: usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id,
                                        comment: req.body.comment
                                    });
                                    eventOfferJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id));
                                    const newJobInterview = new JobInterview_1.default({
                                        datePlanned: dateOfJobInterview,
                                        status: `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`,
                                        usager: Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id),
                                        entreprise: Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id)
                                    });
                                    eventOfferJobFinded.jobInterviews.push(Object(newJobInterview));
                                    usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.jobInterviews.push(Object(newJobInterview));
                                    yield eventOfferJobFinded.save();
                                    yield newJobInterview.save();
                                    yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                                    (0, JobInterview_2.createJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(eventOfferJobFinded._id), Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                    Response_1.default.info('The entreprise are interested and would like a job intervew');
                                    return res.status(200).json({
                                        message: 'The entreprise are interested and would like a job intervew'
                                    });
                                }
                                else if (startingDateOfDecouverte !== undefined || endingDateOfDecouverte !== undefined) {
                                    if (startingDateOfDecouverte !== undefined && endingDateOfDecouverte !== undefined) {
                                        const newDecouverte = new Decouverte_1.default({
                                            isFromAnEvent: false,
                                            jobName: eventOfferJobFinded.offerName,
                                            startingDate: startingDateOfDecouverte,
                                            endingDate: endingDateOfDecouverte,
                                            entreprise: Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id),
                                            usager: Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id)
                                        });
                                        eventOfferJobFinded.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString('fr-FR', {
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
                                            for: usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        eventOfferJobFinded.decouvertes.push(Object(newDecouverte));
                                        usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.decouvertes.push(Object(newDecouverte));
                                        yield newDecouverte.save();
                                        yield eventOfferJobFinded.save();
                                        yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                                        (0, DecouverteData_1.createDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newDecouverte._id), Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                        Response_1.default.info('entreprise are interested about a decouverte');
                                        return res.status(200).json({
                                            message: 'entreprise are interested about a decouverte'
                                        });
                                    }
                                    else {
                                        Response_1.default.warn("entreprise are interested about a decouverte but starting's or ending's date is missing");
                                        return res.status(200).json({
                                            message: "entreprise are interested about a decouverte but starting's or ending's date is missing"
                                        });
                                    }
                                }
                                else if (startingDateEmploymentContract !== undefined) {
                                    if (continuityOfThepreviousContract === true && !previousContractId) {
                                        Response_1.default.info('PreviousContractId is missing');
                                        return res.status(200).json({ message: 'PreviousContractId is missing' });
                                    }
                                    else {
                                        const newContract = yield new EmploymentContract_1.default({
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
                                            usager: Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id),
                                            entreprise: Object(entrepriseFinded)._id
                                        });
                                        eventOfferJobFinded.status = `Démarrage du contrat prevu le ${new Date(startingDateEmploymentContract).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`;
                                        eventOfferJobFinded.history.push({
                                            title: `Démarrage du contrat prevu le ${new Date(startingDateEmploymentContract).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`,
                                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        eventOfferJobFinded.employmentContracts.push(Object(newContract._id));
                                        usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.employmentContracts.push(Object(newContract._id));
                                        (0, EmploymentContract_2.createEmploymentContractForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newContract._id), Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                        yield newContract.save();
                                        yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                                        yield eventOfferJobFinded.save();
                                        Response_1.default.info('Employment contract has been created');
                                        return res.status(200).json({
                                            message: 'Employment contract has been created'
                                        });
                                    }
                                }
                                else {
                                    eventOfferJobFinded.status = `Usager(e) accepté(e) par l'entreprise sans dates définies`;
                                    eventOfferJobFinded.history.push({
                                        title: `Usager(e) accepté(e) par l'entreprise sans dates définies`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id,
                                        comment: req.body.comment
                                    });
                                    eventOfferJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id));
                                    yield eventOfferJobFinded.save();
                                    Response_1.default.info('entreprise is interested but without date of job interview or decouverte or employment contract');
                                    return res.status(200).json({
                                        message: 'entreprise is interested but without date of job interview or decouverte or employment contract'
                                    });
                                }
                            }
                            else if (usagerIsInterested === false) {
                                eventOfferJobFinded.status = 'Disponible';
                                eventOfferJobFinded.history.push({
                                    title: `Usager(e) accepté(e) par l'entreprise mais l'usager(e) n'est plus intéressé(e)`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id,
                                    comment: req.body.comment
                                });
                                const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id));
                                Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                                eventOfferJobFinded.usagerWhoRefusedTheEventOfferJob.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded === null || eventOfferJobFinded === void 0 ? void 0 : eventOfferJobFinded._id));
                                Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                                yield eventOfferJobFinded.save();
                                yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                                Response_1.default.info('entreprise is interested but the Usager is not anymore');
                                return res.status(200).json({
                                    message: 'entreprise is interested but the Usager is not anymore'
                                });
                            }
                            else {
                                Response_1.default.error('entreprise is interested but the UsagerIsInterested is missing');
                                return res.status(400).json({
                                    message: 'entreprise is interested but the UsagerIsInterested is missing'
                                });
                            }
                        }
                        else if (entrepriseIsInterested === false) {
                            Object(eventOfferJobFinded).status = 'Disponible';
                            eventOfferJobFinded.offerBlockedAutomaticaly = false;
                            eventOfferJobFinded.history.push({
                                title: "Usager(e) refusé(e) par l'Entreprise",
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: JSON.stringify(Object(usagerPositionnedFoundByEventOfferJobTab)._id),
                                comment: req.body.comment
                            });
                            const newArrayFromEventOfferJob = eventOfferJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id));
                            Object(eventOfferJobFinded).usagerPositioned = newArrayFromEventOfferJob;
                            eventOfferJobFinded.usagerRefusedByEntreprise.push(Object(usagerPositionnedFoundByEventOfferJobTab));
                            const newArrayFromUsager = usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(eventOfferJobFinded === null || eventOfferJobFinded === void 0 ? void 0 : eventOfferJobFinded._id));
                            Object(usagerPositionnedFoundByEventOfferJobTab).offerJobReceived = newArrayFromUsager;
                            yield (usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab.save());
                            yield eventOfferJobFinded.save();
                            Response_1.default.info('entreprise is not interested');
                            return res.status(200).json({ message: 'entreprise is not interested' });
                        }
                        else {
                            Response_1.default.error('entrepriseIsInterested has been not found');
                            return res.status(404).json({ error: 'entrepriseIsInterested has been not found' });
                        }
                    }
                    else {
                        Response_1.default.error('The entreprise and the usager are already agree');
                        return res.status(401).json({ error: 'The entreprise and the usager are already agree' });
                    }
                }
                else if (usagerFinded) {
                    if (JSON.stringify(usagerPositionnedFoundByEventOfferJobTab === null || usagerPositionnedFoundByEventOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByEventOfferJobTab._id) === JSON.stringify(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id)) {
                        Response_1.default.error("fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter");
                        return res.status(200).json({
                            message: "fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter"
                        });
                    }
                    else {
                        if (Object(eventOfferJobFinded).usagerPositioned.length !== 0) {
                            Response_1.default.warn("(non autorisé) usager(e) déja positionné(e) sur l'offre");
                            return res.status(401).json({ message: "usager(e) deja positionné(e) sur l'offre" });
                        }
                        else {
                            if (usagerIsInterested === false) {
                                Response_1.default.warn("Usager(e) pas intéressé(e) par l'offre d'emploi");
                                return res.status(400).json({
                                    message: "Usager(e) pas intéressé(e) par l'offre d'emploi"
                                });
                            }
                            else if (usagerIsInterested === true) {
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
                                yield eventOfferJobFinded.save();
                                yield usagerFinded.save();
                                (0, SendSms_1.default)("Bonjour, l'ofre N° 123456789 à bien été réservée nous reviendrons vers vous pour plus d'informations", Object(usagerFinded)._id);
                                Response_1.default.info("Le positionnement a l'offre d'emploi n°12345678 à bien été acceptée");
                                return res.status(200).json({
                                    message: "Le positionnement a l'offre d'emploi n°12345678 à bien été acceptée"
                                });
                            }
                            else {
                                Response_1.default.error("usagerIsInterested pour que l'Usager(e) se positionne is missing");
                                return res.status(404).json({
                                    error: "usagerIsInterested pour que l'Usager(e) se positionne is missing"
                                });
                            }
                        }
                    }
                }
                else {
                    Response_1.default.error('requester has been not found');
                    return res.status(404).json({ error: 'requester has been not found' });
                }
            }
        }
    }
    catch (error) {
        console.error({ message: 'Error catched', error: error });
        Response_1.default.error(`Error catched -> ${error}`);
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
exports.default = {
    createEventOfferJob,
    readEventOfferJob,
    readAll,
    updateEventOfferJob,
    deleteEventOfferJob,
    eventOfferJobProcess
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRPZmZlckpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9FdmVudE9mZmVySm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0EsNEVBQW9EO0FBQ3BELHdFQUFnRDtBQUNoRCwwRUFBa0Q7QUFDbEQsOERBQXNDO0FBQ3RDLHNFQUE4QztBQUM5Qyx3RUFBZ0Q7QUFDaEQsc0VBQThDO0FBQzlDLDBFQUFrRDtBQUNsRCxzRUFBOEM7QUFDOUMsc0ZBQThEO0FBRzlELHNFQUt3QztBQUN4Qyw0REFBNEU7QUFDNUUsc0ZBQWtGO0FBQ2xGLGdFQUE0RTtBQUM1RSx3RUFBd0Y7QUFHeEYsbUVBQXlDO0FBQ3pDLGlFQUEyQztBQUMzQyxrREFBMEI7QUFDMUIsOERBQXNDO0FBRXRDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNsRixJQUFJLENBQUM7UUFDRCxNQUFNLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9FLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLGtCQUFNLENBQUMsS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7WUFD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