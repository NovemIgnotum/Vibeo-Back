import express from 'express';

// Controllers
import controller from '../controllers/Band';

const router = express.Router();

router.post('/Create/', controller.createBand);
router.get('/GetAll/', controller.getAllBands);
router.get('/Get/:id', controller.getBand);
router.put('/UpdateMember/:id', controller.updateMember);
router.put('/UpdateAlbums/:id', controller.updateAlbums);
router.put('/UpdateInfo/:id', controller.updateInfo);
router.delete('/Delete/:id', controller.deleteBand);

export default router;
