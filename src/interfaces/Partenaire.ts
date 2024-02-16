import { Document, Types } from 'mongoose';

export default interface IPartenaire extends Document {
    email: String;
    account: {
        // Cyrille à souhaité enlever l'objet civility
        male: { type: Boolean; require: true };
        name: String;
        firstname: String;
        mobileNum: Number;
        landlineNum: Number;
        collectivity: { type: Types.ObjectId; ref: 'Collectivity' };
    };
    usagersCreated: [{ type: Types.ObjectId; ref: 'Usager UsagerOut' }];
    usagersAttribuated: [{ type: Types.ObjectId; ref: 'Usager UsagerOut' }];
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
    expoPushToken: String;
    token: String;
    hash: String;
    salt: String;
}
