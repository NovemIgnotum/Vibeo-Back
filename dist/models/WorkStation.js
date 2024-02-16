"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workStation = new mongoose_1.Schema({
    codeRome: String,
    etablissementFrom: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Etablissement' },
    workname: String,
    picture: [String],
    video: String,
    definition: String,
    jobAccess: String,
    jobContextRequired: [Object],
    precisionJobContext: String,
    knowHowRequired: [Object],
    precisionKnowHow: String,
    skillsRequired: [Object],
    precisionSkills: String,
    offerJobs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OfferJob'
        }
    ],
    offerJobArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OfferJobArchived'
        }
    ],
    eventOfferJobs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EventOfferJob'
        }
    ],
    eventOfferJobArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EventOfferJobArchived'
        }
    ]
}, {
    timestamps: true
});
const WorkStation = (0, mongoose_1.model)('WorkStation', workStation);
exports.default = WorkStation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya1N0YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1dvcmtTdGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FDMUI7SUFDSSxRQUFRLEVBQUUsTUFBTTtJQUNoQixpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRTtJQUN4RSxRQUFRLEVBQUUsTUFBTTtJQUNoQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDakIsS0FBSyxFQUFFLE1BQU07SUFDYixVQUFVLEVBQUUsTUFBTTtJQUNsQixTQUFTLEVBQUUsTUFBTTtJQUNqQixrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUM1QixtQkFBbUIsRUFBRSxNQUFNO0lBQzNCLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN6QixnQkFBZ0IsRUFBRSxNQUFNO0lBQ3hCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN4QixlQUFlLEVBQUUsTUFBTTtJQUN2QixTQUFTLEVBQUU7UUFDUDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxVQUFVO1NBQ2xCO0tBQ0o7SUFDRCxpQkFBaUIsRUFBRTtRQUNmO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGtCQUFrQjtTQUMxQjtLQUNKO0lBQ0QsY0FBYyxFQUFFO1FBQ1o7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsZUFBZTtTQUN2QjtLQUNKO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDcEI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsdUJBQXVCO1NBQy9CO0tBQ0o7Q0FDSixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsSUFBQSxnQkFBSyxFQUFlLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNwRSxrQkFBZSxXQUFXLENBQUMifQ==