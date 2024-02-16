import express from 'express';
import controller from '../controllers/Event';
import multer from 'multer';
import { multerConfig } from '../middlewares/Multer';
const upload = multer(multerConfig);
const cpUpload = upload.fields([{ name: 'file', maxCount: 4 }]);
const router = express.Router();

router.post('/create', cpUpload, controller.createEvent);
router.get('/get/:eventId', controller.readEvent);
router.get('/getAll/', controller.readAll);
router.put('/update/:eventId', cpUpload, controller.updateEvent);
router.delete('/delete/:eventId', controller.deleteEvent);

export default router;
