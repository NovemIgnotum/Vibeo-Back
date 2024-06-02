import express, { Router } from 'express';
import controller from '../controllers/User';

import { authenticateJWT, authorizeRole } from '../middlewares/Authorization';

const router = express.Router();

router.post('/Create/', controller.createUser);
router.post('/CreateAdmin/', authenticateJWT, authorizeRole('admin'), controller.createAdmin);
router.post('/Login/', controller.loginUser);
router.get('/GetAll/', controller.getAllUsers);
router.get('/:id', controller.getUser);
router.get('/GetAllAds/', authenticateJWT, authorizeRole('admin'), controller.getAllAdmins);
router.get('/Admin/:id', authenticateJWT, authorizeRole('admin'), controller.getAdmin);
router.put('UpdateUser/:id', controller.updateUser);

router.post('/Logout/', controller.logoutUser);

export default router;
