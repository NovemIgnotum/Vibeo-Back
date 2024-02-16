"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Appointment_1 = __importDefault(require("../controllers/Appointment"));
const router = express_1.default.Router();
router.post('/create', Appointment_1.default.createAppointment);
router.get('/get/:appointmentId', Appointment_1.default.readAppointment);
router.get('/getAll/:idToFind', Appointment_1.default.readAll);
router.put('/update/:appointmentId', Appointment_1.default.updateAppointment);
router.delete('/delete/:appointmentId', Appointment_1.default.deleteAppointment);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwb2ludG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0FwcG9pbnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLDZFQUFvRDtBQUVwRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHFCQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxxQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUscUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUscUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXRFLGtCQUFlLE1BQU0sQ0FBQyJ9