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
exports.UpdateEventOfferJobIn24h = void 0;
const cron = require('node-cron');
const Response_1 = __importDefault(require("../library/Response"));
const EventOfferJob_1 = __importDefault(require("../models/EventOfferJob"));
const Usager_1 = __importDefault(require("../models/Usager"));
const UpdateEventOfferJobIn24h = (offerJobId) => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const seconde = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    cron.schedule(`${seconde} ${minute} ${hour} ${day} * *`, () => __awaiter(void 0, void 0, void 0, function* () {
        const offerJobFinded = yield EventOfferJob_1.default.findById(offerJobId);
        const usagerFinded = yield Usager_1.default.findById(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.usagerPositioned[0]);
        if (!offerJobFinded) {
            Response_1.default.error('offerJob has been not found');
            cron.stop();
        }
        else {
            if (offerJobFinded.offerBlockedAutomaticaly === false) {
                cron.stop();
            }
            else {
                offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.history.push({
                    title: "Pas de réponse de l'usager",
                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                    by: JSON.stringify(offerJobFinded.usagerPositioned[0]),
                    for: '',
                    comment: "L'offre est redevenue disponible, apres une période de 24h sans réponse"
                });
                Object(offerJobFinded).status = 'Disponible';
                Object(offerJobFinded).offerBlockedAutomaticaly = false;
                Object(offerJobFinded).usagerWhoRefusedTheOfferJob.push(Object(offerJobFinded.usagerPositioned));
                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id));
                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                const newArrayFromUsager = usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded._id));
                Object(usagerFinded).offerJobReceived = newArrayFromUsager;
                Object(usagerFinded).offerJobDenied.push(Object(offerJobFinded));
                yield (usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.save());
                yield (offerJobFinded === null || offerJobFinded === void 0 ? void 0 : offerJobFinded.save());
                cron.stop();
            }
        }
    }));
};
exports.UpdateEventOfferJobIn24h = UpdateEventOfferJobIn24h;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlRXZlbnRPZmZlckpvYkF0VGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvVXBkYXRlRXZlbnRPZmZlckpvYkF0VGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsbUVBQTJDO0FBRTNDLDRFQUFvRDtBQUNwRCw4REFBc0M7QUFFdEMsTUFBTSx3QkFBd0IsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtJQUNwRCxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxHQUFTLEVBQUU7UUFDaEUsTUFBTSxjQUFjLEdBQUcsTUFBTSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRSxNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsQixrQkFB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