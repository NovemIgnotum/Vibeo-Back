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
const config_1 = __importDefault(require("../config/config"));
const axios_1 = __importDefault(require("axios"));
const OfferJob_1 = __importDefault(require("../models/OfferJob"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const JobInterview_1 = __importDefault(require("../models/JobInterview"));
const Decouverte_1 = __importDefault(require("../models/Decouverte"));
const EmploymentContract_1 = __importDefault(require("../models/EmploymentContract"));
const OfferJobData_1 = require("../functions/OfferJobData");
const JobInterview_2 = require("../functions/JobInterview");
const UpdateOfferJobAtTime_1 = require("../functions/UpdateOfferJobAtTime");
const OfferJobSpontaneous_1 = require("../functions/OfferJobSpontaneous");
const DecouverteData_1 = require("../functions/DecouverteData");
const EmploymentContract_2 = require("../functions/EmploymentContract");
const Response_1 = __importDefault(require("../library/Response"));
const SendSms_1 = __importDefault(require("../library/SendSms"));
const OfferJobSpontaneous_2 = __importDefault(require("../models/OfferJobSpontaneous"));
const Convention_1 = __importDefault(require("../models/Convention"));
const createOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary, skillsAddedFromWorkStation, knowHowAddedFromWorkStation, skillsRemovedFromWorkStation, knowHowRemovedFromWorkStation, jobContextAddedFromWorkStation, jobContextRemovedFromWorkStation, jobAccessAdded, isForIrisJob, conventionAboutIrisJob } = req.body;
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
                const conventionFinded = yield Convention_1.default.findById(conventionAboutIrisJob);
                if (isForIrisJob === true && !conventionFinded) {
                    Response_1.default.warn('The conventionAboutIrisJob is missing');
                    return res.status(405).json({ error: 'The conventionAboutIrisJob is missing' });
                }
                else {
                    const offerJob = new OfferJob_1.default({
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
                    usagerFinded && (0, UpdateOfferJobAtTime_1.UpdateOfferJobIn24h)(offerJob._id);
                    workStationFinded.offerJobs.push(Object(offerJob._id));
                    isForIrisJob && offerJob.conventionAboutIrisJob.push(conventionAboutIrisJob);
                    (0, OfferJobData_1.createOfferJobForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJob._id));
                    yield offerJob.save();
                    usagerFinded && (yield usagerFinded.save());
                    yield workStationFinded.save();
                    Response_1.default.info('the offer job has been created');
                    return res.status(201).json({ message: 'the offer job has been created' });
                }
            }
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        Response_1.default.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const createOfferJobSpontaneous = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary, skillsAdded, knowHowAdded, skillsRemoved, knowHowRemoved } = req.body;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(req.body.usagerId);
        if (!utilisateurFinded || !usagerFinded) {
            Response_1.default.error('The utilisateur or the usager has been not found');
            return res.status(404).json({ error: 'The utilisateur or the usager has been not found' });
        }
        else {
            if (!contractType || !numberHoursPerWeek || !offerName) {
                Response_1.default.warn('One or more values are missing');
                return res.status(405).json({ error: 'One or more values are missing' });
            }
            else {
                const offerJob = new OfferJobSpontaneous_2.default({
                    contractType,
                    numberHoursPerWeek,
                    createdBy: Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded._id),
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
                (0, OfferJobSpontaneous_1.createOfferJobForSpontaneousExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJob._id));
                yield offerJob.save();
                yield usagerFinded.save();
                Response_1.default.info('the offer job has been created');
                return res.status(201).json({ message: 'the offer job spontaneous has been created' });
            }
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        Response_1.default.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const readOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offerJobId = req.params.offerJobId;
        const offerJobFinded = yield OfferJob_1.default.findById(offerJobId);
        const offerJobSpontaneousFinded = yield OfferJobSpontaneous_2.default.findById(offerJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const partenaireFinded = yield Partenaire_1.default.findById(req.headers.requesterid);
        const usagerFinded = yield Usager_1.default.findById(req.headers.requesterid);
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.headers.requesterid);
        if (!offerJobFinded && !offerJobSpontaneousFinded) {
            Response_1.default.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        }
        else {
            if (!utilisateurFinded && !partenaireFinded && !usagerFinded && !interlocutorFinded) {
                Response_1.default.error('The requester has been not found');
                return res.status(404).json({ error: 'The requester has been not found' });
            }
            else {
                if (offerJobFinded) {
                    const workStationfinded = yield WorkStation_1.default.findOne({ offerJobs: offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id });
                    const usagerFindedAboutOfferJobIsFor = yield Usager_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.usagerPositioned).select('account');
                    offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                        title: "Consultation de l'offre",
                        date: new Date(),
                        by: (utilisateurFinded && `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`) ||
                            (partenaireFinded && `${partenaireFinded.account.firstname} ${partenaireFinded.account.name}`) ||
                            (usagerFinded && `${usagerFinded.account.firstname} ${usagerFinded.account.name}`) ||
                            (interlocutorFinded
                                ? `${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name}`
                                : 'some interlocutor but not reconized'),
                        for: usagerFindedAboutOfferJobIsFor !== null
                            ? `${usagerFindedAboutOfferJobIsFor === null || usagerFindedAboutOfferJobIsFor === void 0 ? void 0 : usagerFindedAboutOfferJobIsFor.account.firstname} ${usagerFindedAboutOfferJobIsFor === null || usagerFindedAboutOfferJobIsFor === void 0 ? void 0 : usagerFindedAboutOfferJobIsFor.account.name}`
                            : 'undefined',
                        comment: req.body.comment
                    });
                    yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                    utilisateurFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJobId));
                    partenaireFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.datas[0].mounths[0]), Object(offerJobId));
                    usagerFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.datas[0].mounths[0]), Object(offerJobId));
                    interlocutorFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.datas[0].mounths[0]), Object(offerJobId));
                    Response_1.default.info('An offer job has been created');
                    return res
                        .status(200)
                        .json({ message: 'The offer job has been found', offerJob: offerJobFinded, workStation: workStationfinded });
                }
                else {
                    const usagerFindedAboutOfferJobIsFor = yield Usager_1.default.findById(offerJobSpontaneousFinded === null || offerJobSpontaneousFinded === void 0 ? void 0 : offerJobSpontaneousFinded.usagerPositioned).select('account');
                    offerJobSpontaneousFinded === null || offerJobSpontaneousFinded === void 0 ? void 0 : offerJobSpontaneousFinded.history.push({
                        title: "Consultation de l'offre",
                        date: new Date(),
                        by: (utilisateurFinded && `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`) ||
                            (partenaireFinded && `${partenaireFinded.account.firstname} ${partenaireFinded.account.name}`) ||
                            (usagerFinded && `${usagerFinded.account.firstname} ${usagerFinded.account.name}`) ||
                            (interlocutorFinded
                                ? `${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name}`
                                : 'some interlocutor but not reconized'),
                        for: `${usagerFindedAboutOfferJobIsFor === null || usagerFindedAboutOfferJobIsFor === void 0 ? void 0 : usagerFindedAboutOfferJobIsFor.account.firstname} ${usagerFindedAboutOfferJobIsFor === null || usagerFindedAboutOfferJobIsFor === void 0 ? void 0 : usagerFindedAboutOfferJobIsFor.account.name}`,
                        comment: req.body.comment
                    });
                    yield (offerJobSpontaneousFinded === null || offerJobSpontaneousFinded === void 0 ? void 0 : offerJobSpontaneousFinded.save());
                    utilisateurFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJobId));
                    partenaireFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.datas[0].mounths[0]), Object(offerJobId));
                    usagerFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.datas[0].mounths[0]), Object(offerJobId));
                    interlocutorFinded && (0, OfferJobData_1.readOfferJobForExtracting)(Object(interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.datas[0].mounths[0]), Object(offerJobId));
                    Response_1.default.info('The offer job spontaneous has been foundd');
                    return res
                        .status(200)
                        .json({ message: 'The offer job spontaneous has been found', offerJobSpontaneous: offerJobSpontaneousFinded });
                }
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
    if (req.headers.workstationid) {
        return WorkStation_1.default.findOne({ _id: req.headers.workstationid })
            .populate('offerJobs')
            .then((offerJob) => res.status(200).json({ count: offerJob === null || offerJob === void 0 ? void 0 : offerJob.offerJobs.length, offerJobs: offerJob }))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
    else {
        const count = yield OfferJobSpontaneous_2.default.countDocuments();
        return OfferJobSpontaneous_2.default.find()
            .then((offerJob) => res.status(200).json({ count: count, offerJobSpontaneous: offerJob }))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
});
const updateOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offerJobFinded = yield OfferJob_1.default.findById(req.params.offerJobId);
        const offerJobFindedSpontaneous = yield OfferJobSpontaneous_2.default.findById(req.params.offerJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Response_1.default.error({ message: 'requester was not found' });
            return res.status(401).json({ message: 'requester was not found' });
        }
        else {
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
                    (0, OfferJobData_1.updateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded._id));
                })
                    .catch((error) => {
                    Response_1.default.error(`${error}`), res.status(500).json({ error: error.message });
                });
            }
            else if (offerJobFindedSpontaneous) {
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
                    (0, OfferJobSpontaneous_1.updateOfferJobForSpontaneousExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJobFindedSpontaneous._id));
                })
                    .catch((error) => {
                    Response_1.default.error(`${error}`), res.status(500).json({ error: error.message });
                });
            }
            else {
                Response_1.default.error({ message: 'offer job was not found' });
                return res.status(400).json({ message: 'offer job was not found' });
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const deleteOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offerFinded = yield OfferJob_1.default.findById(req.params.offerJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const workStationFinded = yield WorkStation_1.default.findOne({
            offerJobs: req.params.offerJobId
        }).select('offerJobs offerJobArchiveds');
        if (!offerFinded || !utilisateurFinded) {
            Response_1.default.error(`'the offer job or utilisateur has been not found'`);
            return res.status(404).json({ error: 'the offer job or utilisateur has been not found' });
        }
        else {
            const { hasBeenTakenByOurServices, dateAboutOfferJobAlreadyTaken, offerJobComment } = req.body;
            if (!hasBeenTakenByOurServices) {
                Response_1.default.warn("the hasBeenTakenByOurServices's value has been not found");
                return res.status(404).json({ error: "the hasBeenTakenByOurServices's value has been not found" });
            }
            else {
                if (offerFinded.usagerPositioned.length >= 1) {
                    Response_1.default.warn('An usager is positioned on offer job');
                    return res.status(404).json({ error: 'An usager is positioned on offer job' });
                }
                else {
                    offerFinded.history.push({
                        title: `Offre déja pourvu par l'entreprise le ${new Date(dateAboutOfferJobAlreadyTaken && dateAboutOfferJobAlreadyTaken).toLocaleDateString('fr-FR', {
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
                        comment: offerJobComment
                    });
                    const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/offerJob/create`, {
                        _id: offerFinded._id,
                        contractType: offerFinded.contractType,
                        numberHoursPerWeek: offerFinded.numberHoursPerWeek,
                        createdBy: offerFinded.createdBy,
                        offerName: offerFinded.offerName,
                        salary: Object(offerFinded).salary,
                        hasBeenTakenByOurServices,
                        status: `Offre déja pourvu par l'entreprise le ${new Date(dateAboutOfferJobAlreadyTaken && dateAboutOfferJobAlreadyTaken).toLocaleDateString('fr-FR', {
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
                        Response_1.default.warn('Something went wrong in BDD Archive');
                        return res.status(400).json('Something went wrong in BDD Archive');
                    }
                    else {
                        const newArray = workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.offerJobs.filter((el) => JSON.stringify(el) !== JSON.stringify(offerFinded._id));
                        Object(workStationFinded).offerJobs = newArray;
                        workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.offerJobArchiveds.push(Object(offerFinded._id));
                        yield (workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.save());
                        (0, OfferJobData_1.deleteOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), offerFinded._id);
                        yield offerFinded.deleteOne();
                        Response_1.default.info('The offer job has been archived');
                        return res.status(200).json({ message: 'The offer job has been archived' });
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
const offerJobProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId, usagerIsInterested, entrepriseIsInterested, usagerId, comment, dateOfJobInterview, startingDateOfDecouverte, endingDateOfDecouverte, startingDateEmploymentContract, endingDateEmploymentContract, contractType, numberHourPerWeek, tasksList, skillsList, endingTryPeriodeDate, continuityOfThepreviousContract, previousContractId } = req.body;
        const offerJobFinded = yield OfferJob_1.default.findById(req.params.offerJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const usagerFindedForPositioning = yield Usager_1.default.findById(usagerId);
        const workStationFinded = yield WorkStation_1.default.findOne({ offerJobs: offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id });
        const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded._id });
        const usagerPositionnedFoundByOfferJobTab = yield Usager_1.default.findOne({
            offerJobReceived: req.params.offerJobId
        }).select('offerJobReceived offerJobAccepted offerJobDenied jobInterviews decouvertes employmentContracts');
        const usagerFinded = yield Usager_1.default.findById(requesterId);
        if (!offerJobFinded) {
            Response_1.default.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        }
        else {
            if ((offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") === true &&
                offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise sans dates définies") === false) ||
                offerJobFinded.status.includes("Entretien d'embauche prévu") === true) {
                Response_1.default.error(`The entreprise and the Usager(e) are already agree, please process next step`);
                return res.status(500).json({
                    message: 'The entreprise and the Usager(e) are already agree, please process next step'
                });
            }
            else {
                if (utilisateurFinded) {
                    if (!usagerPositionnedFoundByOfferJobTab) {
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
                            (0, UpdateOfferJobAtTime_1.UpdateOfferJobIn24h)(offerJobFinded._id);
                            usagerFindedForPositioning.offerJobReceived.push(Object(offerJobFinded));
                            yield offerJobFinded.save();
                            yield usagerFindedForPositioning.save();
                            (0, SendSms_1.default)("Bonjour, Nous avons une offre d'emploi à vous proposer", Object(usagerFindedForPositioning)._id);
                            return res.status(200).json({ message: 'Offer job submited' });
                        }
                        else {
                            Response_1.default.info('Offer job has been not submited');
                            return res.status(200).json({ message: 'Offer job has been not submited' });
                        }
                    }
                    else {
                        if (offerJobFinded.status.includes("Offre réservée par l'usager(e)") === true ||
                            offerJobFinded.status.includes('Offre soumise le') === true) {
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
                                yield offerJobFinded.save();
                                Response_1.default.info('the date of the appointment has been submitted');
                                return res.status(200).json({ message: 'the date of the appointment has been submitted' });
                            }
                            else if (usagerIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre refusée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id));
                                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab.offerJobDenied.push(Object(offerJobFinded));
                                yield usagerPositionnedFoundByOfferJobTab.save();
                                yield offerJobFinded.save();
                                (0, SendSms_1.default)("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id);
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
                        else if (offerJobFinded.status.includes('Proposition prévue le') === true) {
                            if (usagerIsInterested === true) {
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
                                yield usagerPositionnedFoundByOfferJobTab.save();
                                yield offerJobFinded.save();
                                (0, SendSms_1.default)("l'offre d'emlpoi n°12345678 vous a été réservé nous reviendrons vers vous des que possible", usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id);
                                Response_1.default.info('The usager is interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is interested about this offer job'
                                });
                            }
                            else if (usagerIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre refusée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id));
                                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab.offerJobDenied.push(Object(offerJobFinded));
                                yield usagerPositionnedFoundByOfferJobTab.save();
                                yield offerJobFinded.save();
                                (0, SendSms_1.default)("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id);
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
                        else if (offerJobFinded.status.includes("Proposition à l'entreprise") === true ||
                            offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise sans dates définies") === true) {
                            if (entrepriseIsInterested === true) {
                                if (usagerIsInterested === true) {
                                    if (dateOfJobInterview !== undefined) {
                                        offerJobFinded.status = `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`;
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
                                            usager: Object(usagerPositionnedFoundByOfferJobTab._id),
                                            entreprise: Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id)
                                        });
                                        offerJobFinded.jobInterviews.push(Object(newJobInterview));
                                        usagerPositionnedFoundByOfferJobTab.jobInterviews.push(Object(newJobInterview));
                                        yield offerJobFinded.save();
                                        yield newJobInterview.save();
                                        yield usagerPositionnedFoundByOfferJobTab.save();
                                        (0, JobInterview_2.createJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded._id), Object(usagerPositionnedFoundByOfferJobTab._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                        Response_1.default.info('The entreprise are interested and would like a job intervew');
                                        return res.status(200).json({
                                            message: 'The entreprise are interested and would like a job intervew'
                                        });
                                    }
                                    else if (startingDateOfDecouverte !== undefined || endingDateOfDecouverte !== undefined) {
                                        if (startingDateOfDecouverte !== undefined && endingDateOfDecouverte !== undefined) {
                                            const newDecouverte = new Decouverte_1.default({
                                                isFromAnEvent: false,
                                                jobName: offerJobFinded.offerName,
                                                startingDate: startingDateOfDecouverte,
                                                endingDate: endingDateOfDecouverte,
                                                entreprise: Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id),
                                                usager: Object(usagerPositionnedFoundByOfferJobTab._id)
                                            });
                                            offerJobFinded.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString('fr-FR', {
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
                                            yield newDecouverte.save();
                                            yield offerJobFinded.save();
                                            yield usagerPositionnedFoundByOfferJobTab.save();
                                            (0, DecouverteData_1.createDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newDecouverte._id), Object(usagerPositionnedFoundByOfferJobTab.id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
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
                                            offerJobFinded.status = `Démarrage du contrat prevu le ${new Date(startingDateEmploymentContract).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            offerJobFinded.history.push({
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
                                                for: usagerPositionnedFoundByOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.employmentContracts.push(Object(newContract._id));
                                            usagerPositionnedFoundByOfferJobTab.employmentContracts.push(Object(newContract._id));
                                            (0, EmploymentContract_2.createEmploymentContractForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newContract._id), Object(usagerPositionnedFoundByOfferJobTab._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                            yield newContract.save();
                                            yield usagerPositionnedFoundByOfferJobTab.save();
                                            yield offerJobFinded.save();
                                            Response_1.default.info('Employment contract has been created');
                                            return res.status(200).json({
                                                message: 'Employment contract has been created'
                                            });
                                        }
                                    }
                                    else {
                                        offerJobFinded.status = `Usager(e) accepté(e) par l'entreprise sans dates définies`;
                                        offerJobFinded.history.push({
                                            title: `Usager(e) accepté(e) par l'entreprise sans dates définies`,
                                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerPositionnedFoundByOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByOfferJobTab._id));
                                        yield offerJobFinded.save();
                                        Response_1.default.info('entreprise is interested but without date of job interview or decouverte or employment contract');
                                        return res.status(200).json({
                                            message: 'entreprise is interested but without date of job interview or decouverte or employment contract'
                                        });
                                    }
                                }
                                else if (usagerIsInterested === false) {
                                    offerJobFinded.status = 'Disponible';
                                    offerJobFinded.history.push({
                                        title: `Usager(e) accepté(e) par l'entreprise mais l'usager(e) n'est plus intéressé(e)`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: usagerPositionnedFoundByOfferJobTab._id,
                                        comment: req.body.comment
                                    });
                                    const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id));
                                    Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                    offerJobFinded.usagerWhoRefusedTheOfferJob.push(Object(usagerPositionnedFoundByOfferJobTab));
                                    const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                    Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                    yield offerJobFinded.save();
                                    yield usagerPositionnedFoundByOfferJobTab.save();
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
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Usager(e) refusé(e) par l'Entreprise",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id));
                                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                offerJobFinded.usagerRefusedByEntreprise.push(Object(usagerPositionnedFoundByOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByOfferJobTab.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                Object(usagerPositionnedFoundByOfferJobTab).offerJobReceived = newArrayFromUsager;
                                yield usagerPositionnedFoundByOfferJobTab.save();
                                yield offerJobFinded.save();
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
                }
                else if (usagerFinded) {
                    if (JSON.stringify(usagerPositionnedFoundByOfferJobTab === null || usagerPositionnedFoundByOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByOfferJobTab._id) === JSON.stringify(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id)) {
                        Response_1.default.error("fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter");
                        return res.status(200).json({
                            message: "fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter"
                        });
                    }
                    else {
                        if (Object(offerJobFinded).usagerPositioned.length !== 0) {
                            Response_1.default.warn("(non autorisé) usager(e) déja positionné(e) sur l'offre");
                            return res.status(401).json({ message: "(non autorisé) usager(e) deja positionné(e) sur l'offre" });
                        }
                        else {
                            if (usagerIsInterested === false) {
                                Response_1.default.warn("Usager(e) pas intéressé(e) par l'offre d'emploi");
                                return res.status(400).json({
                                    message: "Usager(e) pas intéressé(e) par l'offre d'emploi"
                                });
                            }
                            else if (usagerIsInterested === true) {
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
                                yield offerJobFinded.save();
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
    createOfferJob,
    createOfferJobSpontaneous,
    readOfferJob,
    readAll,
    updateOfferJob,
    deleteOfferJob,
    offerJobProcess
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvT2ZmZXJKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBc0M7QUFDdEMsa0RBQTBCO0FBRzFCLGtFQUEwQztBQUMxQyx3RUFBZ0Q7QUFDaEQsMEVBQWtEO0FBQ2xELDhEQUFzQztBQUN0QyxzRUFBOEM7QUFDOUMsd0VBQWdEO0FBQ2hELHNFQUE4QztBQUM5QywwRUFBa0Q7QUFDbEQsc0VBQThDO0FBQzlDLHNGQUE4RDtBQUc5RCw0REFLbUM7QUFDbkMsNERBQTRFO0FBQzVFLDRFQUF3RTtBQUN4RSwwRUFBa0k7QUFDbEksZ0VBQTRFO0FBQzVFLHdFQUF3RjtBQUd4RixtRUFBeUM7QUFDekMsaUVBQTJDO0FBQzNDLHdGQUFnRTtBQUNoRSxzRUFBOEM7QUFFOUMsTUFBTSxjQUFjLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM3RSxJQUFJLENBQUM7UUFDRCxNQUFNLEVBQ0YsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixTQUFTLEVBQ1QsTUFBTSxFQUNOLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDM0IsNEJBQTRCLEVBQzVCLDZCQUE2QixFQUM3Qiw4QkFBOEIsRUFDOUIsZ0NBQWdDLEVBQ2hDLGNBQWMsRUFDZCxZQUFZLEVBQ1osc0JBQXNCLEVBQ3pCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9FLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFR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