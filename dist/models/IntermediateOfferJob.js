"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IntermediateOfferJobSchema = new mongoose_1.Schema({
    isFromAnEvent: { type: Boolean, default: false },
    contractType: String,
    nameOfCompany: String,
    numberHoursPerWeek: Number,
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    offerName: String,
    salary: Number,
    workContract: Object,
    status: { type: String, default: 'Available' },
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
    usagerWhoAcceptedTheIntermediateOfferJob: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    usagerWhoRefusedTheIntermediateOfferJob: [
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
const IntermediateOfferJob = (0, mongoose_1.model)('IntermediateOfferJob', IntermediateOfferJobSchema);
exports.default = IntermediateOfferJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJtZWRpYXRlT2ZmZXJKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0ludGVybWVkaWF0ZU9mZmVySm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxpQkFBTSxDQUN6QztJQUNJLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtJQUNoRCxZQUFZLEVBQUUsTUFBTTtJQUNwQixhQUFhLEVBQUUsTUFBTTtJQUNyQixrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxhQUFhO0tBQ3JCO0lBQ0QsU0FBUyxFQUFFLE1BQU07SUFDakIsTUFBTSxFQUFFLE1BQU07SUFDZCxZQUFZLEVBQUUsTUFBTTtJQUNwQixNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7SUFDOUMseUJBQXlCLEVBQUUsT0FBTztJQUNsQyxPQUFPLEVBQUU7UUFDTDtZQUNJLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsTUFBTTtZQUNWLEdBQUcsRUFBRSxNQUFNO1lBQ1gsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQzNELHFCQUFxQixFQUFFLElBQUk7SUFDM0IsMEJBQTBCLEVBQUU7UUFDeEI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsUUFBUTtTQUNoQjtLQUNKO0lBQ0QseUJBQXlCLEVBQUU7UUFDdkI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsUUFBUTtTQUNoQjtLQUNKO0lBQ0Qsd0NBQXdDLEVBQUU7UUFDdEM7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsUUFBUTtTQUNoQjtLQUNKO0lBQ0QsdUNBQXVDLEVBQUU7UUFDckM7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsUUFBUTtTQUNoQjtLQUNKO0lBQ0QsYUFBYSxFQUFFO1FBQ1g7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsY0FBYztTQUN0QjtLQUNKO0lBQ0QsV0FBVyxFQUFFO1FBQ1Q7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsWUFBWTtTQUNwQjtLQUNKO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsb0JBQW9CO1NBQzVCO0tBQ0o7Q0FDSixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLGdCQUFLLEVBQXdCLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDLENBQUM7QUFDOUcsa0JBQWUsb0JBQW9CLENBQUMifQ==