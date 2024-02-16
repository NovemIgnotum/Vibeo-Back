import { Document, Types } from 'mongoose';

export default interface IEmploymentContract extends Document {
    contractType: String;
    workName: String;
    numberOfHour: Number;
    tasksList: [String];
    skillsList: [String];
    jobContext: [Object];
    usager: { type: Types.ObjectId; ref: 'Usager' };
    entreprise: { type: Types.ObjectId; ref: 'Entreprise' };
    startingDate: Date;
    endingDate: Date;
    endingTryPeriodeDate: Date;
    continuityOfThepreviousContract: Boolean;
    previousContract: {
        type: Types.ObjectId;
        ref: 'EmploymentContract';
    };
    suiviEmploi: {
        date: Date;
        withWho: {
            type: Types.ObjectId;
            ref: 'Utilisateur';
        };
        comments: String;
        skillsAcquired: [
            {
                code: String;
                libelle: String;
                skills: [
                    {
                        code: String;
                        libelleACOR: String;
                        libellePoleEmploi: String;
                        type: String;
                        level: { type: Number; default: 0 };
                        previousLevel: [{ level: Number; dateUpdated: Date }];
                    }
                ];
            }
        ];
        knowHowsAcquired: [
            {
                code: String;
                libelle: String;
                knowHows: [
                    {
                        code: String;
                        libelleACOR: String;
                        libellePoleEmploi: String;
                        type: String;
                        level: { type: Number; default: 0 };
                        previousLevel: [{ level: Number; dateUpdated: Date }];
                    }
                ];
            }
        ];
        jobContextAcquired: [
            {
                code: String;
                libelleACOR: String;
                libellePoleEmploi: String;
                categories: String;
                priority: Boolean;
                level: { type: Number; default: 0 };
                previousLevel: [{ level: Number; dateUpdated: Date }];
            }
        ];
        difficulties: [
            {
                staritngDate: Date;
                endingDate: Date;
                from: { type: Types.ObjectId };
                jobDifficulties: Boolean;
                personalDifficulties: Boolean;
                deadline: Date;
                actions: [
                    {
                        creationDate: Date;
                        title: String;
                        comment: String;
                        accomplished: Boolean;
                        resolutionDate: Date;
                        byWho: { type: Types.ObjectId };
                    }
                ];
            }
        ];
    };
}
