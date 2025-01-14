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
exports.deleteSession = exports.getSession = exports.createSession = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default();
const createSession = (sessionId, userData, ttl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.set(sessionId, JSON.stringify(userData), 'EX', ttl);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createSession = createSession;
const getSession = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield redisClient.get(sessionId);
        return JSON.parse(Object(session));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getSession = getSession;
const deleteSession = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.del(sessionId);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteSession = deleteSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvblNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvc2Vzc2lvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQTRCO0FBRTVCLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQUssRUFBRSxDQUFDO0FBR3pCLE1BQU0sYUFBYSxHQUFHLENBQU8sU0FBaUIsRUFBRSxRQUFhLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDakYsSUFBSSxDQUFDO1FBQ0QsTUFBTSxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQztBQU5XLFFBQUEsYUFBYSxpQkFNeEI7QUFHSyxNQUFNLFVBQVUsR0FBRyxDQUFPLFNBQWlCLEVBQUUsRUFBRTtJQUNsRCxJQUFJLENBQUM7UUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBUFcsUUFBQSxVQUFVLGNBT3JCO0FBR0ssTUFBTSxhQUFhLEdBQUcsQ0FBTyxTQUFpQixFQUFFLEVBQUU7SUFDckQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBTlcsUUFBQSxhQUFhLGlCQU14QiJ9