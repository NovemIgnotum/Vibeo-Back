import express from 'express';
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
router.post('/follows/:id', controller.addFollowing);
router.put('/Update/:id', cpUpload, controller.updateUser);
router.delete('/Delete/:id', controller.deleteUser);
router.put('/addPlaylist/:id', controller.addPlaylist);
router.put('/removePlaylist/:id', controller.removePlaylist);
router.put('/getProfile/', controller.getProfile);

export default router;
