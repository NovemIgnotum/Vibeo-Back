"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EventOfferJobSchema = new mongoose_1.Schema({
    isFromAnEvent: Boolean,
    numberOfJobOffersForTheEvent: Number,
    contractType: String,
    numberHoursPerWeek: Number,
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    offerName: String,
    workContract: Object,
    salary: Number,
    status: String,
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
    offerBlockedAutomaticaly: Boolean,
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
    usagerWhoAcceptedTheEventOfferJob: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    usagerWhoRefusedTheEventOfferJob: [
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
const EventOfferJob = (0, mongoose_1.model)('EventOfferJob', EventOfferJobSchema);
exports.default = EventOfferJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRPZmZlckpvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRXZlbnRPZmZlckpvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLG1CQUFtQixHQUFHLElBQUksaUJBQU0sQ0FDbEM7SUFDSSxhQUFhLEVBQUUsT0FBTztJQUN0Qiw0QkFBNEIsRUFBRSxNQUFNO0lBQ3BDLFlBQVksRUFBRSxNQUFNO0lBQ3BCLGtCQUFrQixFQUFFLE1BQU07SUFDMUIsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLGFBQWE7S0FDckI7SUFDRCxTQUFTLEVBQUUsTUFBTTtJQUNqQixZQUFZLEVBQUUsTUFBTTtJQUNwQixNQUFNLEVBQUUsTUFBTTtJQUNkLE1BQU0sRUFBRSxNQUFNO0lBQ2QseUJBQXlCLEVBQUUsT0FBTztJQUNsQyxPQUFPLEVBQUU7UUFDTDtZQUNJLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsTUFBTTtZQUNWLEdBQUcsRUFBRSxNQUFNO1lBQ1gsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELHdCQUF3QixFQUFFLE9BQU87SUFDakMscUJBQXFCLEVBQUUsSUFBSTtJQUMzQiwwQkFBMEIsRUFBRTtRQUN4QjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2hCO0tBQ0o7SUFDRCx5QkFBeUIsRUFBRTtRQUN2QjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2hCO0tBQ0o7SUFDRCxpQ0FBaUMsRUFBRTtRQUMvQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2hCO0tBQ0o7SUFDRCxnQ0FBZ0MsRUFBRTtRQUM5QjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxRQUFRO1NBQ2hCO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxjQUFjO1NBQ3RCO0tBQ0o7SUFDRCxXQUFXLEVBQUU7UUFDVDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCO0tBQ0o7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxvQkFBb0I7U0FDNUI7S0FDSjtDQUNKLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFDRixNQUFNLGFBQWEsR0FBRyxJQUFBLGdCQUFLLEVBQWlCLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2xGLGtCQUFlLGFBQWEsQ0FBQyJ9