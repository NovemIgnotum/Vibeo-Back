"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Room_1 = __importDefault(require("../controllers/Room"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create/:etablissementId', IsAuthenticated_1.default, Room_1.default.createRoom);
router.get('/get/:roomId', Room_1.default.readRoom);
router.get('/getAll/:etablissementId', Room_1.default.readAll);
router.put('/update/:roomId', IsAuthenticated_1.default, Room_1.default.updateRoom);
router.delete('/delete/:roomId', IsAuthenticated_1.default, Room_1.default.deleteRoom);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QiwrREFBNkM7QUFDN0MscUZBQWtFO0FBRWxFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRSx5QkFBb0IsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsY0FBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUseUJBQW9CLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUseUJBQW9CLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRTlFLGtCQUFlLE1BQU0sQ0FBQyJ9