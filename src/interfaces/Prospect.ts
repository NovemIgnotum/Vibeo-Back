import { Schema, Types } from 'mongoose';

export default interface IProspect extends Document {
    siret: String;
    denomination: String;
    enseigne: String;
    adresse: String;
    zip: Number;
    city: String;
    codeNaf: String;
    lng: Number;
    lat: Number;
    entreprise: {
        type: Types.ObjectId;
        ref: 'Entreprise';
    };
    distance: String;
    natureContact: { type: String; required: true };
    usager: {
        type: Types.ObjectId;
        ref: 'Usager';
    };
    isDone: { type: Boolean; default: false };
    theyHaveNeed: Boolean;
    dateOfNeed: Date;
    comment: String;
    dateOfCompletion: Date;
}
