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
const JobInterview_1 = __importDefault(require("../models/JobInterview"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const OfferJob_1 = __importDefault(require("../models/OfferJob"));
const Decouverte_1 = __importDefault(require("../models/Decouverte"));
const EmploymentContract_1 = __importDefault(require("../models/EmploymentContract"));
const Response_1 = __importDefault(require("../library/Response"));
const JobInterview_2 = require("../functions/JobInterview");
const DecouverteData_1 = require("../functions/DecouverteData");
const EmploymentContract_2 = require("../functions/EmploymentContract");
const OfferJobData_1 = require("../functions/OfferJobData");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const createJobInterview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { datePlanned, usagerComment, entrepriseComment } = req.body;
        const offerJobFinded = yield OfferJob_1.default.findById(req.params.offerJobId);
        const workStationFinded = yield WorkStation_1.default.findOne({ offerJobs: offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id });
        const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: workStationFinded });
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.usagerPositioned);
        if (!entrepriseFinded || !utilisateurFinded || !usagerFinded || !offerJobFinded) {
            return res.status(404).json({
                error: 'The entreprise, utilisateur, usager or the offer job has been not found'
            });
        }
        else {
            if ((offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.status) !== "Usager(e) accepté(e) par l'entreprise sans dates définies") {
                return res.status(401).json({ error: 'The status of the offer job is not available' });
            }
            else {
                const jobInterview = new JobInterview_1.default({
                    datePlanned,
                    status: `Entretien d'embauche prévu le ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`,
                    usager: usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id,
                    entreprise: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id,
                    usagerComment,
                    entrepriseComment
                });
                offerJobFinded.status = `Entretien d'embauche prévu le ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })}`;
                offerJobFinded.history.push({
                    title: `Entretien d'embauche prévu le ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`,
                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: usagerFinded._id,
                    comment: req.body.comment
                });
                offerJobFinded.jobInterviews.push(Object(jobInterview));
                usagerFinded.jobInterviews.push(Object(jobInterview));
                (0, JobInterview_2.createJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded._id), Object(usagerFinded._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                yield jobInterview.save();
                yield offerJobFinded.save();
                yield usagerFinded.save();
                return res.status(201).json({ message: 'The job interview has been created', jobInterview });
            }
        }
    }
    catch (error) {
        console.error({ message: 'Error Catched', error });
        Response_1.default.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
});
const readJobInterview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobInterviewFinded = yield JobInterview_1.default.findById(req.params.jobInterviewId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.headers.requesterid);
        const usagerFinded = yield Usager_1.default.findById(req.headers.requesterid);
        if (!jobInterviewFinded) {
            return res.status(404).json({ error: 'the job interview has been not found' });
        }
        else {
            if (utilisateurFinded) {
                (0, JobInterview_2.readJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(jobInterviewFinded._id), Object(jobInterviewFinded.usager), Object(jobInterviewFinded.entreprise));
                return res.status(200).json({ message: 'The job intervew has been found', jobInterviewFinded });
            }
            else if (interlocutorFinded) {
                const entrepriseFinded = yield Entreprise_1.default.findOne({
                    interlocutors: interlocutorFinded._id
                });
                if (JSON.stringify(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id) !== JSON.stringify(jobInterviewFinded.entreprise)) {
                    return res.status(401).json({ message: 'The interlocutor are not in this company' });
                }
                else {
                    (0, JobInterview_2.readJobInterviewForExtracting)(Object(interlocutorFinded.datas[0].mounths[0]), Object(jobInterviewFinded._id), Object(jobInterviewFinded.usager), Object(jobInterviewFinded.entreprise));
                    return res.status(200).json({ message: 'The job intervew has been found', jobInterviewFinded });
                }
            }
            else if (usagerFinded) {
                if (JSON.stringify(usagerFinded._id) !== JSON.stringify(jobInterviewFinded.usager)) {
                    return res.status(401).json({ message: 'The usager are not the candidate' });
                }
                else {
                    (0, JobInterview_2.readJobInterviewForExtracting)(Object(usagerFinded.datas[0].mounths[0]), Object(jobInterviewFinded._id), Object(jobInterviewFinded.usager), Object(jobInterviewFinded.entreprise));
                    return res.status(200).json({ message: 'The job intervew has been found', jobInterviewFinded });
                }
            }
            else {
                return res.status(200).json({ message: 'The requester has been found' });
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error catched');
        console.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const updateJobInterview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobInterview = yield JobInterview_1.default.findById(req.params.jobInterviewId);
        if (!jobInterview) {
            return res.status(404).json({ message: 'The job interview has been not found' });
        }
        else {
            if (jobInterview.usagerInterested || jobInterview.entrepriseInterested) {
                return res.status(403).json({ error: 'The job interview has been already updated' });
            }
            else {
                const { requesterId, datePlanned, dateOfAppointment, interestedAboutDecouverte, interestedAboutEmploymentContract, dateOfTheNextJobInterview, usagerInterested, entrepriseInterested, usagerComment, entrepriseComment, offerJobComment, startingDateOfDecouverte, endingDateOfDecouverte, startingDateEmploymentContract, endingDateEmploymentContract, contractType, numberHourPerWeek, tasksList, skillsList, endingTryPeriodeDate, continuityOfThepreviousContract, previousContractId } = req.body;
                const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
                const offerJobFinded = yield OfferJob_1.default.findOne({ jobInterviews: jobInterview._id });
                const usagerFinded = yield Usager_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.usagerPositioned);
                if (!utilisateurFinded) {
                    return res.status(404).json({ message: 'requester has been not found' });
                }
                else {
                    if (datePlanned) {
                        jobInterview.datePlanned = datePlanned;
                        jobInterview.status = `Entretien d'embauche repoussé au ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`;
                        usagerComment && jobInterview.usagerComment.push(usagerComment);
                        entrepriseComment && jobInterview.entrepriseComment.push(entrepriseComment);
                        Object(offerJobFinded).status = `Entretien d'embauche repoussé au ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`;
                        Object(offerJobFinded).history.push({
                            title: `Entretien d'embauche repoussé au ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`,
                            date: new Date(),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                            comment: offerJobComment
                        });
                        yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                        yield jobInterview.save();
                        (0, JobInterview_2.updateJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterview.usager), Object(jobInterview.entreprise));
                        return res.status(200).json({ message: 'The date for the job interview has been updated' });
                    }
                    else if (dateOfAppointment) {
                        if (typeof usagerInterested !== 'boolean' || typeof entrepriseInterested !== 'boolean') {
                            return res.status(404).json({
                                error: 'The response of the usager and the entreprise is required'
                            });
                        }
                        else {
                            if (!offerJobFinded || !usagerFinded) {
                                return res.status(401).json({ error: 'The offer job or the usager has been not found' });
                            }
                            else {
                                const workStationFinded = yield WorkStation_1.default.findOne({
                                    offerJobs: offerJobFinded._id
                                });
                                const entrepriseFinded = yield Entreprise_1.default.findOne({
                                    workStations: workStationFinded
                                });
                                if (usagerInterested === true && entrepriseInterested === true) {
                                    jobInterview.dateOfAppointment = dateOfAppointment;
                                    usagerComment && jobInterview.usagerComment.push(usagerComment);
                                    entrepriseComment && jobInterview.entrepriseComment.push(entrepriseComment);
                                    jobInterview.usagerInterested = usagerInterested;
                                    jobInterview.entrepriseInterested = entrepriseInterested;
                                    offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                                        title: `Entretien d'embauche réalisé le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`,
                                        date: new Date(),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    if (interestedAboutDecouverte === false && interestedAboutEmploymentContract === false) {
                                        if (!dateOfTheNextJobInterview) {
                                            return res.status(400).json({
                                                error: 'dateOfTheNextJobInterview is required'
                                            });
                                        }
                                        else {
                                            jobInterview.status = `prochain entretien d'embauche prévu le ${new Date(dateOfTheNextJobInterview).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            Object(offerJobFinded).status = `prochain entretien d'embauche prévu le ${new Date(dateOfTheNextJobInterview).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            Object(offerJobFinded).history.push({
                                                title: `prochain entretien d'embauche prévu le ${new Date(dateOfTheNextJobInterview).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`,
                                                date: new Date(),
                                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                                comment: ''
                                            });
                                            const newJobInterview = new JobInterview_1.default({
                                                datePlanned: dateOfTheNextJobInterview,
                                                usager: jobInterview.usager,
                                                entreprise: jobInterview.entreprise
                                            });
                                            yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                                            yield newJobInterview.save();
                                        }
                                    }
                                    else {
                                        if (interestedAboutDecouverte === true && interestedAboutEmploymentContract === false) {
                                            if (!startingDateOfDecouverte || !endingDateOfDecouverte) {
                                                Response_1.default.error('startingDateOfDecouverte or endingDateOfDecouverte has been not found');
                                                return res.status(403).json({
                                                    error: 'startingDateOfDecouverte or endingDateOfDecouverte has been not found'
                                                });
                                            }
                                            else {
                                                const newDecouverte = new Decouverte_1.default({
                                                    isFromAnEvent: false,
                                                    jobName: offerJobFinded.offerName,
                                                    startingDateEmploymentContract: startingDateOfDecouverte,
                                                    endingDate: endingDateOfDecouverte,
                                                    entreprise: Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id),
                                                    usager: Object(offerJobFinded.usagerPositioned)
                                                });
                                                usagerComment &&
                                                    newDecouverte.usagerComment.push({
                                                        date: new Date(dateOfAppointment),
                                                        comment: usagerComment
                                                    });
                                                entrepriseComment &&
                                                    newDecouverte.entrepriseComment.push({
                                                        date: new Date(dateOfAppointment),
                                                        comment: entrepriseComment
                                                    });
                                                jobInterview.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString('fr-FR', {
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
                                                    for: usagerFinded._id,
                                                    comment: offerJobComment
                                                });
                                                offerJobFinded.decouvertes.push(Object(newDecouverte));
                                                usagerFinded.decouvertes.push(Object(newDecouverte));
                                                yield jobInterview.save();
                                                yield offerJobFinded.save();
                                                yield usagerFinded.save();
                                                yield newDecouverte.save();
                                                (0, DecouverteData_1.createDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newDecouverte._id), Object(usagerFinded.id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                                (0, JobInterview_2.updateJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterview.usager), Object(jobInterview.entreprise));
                                                return res.status(200).json({
                                                    message: 'The job interview and the offer job has been updated about a decouverte'
                                                });
                                            }
                                        }
                                        else if (interestedAboutEmploymentContract === true && interestedAboutDecouverte === false) {
                                            if (!startingDateEmploymentContract ||
                                                !contractType ||
                                                !numberHourPerWeek ||
                                                !endingTryPeriodeDate ||
                                                typeof continuityOfThepreviousContract !== 'boolean') {
                                                Response_1.default.error('Some value(s) is missing');
                                                return res.status(403).json({ error: 'Some value(s) is missing' });
                                            }
                                            else {
                                                jobInterview.status = `Démarrage prévu le ${new Date(startingDateEmploymentContract).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`;
                                                offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                                                    title: `Démarrage prévu le ${new Date(startingDateEmploymentContract).toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    })}`,
                                                    date: new Date(),
                                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                    for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                                    comment: ''
                                                });
                                                const newContract = yield new EmploymentContract_1.default({
                                                    contractType: contractType,
                                                    workName: offerJobFinded.offerName,
                                                    numberOfHour: numberHourPerWeek,
                                                    tasksList: workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.knowHowRequired,
                                                    skillsList: workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.skillsRequired,
                                                    startingDate: startingDateEmploymentContract,
                                                    endingDate: endingDateEmploymentContract && endingDateEmploymentContract,
                                                    endingTryPeriodeDate,
                                                    continuityOfThepreviousContract,
                                                    previousContract: previousContractId && Object(previousContractId),
                                                    usager: Object(usagerFinded._id),
                                                    entreprise: Object(entrepriseFinded)._id
                                                });
                                                tasksList && tasksList.forEach((el) => newContract.tasksList.push(el));
                                                skillsList && skillsList.forEach((el) => newContract.skillsList.push(el));
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
                                                    for: usagerFinded._id,
                                                    comment: req.body.comment
                                                });
                                                offerJobFinded.employmentContracts.push(Object(newContract._id));
                                                usagerFinded.employmentContracts.push(Object(newContract._id));
                                                if (continuityOfThepreviousContract === true && !previousContractId) {
                                                    Response_1.default.error('The previousContractId is required');
                                                    return res.status(403).json({
                                                        message: 'The previousContractId is required'
                                                    });
                                                }
                                                else {
                                                    (0, JobInterview_2.updateJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterview.usager), Object(jobInterview.entreprise));
                                                    (0, EmploymentContract_2.createEmploymentContractForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(newContract._id), Object(usagerFinded._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                                                    yield offerJobFinded.save();
                                                    yield usagerFinded.save();
                                                    yield jobInterview.save();
                                                    yield newContract.save();
                                                    Response_1.default.info('The job interview and the offer job has been updated about a new employment contract');
                                                    return res.status(200).json({
                                                        message: 'The job interview and the offer job has been updated about a new employment contract'
                                                    });
                                                }
                                            }
                                        }
                                        else {
                                            Response_1.default.error('interestedAboutDecouverte and interestedAboutEmploymentContract is required but both on true is denied');
                                            return res.status(403).json({
                                                message: 'interestedAboutDecouverte and interestedAboutEmploymentContract is required but both on true is denied'
                                            });
                                        }
                                    }
                                }
                                else {
                                    jobInterview.dateOfAppointment = dateOfAppointment;
                                    usagerComment &&
                                        jobInterview.usagerComment.push({
                                            date: dateOfAppointment,
                                            comment: usagerComment
                                        });
                                    entrepriseComment &&
                                        jobInterview.entrepriseComment.push({
                                            date: dateOfAppointment,
                                            comment: entrepriseComment
                                        });
                                    jobInterview.usagerInterested = usagerInterested;
                                    jobInterview.entrepriseInterested = entrepriseInterested;
                                    Object(offerJobFinded).status = 'Disponible';
                                    offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                                        title: `Entretien d'embauche réalisé le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`,
                                        date: new Date(),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerFinded._id));
                                    Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                    const newArrayFromUsager = usagerFinded.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded._id));
                                    Object(usagerFinded).offerJobReceived = newArrayFromUsager;
                                    if (usagerInterested === false && entrepriseInterested === true) {
                                        jobInterview.status = `refus de l'usager après l'entretien d'embauche`;
                                        offerJobFinded.history.push({
                                            title: `refus de l'usager après l'entretien d'embauche`,
                                            date: new Date(dateOfAppointment),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerFinded._id,
                                            comment: offerJobComment
                                        });
                                        yield jobInterview.save();
                                        yield usagerFinded.save();
                                        yield offerJobFinded.save();
                                        (0, JobInterview_2.updateJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterview.usager), Object(jobInterview.entreprise));
                                        return res.status(200).json({
                                            message: 'The USAGER is no longer interested'
                                        });
                                    }
                                    else if (usagerInterested === true && entrepriseInterested === false) {
                                        jobInterview.status = `refus de l'entreprise après l'entretien d'embauche`;
                                        offerJobFinded.history.push({
                                            title: `refus de l'entreprise après l'entretien d'embauche`,
                                            date: new Date(dateOfAppointment),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerFinded._id,
                                            comment: offerJobComment
                                        });
                                        yield jobInterview.save();
                                        yield usagerFinded.save();
                                        yield offerJobFinded.save();
                                        (0, JobInterview_2.updateJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterview.usager), Object(jobInterview.entreprise));
                                        return res.status(200).json({
                                            message: 'The ENTREPRISE is no longer interested'
                                        });
                                    }
                                    else {
                                        jobInterview.status = `refus des 2 parties après l'entretien d'embauche`;
                                        offerJobFinded.history.push({
                                            title: `refus des 2 parties après l'entretien d'embauche`,
                                            date: new Date(dateOfAppointment),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerFinded._id,
                                            comment: offerJobComment
                                        });
                                        yield jobInterview.save();
                                        yield usagerFinded.save();
                                        yield offerJobFinded.save();
                                        (0, JobInterview_2.updateJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterview.usager), Object(jobInterview.entreprise));
                                        return res.status(200).json({
                                            message: 'The job interview and the offer job has been updated because no one of them is no longer interested'
                                        });
                                    }
                                }
                            }
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'Nothing has been updated' });
                    }
                }
            }
        }
    }
    catch (error) {
        console.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const deleteJobInterview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobInterviewFinded = yield JobInterview_1.default.findById(req.params.jobInterviewId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(jobInterviewFinded === null || jobInterviewFinded === void 0 ? void 0 : jobInterviewFinded.usager);
        const { usagerInterested, entrepriseInterested, usagerComment, entrepriseComment, offerJobComment, offerJobAlreadyTaken, dateOfCancel } = req.body;
        if (!jobInterviewFinded || !utilisateurFinded) {
            Response_1.default.error({ error: ' The requester or the job intervew has been not found' });
            return res.status(403).json({ error: 'The requester or the job intervew has been not found' });
        }
        else {
            const offerJobFinded = yield OfferJob_1.default.findOne({
                jobInterviews: jobInterviewFinded._id
            });
            const workStationFinded = yield WorkStation_1.default.findOne({ offerJobs: offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id });
            if (typeof jobInterviewFinded.usagerInterested === 'boolean' || typeof jobInterviewFinded.entrepriseInterested === 'boolean') {
                Response_1.default.error({ error: ' This job interview has been already passed' });
                return res.status(403).json({ error: 'This job interview has been already passed' });
            }
            else {
                if (jobInterviewFinded.status.includes("Entretien d'embauche annulé") === true ||
                    jobInterviewFinded.status.includes("Offre déja pourvu par l'entreprise le") === true) {
                    return res.status(403).json({ message: "this job interview has been already 'deleted' " });
                }
                else {
                    let whoCancel = '';
                    if (usagerInterested === false && entrepriseInterested === true) {
                        whoCancel = "l'usager";
                    }
                    else if (entrepriseInterested === false && usagerInterested === true) {
                        whoCancel = "l'entreprise";
                    }
                    else {
                        whoCancel = 'les 2 parties';
                    }
                    if (typeof usagerInterested === 'boolean' && typeof entrepriseInterested === 'boolean' && whoCancel !== '') {
                        jobInterviewFinded.status = `Entretien d'embauche annulé par ${whoCancel} le ${new Date(dateOfCancel).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`;
                        usagerComment &&
                            jobInterviewFinded.usagerComment.push({
                                date: new Date(dateOfCancel),
                                comment: usagerComment
                            });
                        entrepriseComment &&
                            jobInterviewFinded.entrepriseComment.push({
                                date: new Date(dateOfCancel),
                                comment: entrepriseComment
                            });
                        if (typeof offerJobAlreadyTaken !== 'boolean') {
                            Response_1.default.error({ error: 'offerJobAlreadyTaken is required' });
                            return res.status(500).json({ error: 'offerJobAlreadyTaken is required' });
                        }
                        else {
                            if (offerJobAlreadyTaken === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                Object(offerJobFinded).history.push({
                                    title: `Entretien d'embauche annulé par ${whoCancel} le ${new Date(dateOfCancel).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                    comment: offerJobComment
                                });
                                const newArray = Object(offerJobFinded).usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id));
                                Object(offerJobFinded).usagerPositioned = newArray;
                                (0, OfferJobData_1.updateOfferJobForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id));
                                (0, JobInterview_2.deleteJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id), Object(jobInterviewFinded.usager), Object(jobInterviewFinded.entreprise));
                                yield jobInterviewFinded.save();
                                yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                                return res.status(200).json({
                                    error: "The job intervew and the offer job has been updated and the status is 'Disponible"
                                });
                            }
                            else {
                                Object(offerJobFinded).status = `Offre déja pourvu par l'entreprise le ${new Date(dateOfCancel && dateOfCancel).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}`;
                                Object(offerJobFinded).history.push({
                                    title: `Offre déja pourvu par l'entreprise le ${new Date(dateOfCancel && dateOfCancel).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                    comment: offerJobComment
                                });
                                const newArray = Object(offerJobFinded).usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id));
                                Object(offerJobFinded).usagerPositioned = newArray;
                                const newArrayAboutWorkStation = Object(workStationFinded).offerJobs.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id));
                                Object(workStationFinded).offerJobs = newArrayAboutWorkStation;
                                Object(workStationFinded).offerJobArchiveds.push(offerJobFinded);
                                const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/offerJob/create`, {
                                    _id: Object(offerJobFinded)._id,
                                    contractType: Object(offerJobFinded).contractType,
                                    numberHoursPerWeek: Object(offerJobFinded).numberHoursPerWeek,
                                    createdBy: Object(offerJobFinded).createdBy,
                                    offerName: Object(offerJobFinded).offerName,
                                    salary: Object(offerJobFinded).salary,
                                    hasBeenTakenByOurServices: offerJobAlreadyTaken,
                                    status: `Offre déja pourvu par l'entreprise le ${new Date(dateOfCancel && dateOfCancel).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    history: Object(offerJobFinded).history,
                                    usagerPositioned: null,
                                    usagerAcceptedByEntreprise: Object(offerJobFinded).usagerAcceptedByEntreprise,
                                    usagerRefusedByEntreprise: Object(offerJobFinded).usagerRefusedByEntreprise,
                                    usagerWhoAcceptedTheOfferJob: Object(offerJobFinded).usagerWhoAcceptedTheOfferJob,
                                    usagerWhoRefusedTheOfferJob: Object(offerJobFinded).usagerWhoRefusedTheOfferJob,
                                    jobInterviews: Object(offerJobFinded).jobInterviews,
                                    decouvertes: Object(offerJobFinded).decouvertes,
                                    employmentContracts: Object(offerJobFinded).employmentContracts
                                });
                                if (archived.data.message === 'the offer job has been archived') {
                                    yield jobInterviewFinded.save();
                                    yield (workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.save());
                                    yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.deleteOne());
                                    (0, OfferJobData_1.deleteOfferJobForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded)._id);
                                    (0, JobInterview_2.deleteJobInterviewForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded)._id, Object(jobInterviewFinded).usager, Object(jobInterviewFinded).entreprise);
                                    Response_1.default.info('The job intervew and the offer job has been deleted');
                                    return res.status(200).json('The job intervew and the offer job has been deleted');
                                }
                                else {
                                    Response_1.default.warn('Something went wrong in archives');
                                    return res.status(400).json('Something went wrong in archives');
                                }
                            }
                        }
                    }
                    else {
                        Response_1.default.error({
                            error: 'usagerInterested and entrepriseInterested is required'
                        });
                        return res.status(500).json({
                            error: 'usagerInterested and entrepriseInterested is required'
                        });
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catrched', error: error });
        return res.status(500).json({ message: 'Error catrched', error: error });
    }
});
exports.default = { createJobInterview, readJobInterview, updateJobInterview, deleteJobInterview };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iSW50ZXJ2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL0pvYkludGVydmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLDBFQUFrRDtBQUNsRCx3RUFBZ0Q7QUFDaEQsd0VBQWdEO0FBQ2hELHNFQUE4QztBQUM5Qyw4REFBc0M7QUFDdEMsMEVBQWtEO0FBQ2xELGtFQUEwQztBQUMxQyxzRUFBOEM7QUFDOUMsc0ZBQThEO0FBRzlELG1FQUF5QztBQUd6Qyw0REFLbUM7QUFDbkMsZ0VBQTRFO0FBQzVFLHdFQUF3RjtBQUN4Riw0REFBcUc7QUFDckcsa0RBQTBCO0FBQzFCLDhEQUFzQztBQUd0QyxNQUFNLGtCQUFrQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDakYsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRW5FLE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RSxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEYsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG9CQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUN2RixNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRSxNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFN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