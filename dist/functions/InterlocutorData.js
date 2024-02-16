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
exports.interlocuteurRemovedForExtracting = exports.interlocuteurAddedForExtracting = exports.deleteInterlocuteurForExtracting = exports.updateInterlocuteurForExtracting = exports.readInterlocuteurForExtracting = exports.createInterlocuteurForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createInterlocuteurForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.interlocutor.interlocutorCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createInterlocuteurForExtracting = createInterlocuteurForExtracting;
const readInterlocuteurForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.interlocutor.interlocutorReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readInterlocuteurForExtracting = readInterlocuteurForExtracting;
const updateInterlocuteurForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.interlocutor.interlocutorUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateInterlocuteurForExtracting = updateInterlocuteurForExtracting;
const deleteInterlocuteurForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.interlocutor.interlocutorDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteInterlocuteurForExtracting = deleteInterlocuteurForExtracting;
const interlocuteurAddedForExtracting = (dataId, idInterlocutor, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.interlocutor.interlocutorAddedToAnEntreprise.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idInterlocutor: Object(idInterlocutor),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.interlocuteurAddedForExtracting = interlocuteurAddedForExtracting;
const interlocuteurRemovedForExtracting = (dataId, idInterlocutor, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.interlocutor.interlocutorRemovedToAnEntreprise.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idInterlocutor: Object(idInterlocutor),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.interlocuteurRemovedForExtracting = interlocuteurRemovedForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJsb2N1dG9yRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvSW50ZXJsb2N1dG9yRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBa0M7QUFFbEMsTUFBTSxnQ0FBZ0MsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDakYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDOUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQTBERSw0RUFBZ0M7QUF6RHBDLE1BQU0sOEJBQThCLEdBQUcsQ0FBTyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQy9FLE1BQU0sT0FBTyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFB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