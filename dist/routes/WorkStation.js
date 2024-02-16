"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkStation_1 = __importDefault(require("../controllers/WorkStation"));
const router = express_1.default.Router();
router.post('/create/:entrepriseId', WorkStation_1.default.createWorkStation);
router.get('/get/:workStationId', WorkStation_1.default.readWorkStation);
router.get('/getAll/:entrepriseId', WorkStation_1.default.readAll);
router.get('/getAllByPoleEmploi', WorkStation_1.default.readAllPoleEmploi);
router.get('/getWorkStationPoleEmploi/:workStationPoleEmploiId', WorkStation_1.default.readOneWorkStationPoleEmploi);
router.put('/update/:workStationId', WorkStation_1.default.updateWorkStation);
router.delete('/delete/:workStationId', WorkStation_1.default.deleteWorkStation);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya1N0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1dvcmtTdGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDZFQUFvRDtBQUVwRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUscUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUscUJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM5RCxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHFCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxxQkFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxxQkFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDMUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxxQkFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxxQkFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFdEUsa0JBQWUsTUFBTSxDQUFDIn0=