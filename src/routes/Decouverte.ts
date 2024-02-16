import express from 'express';
import controller from '../controllers/Decouverte';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create/:offerJobId', controller.createDecouverte);
router.post('/createSpontaneous', controller.createDecouverteSpontaneous);
router.get('/get/:decouvertId', controller.readDecouverte);
router.get('/get/:workStationId', controller.readAll);
router.put('/update/:decouverteId', controller.updateDecouverte);
router.delete('/delete/:decouverteId', AdminIsAuthenticated, controller.deleteDecouverte);

export default router;
