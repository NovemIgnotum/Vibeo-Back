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
exports.deleteDecouverteSpontaneousForExtracting = exports.updateDecouverteSpontaneousForExtracting = exports.readDecouverteSpontaneousForExtracting = exports.createDecouverteSpontaneousForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createDecouverteSpontaneousForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.decouvertesSpontaneous.decouvertesSpontaneousCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createDecouverteSpontaneousForExtracting = createDecouverteSpontaneousForExtracting;
const readDecouverteSpontaneousForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.decouvertesSpontaneous.decouvertesSpontaneousReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readDecouverteSpontaneousForExtracting = readDecouverteSpontaneousForExtracting;
const updateDecouverteSpontaneousForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.decouvertesSpontaneous.decouvertesSpontaneousUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateDecouverteSpontaneousForExtracting = updateDecouverteSpontaneousForExtracting;
const deleteDecouverteSpontaneousForExtracting = (dataId, idCreated, idUsager, idEntreprise) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.decouvertesSpontaneous.decouvertesSpontaneousDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteDecouverteSpontaneousForExtracting = deleteDecouverteSpontaneousForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3V2ZXJ0ZVNwb250YW5lb3VzRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvRGVjb3V2ZXJ0ZVNwb250YW5lb3VzRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBa0M7QUFFbEMsTUFBTSx3Q0FBd0MsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsWUFBb0IsRUFBRSxFQUFFO0lBQ2pJLE1BQU0sT0FBTyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxzQkFBc0IsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUM7UUFDbEUsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzFCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDO0tBQ3JDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQXNDRSw0RkFBd0M7QUFyQzVDLE1BQU0sc0NBQXNDLEdBQUcsQ0FBTyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFlBQW9CLEVBQUUsRUFBRTtJQUMvSCxNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFB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