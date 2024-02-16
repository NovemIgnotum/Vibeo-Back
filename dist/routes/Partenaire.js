"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Partenaire_1 = __importDefault(require("../controllers/Partenaire"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create', Partenaire_1.default.createPartenaire);
router.get('/get/:partenaireId', Partenaire_1.default.readPartenaire);
router.get('/get/', Partenaire_1.default.readAll);
router.put('/update/:partenaireId', Partenaire_1.default.updatePartenaire);
router.delete('/delete/:partenaireId', IsAuthenticated_1.default, Partenaire_1.default.deletePartenaire);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGVuYWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvUGFydGVuYWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QiwyRUFBbUQ7QUFDbkQscUZBQWtFO0FBRWxFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsb0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUseUJBQW9CLEVBQUUsb0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTFGLGtCQUFlLE1BQU0sQ0FBQyJ9