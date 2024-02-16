import { Schema, model } from 'mongoose';
import IMission from '../interfaces/Mission';

const missionSchema = new Schema<IMission>(
    {
        date: Date,
        codeRome: String,
        etablissementFrom: { type: Schema.Types.ObjectId, ref: 'Etablissement' },
        workname: String,
        picture: [String],
        video: String,
        knowHowRequired: [String],
        skillsRequired: [Object],
        comments: String,
        intermediateOfferJob: [
            {
                type: Schema.Types.ObjectId,
                ref: 'IntermediateOfferJob'
            }
        ],
        intermediateOfferJobArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'IntermediateOfferJobArchived'
            }
        ]
    },
    {
        timestamps: true
    }
);

const mission = model<IMission>('Mission', missionSchema);
export default mission;
