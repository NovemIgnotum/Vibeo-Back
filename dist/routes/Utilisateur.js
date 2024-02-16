"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Utilisateur_1 = __importDefault(require("../controllers/Utilisateur"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create/:etablissementId', IsAuthenticated_1.default, Utilisateur_1.default.createUtilisateur);
router.get('/get/:utilisateurId', Utilisateur_1.default.readUtilisateur);
router.get('/get/', Utilisateur_1.default.readAll);
router.put('/update/:utilisateurId', IsAuthenticated_1.default, Utilisateur_1.default.updateUtilisateur);
router.delete('/delete/:utilisateurId', IsAuthenticated_1.default, Utilisateur_1.default.deleteUtilisateur);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlzYXRldXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1V0aWxpc2F0ZXVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRzlCLDZFQUFvRDtBQUdwRCxxRkFBa0U7QUFFbEUsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLHlCQUFvQixFQUFFLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1RixNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHFCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUscUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLHlCQUFvQixFQUFFLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN6RixNQUFNLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLHlCQUFvQixFQUFFLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUU1RixrQkFBZSxNQUFNLENBQUMifQ==