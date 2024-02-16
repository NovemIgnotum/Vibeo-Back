import { Schema, model } from 'mongoose';
import { IRoom } from '../interfaces/Room';

const roomSchema = new Schema<IRoom>({
    name: String,
    months: [
                {
                    month: { type: String, default: 'Janvier' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        },
                        
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Fevrier' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Mars' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Avril' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Mai' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Juin' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Juillet' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Aout' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Septembre' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Octobre' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Novembre' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                },
                {
                    month: { type: String, default: 'Decembre' },
                    appointments: [
                        {
                            type: Schema.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                    _id: false,
                }
            ],
        });

const Room = model<IRoom>('Room', roomSchema);
export default Room;
