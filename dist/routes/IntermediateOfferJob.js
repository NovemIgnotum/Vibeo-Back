"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IntermediateOfferJob_1 = __importDefault(require("../controllers/IntermediateOfferJob"));
const router = express_1.default.Router();
router.post('/create/:missionId', IntermediateOfferJob_1.default.createIntermediateOfferJob);
router.get('/get/:intermediateOfferJobId', IntermediateOfferJob_1.default.readIntermediateOfferJob);
router.get('/getAll/:missionId', IntermediateOfferJob_1.default.readAll);
router.put('/update/:intermediateOfferJobId', IntermediateOfferJob_1.default.updateIntermediateOfferJob);
router.delete('/delete/:intermediateOfferJobId', IntermediateOfferJob_1.default.deleteIntermediateOfferJob);
router.post('/processing/:intermediateOfferJobId', IntermediateOfferJob_1.default.intermediateOfferJobProcess);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJtZWRpYXRlT2ZmZXJKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0ludGVybWVkaWF0ZU9mZmVySm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLCtGQUE2RDtBQUU3RCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsOEJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsOEJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsOEJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLDhCQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNyRixNQUFNLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLDhCQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN4RixNQUFNLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLDhCQUFVLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUUzRixrQkFBZSxNQUFNLENBQUMifQ==