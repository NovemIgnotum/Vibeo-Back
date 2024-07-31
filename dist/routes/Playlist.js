"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Playlist_1 = __importDefault(require("../controllers/Playlist"));
const multer_1 = __importDefault(require("multer"));
const Multer_1 = require("../middlewares/Multer");
const upload = (0, multer_1.default)(Multer_1.multerConfig);
const cpUpload = upload.fields([{ name: 'cover', maxCount: 1 }]);
const router = express_1.default.Router();
router.post('/create', cpUpload, Playlist_1.default.createPlaylist);
router.get('/readAll', Playlist_1.default.readAllPlaylists);
router.get('/readAll/:owner', Playlist_1.default.readAllPlaylistsByUser);
router.put('/update/:id', cpUpload, Playlist_1.default.updatePlaylist);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL1BsYXlsaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQTBDO0FBQzFDLHVFQUFpRDtBQUNqRCxvREFBNEI7QUFDNUIsa0RBQXFEO0FBRXJELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sRUFBQyxxQkFBWSxDQUFDLENBQUM7QUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWpFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGtCQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsa0JBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxrQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRS9ELGtCQUFlLE1BQU0sQ0FBQyJ9