import controller from '../controllers/Band';
import express from 'express';
import multer from 'multer';
import { multerConfig } from '../middlewares/Multer';

const upload = multer(multerConfig);
const cpUpload = upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'backgroundPic', maxCount: 1 }
]);

const router = express.Router();

router.post('/Create/', cpUpload, controller.createBand);
router.get('/GetAll/', controller.readAllBands);
router.get('GetOne/:id', controller.readOneBand);
router.put('/Update/:id', cpUpload, controller.updateBand);
router.delete('/Delete/:id', controller.deleteBand);
router.get('/GetRandomBand', controller.getRandBand);

export default router;
