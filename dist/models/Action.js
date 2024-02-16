"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const actionsSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
const Action = (0, mongoose_1.model)('Action', actionsSchema);
exports.default = Action;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9BY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFHekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBTSxDQUM1QjtJQUNJLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNuQixjQUFjLEVBQUUsTUFBTTtJQUN0QixVQUFVLEVBQUUsTUFBTTtJQUNsQixtQkFBbUIsRUFBRSxNQUFNO0lBQzNCLFNBQVMsRUFBRTtRQUNQO1lBQ0ksS0FBSyxFQUFFLE1BQU07WUFDYixlQUFlLEVBQUUsTUFBTTtZQUN2QixpQkFBaUIsRUFBRSxNQUFNO1lBQ3pCLFlBQVksRUFBRTtnQkFDVjtvQkFDSSxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUUsT0FBTztvQkFDZixVQUFVLEVBQUUsSUFBSTtpQkFDbkI7YUFDSjtZQUNELGNBQWMsRUFBRTtnQkFDWjtvQkFDSSxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUUsT0FBTztvQkFDZixVQUFVLEVBQUUsSUFBSTtpQkFDbkI7YUFDSjtTQUNKO0tBQ0o7SUFDRCxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztDQUMvQixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBSyxFQUFVLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUN2RCxrQkFBZSxNQUFNLENBQUMifQ==