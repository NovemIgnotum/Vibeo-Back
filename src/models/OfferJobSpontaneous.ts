import { Schema, model } from 'mongoose';
import IOfferJobSpontaneous from '../interfaces/OfferJobSpontaneous';

const offerJobSpontaneousSchema = new Schema<IOfferJobSpontaneous>(
    {
        isFromAnEvent: { type: Boolean, default: false },
        numOfferJobForTheEvent: Number, // Si c'est un event, indiquer le nombre de poste disponible au depart pour cette offre d'emploi (required)
        contractType: String,
        numberHoursPerWeek: Number,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Utilisateur'
        },
        offerName: String,
        salary: Number,
        workContract: Object,
        skillsAddedFromWorkStation: [Object],
        knowHowAddedFromWorkStation: [Object],
        skillsRemovedFromWorkStation: [String],
        knowHowRemovedFromWorkStation: [String],
        jobContext: [String],
        precisionJobContext: String,
        status: { type: String, default: 'Available' }, //Différents statuts -> Available , ProposedOn, JobInterview, HasBeenTakenOn,
        contractHelped: { type: Boolean, default: false },
        hasBeenTakenByOurServices: Boolean,
        history: [
            {
                title: String,
                date: Date,
                by: String,
                for: String,
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
        offerBlockedAutomaticaly: { type: Boolean, default: false },
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
        usagerWhoAcceptedTheOfferJob: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        usagerWhoRefusedTheOfferJob: [
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

const OfferJobSpontaneous = model<IOfferJobSpontaneous>('OfferJobSpontaneous', offerJobSpontaneousSchema);
export default OfferJobSpontaneous;
