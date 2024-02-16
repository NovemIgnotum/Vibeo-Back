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
exports.deletePartenaireForExtracting = exports.updatePartenaireForExtracting = exports.readPartenaireForExtracting = exports.createPartenaireForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createPartenaireForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.partenaires.partenaireCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createPartenaireForExtracting = createPartenaireForExtracting;
const readPartenaireForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.partenaires.partenaireReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readPartenaireForExtracting = readPartenaireForExtracting;
const updatePartenaireForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.partenaires.partenaireUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updatePartenaireForExtracting = updatePartenaireForExtracting;
const deletePartenaireForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.partenaires.partenaireDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deletePartenaireForExtracting = deletePartenaireForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGVuYWlyZURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL1BhcnRlbmFpcmVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFrQztBQUVsQyxNQUFNLDZCQUE2QixHQUFHLENBQU8sTUFBYyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUM5RSxNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUMzQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBK0JPLHNFQUE2QjtBQTlCdEMsTUFBTSwyQkFBMkIsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDNUUsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQXNCc0Msa0VBQTJCO0FBckJuRSxNQUFNLDZCQUE2QixHQUFHLENBQU8sTUFBYyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUM5RSxNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUMzQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBYW1FLHNFQUE2QjtBQVhsRyxNQUFNLDZCQUE2QixHQUFHLENBQU8sTUFBYyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUM5RSxNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztRQUMzQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBRWtHLHNFQUE2QiJ9