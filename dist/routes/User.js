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
router.post('/Login/', User_1.default.loginUser);
router.get('/GetAll/', User_1.default.getAllUsers);
router.get('/:id', User_1.default.getUser);
router.get('/GetAllAds/', Authorization_1.authenticateJWT, (0, Authorization_1.authorizeRole)('admin'), User_1.default.getAllAdmins);
router.get('/Admin/:id', Authorization_1.authenticateJWT, (0, Authorization_1.authorizeRole)('admin'), User_1.default.getAdmin);
router.put('UpdateUser/:id', User_1.default.updateUser);
router.post('/Logout/', User_1.default.logoutUser);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUEwQztBQUMxQywrREFBNkM7QUFFN0MsZ0VBQThFO0FBRTlFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLCtCQUFlLEVBQUUsSUFBQSw2QkFBYSxFQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5RixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGNBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSwrQkFBZSxFQUFFLElBQUEsNkJBQWEsRUFBQyxPQUFPLENBQUMsRUFBRSxjQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsK0JBQWUsRUFBRSxJQUFBLDZCQUFhLEVBQUMsT0FBTyxDQUFDLEVBQUUsY0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZGLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXBELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUUvQyxrQkFBZSxNQUFNLENBQUMifQ==