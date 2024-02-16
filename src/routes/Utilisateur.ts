import express from 'express';

// Controllers
import controller from '../controllers/Utilisateur';

// Middlewares
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create/:etablissementId', AdminIsAuthenticated, controller.createUtilisateur);
router.get('/get/:utilisateurId', controller.readUtilisateur);
router.get('/get/', controller.readAll);
router.put('/update/:utilisateurId', AdminIsAuthenticated, controller.updateUtilisateur);
router.delete('/delete/:utilisateurId', AdminIsAuthenticated, controller.deleteUtilisateur);

export default router;
