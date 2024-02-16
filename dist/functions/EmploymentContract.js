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
exports.deleteEmploymentContractForExtracting = exports.updateEmploymentContractForExtracting = exports.readEmploymentContractForExtracting = exports.createEmploymentContractForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createEmploymentContractForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.employmentContracts.employmentContractCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createEmploymentContractForExtracting = createEmploymentContractForExtracting;
const readEmploymentContractForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.employmentContracts.employmentContractReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readEmploymentContractForExtracting = readEmploymentContractForExtracting;
const updateEmploymentContractForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.employmentContracts.employmentContractUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateEmploymentContractForExtracting = updateEmploymentContractForExtracting;
const deleteEmploymentContractForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.employmentContracts.employmentContractDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteEmploymentContractForExtracting = deleteEmploymentContractForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95bWVudENvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy9FbXBsb3ltZW50Q29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQWtDO0FBRWxDLE1BQU0scUNBQXFDLEdBQUcsQ0FBTyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUM5SCxNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO1FBQzNELElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMxQixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQztLQUNyQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksRUFBRSxDQUFBLENBQUM7QUFDN0IsQ0FBQyxDQUFBLENBQUM7QUFxQ08sc0ZBQXFDO0FBcEM5QyxNQUFNLG1DQUFtQyxHQUFHLENBQU8sTUFBYyxFQUFFLFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxZQUFvQixFQUFFLEVBQUU7SUFDNUgsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxD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