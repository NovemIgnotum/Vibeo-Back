"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Interlocutor_1 = __importDefault(require("../controllers/Interlocutor"));
const router = express_1.default.Router();
router.post('/create/:entrepriseId', Interlocutor_1.default.createInterlocutor);
router.get('/get/:interlocutorId', Interlocutor_1.default.readInterlocutor);
router.get('/getAll/:entrepriseId', Interlocutor_1.default.readAll);
router.put('/update/:interlocutorId', Interlocutor_1.default.updateInterlocutor);
router.delete('/delete/:interlocutorId', Interlocutor_1.default.deleteInterlocutor);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJsb2N1dG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9JbnRlcmxvY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsK0VBQXFEO0FBR3JELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFHaEMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxzQkFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFHcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFHaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxzQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBR3hELE1BQU0sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsc0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsc0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRXhFLGtCQUFlLE1BQU0sQ0FBQyJ9