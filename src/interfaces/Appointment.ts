import { Types, Document } from 'mongoose';

export interface IAppointment extends Document {
    title: String;
    nature: String;
    content: String;
    dateEvent: Date;
    guest: {
        interlocutors: [
            {
                type: Types.ObjectId;
                ref: 'Interlocutor';
            }
        ];
        partenaires: [
            {
                type: Types.ObjectId;
                ref: 'Partenaire ';
            }
        ];
        utilisateurs: [
            {
                type: Types.ObjectId;
                ref: 'Utilisateur';
            }
        ];
        usagers: [
            {
                type: Types.ObjectId;
                ref: 'Usager';
            }
        ];
    };
    startHour: Number;
    endHour: Number;
    location: { type: Types.ObjectId; ref: 'Room' };
    allDay: Boolean;
    recurrence: Boolean;
    frequencyRecurrence: Number;
    dateEndRecurrence: Date;
}
