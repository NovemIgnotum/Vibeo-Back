import express from 'express';
import controller from '../controllers/Partenaire';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create', controller.createPartenaire);
router.get('/get/:partenaireId', controller.readPartenaire);
router.get('/get/', controller.readAll);
router.put('/update/:partenaireId', controller.updatePartenaire);
router.delete('/delete/:partenaireId', AdminIsAuthenticated, controller.deletePartenaire);

export default router;
