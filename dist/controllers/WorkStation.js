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
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const WorkStationData_1 = require("../functions/WorkStationData");
const WorkStationsPoleEmploi_1 = __importDefault(require("../models/WorkStationsPoleEmploi"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const Response_1 = __importDefault(require("../library/Response"));
const createWorkStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codeRome, workname, comments, definition, jobAccess, descriptionJobContext, precisionKnowHow, jobContextRequired, skillsRequired, knowHowRequired, precisionSkills, precisionJobContext } = req.body;
        const entrepriseFinded = yield Entreprise_1.default.findById(req.params.entrepriseId)
            .populate('workStations interlocutors')
            .select('workStations interlocutors');
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        if (!entrepriseFinded || !utilisateurFinded) {
            Response_1.default.warn('Utilisateur or Interlocutor has been not found');
            return res.status(404).json({ error: 'Utilisateur or Interlocutor has been not found' });
        }
        else {
            if (!workname) {
                Response_1.default.warn('One or more values are missing');
                return res.status(404).json({ error: 'One or more values are missing' });
            }
            else {
                const etablissementFinded = yield Etablissement_1.default.findOne({ utilisateurs: utilisateurFinded._id });
                if (!etablissementFinded) {
                    Response_1.default.warn('Etablissement has been not found');
                    return res.status(404).json({ error: 'Etablissement has been not found' });
                }
                else {
                    const workStation = new WorkStation_1.default({
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
                    const workStationFinded = entrepriseFinded.workStations.find((element) => Object(element).workname === workStation.workname &&
                        JSON.stringify(Object(element).etablissementFrom) === JSON.stringify(workStation.etablissementFrom));
                    if (workStationFinded !== undefined) {
                        Response_1.default.error('this work station already exist');
                        return res.status(400).json({ error: 'this work station already exist', workStation: workStationFinded });
                    }
                    else {
                        entrepriseFinded.workStations.push(Object(workStation));
                        yield workStation.save();
                        yield entrepriseFinded.save();
                        (0, WorkStationData_1.createWorkStationForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(workStation._id));
                        Response_1.default.info('the work station has been created');
                        return res.status(201).json({ message: 'the work station has been created', workStation: workStation });
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
const readWorkStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workStationFinded = yield WorkStation_1.default.findById(req.params.workStationId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!workStationFinded || !utilisateurFinded) {
            Response_1.default.warn('the work station or the utilisateur has been not found');
            return res.status(404).json({ error: 'the work station or the utilisateur has been not found' });
        }
        else {
            (0, WorkStationData_1.readWorkStationForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(workStationFinded._id));
            Response_1.default.info('workstation finded');
            return res.status(200).json({ workStation: workStationFinded });
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const readAll = (req, res, next) => {
    return Entreprise_1.default.findOne({ _id: req.params.entrepriseId })
        .populate('workStations')
        .select('workStations')
        .then((workStations) => res.status(200).json({ count: workStations === null || workStations === void 0 ? void 0 : workStations.workStations.length, workStations: workStations }))
        .catch((error) => {
        Response_1.default.error({ message: 'Error catched', error }), res.status(500).json({ error: error.message });
    });
};
const readAllPoleEmploi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseToUpdate = yield WorkStationsPoleEmploi_1.default.find().select('name jobs codeROME');
        return res.status(200).json(responseToUpdate);
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const readOneWorkStationPoleEmploi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return WorkStationsPoleEmploi_1.default.findById(req.params.workStationPoleEmploiId).then((workStation) => {
            if (workStation !== null) {
                Response_1.default.info(`work station ${workStation.name} readed`);
                res.status(200).json(workStation);
            }
            else {
                Response_1.default.warn('Work Station was not found');
                res.status(404).json('Work Station was not found');
            }
        });
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const updateWorkStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workStationId = req.params.workStationId;
    const workStationPoleEmploiFinded = yield WorkStationsPoleEmploi_1.default.find();
    return WorkStation_1.default.findById(workStationId).then((workStation) => __awaiter(void 0, void 0, void 0, function* () {
        if (!workStation) {
            Response_1.default.warn('The work station has been not found');
            return res.status(404).json({ message: 'The work station has been not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                Response_1.default.warn('requester has been not found');
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
                workStation.set(req.body);
                Response_1.default.info('workstation updated');
                return workStation
                    .save()
                    .then((workStation) => res.status(201).json({ workStation: workStation }))
                    .finally(() => {
                    (0, WorkStationData_1.updateWorkStationForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(workStation._id));
                })
                    .catch((error) => {
                    Response_1.default.error({ message: 'Error catched', error }), res.status(500).json({ error: error.message });
                });
            }
        }
    }));
});
const deleteWorkStation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workStationFinded = yield WorkStation_1.default.findById(req.params.workStationId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: req.params.workStationId }).select('workStations workStationsArchiveds');
        if (!workStationFinded || !utilisateurFinded) {
            Response_1.default.warn('the work station or utilisateur wan not found');
            return res.status(404).json({ error: 'the work station or utilisateur wan not found' });
        }
        else {
            if (Object(workStationFinded).offerJobs.length !== 0 || Object(workStationFinded).eventOfferJobs.length !== 0) {
                Response_1.default.warn('The workstation still have an or many offer jobs');
                return res.status(400).json('The workstation still have an or many offer jobs');
            }
            else {
                const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/workstation/create`, {
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
                    Response_1.default.warn('Something wane wrong in BDD Archive');
                }
                else {
                    const newArray = entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.workStations.filter((el) => JSON.stringify(el) !== JSON.stringify(workStationFinded._id));
                    Object(entrepriseFinded).workStations = newArray;
                    entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.workStationsArchiveds.push(Object(workStationFinded._id));
                    yield (entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.save());
                    (0, WorkStationData_1.deleteWorkStationForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), workStationFinded._id);
                    yield workStationFinded.deleteOne();
                    Response_1.default.info('The work station has been archived');
                    return res.status(200).json({ message: 'The work station has been archived' });
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
exports.default = { createWorkStation, readWorkStation, readAllPoleEmploi, readOneWorkStationPoleEmploi, readAll, updateWorkStation, deleteWorkStation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya1N0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvV29ya1N0YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSx3RUFBZ0Q7QUFDaEQsd0VBQWdEO0FBQ2hELHNFQUE4QztBQUM5Qyw0RUFBb0Q7QUFHcEQsa0VBS3NDO0FBQ3RDLDhGQUFzRTtBQUN0RSxrREFBMEI7QUFDMUIsOERBQXNDO0FBQ3RDLG1FQUF5QztBQUV6QyxNQUFNLGlCQUFpQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDaEYsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUNGLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFVBQVUsRUFDVixTQUFTLEVBQ1QscUJBQXFCLEVBQ3JCLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsbUJBQW1CLEVBQ3RCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUN0RSxRQUFRLENBQUMsNEJBQTRCLENBQUM7YUFDdEMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDMUMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMxQyxrQkFBTSxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQzlELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsZ0RB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