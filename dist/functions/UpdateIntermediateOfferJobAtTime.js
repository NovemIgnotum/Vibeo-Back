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
exports.UpdateIntermediateOfferJobIn24h = void 0;
const cron = require('node-cron');
const Response_1 = __importDefault(require("../library/Response"));
const IntermediateOfferJob_1 = __importDefault(require("../models/IntermediateOfferJob"));
const Usager_1 = __importDefault(require("../models/Usager"));
const UpdateIntermediateOfferJobIn24h = (offerJobId) => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const seconde = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    cron.schedule(`${seconde} ${minute} ${hour} ${day} * *`, () => __awaiter(void 0, void 0, void 0, function* () {
        const offerJobFinded = yield IntermediateOfferJob_1.default.findById(offerJobId);
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
                Object(offerJobFinded).usagerWhoRefusedTheIntermediateOfferJob.push(Object(offerJobFinded.usagerPositioned));
                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded._id));
                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
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
exports.UpdateIntermediateOfferJobIn24h = UpdateIntermediateOfferJobIn24h;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBkYXRlSW50ZXJtZWRpYXRlT2ZmZXJKb2JBdFRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL1VwZGF0ZUludGVybWVkaWF0ZU9mZmVySm9iQXRUaW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsQyxtRUFBMkM7QUFFM0MsMEZBQWtFO0FBQ2xFLDhEQUFzQztBQUV0QyxNQUFNLCtCQUErQixHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLEdBQVMsRUFBRTtRQUNoRSxNQUFNLGNBQWMsR0FBRyxNQUFNLDhCQUFvQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RSxNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsQixrQkFBUSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksY0FBYyxDQUFDLHdCQUF3QixLQUFLLEtBQUssRUFBRSxDQUFDO2dCQUNwRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUN6QixLQUFLLEVBQUUsNEJBQTRCO29CQUNuQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxHQUFHLEVBQUUsRUFBRTtvQkFDUCxPQUFPLEVBQUUseUVBQXlFO2lCQUNyRixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzdHLE1BQU0sZ0NBQWdDLEdBQUcsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FDM0UsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsR0FBRyxDQUFDLENBQ25FLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLGdDQUFnQyxDQUFDO2dCQUMzRSxNQUFNLGtCQUFrQixHQUFHLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLGFBQWQsY0FBYyx1QkFBZCxjQUFjLENBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDckksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO2dCQUMzRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDO2dCQUMzQixNQUFNLENBQUEsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLElBQUksRUFBRSxDQUFBLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFDTywwRUFBK0IifQ==