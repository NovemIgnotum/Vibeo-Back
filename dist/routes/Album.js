"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Album_1 = __importDefault(require("../controllers/Album"));
const router = express_1.default.Router();
router.post('/Create/', Album_1.default.createAlbum);
router.get('/GetAll/', Album_1.default.getAllAlbums);
router.get('/Get/:id', Album_1.default.getAlbum);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxidW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0FsYnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRTlCLGlFQUE4QztBQUU5QyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTVDLGtCQUFlLE1BQU0sQ0FBQyJ9