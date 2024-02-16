import express from 'express';
import controller from '../controllers/Prospect';

const router = express.Router();

router.get('/get/:prospectId', controller.readProspect);
router.put('/update/:prospectId', controller.updateProspect);
router.delete('/delete/:prospectId', controller.deleteProspect);

export default router;
