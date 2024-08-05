import express, { Router } from 'express';
import controller from '../controllers/User';
import multer from 'multer';
import { multerConfig } from '../middlewares/Multer';

const upload = multer(multerConfig);
const cpUpload = upload.fields([
    { name: 'pic', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]);
const router = express.Router();

router.post('/Create/', controller.createUser);
router.get('/GetAll/', controller.readAll);
router.get('/:id', controller.readUser);
router.post('/Login/', controller.login);
router.post('/Logout/', controller.logout);
router.put('/Update/:id', cpUpload, controller.updateUser);
router.delete('/Delete/:id', controller.deleteUser);

export default router;
