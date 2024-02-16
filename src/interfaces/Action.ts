import { Document, model } from 'mongoose';

export interface IAction extends Document {
    dateOfStarting: Date;
    dateOfEnding: Date;
    jobWanted: [Object];
    contractWanted: String;
    hourWanted: Number;
    commentContractHour: String;
    objectifs: [
        {
            title: String;
            situationPassed: String;
            objectifToAchieve: String;
            utilisateurTaskToDo: [
                {
                    date: Date;
                    task: String;
                    isDone: {
                        byUsager: { type: Boolean; default: false };
                        byUtilisateur: { type: Boolean; default: false };
                    };
                    isDoneDate: Date;
                }
            ];
            usagerTaskToDo: [
                {
                    date: Date;
                    task: String;
                    isDone: Boolean;
                    isDoneDate: Date;
                }
            ];
        }
    ];
    comments: [{ type: String }];
}
