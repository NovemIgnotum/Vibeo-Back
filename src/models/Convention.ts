import { Schema, model } from 'mongoose';
import IConvention from '../interfaces/Convention';

const conventionSchema = new Schema(
    {
        name: { type: String, required: true },
        startingDate: { type: Date, required: true },
        endingDate: { type: Date, required: true },
        objectifs: {
            perYear: { type: Boolean, default: false },
            numberOfEntries: { type: Number, required: true },
            numberOfActivityStarted: { type: Number, required: true },
            numberOfActivityStartedForLongTime: { type: Number, required: true },
            NumberOfExitForGood: { type: Number, required: true }
        },
        logos: [{ type: Object }],
        actionSheet: {
            description: String,
            public: String,
            actionObjectif: String,
            positiveExitCriteria: String,
            balanceSheetPreparation: [{ name: String, received: { type: Boolean, default: false } }]
        },
        managements: {
            responsibleOfTheConvention: { type: Schema.Types.ObjectId, ref: 'Utilisateur' || 'Admin' },
            adjointResponsibleOfTheConvention: { type: Schema.Types.ObjectId, ref: 'Utilisateur' || 'Admin' },
            AdministrativeOfficer: { type: Schema.Types.ObjectId, ref: 'Utilisateur' || 'Admin' },
            TheTeam: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }]
        },
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        datas: [
            {
                year: Number,
                mounths: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'DataConvention'
                    }
                ]
            }
        ],
        prescriptions: [{ type: Schema.Types.ObjectId, ref: 'Usager' }],
        orientations: [{ type: Schema.Types.ObjectId, ref: 'Usager' }],
        entrees: [{ type: Schema.Types.ObjectId, ref: 'Usager' }],
        usagersOuted: [{ type: Schema.Types.ObjectId, ref: 'Usager' }],
        token: String
    },
    {
        timestamps: true
    }
);

const Convention = model<IConvention>('Convention', conventionSchema);
export default Convention;
