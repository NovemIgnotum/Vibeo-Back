"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Band_1 = __importDefault(require("../controllers/Band"));
const router = express_1.default.Router();
router.post('/Create/', Band_1.default.createBand);
router.get('/GetAll/', Band_1.default.getAllBands);
router.get('/Get/:id', Band_1.default.getBand);
router.put('/UpdateMember/:id', Band_1.default.updateMember);
router.put('/UpdateAlbums/:id', Band_1.default.updateAlbums);
router.put('/UpdateInfo/:id', Band_1.default.updateInfo);
router.delete('/Delete/:id', Band_1.default.deleteBand);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvQmFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUc5QiwrREFBNkM7QUFFN0MsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsY0FBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGNBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLGNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGNBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFcEQsa0JBQWUsTUFBTSxDQUFDIn0=