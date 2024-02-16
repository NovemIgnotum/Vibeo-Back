import { Document, Types } from 'mongoose';

export default interface IJobInterview extends Document {
    datePlanned: Date;
    dateOfAppointment: Date;
    status: String;
    usager: {
        type: Types.ObjectId;
        ref: 'Usager';
    };
    entreprise: {
        type: Types.ObjectId;
        ref: ' Entreprise';
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
    usagerInterested: Boolean;
    entrepriseInterested: Boolean;
}
