"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    nameOfEvent: String,
    maxNumOfPartenaire: Number,
    dateAndHourOfEvent: Date,
    isActivated: { type: Boolean, default: true },
    type: String,
    usagers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    entreprise: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Entreprise'
        }
    ],
    eventOfferJobs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EventOfferJob'
        }
    ],
    eventWorkStations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'WorkStation'
        }
    ],
    history: [
        {
            title: String,
            date: Date,
            by: String,
            for: String,
            comment: String
        }
    ],
    poster: Object
}, {
    timestamps: true
});
const Event = (0, mongoose_1.model)('Event', eventSchema);
exports.default = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FDMUI7SUFDSSxXQUFXLEVBQUUsTUFBTTtJQUNuQixrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQzdDLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFO1FBQ0w7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsUUFBUTtTQUNoQjtLQUNKO0lBQ0QsVUFBVSxFQUFFO1FBQ1I7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsWUFBWTtTQUNwQjtLQUNKO0lBQ0QsY0FBYyxFQUFFO1FBQ1o7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsZUFBZTtTQUN2QjtLQUNKO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxhQUFhO1NBQ3JCO0tBQ0o7SUFDRCxPQUFPLEVBQUU7UUFDTDtZQUNJLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsTUFBTTtZQUNWLEdBQUcsRUFBRSxNQUFNO1lBQ1gsT0FBTyxFQUFFLE1BQU07U0FDbEI7S0FDSjtJQUNELE1BQU0sRUFBRSxNQUFNO0NBQ2pCLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLEtBQUssR0FBRyxJQUFBLGdCQUFLLEVBQVMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2xELGtCQUFlLEtBQUssQ0FBQyJ9