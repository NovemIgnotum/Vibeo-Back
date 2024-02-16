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
exports.deleteJobContextForExtracting = exports.updateJobContextForExtracting = exports.createJobContextForExtracting = exports.deleteKnowsHowForExtracting = exports.updateKnowsHowForExtracting = exports.createKnowsHowForExtracting = exports.deleteSkillsForExtracting = exports.updateSkillsForExtracting = exports.readSkillsAndKnowHowsForExtracting = exports.createSkillsForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createSkillsForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.skillsCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createSkillsForExtracting = createSkillsForExtracting;
const readSkillsAndKnowHowsForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.skillsAndKnowHowsReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idReaded: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readSkillsAndKnowHowsForExtracting = readSkillsAndKnowHowsForExtracting;
const updateSkillsForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.skillsUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateSkillsForExtracting = updateSkillsForExtracting;
const deleteSkillsForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.skillsDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteSkillsForExtracting = deleteSkillsForExtracting;
const createKnowsHowForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.knowsHowCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createKnowsHowForExtracting = createKnowsHowForExtracting;
const updateKnowsHowForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.knowsHowUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateKnowsHowForExtracting = updateKnowsHowForExtracting;
const deleteKnowsHowForExtracting = (dataId, idCreated, code, codeJob) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.knowsHowDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteKnowsHowForExtracting = deleteKnowsHowForExtracting;
const createJobContextForExtracting = (dataId, idCreated, code, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.jobContextCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        categorie: categorie
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createJobContextForExtracting = createJobContextForExtracting;
const updateJobContextForExtracting = (dataId, idCreated, code, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.jobContextUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        categorie: categorie
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateJobContextForExtracting = updateJobContextForExtracting;
const deleteJobContextForExtracting = (dataId, idCreated, code, categorie) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.skillsAndKnowsHow.jobContextDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        categorie: categorie
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteJobContextForExtracting = deleteJobContextForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzQW5kS25vd3NIb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL1NraWxsc0FuZEtub3dzSG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUVsQyxNQUFNLHlCQUF5QixHQUFHLENBQU8sTUFBYyxFQUFFLFNBQWlCLEVBQUUsSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO0lBQ3pHLE1BQU0sT0FBTyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUN6QixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQXlHRSw4REFBeUI7QUF4RzdCLE1BQU0sa0NBQWtDLEdBQUcsQ0FBTyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUU7SUFDbEgsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFB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