import { Schema, model } from 'mongoose';
import IEvent from '../interfaces/Event';

const eventSchema = new Schema<IEvent>(
    {
        nameOfEvent: String,
        maxNumOfPartenaire: Number,
        dateAndHourOfEvent: Date,
        isActivated: { type: Boolean, default: true },
        type: String,
        usagers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        entreprise: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Entreprise'
            }
        ],
        eventOfferJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EventOfferJob'
            }
        ],
        eventWorkStations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'WorkStation'
            }
        ],
        history: [
            {
                title: String,
                date: Date,
                by: String, // Si c'est un event, choisir si c'est l'usager pour l'entreprise ou inversement
                for: String, // Si c'est un event, choisir si c'est l'entreprise pour l'usager ou inversement
                comment: String
            }
        ],
        poster: Object
    },
    {
        timestamps: true
    }
);

const Event = model<IEvent>('Event', eventSchema);
export default Event;
