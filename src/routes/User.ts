import express, { Router } from 'express';
import controller from '../controllers/User';

import { authenticateJWT, authorizeRole } from '../middlewares/Authorization';

const router = express.Router();

router.post('/Create/', controller.createUser);
router.get('/GetAll/', controller.getAllUsers);
router.get('/:id', controller.getUser);
router.post('/Login/', controller.login);
router.get('/GetAllAds/', authenticateJWT, authorizeRole('admin'), controller.getAllAdmins);
router.put('/:id', controller.update);
router.post('/Logout/', controller.logoutUser);

export default router;
