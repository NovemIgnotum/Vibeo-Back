import express from 'express';
import multer from 'multer';
import controller from '../controllers/Convention';

// Middlewares
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';
import { multerConfig } from '../middlewares/Multer';

const router = express.Router();

const upload = multer(multerConfig);
const cpUpload = upload.fields([{ name: 'file', maxCount: 8 }]);

router.post('/create', cpUpload, AdminIsAuthenticated, controller.createConvention);
router.get('/get/:conventionId', controller.readConvention);
router.get('/getAll/:etablissementId', controller.readAll);
router.put('/update/:conventionId', cpUpload, AdminIsAuthenticated, controller.updateConvention);
router.delete('/delete/:conventionId', AdminIsAuthenticated, controller.deleteConvention);

export default router;
