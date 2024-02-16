"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offerJobSpontaneousSchema = new mongoose_1.Schema({
    isFromAnEvent: { type: Boolean, default: false },
    numOfferJobForTheEvent: Number,
    contractType: String,
    numberHoursPerWeek: Number,
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    offerName: String,
    salary: Number,
    workContract: Object,
    skillsAddedFromWorkStation: [Object],
    knowHowAddedFromWorkStation: [Object],
    skillsRemovedFromWorkStation: [String],
    knowHowRemovedFromWorkStation: [String],
    jobContext: [String],
    precisionJobContext: String,
    status: { type: String, default: 'Available' },
    contractHelped: { type: Boolean, default: false },
    hasBeenTakenByOurServices: Boolean,
    history: [
        {
            title: String,
            date: Date,
            by: String,
            for: String,
            comment: String,
            _id: false
        }
    ],
    usagerPositioned: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    offerBlockedAutomaticaly: { type: Boolean, default: false },
    offerBlockedUntilDate: Date,
    usagerAcceptedByEntreprise: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    usagerRefusedByEntreprise: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    usagerWhoAcceptedTheOfferJob: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    usagerWhoRefusedTheOfferJob: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    jobInterviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'JobInterview'
        }
    ],
    decouvertes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Decouverte'
        }
    ],
    employmentContracts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EmploymentContract'
        }
    ]
}, {
    timestamps: true
});
const OfferJobSpontaneous = (0, mongoose_1.model)('OfferJobSpontaneous', offerJobSpontaneousSchema);
exports.default = OfferJobSpontaneous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJKb2JTcG9udGFuZW91cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvT2ZmZXJKb2JTcG9udGFuZW91cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLHlCQUF5QixHQUFHLElBQUksaUJBQU0sQ0FDeEM7SUFDSSxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDaEQsc0JBQXNCLEVBQUUsTUFBTTtJQUM5QixZQUFZLEVBQUUsTUFBTTtJQUNwQixrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxhQUFhO0tBQ3JCO0lBQ0QsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLE1BQU07SUFDZCxZQUFZLEVBQUUsTUFBTTtJQUNwQiwwQkFBMEIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNwQywyQkFBMkIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNyQyw0QkFBNEIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN0Qyw2QkFBNkIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN2QyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDcEIsbUJBQW1CLEVBQUUsTUFBTTtJQUMzQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDOUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQ2pELHlCQUF5QixFQUFFLE9BQU87SUFDbEMsT0FBTyxFQUFFO1FBQ0w7WUFDSSxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsRUFBRSxFQUFFLE1BQU07WUFDVixHQUFHLEVBQUUsTUFBTTtZQUNYLE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2hCO0tBQ0o7SUFDRCx3QkFBd0IsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUMzRCxxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLDBCQUEwQixFQUFFO1FBQ3hCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELHlCQUF5QixFQUFFO1FBQ3ZCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELDRCQUE0QixFQUFFO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELDJCQUEyQixFQUFFO1FBQ3pCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELGFBQWEsRUFBRTtRQUNYO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGNBQWM7U0FDdEI7S0FDSjtJQUNELFdBQVcsRUFBRTtRQUNUO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFlBQVk7U0FDcEI7S0FDSjtJQUNELG1CQUFtQixFQUFFO1FBQ2pCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLG9CQUFvQjtTQUM1QjtLQUNKO0NBQ0osRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxnQkFBSyxFQUF1QixxQkFBcUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQzFHLGtCQUFlLG1CQUFtQixDQUFDIn0=