import express from 'express';
import controller from '../controllers/Action';

const router = express.Router();

router.post('/create', controller.createAction);
router.get('/get/:creId', controller.readAction);
router.get('/get/', controller.readAll);
router.put('/update/:creId', controller.updateAction);
router.delete('/delete', controller.deleteAction);

export default router;
