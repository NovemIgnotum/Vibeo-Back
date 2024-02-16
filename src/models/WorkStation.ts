import { Schema, model } from 'mongoose';
import IWorkStation from '../interfaces/WorkStation';

const workStation = new Schema<IWorkStation>(
    {
        codeRome: String,
        etablissementFrom: { type: Schema.Types.ObjectId, ref: 'Etablissement' },
        workname: String,
        picture: [String],
        video: String,
        definition: String,
        jobAccess: String,
        jobContextRequired: [Object],
        precisionJobContext: String,
        knowHowRequired: [Object],
        precisionKnowHow: String,
        skillsRequired: [Object],
        precisionSkills: String,
        offerJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OfferJob'
            }
        ],
        offerJobArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OfferJobArchived'
            }
        ],
        eventOfferJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EventOfferJob'
            }
        ],
        eventOfferJobArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EventOfferJobArchived'
            }
        ]
    },
    {
        timestamps: true
    }
);

const WorkStation = model<IWorkStation>('WorkStation', workStation);
export default WorkStation;
