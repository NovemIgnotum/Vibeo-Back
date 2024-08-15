"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Multer_1 = require("../middlewares/Multer");
const Genre_1 = __importDefault(require("../controllers/Genre"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([
    { name: 'picture', maxCount: 1 }
]);
router.post('/Create/', cpUpload, Genre_1.default.createGenre);
router.get('/GetAll/', Genre_1.default.getAllGenres);
router.get('/Get/:id', Genre_1.default.getGenre);
router.put('/Update/:id', cpUpload, Genre_1.default.updateGenre);
router.delete('/Delete/:id', Genre_1.default.deleteGenre);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VucmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0dlbnJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLG9EQUE0QjtBQUM1QixrREFBcUQ7QUFFckQsaUVBQThDO0FBRzlDLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDLHFCQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzNCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO0NBQ25DLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxlQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUUsZUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzNELE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLGVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVyRCxrQkFBZSxNQUFNLENBQUMifQ==