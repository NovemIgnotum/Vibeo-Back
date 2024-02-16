import { Schema, model, Types } from 'mongoose';
import IJobInterview from '../interfaces/JobInterview';

const JobInterviewSchema = new Schema<IJobInterview>(
    {
        datePlanned: Date,
        dateOfAppointment: Date,
        status: String,
        usager: {
            type: Schema.Types.ObjectId,
            ref: 'Usager'
        },
        entreprise: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true
    }
);

const JobInterview = model<IJobInterview>('JobInterview', JobInterviewSchema);
export default JobInterview;
