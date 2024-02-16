import express from 'express';
import controller from '../controllers/IntermediateOfferJob';

const router = express.Router();

router.post('/create/:missionId', controller.createIntermediateOfferJob);
router.get('/get/:intermediateOfferJobId', controller.readIntermediateOfferJob);
router.get('/getAll/:missionId', controller.readAll);
router.put('/update/:intermediateOfferJobId', controller.updateIntermediateOfferJob);
router.delete('/delete/:intermediateOfferJobId', controller.deleteIntermediateOfferJob);
router.post('/processing/:intermediateOfferJobId', controller.intermediateOfferJobProcess);

export default router;
