"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Prospecting_1 = __importDefault(require("../controllers/Prospecting"));
const router = express_1.default.Router();
router.post('/create/:usagerId', Prospecting_1.default.createProspecting);
router.get('/getByUsager/:usagerId', Prospecting_1.default.readProspecting);
router.get('/getAllByUtilisateur/:utilisateurId', Prospecting_1.default.readAllByUtilisateur);
router.get('/getAllByEtablissement/:etablissementId', Prospecting_1.default.readAllByEtablissement);
router.put('/update/:prospectingId', Prospecting_1.default.updateProspecting);
router.delete('/delete/:prospectingId', Prospecting_1.default.deleteProspecting);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvc3BlY3RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1Byb3NwZWN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDZFQUFvRDtBQUVwRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUscUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUscUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNqRSxNQUFNLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxFQUFFLHFCQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuRixNQUFNLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxFQUFFLHFCQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUN6RixNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNuRSxNQUFNLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUV0RSxrQkFBZSxNQUFNLENBQUMifQ==