import { Document, Types } from 'mongoose';

export default interface IEntreprise extends Document {
    society: String;
    currentName: String;
    siret: Number;
    logo: Object;
    adressLabel: String;
    adress: String;
    zip: Number;
    city: String;
    location: {
        lng: Number;
        lat: Number;
    };
    adressComplement: String;
    website: String;
    activityArea: String;
    administratifStateOpen: Boolean;
    headquartersSociety: Boolean;
    numberOfEmployed: String;
    codeNAF: String;
    details: String;
    comments: String;
    prospecting: [
        {
            type: Types.ObjectId;
            ref: 'Prospect';
        }
    ];
    interlocutors: [
        {
            type: Types.ObjectId;
            ref: 'Interlocutor';
        }
    ];
    workStations: [
        {
            type: Types.ObjectId;
            ref: 'WorkStation';
        }
    ];
    missions: [
        {
            type: Types.ObjectId;
            ref: 'Mission';
        }
    ];
    events: [
        {
            type: Types.ObjectId;
            ref: 'Event';
        }
    ];
    datas: [
        {
            year: Number;
            mounths: [
                {
                    type: Types.ObjectId;
                    ref: 'DataEntreprise';
                }
            ];
        }
    ];
    employmentContracts: [
        {
            type: Types.ObjectId;
            ref: 'EmploymentContract';
        }
    ];
    interlocutorsArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'Interlocutor';
        }
    ];
    workStationsArchiveds: [
        {
            type: Types.ObjectId;
            ref: 'WorkStationArchived';
        }
    ];
    missionsArchived: [
        {
            type: Types.ObjectId;
            ref: 'MissionArchived';
        }
    ];
    eventsManagements: [{ entretienDecouverte: Boolean }, { evenements: Boolean }, { iris: Boolean }, { j_ai_une_offre: Boolean }];
}
