import express from 'express';

import controller from '../controllers/JobInterview';

import AdminIsAuthenticated from '../middlewares/IsAuthenticated';

const router = express.Router();

router.post('/create/:offerJobId', controller.createJobInterview);
router.get('/get/:jobInterviewId', controller.readJobInterview);
router.put('/update/:jobInterviewId', controller.updateJobInterview);
router.delete('/delete/:jobInterviewId', AdminIsAuthenticated, controller.deleteJobInterview);

export default router;
