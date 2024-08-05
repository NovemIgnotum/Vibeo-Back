"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Track_1 = __importDefault(require("../controllers/Track"));
const multer_1 = __importDefault(require("multer"));
const Multer_1 = require("../middlewares/Multer");
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([{ name: 'track', maxCount: 1 }]);
const router = express_1.default.Router();
router.post('/Create/', cpUpload, Track_1.default.createTrack);
router.get('/GetAll/', Track_1.default.readAllTracks);
router.get('/:id', Track_1.default.readTrack);
router.put('/Update/:id', cpUpload, Track_1.default.updateTrack);
router.delete('/Delete/:id', Track_1.default.deleteTrack);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1RyYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLGlFQUE4QztBQUM5QyxvREFBNEI7QUFDNUIsa0RBQXFEO0FBRXJELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sRUFBQyxxQkFBWSxDQUFDLENBQUM7QUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWpFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDakQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxlQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXJELGtCQUFlLE1BQU0sQ0FBQyJ9