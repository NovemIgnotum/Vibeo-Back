import { Schema, model } from 'mongoose';
import { IAppointment } from '../interfaces/Appointment';

const appointmentSchema = new Schema<IAppointment>(
    {
        title: { type: String, required: true },
        nature: { type: String, required: true },
        content: String,
        dateEvent: { type: Date, required: true },
        guest: {
            interlocutors: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            ],

            partenaires: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Partenaire '
                }
            ],

            utilisateurs: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            ],

            usagers: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                }
            ]
        },
        startHour: Number,
        endHour: Number,
        location: { type: Schema.Types.ObjectId, ref: 'Room'},
        allDay: Boolean,
        recurrence: Boolean,
        frequencyRecurrence: Number,
        dateEndRecurrence: Date
    },
    {
        timestamps: true
    }
);

const Appointment = model<IAppointment>('Appointment', appointmentSchema);
export default Appointment;
