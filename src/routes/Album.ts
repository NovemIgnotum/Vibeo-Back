import express from 'express';

import controller from '../controllers/Album';

const router = express.Router();

router.post('/Create/', controller.createAlbum);
router.get('/GetAll/', controller.getAllAlbums);
router.get('/Get/:id', controller.getAlbum);

export default router;
