import { Document, Types } from 'mongoose';

export default interface IInterlocutor extends Document {
    // Cyrille à souhaité enlever l'objet civility
    email: { type: String; lowerCase: true };
    account: {
        male: { type: Boolean; required: true };
        name: { type: String; required: true };
        firstname: { type: String; required: true };
        positionHeld: String;
        mobileNum: Number;
        landlineNum: Number;
        workSpot: String;
    };
    datas: [
        {
            year: Number;
            mounths: [
                {
                    type: Types.ObjectId;
                    ref: 'Data';
                }
            ];
        }
    ];
    // Pour avoir plusieurs entreprise mais qu'un seul compte interlocuteur
    entreprises: [
        {
            type: Types.ObjectId;
            ref: 'Entreprise';
        }
    ];
    contacts: [
        {
            type: Types.ObjectId;
            ref: 'Contact';
        }
    ];
    appointments: [
        {
            month: { type: String; default: 'Janvier' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Fevrier' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Mars' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Avril' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Mai' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Juin' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Juillet' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Aout' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Septembre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Octobre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Novembre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Decembre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        }
    ];
    autorisations: [string];
    isActivated: Boolean;
    token: String;
    salt: String;
    hash: String;
}
