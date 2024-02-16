import express from 'express';
import controller from '../controllers/Room';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create/:etablissementId', AdminIsAuthenticated, controller.createRoom);
router.get('/get/:roomId', controller.readRoom);
router.get('/getAll/:etablissementId', controller.readAll);
router.put('/update/:roomId', AdminIsAuthenticated, controller.updateRoom);
router.delete('/delete/:roomId', AdminIsAuthenticated, controller.deleteRoom);

export default router;
