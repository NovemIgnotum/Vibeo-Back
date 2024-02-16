import { Document, Types } from 'mongoose';

export default interface IOfferJob extends Document {
    isFromAnEvent: Boolean;
    // Si c'est un event, indiquer le nombre de poste disponible au depart pour cette offre d'emploi (required)
    numOfferJobForTheEvent: Number;
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
    contractHelped: Boolean;
    // --- Crée afin de pouvoir ajouter ou supprimer une compétences du poste de travail uniquement pour cette offre --- //
    skillsAddedFromWorkStation: [Object];
    knowHowAddedFromWorkStation: [Object];
    skillsRemovedFromWorkStation: [String];
    knowHowRemovedFromWorkStation: [String];
    jobContextAddedFromWorkStation: [Object];
    jobContextRemovedFromWorkStation: [String];
    precisionJobContext: String;
    skillPrecision: String;
    precisionKnowHow: String;
    jobAccess: { type: String; default: '' };
    // --- --- //
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
    // --- IRIS JOB ---
    isForIrisJob: Boolean;
    conventionAboutIrisJob: [
        {
            type: Types.ObjectId;
            ref: 'Convention';
        }
    ];
    // --- IRIS JOB ---

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
    usagerWhoAcceptedTheOfferJob: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    usagerWhoRefusedTheOfferJob: [
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
