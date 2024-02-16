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
const Usager_1 = __importDefault(require("../models/Usager"));
const Response_1 = __importDefault(require("../library/Response"));
const createSpouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let oldSpouseName;
        let oldSpouseFirstName;
        const removeExistingSpouse = (usager) => __awaiter(void 0, void 0, void 0, function* () {
            if (Object(usager).spouse) {
                const findedSpouse = yield Usager_1.default.findById(Object(usager).spouse);
                if (!findedSpouse) {
                    const corruptId = yield Usager_1.default.findOne({ spouse: Object(usager).id });
                    Object(corruptId).spouse = null;
                    yield Object(corruptId).save();
                    oldSpouseName = Object(corruptId).account.name;
                    oldSpouseFirstName = Object(corruptId).account.firstname;
                    return true;
                }
                else {
                    Object(findedSpouse).spouse = null;
                    yield Object(findedSpouse).save();
                    oldSpouseName = findedSpouse.account.name;
                    oldSpouseFirstName = findedSpouse.account.firstname;
                    return true;
                }
            }
            else {
                return false;
            }
        });
        const futureSpouseFinded = yield Usager_1.default.findById(req.body.spouseId);
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId);
        if (!usagerFinded || !futureSpouseFinded) {
            return res.status(404).json('One or both of the usager has been not found');
        }
        else {
            if (req.body.spouseId === req.params.usagerId) {
                return res.status(400).json('SpouseId anf UsagerId need to be different');
            }
            if ((yield removeExistingSpouse(usagerFinded)) && (yield removeExistingSpouse(futureSpouseFinded))) {
                return res.status(200).json({
                    message: `The old spouse ${oldSpouseName} ${oldSpouseFirstName} was replaced by ${futureSpouseFinded.account.name} ${futureSpouseFinded.account.firstname} for the usager ${usagerFinded.account.name} ${usagerFinded.account.firstname} `
                });
            }
            else {
                Object(usagerFinded).spouse = req.body.spouseId;
                Object(futureSpouseFinded).spouse = req.params.usagerId;
                yield Object(usagerFinded).save();
                yield Object(futureSpouseFinded).save();
                return res.status(200).json({
                    message: `${futureSpouseFinded.account.name} ${futureSpouseFinded.account.firstname} is the new spouse of ${usagerFinded.account.name} ${usagerFinded.account.firstname}`
                });
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const deleteSpouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId);
        if (!usagerFinded) {
            Response_1.default.error('Usager not found');
            return res.status(404).json({ message: 'Usager not found' });
        }
        else {
            const findedSpouse = yield Usager_1.default.findById(Object(usagerFinded).spouse);
            if (!findedSpouse) {
                Response_1.default.error('Usager do not have a spouse to remove');
                return res.status(404).json({ message: 'Usager do not have a spouse to remove' });
            }
            else {
                Object(usagerFinded).spouse = null;
                Object(findedSpouse).spouse = null;
                yield Object(usagerFinded).save();
                yield Object(findedSpouse).save();
                return res.status(200).json({ message: 'Spouse removed' });
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
exports.default = { createSpouse, deleteSpouse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL1Nwb3VzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLDhEQUFzQztBQUd0QyxtRUFBeUM7QUFFekMsTUFBTSxZQUFZLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMzRSxJQUFJLENBQUM7UUFDRCxJQUFJLGFBQWEsQ0FBQztRQUNsQixJQUFJLGtCQUFrQixDQUFDO1FBR3ZCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBTyxNQUFjLEVBQUUsRUFBRTtZQUNsRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRWxFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFFaEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDdEUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2hDLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMvQixhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQy9DLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO29CQUN6RCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxDQUFDO29CQUNKLE1BQU0sQ0FBQyxZQUFZLENBQUMs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