import express from 'express';
import controller from '../controllers/Etablissement';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create', AdminIsAuthenticated, controller.createEtablissement);
router.get('/get/:etablissementId', controller.readEtablissement);
router.get('/get/', AdminIsAuthenticated, controller.readAll);
router.put('/update/:etablissementId', AdminIsAuthenticated, controller.updateEtablissement);
router.delete('/delete/:etablissementId', AdminIsAuthenticated, controller.deleteEtablissement);

export default router;
