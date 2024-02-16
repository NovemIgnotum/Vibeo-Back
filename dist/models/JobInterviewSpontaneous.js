"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const JobInterviewSpontaneousSchema = new mongoose_1.Schema({
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
const JobInterviewSpontaneous = (0, mongoose_1.model)('JobInterviewSpontaneous', JobInterviewSpontaneousSchema);
exports.default = JobInterviewSpontaneous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iSW50ZXJ2aWV3U3BvbnRhbmVvdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0pvYkludGVydmlld1Nwb250YW5lb3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sNkJBQTZCLEdBQUcsSUFBSSxpQkFBTSxDQUM1QztJQUNJLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsTUFBTSxFQUFFLE1BQU07SUFDZCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsUUFBUTtLQUNoQjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxhQUFhO0tBQ3JCO0lBQ0QsYUFBYSxFQUFFO1FBQ1g7WUFDSSxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxNQUFNO1lBQ2YsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZjtZQUNJLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLE1BQU07WUFDZixHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLG9CQUFvQixFQUFFLE9BQU87Q0FDaEMsRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sdUJBQXVCLEdBQUcsSUFBQSxnQkFBSyxFQUEyQix5QkFBeUIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0FBQzFILGtCQUFlLHVCQUF1QixDQUFDIn0=