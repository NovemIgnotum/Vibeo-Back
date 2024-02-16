import express from 'express';
import controller from '../controllers/Skills';

const router = express.Router();

router.post('/create/:usagerId', controller.createSkillsForUsager);
router.get('/get/:usagerId', controller.readSkills);
router.get('/getAll/', controller.readAll);
router.put('/update/:skillsAndKnowHowsId', controller.updateSkills);
router.delete('/delete/:usagerId', controller.deleteSkills);

export default router;
