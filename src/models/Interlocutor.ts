import { Schema, Types, model } from 'mongoose';
import IInterlocutor from '../interfaces/Interlocutor';

const interlocutorSchema = new Schema<IInterlocutor>(
    {
        // Cyrille à souhaité enlever l'objet civility
        email: { type: String, lowerCase: true },
        account: {
            male: { type: Boolean, required: true },
            name: { type: String, required: true },
            firstname: { type: String, required: true },
            positionHeld: String,
            mobileNum: Number,
            landlineNum: Number,
            workSpot: String
        },
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
        // Pour avoir plusieurs entreprise mais qu'un seul compte interlocuteur
        entreprises: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Entreprise'
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
        token: String,
        salt: String,
        hash: String
    },
    {
        timestamps: true
    }
);

const Interlocutor = model<IInterlocutor>('Interlocutor', interlocutorSchema);
export default Interlocutor;
