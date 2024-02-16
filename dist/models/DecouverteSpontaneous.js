"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DecouverteSpontaneousSchema = new mongoose_1.Schema({
    isFromAnEvent: { type: Boolean, default: false },
    jobName: String,
    startingDate: Date,
    endingDate: Date,
    entreprise: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Entreprise'
    },
    usager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usager'
    },
    usagerComment: [
        {
            date: Date,
            comment: String,
            _id: false
        }
    ],
    entrepriseComment: [
        {
            date: Date,
            comment: String,
            _id: false
        }
    ],
    skillsAquired: [Object],
    knowHowsAquired: [Object],
    contextesJobAquired: [Object],
    validatedByUsager: Boolean,
    validatedByEntreprise: Boolean
}, {
    timestamps: true
});
const DecouverteSpontaneous = (0, mongoose_1.model)('DecouverteSpontaneous', DecouverteSpontaneousSchema);
exports.default = DecouverteSpontaneous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3V2ZXJ0ZVNwb250YW5lb3VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9EZWNvdXZlcnRlU3BvbnRhbmVvdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFHekMsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLGlCQUFNLENBQzFDO0lBQ0ksYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQ2hELE9BQU8sRUFBRSxNQUFNO0lBQ2YsWUFBWSxFQUFFLElBQUk7SUFDbEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFlBQVk7S0FDcEI7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsUUFBUTtLQUNoQjtJQUNELGFBQWEsRUFBRTtRQUNYO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsTUFBTTtZQUNmLEdBQUcsRUFBRSxLQUFLO1NBQ2I7S0FDSjtJQUNELGlCQUFpQixFQUFFO1FBQ2Y7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN6QixtQkFBbUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUM3QixpQkFBaUIsRUFBRSxPQUFPO0lBQzFCLHFCQUFxQixFQUFFLE9BQU87Q0FDakMsRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0scUJBQXFCLEdBQUcsSUFBQSxnQkFBSyxFQUF5Qix1QkFBdUIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0FBQ2xILGtCQUFlLHFCQUFxQixDQUFDIn0=