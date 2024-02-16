import { Schema, model } from 'mongoose';
import IDecouverteSpontaneous from '../interfaces/DecouverteSpontaneous';

const DecouverteSpontaneousSchema = new Schema<IDecouverteSpontaneous>(
    {
        isFromAnEvent: { type: Boolean, default: false },
        jobName: String,
        startingDate: Date,
        endingDate: Date,
        entreprise: {
            type: Schema.Types.ObjectId,
            ref: 'Entreprise'
        },
        usager: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true
    }
);

const DecouverteSpontaneous = model<IDecouverteSpontaneous>('DecouverteSpontaneous', DecouverteSpontaneousSchema);
export default DecouverteSpontaneous;
