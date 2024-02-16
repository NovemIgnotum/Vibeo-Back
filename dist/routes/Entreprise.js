"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Entreprise_1 = __importDefault(require("../controllers/Entreprise"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const Multer_1 = require("../middlewares/Multer");
const router = express_1.default.Router();
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([{ name: 'file', maxCount: 8 }]);
router.post('/create/:etablissementId', cpUpload, Entreprise_1.default.createEntreprise);
router.get('/get/:entrepriseId', Entreprise_1.default.readEntreprise);
router.get('/getAll', Entreprise_1.default.readAll);
router.get('/getAllByEtablissement', Entreprise_1.default.readAllByEtablissement);
router.put('/update/:entrepriseId', cpUpload, Entreprise_1.default.updateEntreprise);
router.delete('/delete/:entrepriseId', IsAuthenticated_1.default, Entreprise_1.default.deleteEntreprise);
router.post('/fetch/siret/:siret', Entreprise_1.default.fetchSiretEntreprise);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50cmVwcmlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvRW50cmVwcmlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixvREFBNEI7QUFDNUIsMkVBQW1EO0FBR25ELHFGQUFrRTtBQUNsRSxrREFBcUQ7QUFFckQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMscUJBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxvQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLG9CQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDeEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUseUJBQW9CLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFGLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsb0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXBFLGtCQUFlLE1BQU0sQ0FBQyJ9