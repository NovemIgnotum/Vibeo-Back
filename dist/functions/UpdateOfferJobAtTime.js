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
exports.UpdateOfferJobIn24h = void 0;
const cron = require('node-cron');
const Response_1 = __importDefault(require("../library/Response"));
const OfferJob_1 = __importDefault(require("../models/OfferJob"));
const Usager_1 = __importDefault(require("../models/Usager"));
const UpdateOfferJobIn24h = (offerJobId) => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const seconde = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    cron.schedule(`${seconde} ${minute} ${hour} ${day} * *`, () => __awaiter(void 0, void 0, void 0, function* () {
        const offerJobFinded = yield OfferJob_1.default.findById(offerJobId);
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
exports.UpdateOfferJobIn24h = UpdateOfferJobIn24h;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlT2ZmZXJKb2JBdFRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL1VwZGF0ZU9mZmVySm9iQXRUaW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxtRUFBMkM7QUFFM0Msa0VBQTBDO0FBQzFDLDhEQUFzQztBQUV0QyxNQUFNLG1CQUFtQixHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLEdBQVMsRUFBRTtRQUNoRSxNQUFNLGNBQWMsR0FBRyxNQUFNLGtCQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ2xCLGtCQUFRLENBQUMsS0FB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