import express from 'express';
import controller from '../controllers/Appointment';

const router = express.Router();

router.post('/create', controller.createAppointment);
router.get('/get/:appointmentId', controller.readAppointment);
router.get('/getAll/:idToFind', controller.readAll);
router.put('/update/:appointmentId', controller.updateAppointment);
router.delete('/delete/:appointmentId', controller.deleteAppointment);

export default router;
