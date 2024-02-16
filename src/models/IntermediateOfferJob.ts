import { Schema, model } from 'mongoose';
import IIntermediateOfferJob from '../interfaces/IntermediateOfferJob';

const IntermediateOfferJobSchema = new Schema<IIntermediateOfferJob>(
    {
        isFromAnEvent: { type: Boolean, default: false },
        contractType: String,
        nameOfCompany: String,
        numberHoursPerWeek: Number,
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'Utilisateur'
        },
        offerName: String,
        salary: Number,
        workContract: Object,
        status: { type: String, default: 'Available' }, //Différents statuts -> Available , ProposedOn, JobInterview, HasBeenTakenOn,
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
        usagerWhoAcceptedTheIntermediateOfferJob: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ],
        usagerWhoRefusedTheIntermediateOfferJob: [
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

const IntermediateOfferJob = model<IIntermediateOfferJob>('IntermediateOfferJob', IntermediateOfferJobSchema);
export default IntermediateOfferJob;
