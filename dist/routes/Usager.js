"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Usager_1 = __importDefault(require("../controllers/Usager"));
const router = express_1.default.Router();
router.post('/create', Usager_1.default.createUsager);
router.get('/get/:usagerId', Usager_1.default.readUsager);
router.get('/getAll/:conventionId', Usager_1.default.readAll);
router.get('/getAllByEtablissement', Usager_1.default.readAllByEtablissement);
router.put('/update/:usagerId', Usager_1.default.updateUsager);
router.delete('/delete/:usagerId', Usager_1.default.deleteUsager);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNhZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9Vc2FnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsbUVBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGdCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hELE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsZ0JBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsZ0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGdCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFNUQsa0JBQWUsTUFBTSxDQUFDIn0=