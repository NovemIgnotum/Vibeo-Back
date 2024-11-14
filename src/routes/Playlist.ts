import express, { Router } from 'express';
import controller from '../controllers/Playlist';
import multer from 'multer';
import { multerConfig } from '../middlewares/Multer';

const upload = multer(multerConfig);
const cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }]);

const router = express.Router();

router.post('/create', cpUpload, controller.createPlaylist);
router.get('/read/:id', controller.readPlaylist);
router.get('/readAll', controller.readAllPlaylists);
router.get('/readAll/:owner', controller.readAllPlaylistsByUser);
router.put('/update/:id', cpUpload, controller.updatePlaylist);
router.delete('/delete/:id', controller.deletePlaylist);

export default router;
