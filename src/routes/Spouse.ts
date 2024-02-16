import express from 'express';
import controller from '../controllers/Spouse';

const router = express.Router();

router.post('/create/:usagerId', controller.createSpouse);
router.delete('/delete/:usagerId', controller.deleteSpouse);

export default router;
