import express from 'express';
import controller from '../controllers/Mission';

const router = express.Router();

router.post('/create/:entrepriseId', controller.createMission);
router.get('/get/:missionId', controller.readMission);
router.get('/getAll/:entrepriseId', controller.readAll);
router.put('/update/:missionId', controller.updateMission);
router.delete('/delete/:missionId', controller.deleteMission);

export default router;
