import express from 'express';
import multer from 'multer';
import controller from '../controllers/Entreprise';

// Middlewares
import AdminIsAuthenticated from '../middlewares/IsAuthenticated';
import { multerConfig } from '../middlewares/Multer';

const router = express.Router();

const upload = multer(multerConfig);
const cpUpload = upload.fields([{ name: 'file', maxCount: 8 }]);

router.post('/create/:etablissementId', cpUpload, controller.createEntreprise);
router.get('/get/:entrepriseId', controller.readEntreprise);
router.get('/getAll', controller.readAll);
router.get('/getAllByEtablissement', controller.readAllByEtablissement);
router.put('/update/:entrepriseId', cpUpload, controller.updateEntreprise);
router.delete('/delete/:entrepriseId', AdminIsAuthenticated, controller.deleteEntreprise);
router.post('/fetch/siret/:siret', controller.fetchSiretEntreprise);

export default router;
