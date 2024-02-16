"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Mission_1 = __importDefault(require("../controllers/Mission"));
const router = express_1.default.Router();
router.post('/create/:entrepriseId', Mission_1.default.createMission);
router.get('/get/:missionId', Mission_1.default.readMission);
router.get('/getAll/:entrepriseId', Mission_1.default.readAll);
router.put('/update/:missionId', Mission_1.default.updateMission);
router.delete('/delete/:missionId', Mission_1.default.deleteMission);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvTWlzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixxRUFBZ0Q7QUFFaEQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLGlCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDL0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsaUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGlCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxpQkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTlELGtCQUFlLE1BQU0sQ0FBQyJ9