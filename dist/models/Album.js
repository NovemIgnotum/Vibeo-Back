"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const albumSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    band: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Band', required: true },
    tracks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Track' }]
});
const Album = (0, mongoose_1.model)('Album', albumSchema);
exports.default = Album;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxidW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0FsYnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FBUTtJQUNsQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDbEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQztDQUMxRCxDQUFDLENBQUM7QUFFSCxNQUFNLEtBQUssR0FBRyxJQUFBLGdCQUFLLEVBQVEsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2pELGtCQUFlLEtBQUssQ0FBQyJ9