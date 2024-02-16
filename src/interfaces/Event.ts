import { Types, Document } from 'mongoose';

export default interface IEvent extends Document {
    nameOfEvent: String;
    maxNumOfPartenaire: number;
    dateAndHourOfEvent: Date;
    type: String;
    isActivated: boolean;
    usagers: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    entreprise: [
        {
            type: Types.ObjectId;
            ref: 'Entreprise';
        }
    ];
    eventOfferJobs: [
        {
            type: Types.ObjectId;
            ref: 'EventOfferJob';
        }
    ];
    eventWorkStations: [
        {
            type: Types.ObjectId;
            ref: 'WorkStation';
        }
    ];
    history: [
        {
            title: String;
            date: Date;
            by: String; // Si c'est un event, choisir si c'est l'usager pour l'entreprise ou inversement
            for: String; // Si c'est un event, choisir si c'est l'entreprise pour l'usager ou inversement
            comment: String;
        }
    ];
    poster: Object;
}
