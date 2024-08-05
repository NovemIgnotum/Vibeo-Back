"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bandSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    genre: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Genre', required: true },
    members: [{ type: String, required: true }],
    albums: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Album' }],
    profilePic: { type: String },
    backgroundPic: { type: String }
});
const Band = (0, mongoose_1.model)('Band', bandSchema);
exports.default = Band;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQmFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQU87SUFDaEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3RDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3BFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDM0MsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN2RCxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0lBQzVCLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7Q0FDbEMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxJQUFJLEdBQUcsSUFBQSxnQkFBSyxFQUFPLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM3QyxrQkFBZSxJQUFJLENBQUMifQ==