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
const Mission_1 = __importDefault(require("../models/Mission"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const MissionData_1 = require("../functions/MissionData");
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const Response_1 = __importDefault(require("../library/Response"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const createMission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, codeRome, workname, knowHowRequired, skillsRequired, comments } = req.body;
        const entrepriseFinded = yield Entreprise_1.default.findById(req.params.entrepriseId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        if (!entrepriseFinded || !utilisateurFinded) {
            return res.status(404).json({ error: 'Utilisateur or Interlocutor has been not found' });
        }
        else {
            if (!date || !workname) {
                return res.status(404).json({ error: 'One or more values are missing' });
            }
            else {
                const etablissementFinded = yield Etablissement_1.default.findOne({ utilisateurs: utilisateurFinded._id });
                if (!etablissementFinded) {
                    return res.status(404).json({ error: 'Etablissement has been not found' });
                }
                else {
                    const workStation = new Mission_1.default({
                        date,
                        workname,
                        codeRome,
                        etablissementFrom: Object(etablissementFinded._id),
                        knowHowRequired,
                        skillsRequired,
                        comments
                    });
                    const missionFinded = entrepriseFinded.missions.find((element) => Object(element).workname === workStation.workname &&
                        JSON.stringify(Object(element).etablissementFrom) === JSON.stringify(workStation.etablissementFrom));
                    if (missionFinded !== undefined) {
                        return res.status(400).json({ error: 'this mission already exist', workStation: missionFinded });
                    }
                    else {
                        entrepriseFinded.missions.push(Object(workStation));
                        yield workStation.save();
                        yield entrepriseFinded.save();
                        (0, MissionData_1.createMissionForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(workStation._id));
                        Response_1.default.info('the mission has been created');
                        return res.status(201).json({ message: 'the mission has been created', workStation: workStation });
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readMission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const missionFinded = yield Mission_1.default.findById(req.params.missionId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!missionFinded || !utilisateurFinded) {
            return res.status(404).json({ error: 'the mission or the utilisateur has been not found' });
        }
        else {
            (0, MissionData_1.readMissionForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(missionFinded._id));
            Response_1.default.info('misson has been found');
            return res.status(200).json({ workStation: missionFinded });
        }
    }
    catch (error) {
        Response_1.default.error({ error: error });
        return res.status(500).json({ error: error });
    }
});
const readAll = (req, res, next) => {
    return Entreprise_1.default.findOne({ _id: req.params.entrepriseId })
        .populate('missions')
        .select('missions')
        .then((missions) => {
        Response_1.default.info('All the missions has been readed'), res.status(200).json({ count: missions === null || missions === void 0 ? void 0 : missions.missions.length, missions: missions });
    })
        .catch((error) => {
        Response_1.default.error('error catched'), res.status(500).json({ message: 'error catched', error: error.message });
    });
};
const updateMission = (req, res, next) => {
    const missionId = req.params.missionId;
    return Mission_1.default.findById(missionId).then((workStation) => __awaiter(void 0, void 0, void 0, function* () {
        if (!workStation) {
            return res.status(404).json({ message: 'The mission has been not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
                workStation.set(req.body);
                return workStation
                    .save()
                    .then((workStation) => {
                    Response_1.default.info('Mission has been updated'), res.status(201).json({ workStation: workStation });
                })
                    .finally(() => {
                    (0, MissionData_1.updateMissionForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(workStation._id));
                })
                    .catch((error) => {
                    Response_1.default.error('error catched'), res.status(500).json({ error: error.message });
                });
            }
        }
    }));
};
const deleteMission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const missionFinded = yield Mission_1.default.findById(req.params.missionId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const entrepriseFinded = yield Entreprise_1.default.findOne({ missions: req.params.missionId }).select('missions missionsArchived');
        if (!missionFinded || !utilisateurFinded) {
            return res.status(404).json({ error: 'the mission or utilisateur wan not found' });
        }
        else {
            const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/mission/create`, {
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
                const newArray = entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.missions.filter((el) => JSON.stringify(el) !== JSON.stringify(missionFinded._id));
                Object(entrepriseFinded).missions = newArray;
                entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.missionsArchived.push(Object(missionFinded._id));
                yield (entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.save());
                (0, MissionData_1.deleteMissionForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), missionFinded._id);
                yield missionFinded.save();
                yield missionFinded.deleteOne();
                Response_1.default.info('mission deleted');
                return res.status(200).json({ message: 'The mission has been archived' });
            }
            else {
                Response_1.default.warn('Something went wrong in archives');
                return res.status(400).json('Something went wrong in archives');
            }
        }
    }
    catch (error) {
        Response_1.default.error({ error: error });
        return res.status(500).json({ error: error });
    }
});
exports.default = { createMission, readMission, readAll, updateMission, deleteMission };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9NaXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0EsZ0VBQXdDO0FBQ3hDLHdFQUFnRDtBQUNoRCxzRUFBOEM7QUFHOUMsMERBS2tDO0FBQ2xDLDRFQUFvRDtBQUNwRCxtRUFBeUM7QUFDekMsa0RBQTBCO0FBQzFCLDhEQUFzQztBQUV0QyxNQUFNLGFBQWEsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzVFLElBQUksQ0FBQztRQUNELE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDekYsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG9CQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMxQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdEQUFnRCxFQUFFLENBQUMsQ0FBQztRQUM3RixDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxnQ0FBZ0MsRUFBRSxDQUFDLENBQUM7WUFDN0UsQ0FBQztpQkFB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