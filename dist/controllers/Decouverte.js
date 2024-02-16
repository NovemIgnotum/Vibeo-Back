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
const moment = require('moment');
const Decouverte_1 = __importDefault(require("../models/Decouverte"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const OfferJob_1 = __importDefault(require("../models/OfferJob"));
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Response_1 = __importDefault(require("../library/Response"));
const DecouverteData_1 = require("../functions/DecouverteData");
const OfferJobData_1 = require("../functions/OfferJobData");
const DecouverteSpontaneous_1 = __importDefault(require("../models/DecouverteSpontaneous"));
const DecouverteSpontaneousData_1 = require("../functions/DecouverteSpontaneousData");
const createDecouverte = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startingDate, endingDate, isFromAnEvent, skillsToAdd, usagerComment, entrepriseComment } = req.body;
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
                if (!startingDate || !endingDate || typeof isFromAnEvent !== 'boolean') {
                    Response_1.default.error({ message: 'some value(s) is missing' });
                    return res.status(500).json({ message: 'some value(s) is missing' });
                }
                else {
                    const decouverte = new Decouverte_1.default({
                        startingDate,
                        endingDate,
                        skillsAquired: workStationFinded === null || workStationFinded === void 0 ? void 0 : workStationFinded.skillsRequired,
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
                        usager: usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id,
                        entreprise: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id,
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
                    (0, DecouverteData_1.createDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded._id), Object(usagerFinded._id), Object(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id));
                    yield decouverte.save();
                    yield offerJobFinded.save();
                    yield usagerFinded.save();
                    return res.status(201).json({ message: 'The decouverte has been created', decouverte });
                }
            }
        }
    }
    catch (error) {
        console.error({ message: 'Error Catched', error });
        Response_1.default.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
});
const createDecouverteSpontaneous = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startingDate, endingDate, isFromAnEvent, usagerComment, entrepriseComment, skillsAquired, knowHowsAquired, contextesJobAquired, jobName } = req.body;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(req.body.usagerId);
        const entrepriseFinded = yield Entreprise_1.default.findById(req.body.entrepriseId);
        if (!utilisateurFinded || !usagerFinded || !entrepriseFinded) {
            Response_1.default.error('The utilisateur, entreprise or the usager has been not found');
            return res.status(404).json({
                error: 'The utilisateur, entreprise or the usager has been not found'
            });
        }
        else {
            if (!startingDate || !endingDate || typeof isFromAnEvent !== 'boolean') {
                Response_1.default.error({ message: 'some value(s) is missing' });
                return res.status(500).json({ message: 'some value(s) is missing' });
            }
            else {
                const decouverte = new DecouverteSpontaneous_1.default({
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
                    usager: usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id,
                    entreprise: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id,
                    usagerComment: usagerComment && { date: new Date(), comment: usagerComment },
                    entrepriseComment: entrepriseComment && { date: new Date(), comment: entrepriseComment }
                });
                usagerFinded.decouvertesSpontaneous.push(Object(decouverte));
                (0, DecouverteSpontaneousData_1.createDecouverteSpontaneousForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(decouverte._id), Object(usagerFinded._id), Object(entrepriseFinded._id));
                yield decouverte.save();
                yield usagerFinded.save();
                Response_1.default.info('The decouverte has been created');
                return res.status(201).json({ message: 'The decouverte has been created', decouverte });
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
});
const readDecouverte = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decouverteFinded = yield Decouverte_1.default.findById(req.params.decouvertId);
        const decouverteSpontaneousFinded = yield DecouverteSpontaneous_1.default.findById(req.params.decouvertId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.headers.requesterid);
        const usagerFinded = yield Usager_1.default.findById(req.headers.requesterid);
        if (!decouverteFinded && !decouverteSpontaneousFinded) {
            return res.status(404).json({ error: 'the decouverte has been not found' });
        }
        else {
            if (decouverteFinded) {
                if (utilisateurFinded) {
                    (0, DecouverteData_1.readDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(decouverteFinded._id), Object(decouverteFinded.usager), Object(decouverteFinded.entreprise));
                    return res.status(200).json(decouverteFinded);
                }
                else if (interlocutorFinded) {
                    const entrepriseFinded = yield Entreprise_1.default.findOne({
                        interlocutors: interlocutorFinded._id
                    });
                    if (JSON.stringify(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id) !== JSON.stringify(decouverteFinded.entreprise)) {
                        return res.status(401).json({ message: 'The interlocutor are not in this company' });
                    }
                    else {
                        (0, DecouverteData_1.readDecouverteForExtracting)(Object(interlocutorFinded.datas[0].mounths[0]), Object(decouverteFinded._id), Object(decouverteFinded.usager), Object(decouverteFinded.entreprise));
                        return res.status(200).json(decouverteFinded);
                    }
                }
                else if (usagerFinded) {
                    if (JSON.stringify(usagerFinded._id) !== JSON.stringify(decouverteFinded.usager)) {
                        return res.status(401).json({ message: 'The usager are not the candidate' });
                    }
                    else {
                        (0, DecouverteData_1.readDecouverteForExtracting)(Object(usagerFinded.datas[0].mounths[0]), Object(decouverteFinded._id), Object(decouverteFinded.usager), Object(decouverteFinded.entreprise));
                        return res.status(200).json(decouverteFinded);
                    }
                }
            }
            else if (decouverteSpontaneousFinded) {
                if (utilisateurFinded) {
                    (0, DecouverteData_1.readDecouverteForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(decouverteSpontaneousFinded._id), Object(decouverteSpontaneousFinded.usager), Object(decouverteSpontaneousFinded.entreprise));
                    return res.status(200).json(decouverteSpontaneousFinded);
                }
                else if (interlocutorFinded) {
                    const entrepriseFinded = yield Entreprise_1.default.findOne({
                        interlocutors: interlocutorFinded._id
                    });
                    if (JSON.stringify(entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded._id) !== JSON.stringify(decouverteSpontaneousFinded.entreprise)) {
                        return res.status(401).json({ message: 'The interlocutor are not in this company' });
                    }
                    else {
                        (0, DecouverteData_1.readDecouverteForExtracting)(Object(interlocutorFinded.datas[0].mounths[0]), Object(decouverteSpontaneousFinded._id), Object(decouverteSpontaneousFinded.usager), Object(decouverteSpontaneousFinded.entreprise));
                        return res.status(200).json(decouverteSpontaneousFinded);
                    }
                }
                else if (usagerFinded) {
                    if (JSON.stringify(usagerFinded._id) !== JSON.stringify(decouverteSpontaneousFinded.usager)) {
                        return res.status(401).json({ message: 'The usager are not the candidate' });
                    }
                    else {
                        (0, DecouverteData_1.readDecouverteForExtracting)(Object(usagerFinded.datas[0].mounths[0]), Object(decouverteSpontaneousFinded._id), Object(decouverteSpontaneousFinded.usager), Object(decouverteSpontaneousFinded.entreprise));
                        return res.status(200).json(decouverteSpontaneousFinded);
                    }
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
const readAll = (req, res, next) => {
    return Decouverte_1.default.find()
        .then((decouvertes) => res.status(200).json({ message: decouvertes }))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateDecouverte = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decouverteFinded = yield Decouverte_1.default.findById(req.params.decouverteId);
        const decouverteSpontaneousFinded = yield DecouverteSpontaneous_1.default.findById(req.params.decouverteId);
        const { newStartingDate, newEndingDate, usagerComment, entrepriseComment } = req.body;
        if (decouverteFinded) {
            return Decouverte_1.default.findById(decouverteFinded._id).then((decouverte) => __awaiter(void 0, void 0, void 0, function* () {
                if (!decouverte) {
                    return res.status(404).json({ message: 'Not found' });
                }
                else {
                    if (decouverte.validatedByUsager || decouverte.validatedByEntreprise) {
                        return res.status(400).json({ message: 'The decouverte is already passed' });
                    }
                    else {
                        const offerJobFinded = yield OfferJob_1.default.findOne({ decouvertes: decouverte._id });
                        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
                        const usagerFinded = yield Usager_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.usagerPositioned[0]).select('account');
                        if (!utilisateurFinded) {
                            return res.status(404).json({ message: 'requester has been not found' });
                        }
                        else {
                            if (newStartingDate || newEndingDate) {
                                const first = decouverte.startingDate;
                                const second = newStartingDate;
                                const x = moment(first);
                                const y = moment(second);
                                const diffInDays = y.diff(x, 'days');
                                decouverte.startingDate = newStartingDate;
                                decouverte.endingDate = newEndingDate;
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });
                                Object(offerJobFinded).status = `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(newStartingDate).toLocaleDateString('fr-FR', {
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
                                    title: `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(newStartingDate).toLocaleDateString('fr-FR', {
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
                                    })}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                    comment: req.body.comment
                                });
                                yield Object(offerJobFinded).save();
                                yield decouverte.save();
                                (0, DecouverteData_1.updateDecouverteForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverte._id), Object(decouverte.usager), Object(decouverte.entreprise));
                                Response_1.default.log({ Message: 'The dates has been updated' });
                                return res.status(200).json({ message: 'The dates has been updated' });
                            }
                            else if (usagerComment || entrepriseComment) {
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });
                                offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                                    title: `Ajout d'un nouveau commentaire à la découverte ${decouverte._id}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                    comment: req.body.comment
                                });
                                yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                                yield decouverte.save();
                                Response_1.default.log({ Message: 'Comment has been pushed' });
                                (0, DecouverteData_1.updateDecouverteForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverte._id), Object(decouverte.usager), Object(decouverte.entreprise));
                                return res.status(200).json({ Message: 'Comment has been pushed', decouverte });
                            }
                            else {
                                Response_1.default.error({ message: 'The dates or the comments is missing' });
                                return res.status(403).json({ message: 'The dates or the comments is missing' });
                            }
                        }
                    }
                }
            }));
        }
        else if (decouverteSpontaneousFinded) {
            return DecouverteSpontaneous_1.default.findById(decouverteSpontaneousFinded._id).then((decouverte) => __awaiter(void 0, void 0, void 0, function* () {
                if (!decouverte) {
                    return res.status(404).json({ message: 'Not found' });
                }
                else {
                    if (decouverte.validatedByUsager || decouverte.validatedByEntreprise) {
                        return res.status(400).json({ message: 'The decouverte is already passed' });
                    }
                    else {
                        const offerJobFinded = yield OfferJob_1.default.findOne({ decouvertes: decouverte._id });
                        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
                        const usagerFinded = yield Usager_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.usagerPositioned[0]).select('account');
                        if (!utilisateurFinded) {
                            return res.status(404).json({ message: 'requester has been not found' });
                        }
                        else {
                            if (newStartingDate || newEndingDate) {
                                const first = decouverte.startingDate;
                                const second = newStartingDate;
                                const x = moment(first);
                                const y = moment(second);
                                const diffInDays = y.diff(x, 'days');
                                decouverte.startingDate = newStartingDate;
                                decouverte.endingDate = newEndingDate;
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });
                                Object(offerJobFinded).status = `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(newStartingDate).toLocaleDateString('fr-FR', {
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
                                    title: `Découverte ${diffInDays <= 0 ? 'avancée' : 'repoussée'} du ${new Date(newStartingDate).toLocaleDateString('fr-FR', {
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
                                    })}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                    comment: req.body.comment
                                });
                                yield Object(offerJobFinded).save();
                                yield decouverte.save();
                                (0, DecouverteSpontaneousData_1.updateDecouverteSpontaneousForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverte._id), Object(decouverte.usager), Object(decouverte.entreprise));
                                Response_1.default.log({ Message: 'The dates has been updated' });
                                return res.status(200).json({ message: 'The dates has been updated' });
                            }
                            else if (usagerComment || entrepriseComment) {
                                usagerComment && decouverte.usagerComment.push({ date: new Date(), comment: usagerComment });
                                entrepriseComment && decouverte.entrepriseComment.push({ date: new Date(), comment: entrepriseComment });
                                offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                                    title: `Ajout d'un nouveau commentaire à la découverte ${decouverte._id}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                    comment: req.body.comment
                                });
                                yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                                yield decouverte.save();
                                Response_1.default.log({ Message: 'Comment has been pushed' });
                                (0, DecouverteSpontaneousData_1.updateDecouverteSpontaneousForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverte._id), Object(decouverte.usager), Object(decouverte.entreprise));
                                return res.status(200).json({ Message: 'Comment has been pushed', decouverte });
                            }
                            else {
                                Response_1.default.error({ message: 'The dates or the comments is missing' });
                                return res.status(403).json({ message: 'The dates or the comments is missing' });
                            }
                        }
                    }
                }
            }));
        }
        else {
            Response_1.default.warn('decouverte was not found');
            return res.status(400).json('decouverte was not found');
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const deleteDecouverte = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decouverteFinded = yield Decouverte_1.default.findById(req.params.decouverteId);
        const usagerFinded = yield Usager_1.default.findOne({ decouvertes: Object(decouverteFinded)._id });
        const { requesterId, validatedByUsager, validatedByEntreprise, stillAvailable, dateOfCancel, usagerComment, entrepriseComment, offerJobComment } = req.body;
        if (!decouverteFinded) {
            Response_1.default.error({ message: 'Decouverte has been not found' });
            return res.status(500).json({ message: 'Decouverte has been not found' });
        }
        else {
            if (decouverteFinded.validatedByUsager || decouverteFinded.validatedByEntreprise) {
                return res.status(400).json({ message: 'The decouverte is already passed' });
            }
            else {
                const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
                if (!utilisateurFinded) {
                    Response_1.default.error({ message: 'The requester has been not found' });
                    return res.status(500).json({ message: 'The requester has been not found' });
                }
                else {
                    if (typeof validatedByUsager !== 'boolean' || typeof validatedByEntreprise !== 'boolean') {
                        Response_1.default.error({ message: 'The validate return has been not found' });
                        return res.status(500).json({ message: 'The validate return has been not found' });
                    }
                    else {
                        const offerJobFinded = yield OfferJob_1.default.findOne({ decouvertes: Object(decouverteFinded)._id });
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
                                for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                                comment: offerJobComment
                            });
                        }
                        else {
                            if (typeof stillAvailable !== 'boolean' && !dateOfCancel) {
                                Response_1.default.error({ error: 'stillAvalaible is required' });
                                return res.status(500).json({ error: 'stillAvailable is required' });
                            }
                            else {
                                if (stillAvailable) {
                                    Object(offerJobFinded).status = `Disponible`;
                                    Object(offerJobFinded).history.push({
                                        title: `Offre d'emploi redevenue disponible après une période de découverte`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    const newArrayOfferJob = Object(offerJobFinded).usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id));
                                    Object(offerJobFinded).usagerPositioned = newArrayOfferJob;
                                    const newArrrayUsager = Object(usagerFinded).offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id));
                                    Object(usagerFinded).offerJobReceived = newArrrayUsager;
                                    yield Object(offerJobFinded).save();
                                    yield Object(usagerFinded).save();
                                    yield Object(decouverteFinded).deleteOne();
                                    (0, OfferJobData_1.updateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded)._id);
                                    (0, DecouverteData_1.deleteDecouverteForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverteFinded._id), Object(decouverteFinded).usager._id, Object(decouverteFinded).entreprise._id);
                                    Response_1.default.log({ message: 'Decouverte has been deleted and the offer job is still available' });
                                    return res.status(200).json({ message: 'Decouverte has been deleted and the offer job is still available' });
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
                                        title: `Offre d'emploi redevenue disponible après une période de découverte`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    const newArrayOfferJob = Object(offerJobFinded).usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id));
                                    Object(offerJobFinded).usagerPositioned = newArrayOfferJob;
                                    const newArrrayUsager = Object(usagerFinded).offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id));
                                    Object(usagerFinded).offerJobReceived = newArrrayUsager;
                                    yield Object(offerJobFinded).save();
                                    yield Object(usagerFinded).save();
                                    yield Object(decouverteFinded).deleteOne();
                                    (0, OfferJobData_1.updateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverteFinded._id));
                                    (0, DecouverteData_1.deleteDecouverteForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(decouverteFinded._id), Object(decouverteFinded).usager._id, Object(decouverteFinded).entreprise._id);
                                    Response_1.default.log({ message: 'Decouverte has been deleted and the offer job is not still available' });
                                    return res.status(200).json({ message: 'Decouverte has been deleted and the offer job is not still available' });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
exports.default = { createDecouverte, createDecouverteSpontaneous, readDecouverte, readAll, updateDecouverte, deleteDecouverte };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3V2ZXJ0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9EZWNvdXZlcnRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBR2pDLHNFQUE4QztBQUM5Qyx3RUFBZ0Q7QUFDaEQsa0VBQTBDO0FBQzFDLHdFQUFnRDtBQUNoRCxzRUFBOEM7QUFDOUMsOERBQXNDO0FBQ3RDLDBFQUFrRDtBQUdsRCxtRUFBeUM7QUFHekMsZ0VBS3FDO0FBQ3JDLDREQUF3RTtBQUN4RSw0RkFBb0U7QUFDcEUsc0ZBQTRJO0FBRzVJLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMvRSxJQUFJLENBQUM7UUFDRCxNQUFNLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDNUcsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4RixNQUFNLGdCQUFnQixHQUFHLE1BQU0sb0JBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLE1BQU0s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