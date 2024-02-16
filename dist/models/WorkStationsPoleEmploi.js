"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WorkStationsPoleEmploiSchema = new mongoose_1.Schema({
    name: String,
    codeROME: String,
    nafCodes: [String],
    definition: String,
    jobAccess: String,
    jobs: [Object],
    jobContext: [Object],
    skills: [Object],
    KnowHow: [Object]
});
const WorkStationsPoleEmploi = (0, mongoose_1.model)('WorkStationsPoleEmploi', WorkStationsPoleEmploiSchema);
exports.default = WorkStationsPoleEmploi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya1N0YXRpb25zUG9sZUVtcGxvaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvV29ya1N0YXRpb25zUG9sZUVtcGxvaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLDRCQUE0QixHQUFHLElBQUksaUJBQU0sQ0FBMEI7SUFDckUsSUFBSSxFQUFFLE1BQU07SUFDWixRQUFRLEVBQUUsTUFBTTtJQUNoQixRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDbEIsVUFBVSxFQUFFLE1BQU07SUFDbEIsU0FBUyxFQUFFLE1BQU07SUFDakIsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2QsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3BCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7Q0FDcEIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxzQkFBc0IsR0FBRyxJQUFBLGdCQUFLLEVBQTBCLHdCQUF3QixFQUFFLDRCQUE0QixDQUFDLENBQUM7QUFDdEgsa0JBQWUsc0JBQXNCLENBQUMifQ==