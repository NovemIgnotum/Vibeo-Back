import express from 'express';
import controller from '../controllers/Contact';
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create/:id', controller.createContact);
router.get('/get/:contactId', controller.readContact);
router.get('/getAll/:id', controller.readAll);
router.put('/update/:contactId', controller.updateContact);
router.delete('/delete/:contactId', AdminIsAuthenticated, controller.deleteContact);

export default router;
