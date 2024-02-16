import { Schema, model } from 'mongoose';
import { IAction } from '../interfaces/Action';

const actionsSchema = new Schema<IAction>(
    {
        dateOfStarting: Date,
        dateOfEnding: Date,
        jobWanted: [Object],
        contractWanted: String,
        hourWanted: Number,
        commentContractHour: String,
        objectifs: [
            {
                title: String,
                situationPassed: String,
                objectifToAchieve: String,
                acorTaskToDo: [
                    {
                        date: Date,
                        task: String,
                        isDone: Boolean,
                        isDoneDate: Date
                    }
                ],
                usagerTaskToDo: [
                    {
                        date: Date,
                        task: String,
                        isDone: Boolean,
                        isDoneDate: Date
                    }
                ]
            }
        ],
        comments: [{ type: String }]
    },
    {
        timestamps: true
    }
);

const Action = model<IAction>('Action', actionsSchema);
export default Action;
