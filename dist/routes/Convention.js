"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Convention_1 = __importDefault(require("../controllers/Convention"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const Multer_1 = require("../middlewares/Multer");
const router = express_1.default.Router();
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([{ name: 'file', maxCount: 8 }]);
router.post('/create', cpUpload, IsAuthenticated_1.default, Convention_1.default.createConvention);
router.get('/get/:conventionId', Convention_1.default.readConvention);
router.get('/getAll/:etablissementId', Convention_1.default.readAll);
router.put('/update/:conventionId', cpUpload, IsAuthenticated_1.default, Convention_1.default.updateConvention);
router.delete('/delete/:conventionId', IsAuthenticated_1.default, Convention_1.default.deleteConvention);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVudGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQ29udmVudGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixvREFBNEI7QUFDNUIsMkVBQW1EO0FBR25ELHFGQUFrRTtBQUNsRSxrREFBcUQ7QUFFckQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMscUJBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVoRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUseUJBQW9CLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BGLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLG9CQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLEVBQUUseUJBQW9CLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pHLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUseUJBQW9CLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTFGLGtCQUFlLE1BQU0sQ0FBQyJ9