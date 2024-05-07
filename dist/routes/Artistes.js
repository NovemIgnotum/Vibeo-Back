"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Artistes_1 = __importDefault(require("../controllers/Artistes"));
const router = express_1.default.Router();
router.post('/Create/', Artistes_1.default.createArtiste);
router.get('/GetAll/', Artistes_1.default.getAllArtistes);
router.get('/Get/:id', Artistes_1.default.getArtiste);
router.put('/Update/:id', Artistes_1.default.updateArtiste);
router.delete('/Delete/:id', Artistes_1.default.deleteArtiste);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJ0aXN0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL0FydGlzdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBRzlCLHVFQUFpRDtBQUVqRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGtCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGtCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsa0JBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV2RCxrQkFBZSxNQUFNLENBQUMifQ==