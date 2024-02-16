import express from 'express';
import controller from '../controllers/Prospecting';

const router = express.Router();

router.post('/create/:usagerId', controller.createProspecting);
router.get('/getByUsager/:usagerId', controller.readProspecting);
router.get('/getAllByUtilisateur/:utilisateurId', controller.readAllByUtilisateur);
router.get('/getAllByEtablissement/:etablissementId', controller.readAllByEtablissement);
router.put('/update/:prospectingId', controller.updateProspecting);
router.delete('/delete/:prospectingId', controller.deleteProspecting);

export default router;
