import { Schema, model } from 'mongoose';
import IUtilisateur from '../interfaces/Utilisateur';

const utilisateurShema = new Schema<IUtilisateur>(
    {
        email: { type: String, required: true, lowercase: true },
        account: {
            // Cyrille à souhaité enlever l'objet civility
            male: { type: Boolean, required: true },
            name: { type: String, required: true },
            firstname: { type: String, required: true },
            mobileNum: { type: Number, required: true }
        },
        usagers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
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
        prospectings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Prospecting'
            }
        ],
        expenses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Expense'
            }
        ],
        admin: { type: Boolean, required: true },
        autorisations: [String],
        etablissement: { type: Schema.Types.ObjectId, ref: 'Etablissement' },
        expoPushToken: String,
        token: String,
        hash: String,
        salt: String
    },
    {
        timestamps: true
    }
);

const Utilisateur = model<IUtilisateur>('Utilisateur', utilisateurShema);
export default Utilisateur;
