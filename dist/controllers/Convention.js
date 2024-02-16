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
const uid2 = require('uid2');
const cloudinary = require('cloudinary');
const Convention_1 = __importDefault(require("../models/Convention"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Logging_1 = __importDefault(require("../library/Logging"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const ConventionData_1 = require("../functions/ConventionData");
const DataConvention_1 = __importDefault(require("../models/DataConvention"));
const axios_1 = __importDefault(require("axios"));
const Response_1 = __importDefault(require("../library/Response"));
const config_1 = __importDefault(require("../config/config"));
const createConvention = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = uid2(26);
        const fileKeys = Object(req.files).file;
        const etablissementFinded = yield Etablissement_1.default.findById(req.body.etablissementId);
        function isAlreadyExist(name, startingDate, endingDate) {
            return __awaiter(this, void 0, void 0, function* () {
                const allConvention = yield Convention_1.default.find({ name: name, endingDate: endingDate, startingDate: startingDate });
                if (allConvention.length !== 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
        if ((yield isAlreadyExist(req.body.name, req.body.startingDate, req.body.endingDate)) === true) {
            Logging_1.default.error("the convention's already exist");
            return res.status(400).json({ message: "the convention's already exist" });
        }
        else if (!etablissementFinded) {
            Logging_1.default.error('the etablissement has been not found');
            return res.status(400).json({ message: 'the etablissement has been not found' });
        }
        else {
            if (fileKeys === undefined) {
                const dateNow = new Date();
                const newData = new DataConvention_1.default({
                    month: dateNow.getMonth() + 1
                });
                const convention = new Convention_1.default({
                    name: req.body.name,
                    startingDate: req.body.startingDate,
                    endingDate: req.body.endingDate,
                    objectifs: {
                        numberOfEntries: req.body.numberOfEntries,
                        numberOfActivityStarted: req.body.numberOfActivityStarted,
                        numberOfActivityStartedForLongTime: req.body.numberOfActivityStartedForLongTime,
                        NumberOfExitForGood: req.body.NumberOfExitForGood
                    },
                    actionSheet: {
                        description: req.body.description,
                        public: req.body.public,
                        actionObjectif: req.body.actionObjectif,
                        positiveExitCriteria: req.body.positiveExitCriteria,
                        balanceSheetPreparation: req.body.balanceSheetPreparation
                    },
                    managements: {
                        responsibleOfTheConvention: req.body.responsibleOfTheConvention,
                        adjointResponsibleOfTheConvention: req.body.adjointResponsibleOfTheConvention,
                        AdministrativeOfficer: req.body.AdministrativeOfficer,
                        TheTeam: req.body.TheTeam
                    },
                    datas: { year: dateNow.getFullYear() },
                    orientations: req.body.orientations,
                    entrees: req.body.entrees,
                    usagersOuted: req.body.usagersOuted,
                    token: token
                });
                etablissementFinded.conventions.push(Object(convention._id));
                convention.datas[0].mounths.push(newData._id);
                (0, ConventionData_1.CreateConvention)((_a = req.body.admin) === null || _a === void 0 ? void 0 : _a.datas[0].mounths[0], convention._id);
                yield newData.save();
                yield etablissementFinded.save();
                return yield convention
                    .save()
                    .then((convention) => {
                    Logging_1.default.info('Convention created'), res.status(201).json({ convention: convention });
                })
                    .catch((error) => res.status(500).json({ message: 'error catched', error: error.message }));
            }
            else {
                let results = [];
                for (const path of fileKeys) {
                    const result = yield cloudinary.v2.uploader.upload(path.path);
                    results.push({ public_id: result.public_id, url: result.secure_url });
                    if (fileKeys.length === results.length) {
                        const dateNow = new Date();
                        const newData = new DataConvention_1.default({
                            month: dateNow.getMonth() + 1
                        });
                        const convention = new Convention_1.default({
                            name: req.body.name,
                            startingDate: req.body.startingDate,
                            endingDate: req.body.endingDate,
                            objectifs: {
                                numberOfEntries: req.body.numberOfEntries,
                                numberOfActivityStarted: req.body.numberOfActivityStarted,
                                numberOfActivityStartedForLongTime: req.body.numberOfActivityStartedForLongTime,
                                NumberOfExitForGood: req.body.NumberOfExitForGood
                            },
                            logos: results,
                            actionSheet: {
                                description: req.body.description,
                                public: req.body.public,
                                actionObjectif: req.body.actionObjectif,
                                positiveExitCriteria: req.body.positiveExitCriteria,
                                balanceSheetPreparation: req.body.balanceSheetPreparation
                            },
                            managements: {
                                responsibleOfTheConvention: req.body.responsibleOfTheConvention,
                                adjointResponsibleOfTheConvention: req.body.adjointResponsibleOfTheConvention,
                                AdministrativeOfficer: req.body.AdministrativeOfficer,
                                TheTeam: req.body.TheTeam
                            },
                            datas: { year: dateNow.getFullYear() },
                            orientations: req.body.orientations,
                            entrees: req.body.entrees,
                            usagersOuted: req.body.usagersOuted,
                            token: token
                        });
                        etablissementFinded.conventions.push(Object(convention));
                        convention.datas[0].mounths.push(newData._id);
                        yield newData.save();
                        yield etablissementFinded.save();
                        (0, ConventionData_1.CreateConvention)((_b = req.body.admin) === null || _b === void 0 ? void 0 : _b.datas[0].mounths[0], convention);
                        return yield convention
                            .save()
                            .then((convention) => {
                            Logging_1.default.info('Convention created'), res.status(201).json({ convention: convention });
                        })
                            .catch((error) => res.status(500).json({ message: 'error catched', error: error.message }));
                    }
                }
            }
        }
    }
    catch (error) {
        return res.status(422).json({ message: 'error catched', error: error });
    }
});
const readConvention = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conventionId = req.params.conventionId;
        const requester = req.headers.requesterid;
        const utilisateurFinded = yield Utilisateur_1.default.findById(requester);
        const conventionFinded = yield Convention_1.default.findById(conventionId).populate('prescriptions orientations entrees usagersOuted');
        if (!conventionFinded) {
            return res.status(404).json({ message: 'Convention has been not found' });
        }
        else {
            if (utilisateurFinded) {
                (0, ConventionData_1.ReadConvention)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(conventionId));
                return res.status(200).json({ convention: conventionFinded });
            }
            else {
                return res.status(404).json({ message: "the requester's id has been not found" });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'error catched' });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Etablissement_1.default.findById(req.params.etablissementId)
        .populate('conventions')
        .select('conventions')
        .then((conventions) => res.status(200).json({ count: Object(conventions).conventions.length, conventions: Object(conventions).conventions }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updateConvention = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const conventionId = req.params.conventionId;
    const conventionFinded = yield Convention_1.default.findById(conventionId);
    const fileKeys = Object(req.files).file;
    const numLogoStarted = conventionFinded === null || conventionFinded === void 0 ? void 0 : conventionFinded.logos.length;
    if (conventionFinded) {
        if (req.body.objectifs) {
            conventionFinded.objectifs = req.body.objectifs;
        }
        req.body.description && (conventionFinded.actionSheet.description = req.body.description);
        req.body.public && (conventionFinded.actionSheet.public = req.body.public);
        req.body.actionObjectif && (conventionFinded.actionSheet.actionObjectif = req.body.actionObjectif);
        req.body.positiveExitCriteria && (conventionFinded.actionSheet.positiveExitCriteria = req.body.positiveExitCriteria);
        req.body.balanceSheetPreparation && (conventionFinded.actionSheet.balanceSheetPreparation = req.body.balanceSheetPreparation);
        if (fileKeys !== undefined) {
            for (const path of fileKeys) {
                const result = yield cloudinary.v2.uploader.upload(path.path);
                const logo = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
                Object(conventionFinded).logos.push(logo);
            }
            if (numLogoStarted === Object(conventionFinded).logos.length - fileKeys.length) {
                yield (conventionFinded === null || conventionFinded === void 0 ? void 0 : conventionFinded.save());
                (0, ConventionData_1.UpdateConvention)(Object((_c = req.body.admin) === null || _c === void 0 ? void 0 : _c.datas[0].mounths[0]), Object(conventionFinded));
                return res.status(200).json({ message: 'Pictures uploaded', convention: Object(conventionFinded) });
            }
            else {
                return res.status(400).json({ message: 'Pictures arent uploaded' });
            }
        }
        else if (req.body.logoIdToDelete) {
            const newArray = conventionFinded.logos.filter((el) => Object(el).public_id !== req.body.logoIdToDelete);
            Object(conventionFinded).logos = newArray;
            const result = yield cloudinary.v2.uploader.destroy(req.body.logoIdToDelete);
            if (result.result !== 'not found') {
                yield conventionFinded.save();
                (0, ConventionData_1.UpdateConvention)(Object((_d = req.body.admin) === null || _d === void 0 ? void 0 : _d.datas[0].mounths[0]), Object(conventionFinded));
                return res.status(200).json({ message: "logo's deleted" });
            }
            else {
                return res.status(400).json({ message: "logo's not finded" });
            }
        }
        if (req.body.responsibleOfTheConvention) {
            const adminFinded = yield Utilisateur_1.default.findById(req.body.responsibleOfTheConvention);
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.responsibleOfTheConvention);
            if (adminFinded) {
                conventionFinded.managements.responsibleOfTheConvention = Object(adminFinded)._id;
            }
            else {
                conventionFinded.managements.responsibleOfTheConvention = Object(utilisateurFinded)._id;
            }
        }
        if (req.body.adjointResponsibleOfTheConvention) {
            const adminFinded = yield Utilisateur_1.default.findById(req.body.adjointResponsibleOfTheConvention);
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.adjointResponsibleOfTheConvention);
            if (adminFinded) {
                conventionFinded.managements.adjointResponsibleOfTheConvention = Object(adminFinded)._id;
            }
            else {
                conventionFinded.managements.adjointResponsibleOfTheConvention = Object(utilisateurFinded)._id;
            }
        }
        if (req.body.AdministrativeOfficer) {
            const adminFinded = yield Utilisateur_1.default.findById(req.body.AdministrativeOfficer);
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.AdministrativeOfficer);
            if (adminFinded) {
                conventionFinded.managements.AdministrativeOfficer = Object(adminFinded)._id;
            }
            else {
                conventionFinded.managements.AdministrativeOfficer = Object(utilisateurFinded)._id;
            }
        }
        if (req.body.TheTeam) {
            if (typeof req.body.TheTeam === 'string') {
                const adminFinded = yield Utilisateur_1.default.findById(req.body.TheTeam);
                const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.TheTeam);
                if (adminFinded) {
                    conventionFinded.managements.TheTeam = Object(adminFinded)._id;
                }
                else {
                    conventionFinded.managements.TheTeam = Object(utilisateurFinded)._id;
                }
            }
            else {
                let newArray = [];
                for (const key of req.body.TheTeam) {
                    const adminFinded = yield Utilisateur_1.default.findById(key);
                    const utilisateurFinded = yield Utilisateur_1.default.findById(key);
                    if (adminFinded) {
                        newArray.push(Object(adminFinded)._id);
                    }
                    else {
                        newArray.push(Object(utilisateurFinded)._id);
                    }
                }
                Object(conventionFinded).managements.TheTeam = newArray;
            }
        }
        conventionFinded.set(req.body);
        return conventionFinded
            .save()
            .then((convention) => {
            var _a;
            (0, ConventionData_1.UpdateConvention)(Object((_a = req.body.admin) === null || _a === void 0 ? void 0 : _a.datas[0].mounths[0]), Object(conventionFinded)),
                res.status(201).json({ convention: convention });
        })
            .catch((error) => res.status(500).json({ error: error.message }));
    }
    else {
        res.status(404).json({ message: 'Not found' });
    }
});
const deleteConvention = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conventionId = req.params.conventionId;
        const conventionToArchived = yield Convention_1.default.findById(conventionId);
        const etablissementFinded = yield Etablissement_1.default.findOne({ conventions: conventionId });
        const newTabOfConventions = etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.conventions.filter((el) => JSON.stringify(el) !== JSON.stringify(conventionId));
        if (conventionToArchived === null) {
            return res.status(400).json({ message: 'The convention has been not found' });
        }
        else if (!etablissementFinded) {
            return res.status(400).json({ message: 'The etablissement has been not found' });
        }
        else {
            const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/convention/create`, {
                _id: conventionToArchived && conventionToArchived._id,
                name: conventionToArchived.name,
                startingDate: conventionToArchived.startingDate,
                endingDate: conventionToArchived.endingDate ? conventionToArchived.endingDate : new Date(),
                numberOfEntries: conventionToArchived.objectifs.numberOfEntries,
                numberOfActivityStarted: conventionToArchived.objectifs.numberOfActivityStarted,
                numberOfActivityStartedForLongTime: conventionToArchived.objectifs.numberOfActivityStartedForLongTime,
                NumberOfExitForGood: conventionToArchived.objectifs.NumberOfExitForGood,
                logos: conventionToArchived.logos,
                description: conventionToArchived.actionSheet.description,
                public: conventionToArchived.actionSheet.public,
                actionObjectif: conventionToArchived.actionSheet.actionObjectif,
                positiveExitCriteria: conventionToArchived.actionSheet.positiveExitCriteria,
                balanceSheetPreparation: conventionToArchived.actionSheet.balanceSheetPreparation,
                responsibleOfTheConvention: conventionToArchived.managements.responsibleOfTheConvention,
                adjointResponsibleOfTheConvention: conventionToArchived.managements.adjointResponsibleOfTheConvention,
                AdministrativeOfficer: conventionToArchived.managements.AdministrativeOfficer,
                TheTeam: conventionToArchived.managements.TheTeam,
                orientations: conventionToArchived.orientations,
                entrees: conventionToArchived.entrees,
                usagersOuted: conventionToArchived.usagersOuted,
                token: conventionToArchived.token
            });
            if (archived.data.message === `The convention ${conventionToArchived.name} has been archived` ||
                archived.data.message === `The convention ${conventionToArchived.name} has been updated in the archives`) {
                Object(etablissementFinded).conventions = newTabOfConventions;
                etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.conventionArchiveds.push(Object(conventionToArchived));
                yield (etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.save());
                return Convention_1.default.findByIdAndDelete(conventionId)
                    .then(() => {
                    var _a;
                    (0, ConventionData_1.DeleteConvention)(Object((_a = req.body.admin) === null || _a === void 0 ? void 0 : _a.datas[0].mounths[0]), Object(conventionToArchived)),
                        res.status(200).json({ message: 'It has been deleted' });
                })
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
            else {
                return res.status(400).json({ error: 'the new convetionArchived has been not created' });
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json(error);
    }
});
exports.default = { createConvention, readConvention, readAll, updateConvention, deleteConvention };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVudGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9Db252ZW50aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUd6QyxzRUFBOEM7QUFDOUMsd0VBQWdEO0FBQ2hELGlFQUF5QztBQUN6Qyw0RUFBb0Q7QUFHcEQsZ0VBQW1IO0FBQ25ILDhFQUFzRDtBQUN0RCxrREFBMEI7QUFDMUIsbUVBQXlDO0FBQ3pDLDhEQUFzQztBQUV0QyxNQUFNLGdCQUFnQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7O0lBQy9FLElBQUksQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV4QyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sdUJBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVuRixTQUFlLGNBQWMsQ0FBQyxJQUFZLEVBQUUsWUFBa0IsRUFBRSxVQUFnQjs7Z0JBQzVFLE1BQU0sYUFBYSxHQUFHLE1BQU0sb0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQ2hILElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDN0IsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7cUJBQU0sQ0FBQztvQkFDSixPQUFPLEtB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