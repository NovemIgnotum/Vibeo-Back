"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DecouverteSchema = new mongoose_1.Schema({
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
const Decouverte = (0, mongoose_1.model)('Decouverte', DecouverteSchema);
exports.default = Decouverte;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVjb3V2ZXJ0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRGVjb3V2ZXJ0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLGdCQUFnQixHQUFHLElBQUksaUJBQU0sQ0FDL0I7SUFDSSxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDaEQsT0FBTyxFQUFFLE1BQU07SUFDZixZQUFZLEVBQUUsSUFBSTtJQUNsQixVQUFVLEVBQUUsSUFBSTtJQUNoQixVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsWUFBWTtLQUNwQjtJQUNELE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxRQUFRO0tBQ2hCO0lBQ0QsYUFBYSxFQUFFO1FBQ1g7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZjtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDdkIsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3pCLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDO0lBQzdCLGlCQUFpQixFQUFFLE9BQU87SUFDMUIscUJBQXFCLEVBQUUsT0FBTztDQUNqQyxFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBQSxnQkFBSyxFQUFjLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RFLGtCQUFlLFVBQVUsQ0FBQyJ9