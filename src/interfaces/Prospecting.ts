import { Schema, model } from 'mongoose';

export default interface IProspecting extends Document {
    prospectingDate: Date;
    name: String;
    usagers: { type: Schema.Types.ObjectId; ref: 'Usager' };
    codeRome: String;
    workName: String;
    entreprises: [
        {
            type: Schema.Types.ObjectId;
            ref: 'Prospect';
        }
    ];
    createdBy: [
        {
            type: Schema.Types.ObjectId;
            ref: 'Utilisateur';
        }
    ];
    utilisateurAssigned: [
        {
            type: Schema.Types.ObjectId;
            ref: 'Utilisateur';
        }
    ];
}
