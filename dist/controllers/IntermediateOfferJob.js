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
const IntermediateOfferJob_1 = __importDefault(require("../models/IntermediateOfferJob"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Mission_1 = __importDefault(require("../models/Mission"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const JobInterview_1 = __importDefault(require("../models/JobInterview"));
const Decouverte_1 = __importDefault(require("../models/Decouverte"));
const EmploymentContract_1 = __importDefault(require("../models/EmploymentContract"));
const IntermediateOfferJobData_1 = require("../functions/IntermediateOfferJobData");
const JobInterview_2 = require("../functions/JobInterview");
const UpdateIntermediateOfferJobAtTime_1 = require("../functions/UpdateIntermediateOfferJobAtTime");
const Response_1 = __importDefault(require("../library/Response"));
const SendSms_1 = __importDefault(require("../library/SendSms"));
const DecouverteData_1 = require("../functions/DecouverteData");
const EmploymentContract_2 = require("../functions/EmploymentContract");
const config_1 = __importDefault(require("../config/config"));
const axios_1 = __importDefault(require("axios"));
const createIntermediateOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary, isFromAnEvent } = req.body;
        const missionFinded = yield Mission_1.default.findById(req.params.missionId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(req.body.usagerId);
        if (!missionFinded || !utilisateurFinded) {
            Response_1.default.error('The utilisateur or the entreprise has been not found');
            return res.status(404).json({ error: 'The utilisateur or the entreprise has been not found' });
        }
        else {
            if (!contractType || !numberHoursPerWeek || !salary || !isFromAnEvent) {
                Response_1.default.warn('One or more values are missing');
                return res.status(405).json({ error: 'One or more values are missing' });
            }
            else {
                const intermediateOfferJob = new IntermediateOfferJob_1.default({
                    contractType,
                    isFromAnEvent,
                    numberHoursPerWeek,
                    createdBy: Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded._id),
                    offerName: offerName ? offerName : missionFinded.workname,
                    salary,
                    history: {
                        title: "Création de l'offre intermédiaire",
                        date: new Date().setHours(new Date().getHours() + 1),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        comment: req.body.comment
                    },
                    status: usagerFinded
                        ? `Offre intermédaire soumise le ${new Date().toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`
                        : 'Disponible'
                });
                usagerFinded && usagerFinded.intermediateOfferJobReceived.push(Object(intermediateOfferJob._id));
                usagerFinded && intermediateOfferJob.usagerPositioned.push(Object(usagerFinded));
                usagerFinded &&
                    intermediateOfferJob.history.push({
                        title: 'Offre intermédaire soumise',
                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        for: usagerFinded._id,
                        comment: req.body.comment
                    });
                usagerFinded ? (intermediateOfferJob.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1))) : null;
                usagerFinded ? (intermediateOfferJob.offerBlockedAutomaticaly = true) : (intermediateOfferJob.offerBlockedAutomaticaly = false);
                usagerFinded && (0, UpdateIntermediateOfferJobAtTime_1.UpdateIntermediateOfferJobIn24h)(intermediateOfferJob._id);
                missionFinded.intermediateOfferJob.push(Object(intermediateOfferJob._id));
                (0, IntermediateOfferJobData_1.createIntermediateOfferJobForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(intermediateOfferJob._id));
                yield intermediateOfferJob.save();
                usagerFinded && (yield usagerFinded.save());
                yield missionFinded.save();
                Response_1.default.info('the intermediate offer job has been created');
                return res.status(201).json({ message: 'the intermediate offer job has been created' });
            }
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        Response_1.default.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const readIntermediateOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const intermediateOfferJobId = req.params.intermediateOfferJobId;
        const offerJobFinded = yield IntermediateOfferJob_1.default.findById(intermediateOfferJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const partenaireFinded = yield Partenaire_1.default.findById(req.headers.requesterid);
        const usagerFinded = yield Usager_1.default.findById(req.headers.requesterid);
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.headers.requesterid);
        if (!offerJobFinded) {
            Response_1.default.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        }
        else {
            if (!utilisateurFinded && !partenaireFinded && !usagerFinded && !interlocutorFinded) {
                Response_1.default.error('The requester has been not found');
                return res.status(404).json({ error: 'The requester has been not found' });
            }
            else {
                const creatorFinded = yield Utilisateur_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.createdBy).select('account');
                offerJobFinded.history.push({
                    title: "Consultation de l'offre",
                    date: new Date(),
                    by: (utilisateurFinded && utilisateurFinded._id) ||
                        (partenaireFinded && partenaireFinded._id) ||
                        (usagerFinded && usagerFinded._id) ||
                        (interlocutorFinded && interlocutorFinded._id),
                    for: '',
                    comment: req.body.comment
                });
                yield offerJobFinded.save();
                Object(offerJobFinded).createdBy = creatorFinded;
                utilisateurFinded &&
                    (0, IntermediateOfferJobData_1.readIntermediateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(intermediateOfferJobId));
                partenaireFinded &&
                    (0, IntermediateOfferJobData_1.readIntermediateOfferJobForExtracting)(Object(partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.datas[0].mounths[0]), Object(intermediateOfferJobId));
                usagerFinded && (0, IntermediateOfferJobData_1.readIntermediateOfferJobForExtracting)(Object(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.datas[0].mounths[0]), Object(intermediateOfferJobId));
                interlocutorFinded &&
                    (0, IntermediateOfferJobData_1.readIntermediateOfferJobForExtracting)(Object(interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.datas[0].mounths[0]), Object(intermediateOfferJobId));
                Response_1.default.info('An offer job has been created');
                return res.status(200).json({ message: 'The offer job has been found', offerJob: offerJobFinded });
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
    return Mission_1.default.findOne({ _id: req.params.missionId })
        .populate('intermediateOfferJob')
        .then((workStation) => res.status(200).json({ count: workStation === null || workStation === void 0 ? void 0 : workStation.intermediateOfferJob.length, workStation: workStation }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updateIntermediateOfferJob = (req, res, next) => {
    const intermediateOfferJobId = req.params.intermediateOfferJobId;
    return IntermediateOfferJob_1.default.findById(intermediateOfferJobId).then((offerJob) => __awaiter(void 0, void 0, void 0, function* () {
        if (!offerJob) {
            return res.status(404).json({ message: 'Not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
                offerJob.set(req.body);
                offerJob.history.push({
                    title: "Modification de l'offre",
                    date: new Date(),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: '',
                    comment: req.body.comment
                });
                return offerJob
                    .save()
                    .then((offerJob) => res.status(201).json({ offerJob: offerJob }))
                    .finally(() => {
                    (0, IntermediateOfferJobData_1.updateIntermediateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJob._id));
                })
                    .catch((error) => {
                    Response_1.default.error(`${error}`), res.status(500).json({ error: error.message });
                });
            }
        }
    }));
};
const deleteIntermediateOfferJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offerFinded = yield IntermediateOfferJob_1.default.findById(req.params.intermediateOfferJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const missionFinded = yield Mission_1.default.findOne({
            intermediateOfferJob: req.params.intermediateOfferJobId
        }).select('intermediateOfferJob offerJobArchiveds');
        if (!offerFinded || !utilisateurFinded) {
            Response_1.default.error(`'the offer job or utilisateur has been not found'`);
            return res.status(404).json({ error: 'the offer job or utilisateur has been not found' });
        }
        else {
            const { hasBeenTakenByOurServices, dateAboutIntermediateOfferJobAlreadyTaken, offerJobComment } = req.body;
            if (!hasBeenTakenByOurServices) {
                return res.status(404).json({ error: "the hasBeenTakenByOurServices's value has been not found" });
            }
            else {
                if (offerFinded.usagerPositioned.length >= 1) {
                    return res.status(404).json({ error: 'An usager is positioned on offer job' });
                }
                else {
                    const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/intermediateofferJob/create`, {
                        _id: offerFinded._id,
                        contractType: offerFinded.contractType,
                        numberHoursPerWeek: offerFinded.numberHoursPerWeek,
                        createdBy: offerFinded.createdBy,
                        offerName: offerFinded.offerName,
                        salary: Object(offerFinded).salary,
                        hasBeenTakenByOurServices,
                        status: `Offre déja pourvu par l'entreprise le ${new Date(dateAboutIntermediateOfferJobAlreadyTaken && dateAboutIntermediateOfferJobAlreadyTaken).toLocaleDateString('fr-FR', {
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
                        usagerWhoAcceptedTheIntermediateOfferJob: Object(offerFinded).usagerWhoAcceptedTheIntermediateOfferJob,
                        usagerWhoRefusedTheIntermediateOfferJob: Object(offerFinded).usagerWhoRefusedTheIntermediateOfferJob,
                        jobInterviews: Object(offerFinded).jobInterviews,
                        decouvertes: Object(offerFinded).decouvertes,
                        employmentContracts: Object(offerFinded).employmentContracts
                    });
                    if (archived.data.message === 'the intermediate offer job has been archived') {
                        const newArray = missionFinded === null || missionFinded === void 0 ? void 0 : missionFinded.intermediateOfferJob.filter((el) => JSON.stringify(el) !== JSON.stringify(offerFinded._id));
                        Object(missionFinded).intermediateOfferJob = newArray;
                        missionFinded === null || missionFinded === void 0 ? void 0 : missionFinded.intermediateOfferJobArchiveds.push(Object(offerFinded._id));
                        yield (missionFinded === null || missionFinded === void 0 ? void 0 : missionFinded.save());
                        (0, IntermediateOfferJobData_1.deleteIntermediateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), offerFinded._id);
                        yield offerFinded.deleteOne();
                        Response_1.default.info('The offer job has been archived');
                        return res.status(200).json({ message: 'The offer job has been archived' });
                    }
                    else {
                        Response_1.default.warn('Something went wrong in archives');
                        return res.status(200).json({ message: 'Something went wrong in archives' });
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
const intermediateOfferJobProcess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId, nameOfCompany, usagerIsInterested, entrepriseIsInterested, usagerId, comment, dateOfJobInterview, startingDateOfDecouverte, endingDateOfDecouverte, startingDateEmploymentContract, endingDateEmploymentContract, contractType, numberHourPerWeek, tasksList, skillsList, endingTryPeriodeDate, continuityOfThepreviousContract, previousContractId } = req.body;
        const offerJobFinded = yield IntermediateOfferJob_1.default.findById(req.params.intermediateOfferJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const usagerFindedForPositioning = yield Usager_1.default.findById(usagerId);
        const missionFinded = yield Mission_1.default.findOne({ intermediateOfferJob: offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id });
        const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: missionFinded === null || missionFinded === void 0 ? void 0 : missionFinded._id });
        const usagerPositionnedFoundByIntermediateOfferJobTab = yield Usager_1.default.findOne({
            intermediateOfferJobReceived: req.params.intermediateOfferJobId
        }).select('intermediateOfferJobReceived offerJobAccepted offerJobDenied jobInterviews decouvertes employmentContracts');
        const usagerFinded = yield Usager_1.default.findById(requesterId);
        if (!offerJobFinded) {
            Response_1.default.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        }
        else {
            if (offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") === true ||
                offerJobFinded.status.includes("Entretien d'embauche prévu") === true) {
                Response_1.default.error(`The entreprise and the Usager(e) are already agree, please process next step`);
                return res.status(500).json({
                    message: 'The entreprise and the Usager(e) are already agree, please process next step'
                });
            }
            else {
                if (utilisateurFinded) {
                    if (!usagerPositionnedFoundByIntermediateOfferJobTab) {
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
                            (0, UpdateIntermediateOfferJobAtTime_1.UpdateIntermediateOfferJobIn24h)(offerJobFinded._id);
                            usagerFindedForPositioning.intermediateOfferJobReceived.push(Object(offerJobFinded));
                            yield offerJobFinded.save();
                            yield usagerFindedForPositioning.save();
                            (0, SendSms_1.default)("Bonjour, Nous avons une offre d'emploi à vous proposer", Object(usagerFindedForPositioning)._id);
                            if (!nameOfCompany) {
                                Response_1.default.info('nameOfCompany is required');
                                return res.status(200).json({ message: 'nameOfCompany is required' });
                            }
                            else {
                                return res.status(200).json({ message: 'Offer job submited' });
                            }
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
                                    for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                    comment: req.body.comment
                                });
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.usagerWhoAcceptedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
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
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id));
                                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab.offerJobDenied.push(Object(offerJobFinded));
                                yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                yield offerJobFinded.save();
                                (0, SendSms_1.default)("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id);
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
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                usagerPositionnedFoundByIntermediateOfferJobTab.offerJobAccepted.push(Object(offerJobFinded));
                                yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                yield offerJobFinded.save();
                                (0, SendSms_1.default)("l'offre d'emlpoi n°12345678 vous a été réservé nous reviendrons vers vous des que possible", usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id);
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
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id));
                                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab.offerJobDenied.push(Object(offerJobFinded));
                                yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                yield offerJobFinded.save();
                                (0, SendSms_1.default)("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id);
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
                        else if (offerJobFinded.status.includes("Proposition à l'entreprise") === true) {
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
                                            for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab._id));
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
                                            usager: Object(usagerPositionnedFoundByIntermediateOfferJobTab._id),
                                            entreprise: Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id)
                                        });
                                        offerJobFinded.jobInterviews.push(Object(newJobInterview));
                                        usagerPositionnedFoundByIntermediateOfferJobTab.jobInterviews.push(Object(newJobInterview));
                                        yield offerJobFinded.save();
                                        yield newJobInterview.save();
                                        yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                        (0, JobInterview_2.createJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded._id), Object(usagerPositionnedFoundByIntermediateOfferJobTab._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
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
                                                usager: Object(usagerPositionnedFoundByIntermediateOfferJobTab._id)
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
                                                for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.decouvertes.push(Object(newDecouverte));
                                            usagerPositionnedFoundByIntermediateOfferJobTab.decouvertes.push(Object(newDecouverte));
                                            yield newDecouverte.save();
                                            yield offerJobFinded.save();
                                            yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                            (0, DecouverteData_1.createDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newDecouverte._id), Object(usagerPositionnedFoundByIntermediateOfferJobTab.id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
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
                                                usager: Object(usagerPositionnedFoundByIntermediateOfferJobTab._id),
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
                                                for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.employmentContracts.push(Object(newContract._id));
                                            usagerPositionnedFoundByIntermediateOfferJobTab.employmentContracts.push(Object(newContract._id));
                                            (0, EmploymentContract_2.createEmploymentContractForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newContract._id), Object(usagerPositionnedFoundByIntermediateOfferJobTab._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                            yield newContract.save();
                                            yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
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
                                            for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab._id));
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
                                        for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                        comment: req.body.comment
                                    });
                                    const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id));
                                    Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                    offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                    const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                    Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                    yield offerJobFinded.save();
                                    yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
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
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id));
                                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                offerJobFinded.usagerRefusedByEntreprise.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                                Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                yield usagerPositionnedFoundByIntermediateOfferJobTab.save();
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
                    if (JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab === null || usagerPositionnedFoundByIntermediateOfferJobTab === void 0 ? void 0 : usagerPositionnedFoundByIntermediateOfferJobTab._id) === JSON.stringify(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id)) {
                        Response_1.default.error("fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter");
                        return res.status(200).json({
                            message: "fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter"
                        });
                    }
                    else {
                        if (Object(offerJobFinded).usagerPositioned.length !== 0) {
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
                                usagerFinded.intermediateOfferJobReceived.push(Object(offerJobFinded));
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
    createIntermediateOfferJob,
    readIntermediateOfferJob,
    readAll,
    updateIntermediateOfferJob,
    deleteIntermediateOfferJob,
    intermediateOfferJobProcess
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJtZWRpYXRlT2ZmZXJKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvSW50ZXJtZWRpYXRlT2ZmZXJKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSwwRkFBa0U7QUFDbEUsd0VBQWdEO0FBQ2hELDBFQUFrRDtBQUNsRCw4REFBc0M7QUFDdEMsc0VBQThDO0FBQzlDLGdFQUF3QztBQUN4QyxzRUFBOEM7QUFDOUMsMEVBQWtEO0FBQ2xELHNFQUE4QztBQUM5QyxzRkFBOEQ7QUFHOUQsb0ZBSytDO0FBQy9DLDREQUE0RTtBQUM1RSxvR0FBZ0c7QUFHaEcsbUVBQXlDO0FBQ3pDLGlFQUEyQztBQUMzQyxnRUFBNEU7QUFDNUUsd0VBQXdGO0FBQ3hGLDhEQUFzQztBQUN0QyxrREFBMEI7QUFFMUIsTUFBTSwwQkFBMEIsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3pGLElBQUksQ0FBQztRQUNELE1BQU0sRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3hGLE1BQU0sYUFBYSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRSxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRSxNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDdkMsa0JBQU0sQ0FBQyxLQUFLLENBQUMs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