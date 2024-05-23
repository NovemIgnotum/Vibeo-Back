import express from 'express';
import controller from '../controllers/User';

import { authenticateJWT, authorizeRole } from '../middlewares/Authorization';

const router = express.Router();

router.post('/Create/', controller.createUser);
router.post('/CreateAdmin/', authenticateJWT, authorizeRole('admin'), controller.createAdmin);
router.post('/Login/', controller.loginUser);
router.post('/Logout/', controller.logoutUser);
router.get('/All/', authenticateJWT, authorizeRole('admin'), controller.getAllUsers);
router.get('/:id', authenticateJWT, authorizeRole('admin'), controller.getUser);

export default router;
