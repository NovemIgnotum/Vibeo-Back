"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JobInterviewSchema = new mongoose_1.Schema({
    datePlanned: Date,
    dateOfAppointment: Date,
    status: String,
    usager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usager'
    },
    entreprise: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ' Entreprise'
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
    usagerInterested: Boolean,
    entrepriseInterested: Boolean
}, {
    timestamps: true
});
const JobInterview = (0, mongoose_1.model)('JobInterview', JobInterviewSchema);
exports.default = JobInterview;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iSW50ZXJ2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Kb2JJbnRlcnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0Q7QUFHaEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGlCQUFNLENBQ2pDO0lBQ0ksV0FBVyxFQUFFLElBQUk7SUFDakIsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixNQUFNLEVBQUUsTUFBTTtJQUNkLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxRQUFRO0tBQ2hCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLGFBQWE7S0FDckI7SUFDRCxhQUFhLEVBQUU7UUFDWDtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxpQkFBaUIsRUFBRTtRQUNmO1lBQ0ksSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsTUFBTTtZQUNmLEdBQUcsRUFBRSxLQUFLO1NBQ2I7S0FDSjtJQUNELGdCQUFnQixFQUFFLE9BQU87SUFDekIsb0JBQW9CLEVBQUUsT0FBTztDQUNoQyxFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBQSxnQkFBSyxFQUFnQixjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUM5RSxrQkFBZSxZQUFZLENBQUMifQ==