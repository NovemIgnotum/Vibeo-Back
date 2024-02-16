import { Schema, model } from 'mongoose';
import IProspect from '../interfaces/Prospect';

const prospectSchema = new Schema<IProspect>(
    {
        siret: String,
        denomination: String,
        enseigne: String,
        adresse: String,
        zip: Number,
        city: String,
        lng: Number,
        lat: Number,
        codeNaf: String,
        entreprise: {
            type: Schema.Types.ObjectId,
            ref: 'Entreprise'
        },
        distance: String,
        natureContact: String,
        usager: {
            type: Schema.Types.ObjectId,
            ref: 'Usager'
        },
        isDone: { type: Boolean, default: false },
        theyHaveNeed: Boolean,
        comment: String,
        dateOfCompletion: Date
    },
    {
        timestamps: true
    }
);

const Prospect = model<IProspect>('Prospect', prospectSchema);
export default Prospect;
