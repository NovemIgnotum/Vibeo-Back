import { Schema, model } from 'mongoose';
import IPartenaire from '../interfaces/Partenaire';

const partenaireSchema = new Schema<IPartenaire>(
    {
        email: { type: String, lowerCase: true },
        account: {
            // Cyrille à souhaité enlever l'objet civility
            male: { type: Boolean, required: true },
            name: { type: String, required: true },
            firstname: { type: String, required: true },
            mobileNum: Number,
            landlineNum: Number,
            collectivity: { type: Schema.Types.ObjectId, ref: 'Collectivity' }
        },
        usagersCreated: [{ type: Schema.Types.ObjectId, ref: 'Usager UsagerOut' }],
        usagersAttribuated: [{ type: Schema.Types.ObjectId, ref: 'Usager UsagerOut' }],
        datas: [
            {
                year: Number,
                mounths: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Data'
                    }
                ]
            }
        ],
        contacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contact'
            }
        ],
        appointments: [
            {
                month: { type: String, default: 'Janvier' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Fevrier' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Mars' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Avril' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Mai' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Juin' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Juillet' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Aout' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Septembre' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Octobre' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Novembre' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            },
            {
                month: { type: String, default: 'Decembre' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Appointment',
                        _id: false
                    }
                ],
                _id: false
            }
        ],
        autorisations: [String],
        isActivated: { type: Boolean, default: false },
        expoPushToken: String,
        token: String,
        hash: String,
        salt: String
    },
    {
        timestamps: true
    }
);

const Partenaire = model<IPartenaire>('Partenaire', partenaireSchema);
export default Partenaire;
