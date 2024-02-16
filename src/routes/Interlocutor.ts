import express from 'express';
import controller from '../controllers/Interlocutor';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

// mettre en paramètre l'id de l'entreprise pour l'ajouter
router.post('/create/:entrepriseId', controller.createInterlocutor);

// mettre en paramètre l'id de l'interlocuteur à consulter
router.get('/get/:interlocutorId', controller.readInterlocutor);

// Inclure l'id de l'entreprise dont ont doit afficher tous les Interlocuteurs
router.get('/getAll/:entrepriseId', controller.readAll);

// mettre en paramètre l'id de l'interlocuteur à modifier
router.put('/update/:interlocutorId', controller.updateInterlocutor);

router.delete('/delete/:interlocutorId', controller.deleteInterlocutor);

export default router;
