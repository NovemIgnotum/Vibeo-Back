import express from 'express';

// Controllers
import controller from '../controllers/Genre';

const router = express.Router();

router.post('/Create/', controller.createGenre);
router.get('/GetAll/', controller.getAllGenres);
router.get('/Get/:id', controller.getGenre);
router.put('/Update/:id', controller.updateGenre);
router.delete('/Delete/:id', controller.deleteGenre);

export default router;
