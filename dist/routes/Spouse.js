"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Spouse_1 = __importDefault(require("../controllers/Spouse"));
const router = express_1.default.Router();
router.post('/create/:usagerId', Spouse_1.default.createSpouse);
router.delete('/delete/:usagerId', Spouse_1.default.deleteSpouse);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9TcG91c2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsbUVBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxnQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFELE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsZ0JBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUU1RCxrQkFBZSxNQUFNLENBQUMifQ==