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
exports.deleteOfferJobForSpontaneousExtracting = exports.updateOfferJobForSpontaneousExtracting = exports.readOfferJobForSpontaneousExtracting = exports.createOfferJobForSpontaneousExtracting = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const createOfferJobForSpontaneousExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.offerJobsSpontaneous.offerJobsSpontaneousCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.createOfferJobForSpontaneousExtracting = createOfferJobForSpontaneousExtracting;
const readOfferJobForSpontaneousExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.offerJobsSpontaneous.offerJobsSpontaneousReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.readOfferJobForSpontaneousExtracting = readOfferJobForSpontaneousExtracting;
const updateOfferJobForSpontaneousExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.offerJobsSpontaneous.offerJobsSpontaneousUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.updateOfferJobForSpontaneousExtracting = updateOfferJobForSpontaneousExtracting;
const deleteOfferJobForSpontaneousExtracting = (dataId, idCreated) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.offerJobsSpontaneous.offerJobsSpontaneousDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.deleteOfferJobForSpontaneousExtracting = deleteOfferJobForSpontaneousExtracting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJKb2JTcG9udGFuZW91cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvT2ZmZXJKb2JTcG9udGFuZW91cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBa0M7QUFFbEMsTUFBTSxzQ0FBc0MsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDdkYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLG9CQUFvQixDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQztRQUM5RCxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBZ0NFLHdGQUFzQztBQS9CMUMsTUFBTSxvQ0FBb0MsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDckYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLG9CQUFvQixDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQztRQUM3RCxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBd0JFLG9GQUFvQztBQXZCeEMsTUFBTSxzQ0FBc0MsR0FBRyxDQUFPLE1BQWMsRUFBRSxTQUFpQixFQUFFLEVBQUU7SUFDdkYsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLG9CQUFvQixDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQztRQUM5RCxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDO0FBZ0JFLHdGQUFzQztBQWQxQyxNQUFNLHNDQUFzQyxHQUFHLENBQU8sTUFBYyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUN2RixNQUFNLE9BQU8sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsb0JBQW9CLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDO1FBQzlELElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUN4QixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksRUFBRSxDQUFBLENBQUM7QUFDN0IsQ0FBQyxDQUFBLENBQUM7QUFNRSx3RkFBc0MifQ==