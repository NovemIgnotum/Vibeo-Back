import express from 'express';
import controller from '../controllers/AdministrativePosition';

const router = express.Router();

router.post('/create/:usagerId', controller.createAdministrativePosition);
router.get('/get/:usagerId', controller.readAdministrativePosition);
router.put('/update/:administrativePositionId', controller.updateAdministrativePosition);
router.delete('/delete', controller.deleteAdministrativePosition);

export default router;
