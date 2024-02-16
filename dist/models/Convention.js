"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conventionSchema = new mongoose_1.Schema({
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
        responsibleOfTheConvention: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Utilisateur' || 'Admin' },
        adjointResponsibleOfTheConvention: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Utilisateur' || 'Admin' },
        AdministrativeOfficer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Utilisateur' || 'Admin' },
        TheTeam: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Utilisateur' }]
    },
    events: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    datas: [
        {
            year: Number,
            mounths: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'DataConvention'
                }
            ]
        }
    ],
    prescriptions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager' }],
    orientations: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager' }],
    entrees: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager' }],
    usagersOuted: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager' }],
    token: String
}, {
    timestamps: true
});
const Convention = (0, mongoose_1.model)('Convention', conventionSchema);
exports.default = Convention;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVudGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ29udmVudGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLGdCQUFnQixHQUFHLElBQUksaUJBQU0sQ0FDL0I7SUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzVDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUMxQyxTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7UUFDMUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ2pELHVCQUF1QixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ3pELGtDQUFrQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ3BFLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0tBQ3hEO0lBQ0QsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDekIsV0FBVyxFQUFFO1FBQ1QsV0FBVyxFQUFFLE1BQU07UUFDbkIsTUFBTSxFQUFFLE1BQU07UUFDZCxjQUFjLEVBQUUsTUFBTTtRQUN0QixvQkFBb0IsRUFBRSxNQUFNO1FBQzVCLHVCQUF1QixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7S0FDM0Y7SUFDRCxXQUFXLEVBQUU7UUFDVCwwQkFBMEIsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGFBQWEsSUFBSSxPQUFPLEVBQUU7UUFDMUYsaUNBQWlDLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxhQUFhLElBQUksT0FBTyxFQUFFO1FBQ2pHLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsYUFBYSxJQUFJLE9BQU8sRUFBRTtRQUNyRixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxDQUFDO0tBQ2pFO0lBQ0QsTUFBTSxFQUFFO1FBQ0o7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsT0FBTztTQUNmO0tBQ0o7SUFDRCxLQUFLLEVBQUU7UUFDSDtZQUNJLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFO2dCQUNMO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsZ0JBQWdCO2lCQUN4QjthQUNKO1NBQ0o7S0FDSjtJQUNELGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDL0QsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUM5RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pELFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDOUQsS0FBSyxFQUFFLE1BQU07Q0FDaEIsRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLElBQUEsZ0JBQUssRUFBYyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN0RSxrQkFBZSxVQUFVLENBQUMifQ==