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
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const SmsSended = (text, user) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurFinded = yield Utilisateur_1.default.findById(user).select('account');
    const usagerFinded = yield Usager_1.default.findById(user).select('account');
    const interlocutorFinded = yield Interlocutor_1.default.findById(user).select('account');
    const partenaireFinded = yield Partenaire_1.default.findById(user).select('account');
    console.log('text->', text);
    console.log('utilisateurFinded from sendSms->', utilisateurFinded);
    console.log('usagerFinded from sendSms->', usagerFinded);
    console.log('interlocutorFinded from sendSms->', interlocutorFinded);
    console.log('partenaireFinded from sendSms->', partenaireFinded);
});
exports.default = SmsSended;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VuZFNtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWJyYXJ5L1NlbmRTbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSx3RUFBZ0Q7QUFDaEQsOERBQXNDO0FBQ3RDLDBFQUFrRDtBQUNsRCxzRUFBOEM7QUFFOUMsTUFBTSxTQUFTLEdBQUcsQ0FBTyxJQUFZLEVBQUUsSUFBWSxFQUFFLEVBQUU7SUFDbkQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RSxNQUFNLFlBQVksR0FBRyxNQUFNLGdCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRSxNQUFNLGtCQUFrQixHQUFHLE1BQU0sc0JBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQTBCckUsQ0FBQyxDQUFBLENBQUM7QUFFRixrQkFBZSxTQUFTLENBQUMifQ==