import express from 'express';
import controller from '../controllers/EmploymentContract';

const router = express.Router();

router.post('/create', controller.createEmploymentContract);
router.get('/get/:employmentContractId', controller.readEmploymentContract);
router.get('/getAll/:offerJobId', controller.readAll);
router.put('/update/:employmentContractId', controller.updateEmploymentContract);
router.delete('/delete/:employmentContractId', controller.deleteEmploymentContract);

export default router;
