import express from 'express';
import controller from '../controllers/OfferJob';

const router = express.Router();

router.post('/create/:workStationId', controller.createOfferJob);
router.post('/createSpontaneous/', controller.createOfferJobSpontaneous);
router.get('/get/:offerJobId', controller.readOfferJob);
router.get('/getAll/', controller.readAll);
router.put('/update/:offerJobId', controller.updateOfferJob);
router.delete('/delete/:offerJobId', controller.deleteOfferJob);
router.post('/processing/:offerJobId', controller.offerJobProcess);

export default router;
