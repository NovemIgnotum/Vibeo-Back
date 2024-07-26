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
router.post('/CreateAdmin/', Authorization_1.authenticateJWT, (0, Authorization_1.authorizeRole)('admin'), User_1.default.createAdmin);
router.get('/GetAll/', User_1.default.getAllUsers);
router.get('/:id', User_1.default.getUser);
router.post('/Login/', User_1.default.login);
router.get('/GetAllAds/', Authorization_1.authenticateJWT, (0, Authorization_1.authorizeRole)('admin'), User_1.default.getAllAdmins);
router.get('/Admin/:id', Authorization_1.authenticateJWT, (0, Authorization_1.authorizeRole)('admin'), User_1.default.getAdmin);
router.put('UpdateUser/:id', User_1.default.updateUser);
router.post('/Logout/', User_1.default.logoutUser);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEwQztBQUMxQywrREFBNkM7QUFFN0MsZ0VBQThFO0FBRTlFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLCtCQUFlLEVBQUUsSUFBQSw2QkFBYSxFQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5RixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxjQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSwrQkFBZSxFQUFFLElBQUEsNkJBQWEsRUFBQyxPQUFPLENBQUMsRUFBRSxjQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsK0JBQWUsRUFBRSxJQUFBLDZCQUFhLEVBQUMsT0FBTyxDQUFDLEVBQUUsY0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZGLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUUvQyxrQkFBZSxNQUFNLENBQUMifQ==