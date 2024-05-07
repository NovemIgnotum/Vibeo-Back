"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Genre_1 = __importDefault(require("../controllers/Genre"));
const router = express_1.default.Router();
router.post('/Create/', Genre_1.default.createGenre);
router.get('/GetAll/', Genre_1.default.getAllGenres);
router.get('/Get/:id', Genre_1.default.getGenre);
router.put('/Update/:id', Genre_1.default.updateGenre);
router.delete('/Delete/:id', Genre_1.default.deleteGenre);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VucmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0dlbnJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRzlCLGlFQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxlQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFckQsa0JBQWUsTUFBTSxDQUFDIn0=