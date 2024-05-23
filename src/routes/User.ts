import express from 'express';
import controller from '../controllers/User';

import { authenticateJWT, authorizeRole } from '../middlewares/Authorization';

const router = express.Router();

router.post('/Create/', controller.createUser);
router.post('/CreateAdmin/', authenticateJWT, authorizeRole('admin'), controller.createAdmin);
router.post('/Login/', controller.loginUser);
router.post('/Logout/', controller.logoutUser);

export default router;
