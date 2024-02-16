import express from 'express';
import controller from '../controllers/Collectivity';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create/:etablissementId', controller.createCollectivity);
router.get('/get/:collectivityId', controller.readCollectivity);
router.get('/getAll/:etablissementId', controller.readAll);
router.put('/update/:collectivityId', controller.updateCollectivity);
router.delete('/delete/:collectivityId', AdminIsAuthenticated, controller.deleteCollectivity);

export default router;
