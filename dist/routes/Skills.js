"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Skills_1 = __importDefault(require("../controllers/Skills"));
const router = express_1.default.Router();
router.post('/create/:usagerId', Skills_1.default.createSkillsForUsager);
router.get('/get/:usagerId', Skills_1.default.readSkills);
router.get('/getAll/', Skills_1.default.readAll);
router.put('/update/:skillsAndKnowHowsId', Skills_1.default.updateSkills);
router.delete('/delete/:usagerId', Skills_1.default.deleteSkills);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9Ta2lsbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsbUVBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxnQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGdCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxnQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BFLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsZ0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1RCxrQkFBZSxNQUFNLENBQUMifQ==