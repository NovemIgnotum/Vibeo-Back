"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const multer_1 = __importDefault(require("multer"));
const Multer_1 = require("../middlewares/Multer");
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([
    { name: 'pic', maxCount: 1 },
    { name: 'background', maxCount: 1 }
]);
const router = express_1.default.Router();
router.post('/Create/', User_1.default.createUser);
router.get('/GetAll/', User_1.default.readAll);
router.get('/:id', User_1.default.readUser);
router.post('/Login/', User_1.default.login);
router.post('/Logout/', User_1.default.logout);
router.put('/Update/:id', cpUpload, User_1.default.updateUser);
router.delete('/Delete/:id', User_1.default.deleteUser);
router.put('/addPlaylist/:id', User_1.default.addPlaylist);
router.put('/removePlaylist/:id', User_1.default.removePlaylist);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEwQztBQUMxQywrREFBNkM7QUFDN0Msb0RBQTRCO0FBQzVCLGtEQUFxRDtBQUVyRCxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMscUJBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDM0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7SUFDNUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7Q0FDdEMsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGNBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsY0FBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsY0FBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTdELGtCQUFlLE1BQU0sQ0FBQyJ9