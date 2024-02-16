"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Contact_1 = __importDefault(require("../controllers/Contact"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create/:id', Contact_1.default.createContact);
router.get('/get/:contactId', Contact_1.default.readContact);
router.get('/getAll/:id', Contact_1.default.readAll);
router.put('/update/:contactId', Contact_1.default.updateContact);
router.delete('/delete/:contactId', IsAuthenticated_1.default, Contact_1.default.deleteContact);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQ29udGFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixxRUFBZ0Q7QUFDaEQscUZBQWtFO0FBRWxFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsaUJBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGlCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsaUJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QyxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGlCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSx5QkFBb0IsRUFBRSxpQkFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXBGLGtCQUFlLE1BQU0sQ0FBQyJ9