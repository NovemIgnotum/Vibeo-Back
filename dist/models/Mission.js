"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const missionSchema = new mongoose_1.Schema({
    date: Date,
    codeRome: String,
    etablissementFrom: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Etablissement' },
    workname: String,
    picture: [String],
    video: String,
    knowHowRequired: [String],
    skillsRequired: [Object],
    comments: String,
    intermediateOfferJob: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'IntermediateOfferJob'
        }
    ],
    intermediateOfferJobArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'IntermediateOfferJobArchived'
        }
    ]
}, {
    timestamps: true
});
const mission = (0, mongoose_1.model)('Mission', missionSchema);
exports.default = mission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvTWlzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFNLENBQzVCO0lBQ0ksSUFBSSxFQUFFLElBQUk7SUFDVixRQUFRLEVBQUUsTUFBTTtJQUNoQixpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRTtJQUN4RSxRQUFRLEVBQUUsTUFBTTtJQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDakIsS0FBSyxFQUFFLE1BQU07SUFDYixlQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDekIsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3hCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLG9CQUFvQixFQUFFO1FBQ2xCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLHNCQUFzQjtTQUM5QjtLQUNKO0lBQ0QsNkJBQTZCLEVBQUU7UUFDM0I7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsOEJBQThCO1NBQ3RDO0tBQ0o7Q0FDSixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsSUFBQSxnQkFBSyxFQUFXLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUMxRCxrQkFBZSxPQUFPLENBQUMifQ==