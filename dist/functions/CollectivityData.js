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
exports.deleteCollectivityForExtracting = exports.updateCollectivityForExtracting = exports.readCollectivityForExtracting = exports.createCollectivityForExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createCollectivityForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.collectivities.collectivityCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createCollectivityForExtracting = createCollectivityForExtracting;
const readCollectivityForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.collectivities.collectivityReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readCollectivityForExtracting = readCollectivityForExtracting;
const updateCollectivityForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.collectivities.collectivityUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateCollectivityForExtracting = updateCollectivityForExtracting;
const deleteCollectivityForExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.collectivities.collectivityDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteCollectivityForExtracting = deleteCollectivityForExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGl2aXR5RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvQ29sbGVjdGl2aXR5RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBa0M7QUFFbEMsTUFBTSwrQkFBK0IsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDaEYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQStCTywwRUFBK0I7QUE5QnhDLE1BQU0sNkJBQTZCLEdBQUcsQ0FBTyxNQUFjLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQzlFLE1BQU0sT0FBTyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQy9DLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUN4QixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksRUFBRSxDQUFBLENBQUM7QUFDN0IsQ0FBQyxDQUFBLENBQUM7QUFzQndDLHNFQUE2QjtBQXJCdkUsTUFBTSwrQkFBK0IsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDaEYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQWF1RSwwRUFBK0I7QUFYeEcsTUFBTSwrQkFBK0IsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDaEYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQUV3RywwRUFBK0IifQ==