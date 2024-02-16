import express from 'express';
import controller from '../controllers/Usager';

const router = express.Router();

router.post('/create', controller.createUsager);
router.get('/get/:usagerId', controller.readUsager);
router.get('/getAll/:conventionId', controller.readAll);
router.get('/getAllByEtablissement', controller.readAllByEtablissement);
router.put('/update/:usagerId', controller.updateUsager);
router.delete('/delete/:usagerId', controller.deleteUsager);

export default router;
