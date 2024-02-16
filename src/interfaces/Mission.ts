import { Document, Types } from 'mongoose';

export default interface IMission extends Document {
    date: Date;
    workname: String;
    codeRome: String;
    etablissementFrom: { type: Types.ObjectId; ref: 'Etablissement' };
    picture: [String];
    video: String;
    knowHowRequired: [String];
    skillsRequired: [Object];
    comments: String;
    intermediateOfferJob: [
        {
            type: Types.ObjectId;
            ref: 'IntermediateOfferJob';
        }
    ];
    intermediateOfferJobArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'IntermediateOfferJobArchived';
        }
    ];
}
