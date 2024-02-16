"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Prospect_1 = __importDefault(require("../controllers/Prospect"));
const router = express_1.default.Router();
router.get('/get/:prospectId', Prospect_1.default.readProspect);
router.put('/update/:prospectId', Prospect_1.default.updateProspect);
router.delete('/delete/:prospectId', Prospect_1.default.deleteProspect);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvc3BlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1Byb3NwZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHVFQUFpRDtBQUVqRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsa0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGtCQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxrQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRWhFLGtCQUFlLE1BQU0sQ0FBQyJ9