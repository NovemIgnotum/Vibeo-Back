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
exports.deleteJobInterviewForExtracting = exports.updateJobInterviewForExtracting = exports.readJobInterviewForExtracting = exports.createJobInterviewForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createJobInterviewForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.jobInterviews.jobInterviewCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createJobInterviewForExtracting = createJobInterviewForExtracting;
const readJobInterviewForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.jobInterviews.jobInterviewReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readJobInterviewForExtracting = readJobInterviewForExtracting;
const updateJobInterviewForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.jobInterviews.jobInterviewUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateJobInterviewForExtracting = updateJobInterviewForExtracting;
const deleteJobInterviewForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.jobInterviews.jobInterviewDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteJobInterviewForExtracting = deleteJobInterviewForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iSW50ZXJ2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy9Kb2JJbnRlcnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBRWxDLE1BQU0sK0JBQStCLEdBQUcsQ0FBTyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUN4SCxNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsYUFBYSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUMvQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDMUIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDckMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBcUNPLDBFQUErQjtBQXBDeEMsTUFBTSw2QkFBNkIsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO0lBQ3RILE1BQU0sT0FBTyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9D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