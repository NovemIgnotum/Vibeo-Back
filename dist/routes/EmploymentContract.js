"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmploymentContract_1 = __importDefault(require("../controllers/EmploymentContract"));
const router = express_1.default.Router();
router.post('/create', EmploymentContract_1.default.createEmploymentContract);
router.get('/get/:employmentContractId', EmploymentContract_1.default.readEmploymentContract);
router.get('/getAll/:offerJobId', EmploymentContract_1.default.readAll);
router.put('/update/:employmentContractId', EmploymentContract_1.default.updateEmploymentContract);
router.delete('/delete/:employmentContractId', EmploymentContract_1.default.deleteEmploymentContract);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95bWVudENvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9FbXBsb3ltZW50Q29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMkZBQTJEO0FBRTNELE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsNEJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsNEJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzVFLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsNEJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RCxNQUFNLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLDRCQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNqRixNQUFNLENBQUMsTUFBTSxDQUFDLCtCQUErQixFQUFFLDRCQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUVwRixrQkFBZSxNQUFNLENBQUMifQ==