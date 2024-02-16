import { Schema, model } from 'mongoose';
import IEventOfferJob from '../interfaces/EventOfferJob';

const EventOfferJobSchema = new Schema<IEventOfferJob>(
    {
        isFromAnEvent: Boolean,
        numberOfJobOffersForTheEvent: Number, // Si c'est un event, indiquer le nombre de poste disponible au depart pour cette offre d'emploi (required)
        contractType: String,
        numberHoursPerWeek: Number,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Utilisateur'
        },
        offerName: String,
        workContract: Object,
        salary: Number,
        status: String,
        hasBeenTakenByOurServices: Boolean,
        history: [
            {
                title: String,
                date: Date,
                by: String, // Si c'est un event, choisir si c'est l'usager pour l'entreprise ou inversement
                for: String, // Si c'est un event, choisir si c'est l'entreprise pour l'usager ou inversement
                comment: String,
                _id: false
            }
        ],
        usagerPositioned: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        offerBlockedAutomaticaly: Boolean,
        offerBlockedUntilDate: Date,
        usagerAcceptedByEntreprise: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        usagerRefusedByEntreprise: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        usagerWhoAcceptedTheEventOfferJob: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        usagerWhoRefusedTheEventOfferJob: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        jobInterviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'JobInterview'
            }
        ],
        decouvertes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Decouverte'
            }
        ],
        employmentContracts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EmploymentContract'
            }
        ]
    },
    {
        timestamps: true
    }
);
const EventOfferJob = model<IEventOfferJob>('EventOfferJob', EventOfferJobSchema);
export default EventOfferJob;
