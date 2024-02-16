import { Schema, model, Types } from 'mongoose';

interface IAppointmentByCall {
    years: [
        {
            year: Number;
            months: [
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
            _id: false;
        }
    ];
}

const appointmentByCallSchema = new Schema<IAppointmentByCall>({
    years: [
        {
            year: Number,
            months: [
                {
                    month: { type: String, default: 'Janvier' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Fevrier' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Mars' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Avril' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Mai' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Juin' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Juillet' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Aout' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Septembre' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Octobre' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Novembre' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Decembre' },
                    appointments: [
                        {
                            type: Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                }
            ],
            _id: false
        }
    ]
});

const AppointmentByCall = model<IAppointmentByCall>('AppointmentByCall', appointmentByCallSchema);
export default AppointmentByCall;
