"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Collectivity_1 = __importDefault(require("../controllers/Collectivity"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create/:etablissementId', Collectivity_1.default.createCollectivity);
router.get('/get/:collectivityId', Collectivity_1.default.readCollectivity);
router.get('/getAll/:etablissementId', Collectivity_1.default.readAll);
router.put('/update/:collectivityId', Collectivity_1.default.updateCollectivity);
router.delete('/delete/:collectivityId', IsAuthenticated_1.default, Collectivity_1.default.deleteCollectivity);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGl2aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9Db2xsZWN0aXZpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsK0VBQXFEO0FBQ3JELHFGQUFrRTtBQUVsRSxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsc0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsc0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsc0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLHNCQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNyRSxNQUFNLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLHlCQUFvQixFQUFFLHNCQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU5RixrQkFBZSxNQUFNLENBQUMifQ==