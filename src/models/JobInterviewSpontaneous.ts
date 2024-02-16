import { Schema, model } from 'mongoose';
import IJobInterviewSpontaneous from '../interfaces/JobInterviewSpontaneous';

const JobInterviewSpontaneousSchema = new Schema<IJobInterviewSpontaneous>(
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

const JobInterviewSpontaneous = model<IJobInterviewSpontaneous>('JobInterviewSpontaneous', JobInterviewSpontaneousSchema);
export default JobInterviewSpontaneous;
