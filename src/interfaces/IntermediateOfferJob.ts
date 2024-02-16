import { Document, Types } from 'mongoose';

export default interface IIntermediateOfferJob extends Document {
    isFromAnEvent: Boolean;
    nameOfCompany: String;
    contractType: String;
    numberHoursPerWeek: Number;
    createdBy: {
        type: Types.ObjectId;
        ref: 'Utilisateur';
    };
    offerName: String;
    workContract: Object;
    salary: Number;
    status: String;
    hasBeenTakenByOurServices: Boolean;
    history: [
        {
            title: String;
            date: Date;
            by: String; // Si c'est un event, choisir si c'est l'usager pour l'entreprise ou inversement
            for: String; // Si c'est un event, choisir si c'est l'entreprise pour l'usager ou inversement
            comment: String;
        }
    ];
    usagerPositioned: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    offerBlockedAutomaticaly: Boolean;
    offerBlockedUntilDate: Date;
    usagerAcceptedByEntreprise: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    usagerRefusedByEntreprise: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    usagerWhoAcceptedTheIntermediateOfferJob: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    usagerWhoRefusedTheIntermediateOfferJob: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    jobInterviews: [
        {
            type: Types.ObjectId;
            ref: 'JobInterview';
        }
    ];
    decouvertes: [
        {
            type: Types.ObjectId;
            ref: 'Decouverte';
        }
    ];
    employmentContracts: [
        {
            type: Types.ObjectId;
            ref: 'EmploymentContract';
        }
    ];
}
