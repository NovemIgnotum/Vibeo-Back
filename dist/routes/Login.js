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
const express_1 = __importDefault(require("express"));
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const router = express_1.default.Router();
const ExtractingData_1 = require("../functions/ExtractingData");
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Logging_1 = __importDefault(require("../library/Logging"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, firstname, screenType } = req.body;
    if (name && firstname) {
        const usagerFinded = yield Usager_1.default.findOne({ 'account.name': name.toLowerCase(), 'account.firstname': firstname.toLowerCase() });
        if (usagerFinded) {
            const hashToLog = SHA256(password + usagerFinded.salt).toString(encBase64);
            hashToLog === usagerFinded.hash
                ? res
                    .status(200)
                    .json({ message: "you're logged", usager: usagerFinded })
                    .end(() => {
                    (0, ExtractingData_1.Login)(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.datas[0].mounths[0], screenType),
                        Logging_1.default.info(`${usagerFinded.account.firstname} ${usagerFinded.account.name} is logged`);
                })
                : res
                    .status(401)
                    .json({ message: 'wrong password' })
                    .end(() => Logging_1.default.error(`${usagerFinded._id} make a wrong password`));
        }
        else {
            Logging_1.default.error('usager not finded');
            return res.status(404).json({ message: 'usager not finded' });
        }
    }
    else {
        const utilisateurFinded = yield Utilisateur_1.default.findOne({ email: email }).populate('prospectings');
        const adminFinded = yield Utilisateur_1.default.findOne({ email: email }).populate('datas prospectings');
        const partenaireFinded = yield Partenaire_1.default.findOne({ email: email });
        const etablissementFinded = yield Etablissement_1.default.findOne({ utilisateurs: utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded._id }).populate('entreprises');
        if (adminFinded) {
            const hashToLog = SHA256(password + adminFinded.salt).toString(encBase64);
            hashToLog !== adminFinded.hash
                ? res
                    .status(401)
                    .json({ message: 'wrong password' })
                    .end(() => Logging_1.default.error(`${adminFinded._id} make a wrong password`))
                : res
                    .status(200)
                    .json({ message: "you're logged", admin: adminFinded, etablissement: etablissementFinded })
                    .end(() => {
                    (0, ExtractingData_1.Login)(adminFinded === null || adminFinded === void 0 ? void 0 : adminFinded.datas[0].mounths[0], screenType),
                        Logging_1.default.info(`${adminFinded.account.firstname} ${adminFinded.account.name} is logged`);
                });
        }
        else if (utilisateurFinded) {
            const hashToLog = SHA256(password + utilisateurFinded.salt).toString(encBase64);
            hashToLog === utilisateurFinded.hash
                ? res
                    .status(200)
                    .json({ message: "you're logged", utilisateur: utilisateurFinded, etablissement: etablissementFinded })
                    .end(() => {
                    (0, ExtractingData_1.Login)(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0], screenType),
                        Logging_1.default.info(`${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} is logged`);
                })
                : res
                    .status(401)
                    .json({ message: 'wrong password' })
                    .end(() => Logging_1.default.error(`${utilisateurFinded._id} make a wrong password`));
        }
        else if (partenaireFinded) {
            const hashToLog = SHA256(password + partenaireFinded.salt).toString(encBase64);
            hashToLog === partenaireFinded.hash
                ? res
                    .status(200)
                    .json({ message: "you're logged", partenaire: partenaireFinded })
                    .end(() => {
                    (0, ExtractingData_1.Login)(partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.datas[0].mounths[0], screenType),
                        Logging_1.default.info(`${partenaireFinded.account.firstname} ${partenaireFinded.account.name} is logged`);
                })
                : res
                    .status(401)
                    .json({ message: 'wrong password' })
                    .end(() => Logging_1.default.error(`${partenaireFinded._id} make a wrong password`));
        }
        else {
            return res.status(404).json({ message: 'Account not finded' });
        }
    }
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQW1FO0FBQ25FLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFHaEMsZ0VBQW9EO0FBR3BELHdFQUFnRDtBQUNoRCw4REFBc0M7QUFDdEMsc0VBQThDO0FBRzlDLGlFQUF5QztBQUN6Qyw0RUFBb0Q7QUFFcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM1RSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFFbEUsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFLENBQUM7UUFDcEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoSSxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2YsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25GLFNBQVMsS0FBSyxZQUFZLENBQUMsSUFBSTtnQkFDM0IsQ0FBQyxDQUFDLEdBQUc7cUJBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsQ0FBQztxQkFDeEQsR0FBRyxDQUFDLEdBQUcsRUFBRTtvQkFDTixJQUFBLHNCQUFLLEVBQUMsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQzt3QkFDaEQsaUJBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUM7Z0JBQ2pHLENBQUMsQ0FBQztnQkFDUixDQUFDLENBQUMsR0FBRztxQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3FCQUNuQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxZQUFZLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7UUFDckYsQ0FBQzthQUFNLENBQUM7WUFDSixpQkFBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7SUFDTCxDQUFDO1NBQU0sQ0FBQztRQUVKLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRixNQUFNLFdBQVcsR0FBRyxNQUFNLHFCQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDL0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG9CQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLHVCQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTFILElBQUksV0FBVyxFQUFFLENBQUM7WUFDZCxNQUFNLFNBQVMsR0FBVyxNQUFNLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFbEYsU0FBUyxLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUMxQixDQUFDLENBQUMsR0FBRztxQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3FCQUNuQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsR0FBRztxQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztxQkFDMUYsR0FBRyxDQUFDLEdBQUcsRUFBRTtvQkFDTixJQUFBLHNCQUFLLEVBQUMsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQzt3QkFDL0MsaUJBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUM7Z0JBQy9GLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7YUFBTSxJQUFJLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEYsU0FBUyxLQUFLLGlCQUFpQixDQUFDLElBQUk7Z0JBQ2hDLENBQUMsQ0FBQyxHQUFHO3FCQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixFQUFFLENBQUM7cUJBQ3RHLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ04sSUFBQSxzQkFBSyxFQUFDLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQzt3QkFDckQsaUJBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLFlBQVksQ0FBQyxDQUFDO2dCQUMzRyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLEdBQUc7cUJBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztxQkFDbkMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsaUJBQWlCLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7UUFDMUYsQ0FBQzthQUFNLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQixNQUFNLFNBQVMsR0FBVyxNQUFNLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RixTQUFTLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtnQkFDL0IsQ0FBQyxDQUFDLEdBQUc7cUJBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQkFDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDO3FCQUNoRSxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNOLElBQUEsc0JBQUssRUFBQyxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7d0JBQ3BELGlCQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxZQUFZLENBQUMsQ0FBQztnQkFDekcsQ0FBQyxDQUFDO2dCQUNSLENBQUMsQ0FBQyxHQUFHO3FCQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQ1gsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUM7cUJBQ25DLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDbkUsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=