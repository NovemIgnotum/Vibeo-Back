import express from 'express';

// Controllers
import controller from '../controllers/Track';

const router = express.Router();

router.post('/Create/', controller.createTrack);
router.get('/GetAll/', controller.getAllTracks);
router.get('/Get/:id', controller.getTrack);
router.put('/Update/:id', controller.updateTrack);
router.delete('/Delete/:id', controller.deleteTrack);

export default router;
