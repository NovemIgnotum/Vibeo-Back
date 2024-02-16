import { Document, Types } from 'mongoose';

export default interface IUtilisateur extends Document {
    email: string;
    account: {
        // Cyrille à souhaité enlever l'objet civility
        male: Boolean;
        name: string;
        firstname: string;
        mobileNum: number;
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
    usagers: [
        {
            type: Types.ObjectId;
            ref: 'Usager';
        }
    ];
    prospectings: [{ type: Types.ObjectId; ref: 'Prospecting' }];
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
    expenses: [
        {
            type: Types.ObjectId;
            ref: 'Expense';
        }
    ];
    admin: Boolean;
    autorisations: [string];
    etablissement: { type: Types.ObjectId; ref: 'Etablissement' };
    expoPushToken: String;
    token: string;
    hash: string;
    salt: string;
}
