import express from 'express';
import multer from 'multer';
import { multerConfig } from '../middlewares/Multer';

import controller from '../controllers/Genre';


const router = express.Router();
const upload = multer(multerConfig);
const cpUpload = upload.fields([
    { name: 'picture', maxCount: 1 }
]);

router.post('/Create/', cpUpload, controller.createGenre);
router.get('/GetAll/', controller.getAllGenres);
router.get('/Get/:id', controller.getGenre);
router.put('/Update/:id',cpUpload, controller.updateGenre);
router.get('/randomGenre/', controller.getRandomGenre);
router.delete('/Delete/:id', controller.deleteGenre);

export default router;
