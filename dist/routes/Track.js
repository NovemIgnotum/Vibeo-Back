"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Track_1 = __importDefault(require("../controllers/Track"));
const router = express_1.default.Router();
router.post('/Create/', Track_1.default.createTrack);
router.get('/GetAll/', Track_1.default.getAllTracks);
router.get('/Get/:id', Track_1.default.getTrack);
router.put('/Update/:id', Track_1.default.updateTrack);
router.delete('/Delete/:id', Track_1.default.deleteTrack);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1RyYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRzlCLGlFQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxlQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFckQsa0JBQWUsTUFBTSxDQUFDIn0=