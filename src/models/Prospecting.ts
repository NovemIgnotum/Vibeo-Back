import { Schema, model } from 'mongoose';
import IProspecting from '../interfaces/Prospecting';

const prospectingSchema = new Schema<IProspecting>(
    {
        prospectingDate: Date,
        name: String,
        codeRome: String,
        workName: String,
        usagers: {
            type: Schema.Types.ObjectId,
            ref: 'Usager'
        },
        entreprises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Prospect'
            }
        ],
        createdBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Utilisateur'
            }
        ],
        utilisateurAssigned: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Utilisateur'
            }
        ]
    },
    {
        timestamps: true
    }
);

const Prospecting = model<IProspecting>('Prospecting', prospectingSchema);
export default Prospecting;
