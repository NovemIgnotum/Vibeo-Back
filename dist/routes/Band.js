"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Band_1 = __importDefault(require("../controllers/Band"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Multer_1 = require("../middlewares/Multer");
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'backgroundPic', maxCount: 1 }
]);
const router = express_1.default.Router();
router.post('/Create/', cpUpload, Band_1.default.createBand);
router.get('/GetAll/', Band_1.default.readAllBands);
router.get('GetOne/:id', Band_1.default.readOneBand);
router.put('/Update/:id', cpUpload, Band_1.default.updateBand);
router.delete('/Delete/:id', Band_1.default.deleteBand);
router.get('/GetRandomBand', Band_1.default.getRandBand);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQmFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUE2QztBQUM3QyxzREFBOEI7QUFDOUIsb0RBQTRCO0FBQzVCLGtEQUFxRDtBQUVyRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMscUJBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDM0IsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7SUFDbkMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7Q0FDekMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxjQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLGNBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFckQsa0JBQWUsTUFBTSxDQUFDIn0=