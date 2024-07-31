"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(__dirname, '../uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            const ext = path_1.default.extname(file.originalname);
            const filename = `${(0, uuid_1.v4)()}${ext}`;
            cb(null, filename);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG files are allowed.'));
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL011bHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxtQ0FBOEM7QUFDOUMsK0JBQW9DO0FBQ3BDLGdEQUF3QjtBQUN4Qiw0Q0FBb0I7QUFHcEIsTUFBTSxTQUFTLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFHckQsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUM1QixZQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFWSxRQUFBLFlBQVksR0FBWTtJQUNqQyxPQUFPLEVBQUUsSUFBQSxvQkFBVyxFQUFDO1FBQ2pCLFdBQVcsRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNoQyxFQUFFLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxHQUFHLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUMsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFBLFNBQU0sR0FBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUNKLENBQUM7SUFDRixNQUFNLEVBQUU7UUFDSixRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJO0tBQzVCO0lBQ0QsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUMxQixNQUFNLFlBQVksR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQzthQUFNLENBQUM7WUFDSixFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQyJ9