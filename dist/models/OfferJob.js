"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const offerJobSchema = new mongoose_1.Schema({
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
    jobContextAddedFromWorkStation: [Object],
    jobContextRemovedFromWorkStation: [String],
    precisionJobContext: String,
    skillPrecision: String,
    precisionKnowHow: String,
    jobAccess: { type: String, default: '' },
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
    isForIrisJob: { type: Boolean, default: false },
    conventionAboutIrisJob: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Convention'
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
const OfferJob = (0, mongoose_1.model)('OfferJob', offerJobSchema);
exports.default = OfferJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL09mZmVySm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQU0sQ0FDN0I7SUFDSSxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDaEQsc0JBQXNCLEVBQUUsTUFBTTtJQUM5QixZQUFZLEVBQUUsTUFBTTtJQUNwQixrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxhQUFhO0tBQ3JCO0lBQ0QsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLE1BQU07SUFDZCxZQUFZLEVBQUUsTUFBTTtJQUNwQiwwQkFBMEIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNwQywyQkFBMkIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNyQyw0QkFBNEIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN0Qyw2QkFBNkIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN2Qyw4QkFBOEIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN4QyxnQ0FBZ0MsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUMxQyxtQkFBbUIsRUFBRSxNQUFNO0lBQzNCLGNBQWMsRUFBRSxNQUFNO0lBQ3RCLGdCQUFnQixFQUFFLE1BQU07SUFDeEIsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0lBQ3hDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtJQUM5QyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDakQseUJBQXlCLEVBQUUsT0FBTztJQUNsQyxPQUFPLEVBQUU7UUFDTDtZQUNJLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsTUFBTTtZQUNWLEdBQUcsRUFBRSxNQUFNO1lBQ1gsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUMvQyxzQkFBc0IsRUFBRTtRQUNwQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCO0tBQ0o7SUFDRCx3QkFBd0IsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUMzRCxxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLDBCQUEwQixFQUFFO1FBQ3hCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELHlCQUF5QixFQUFFO1FBQ3ZCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELDRCQUE0QixFQUFFO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELDJCQUEyQixFQUFFO1FBQ3pCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELGFBQWEsRUFBRTtRQUNYO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGNBQWM7U0FDdEI7S0FDSjtJQUNELFdBQVcsRUFBRTtRQUNUO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFlBQVk7U0FDcEI7S0FDSjtJQUNELG1CQUFtQixFQUFFO1FBQ2pCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLG9CQUFvQjtTQUM1QjtLQUNKO0NBQ0osRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sUUFBUSxHQUFHLElBQUEsZ0JBQUssRUFBWSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUQsa0JBQWUsUUFBUSxDQUFDIn0=