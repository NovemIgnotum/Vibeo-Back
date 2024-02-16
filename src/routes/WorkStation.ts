import express from 'express';
import controller from '../controllers/WorkStation';

const router = express.Router();

router.post('/create/:entrepriseId', controller.createWorkStation);
router.get('/get/:workStationId', controller.readWorkStation);
router.get('/getAll/:entrepriseId', controller.readAll);
router.get('/getAllByPoleEmploi', controller.readAllPoleEmploi);
router.get('/getWorkStationPoleEmploi/:workStationPoleEmploiId', controller.readOneWorkStationPoleEmploi);
router.put('/update/:workStationId', controller.updateWorkStation);
router.delete('/delete/:workStationId', controller.deleteWorkStation);

export default router;
