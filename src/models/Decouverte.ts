import { Schema, model } from 'mongoose';
import IDecouverte from '../interfaces/Decouverte';

const DecouverteSchema = new Schema<IDecouverte>(
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

const Decouverte = model<IDecouverte>('Decouverte', DecouverteSchema);
export default Decouverte;
