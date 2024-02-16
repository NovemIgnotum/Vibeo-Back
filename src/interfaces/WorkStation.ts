import { Document, Types } from 'mongoose';

export default interface IWorkStation extends Document {
    codeRome: String;
    etablissementFrom: { type: Types.ObjectId; ref: 'Etablissement' };
    workname: String;
    picture: [String];
    video: String;
    definition: String;
    jobAccess: String;
    skillsRequired: [Object];
    precisionSkills: String;
    knowHowRequired: [Object];
    precisionKnowHow: String;
    jobContextRequired: [Object];
    precisionJobContext: String;
    offerJobs: [
        {
            type: Types.ObjectId;
            ref: 'OfferJob';
        }
    ];
    offerJobArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'OfferJobArchived';
        }
    ];
    eventOfferJobs: [
        {
            type: Types.ObjectId;
            ref: 'EventOfferJob';
        }
    ];
    eventOfferJobArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'EventOffer JobArchived';
        }
    ];
}
