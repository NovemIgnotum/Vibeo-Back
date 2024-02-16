"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventOfferJob_1 = __importDefault(require("../controllers/EventOfferJob"));
const router = express_1.default.Router();
router.post('/create/:workStationId', EventOfferJob_1.default.createEventOfferJob);
router.get('/get/:eventOfferJobId', EventOfferJob_1.default.readEventOfferJob);
router.get('/getAll/:workStationId', EventOfferJob_1.default.readAll);
router.put('/update/:eventOfferJobId', EventOfferJob_1.default.updateEventOfferJob);
router.delete('/delete/:eventOfferJobId', EventOfferJob_1.default.deleteEventOfferJob);
router.post('/processing/:eventOfferJobId', EventOfferJob_1.default.eventOfferJobProcess);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRPZmZlckpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvRXZlbnRPZmZlckpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixpRkFBc0Q7QUFFdEQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLHVCQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN0RSxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLHVCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLHVCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkUsTUFBTSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDMUUsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSx1QkFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDN0Usa0JBQWUsTUFBTSxDQUFDIn0=