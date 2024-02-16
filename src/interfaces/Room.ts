import { Document, Types } from 'mongoose';

export interface IRoom extends Document {
    name: String;
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
}
