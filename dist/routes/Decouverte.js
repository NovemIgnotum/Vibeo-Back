"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Decouverte_1 = __importDefault(require("../controllers/Decouverte"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create/:offerJobId', Decouverte_1.default.createDecouverte);
router.post('/createSpontaneous', Decouverte_1.default.createDecouverteSpontaneous);
router.get('/get/:decouvertId', Decouverte_1.default.readDecouverte);
router.get('/get/:workStationId', Decouverte_1.default.readAll);
router.put('/update/:decouverteId', Decouverte_1.default.updateDecouverte);
router.delete('/delete/:decouverteId', IsAuthenticated_1.default, Decouverte_1.default.deleteDecouverte);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3V2ZXJ0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvRGVjb3V2ZXJ0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QiwyRUFBbUQ7QUFDbkQscUZBQWtFO0FBRWxFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxvQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxvQkFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDMUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxvQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RCxNQUFNLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLG9CQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFLHlCQUFvQixFQUFFLG9CQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUUxRixrQkFBZSxNQUFNLENBQUMifQ==