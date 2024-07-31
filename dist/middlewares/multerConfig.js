"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dir = './uploads';
if (!fs_1.default.existsSync(dir)) {
    fs_1.default.mkdirSync(dir);
}
const storge = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Wrong file type');
        error.name = 'Wrong file type';
        cb(error, false);
    }
    else {
        cb(null, true);
    }
};
const uploads = (0, multer_1.default)({ storage: storge, fileFilter: fileFilter });
exports.default = uploads;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGVyQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL211bHRlckNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUM1QixnREFBd0I7QUFDeEIsNENBQW9CO0FBR3BCLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQztBQUN4QixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQ3RCLFlBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELE1BQU0sTUFBTSxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO0lBQzlCLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDM0IsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN4QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsWUFBWSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLElBQVMsRUFBRSxFQUFPLEVBQUUsRUFBRTtJQUNoRCxNQUFNLFlBQVksR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25ILElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUMvQixFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7U0FBTSxDQUFDO1FBQ0osRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztBQUVwRSxrQkFBZSxPQUFPLENBQUMifQ==