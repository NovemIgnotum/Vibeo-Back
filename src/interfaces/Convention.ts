import { Document, Types } from 'mongoose';

export default interface IConvention extends Document {
    name: String;
    startingDate: Date;
    endingDate: Date;
    objectifs: {
        perYear: Boolean;
        numberOfEntries: Number;
        numberOfActivityStarted: Number;
        numberOfActivityStartedForLongTime: Number;
        NumberOfExitForGood: Number;
    };
    logos: [{ type: Object }];
    actionSheet: {
        description: String;
        public: String;
        actionObjectif: String;
        positiveExitCriteria: String;
        balanceSheetPreparation: [{ name: String; received: Boolean }];
    };
    managements: {
        responsibleOfTheConvention: { type: Types.ObjectId; ref: 'Utilisateur' };
        adjointResponsibleOfTheConvention: { type: Types.ObjectId; ref: 'Utilisateur' };
        AdministrativeOfficer: { type: Types.ObjectId; ref: 'Utilisateur' };
        TheTeam: [{ type: Types.ObjectId; ref: 'Utilisateur' }];
    };
    events: [
        {
            type: Types.ObjectId;
            ref: 'Event';
        }
    ];
    datas: [
        {
            year: Number;
            mounths: [
                {
                    type: Types.ObjectId;
                    ref: 'DataConvention';
                }
            ];
        }
    ];
    prescriptions: [{ type: Types.ObjectId; ref: 'Usager' }];
    orientations: [{ type: Types.ObjectId; ref: 'Usager' }];
    entrees: [{ type: Types.ObjectId; ref: 'Usager' }];
    usagersOuted: [{ type: Types.ObjectId; ref: 'Usager' }];
    token: String;
}
