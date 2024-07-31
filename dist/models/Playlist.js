"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const playlistSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    tracks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Track' }],
    cover: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Playlist = (0, mongoose_1.model)('Playlist', playlistSchema);
exports.default = Playlist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1BsYXlsaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQU0sQ0FBWTtJQUN6QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNuRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN2RCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQ3ZCLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDNUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtDQUMvQyxDQUFDLENBQUM7QUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFBLGdCQUFLLEVBQVksVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzlELGtCQUFlLFFBQVEsQ0FBQyJ9