import express from 'express';
import controller from '../controllers/EventOfferJob';

const router = express.Router();

router.post('/create/:workStationId', controller.createEventOfferJob);
router.get('/get/:eventOfferJobId', controller.readEventOfferJob);
router.get('/getAll/:workStationId', controller.readAll);
router.put('/update/:eventOfferJobId', controller.updateEventOfferJob);
router.delete('/delete/:eventOfferJobId', controller.deleteEventOfferJob);
router.post('/processing/:eventOfferJobId', controller.eventOfferJobProcess);
export default router;
