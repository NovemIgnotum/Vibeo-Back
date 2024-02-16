"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Action_1 = __importDefault(require("../controllers/Action"));
const router = express_1.default.Router();
router.post('/create', Action_1.default.createAction);
router.get('/get/:creId', Action_1.default.readAction);
router.get('/get/', Action_1.default.readAll);
router.put('/update/:creId', Action_1.default.updateAction);
router.delete('/delete', Action_1.default.deleteAction);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsbUVBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxnQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGdCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLGdCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFbEQsa0JBQWUsTUFBTSxDQUFDIn0=