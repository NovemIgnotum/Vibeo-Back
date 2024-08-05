import express from 'express';
import controller from '../controllers/Track';
import multer from 'multer';
import { multerConfig } from '../middlewares/Multer';

const upload = multer(multerConfig);
const cpUpload = upload.fields([{ name: 'track', maxCount: 1 }]);

const router = express.Router();

router.post('/Create/', cpUpload, controller.createTrack);
router.get('/GetAll/', controller.readAllTracks);
router.get('/:id', controller.readTrack);
router.put('/Update/:id', cpUpload, controller.updateTrack);
router.delete('/Delete/:id', controller.deleteTrack);

export default router;
