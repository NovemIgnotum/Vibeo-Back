"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const Authorization_1 = require("../middlewares/Authorization");
const router = express_1.default.Router();
router.post('/Create/', User_1.default.createUser);
router.get('/GetAll/', User_1.default.getAllUsers);
router.get('/:id', User_1.default.getUser);
router.post('/Login/', User_1.default.login);
router.get('/GetAllAds/', Authorization_1.authenticateJWT, (0, Authorization_1.authorizeRole)('admin'), User_1.default.getAllAdmins);
router.put('/:id', User_1.default.update);
router.post('/Logout/', User_1.default.logoutUser);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEwQztBQUMxQywrREFBNkM7QUFFN0MsZ0VBQThFO0FBRTlFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGNBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxjQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLCtCQUFlLEVBQUUsSUFBQSw2QkFBYSxFQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1RixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxjQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRS9DLGtCQUFlLE1BQU0sQ0FBQyJ9