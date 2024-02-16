"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdministrativePosition_1 = __importDefault(require("../controllers/AdministrativePosition"));
const router = express_1.default.Router();
router.post('/create/:usagerId', AdministrativePosition_1.default.createAdministrativePosition);
router.get('/get/:usagerId', AdministrativePosition_1.default.readAdministrativePosition);
router.put('/update/:administrativePositionId', AdministrativePosition_1.default.updateAdministrativePosition);
router.delete('/delete', AdministrativePosition_1.default.deleteAdministrativePosition);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5pc3RyYXRpdmVQb3NpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQWRtaW5pc3RyYXRpdmVQb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixtR0FBK0Q7QUFFL0QsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGdDQUFVLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUMxRSxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGdDQUFVLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNwRSxNQUFNLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLGdDQUFVLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN6RixNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxnQ0FBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFbEUsa0JBQWUsTUFBTSxDQUFDIn0=