import { Types, Document } from 'mongoose';

export default interface IDecouverteSpontaneous extends Document {
    isFromAnEvent: Boolean;
    jobName: String;
    startingDate: Date;
    endingDate: Date;
    entreprise: {
        type: Types.ObjectId;
        ref: 'Entreprise';
    };
    usager: {
        type: Types.ObjectId;
        ref: 'Usager';
    };
    usagerComment: [
        {
            date: Date;
            comment: String;
        }
    ];
    entrepriseComment: [
        {
            date: Date;
            comment: String;
        }
    ];
    skillsAquired: [Object];
    knowHowsAquired: [Object];
    contextesJobAquired: [Object];
    validatedByUsager: Boolean;
    validatedByEntreprise: Boolean;
}
