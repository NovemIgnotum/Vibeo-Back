"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JobInterview_1 = __importDefault(require("../controllers/JobInterview"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create/:offerJobId', JobInterview_1.default.createJobInterview);
router.get('/get/:jobInterviewId', JobInterview_1.default.readJobInterview);
router.put('/update/:jobInterviewId', JobInterview_1.default.updateJobInterview);
router.delete('/delete/:jobInterviewId', IsAuthenticated_1.default, JobInterview_1.default.deleteJobInterview);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iSW50ZXJ2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9Kb2JJbnRlcnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFFOUIsK0VBQXFEO0FBRXJELHFGQUFrRTtBQUVsRSxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsc0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsc0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsc0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUseUJBQW9CLEVBQUUsc0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTlGLGtCQUFlLE1BQU0sQ0FBQyJ9