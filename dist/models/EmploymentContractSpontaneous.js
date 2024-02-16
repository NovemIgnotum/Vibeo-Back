"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employmentContractSpontaneousSchema = new mongoose_1.Schema({
    contractType: String,
    workName: String,
    numberOfHour: Number,
    tasksList: [String],
    skillsList: [String],
    jobContext: [Object],
    usager: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager' },
    entreprise: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Entreprise' },
    startingDate: Date,
    endingDate: Date,
    endingTryPeriodeDate: Date,
    continuityOfThepreviousContract: Boolean,
    previousContract: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'EmploymentContract'
    },
    suiviEmploi: {
        date: Date,
        withWho: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Utilisateur'
        },
        comments: String,
        skillsAcquired: [
            {
                code: String,
                libelle: String,
                skills: [
                    {
                        code: String,
                        libelleACOR: String,
                        libellePoleEmploi: String,
                        type: String,
                        level: { type: Number, default: 0 },
                        previousLevel: [{ level: Number, dateUpdated: Date }]
                    }
                ]
            }
        ],
        knowHowsAcquired: [
            {
                code: String,
                libelle: String,
                knowHows: [
                    {
                        code: String,
                        libelleACOR: String,
                        libellePoleEmploi: String,
                        type: String,
                        level: { type: Number, default: 0 },
                        previousLevel: [{ level: Number, dateUpdated: Date }]
                    }
                ]
            }
        ],
        jobContextAcquired: [
            {
                code: String,
                libelleACOR: String,
                libellePoleEmploi: String,
                categories: String,
                priority: Boolean,
                level: { type: Number, default: 0 },
                previousLevel: [{ level: Number, dateUpdated: Date }]
            }
        ],
        difficulties: [
            {
                staritngDate: Date,
                endingDate: Date,
                from: { type: mongoose_1.Schema.Types.ObjectId },
                jobDifficulties: Boolean,
                personalDifficulties: Boolean,
                deadline: Date,
                actions: [
                    {
                        creationDate: Date,
                        title: String,
                        comment: String,
                        accomplished: Boolean,
                        resolutionDate: Date,
                        byWho: { type: mongoose_1.Schema.Types.ObjectId }
                    }
                ]
            }
        ]
    }
}, {
    timestamps: true
});
const EmploymentContractSpontaneous = (0, mongoose_1.model)('EmploymentContractSpontaneous', employmentContractSpontaneousSchema);
exports.default = EmploymentContractSpontaneous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95bWVudENvbnRyYWN0U3BvbnRhbmVvdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0VtcGxveW1lbnRDb250cmFjdFNwb250YW5lb3VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sbUNBQW1DLEdBQUcsSUFBSSxpQkFBTSxDQUNsRDtJQUNJLFlBQVksRUFBRSxNQUFNO0lBQ3BCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLFlBQVksRUFBRSxNQUFNO0lBQ3BCLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNuQixVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDcEIsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3BCLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRTtJQUN0RCxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUU7SUFDOUQsWUFBWSxFQUFFLElBQUk7SUFDbEIsVUFBVSxFQUFFLElBQUk7SUFDaEIsb0JBQW9CLEVBQUUsSUFBSTtJQUMxQiwrQkFBK0IsRUFBRSxPQUFPO0lBQ3hDLGdCQUFnQixFQUFFO1FBQ2QsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLG9CQUFvQjtLQUM1QjtJQUNELFdBQVcsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGFBQWE7U0FDckI7UUFDRCxRQUFRLEVBQUUsTUFBTTtRQUNoQixjQUFjLEVBQUU7WUFDWjtnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsTUFBTTtnQkFDZixNQUFNLEVBQUU7b0JBQ0o7d0JBQ0ksSUFBSSxFQUFFLE1BQU07d0JBQ1osV0FBVyxFQUFFLE1BQU07d0JBQ25CLGlCQUFpQixFQUFFLE1BQU07d0JBQ3pCLElBQUksRUFBRSxNQUFNO3dCQUNaLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTt3QkFDbkMsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztxQkFDeEQ7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDZDtnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsTUFBTTtnQkFDZixRQUFRLEVBQUU7b0JBQ047d0JBQ0ksSUFBSSxFQUFFLE1BQU07d0JBQ1osV0FBVyxFQUFFLE1BQU07d0JBQ25CLGlCQUFpQixFQUFFLE1BQU07d0JBQ3pCLElBQUksRUFBRSxNQUFNO3dCQUNaLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTt3QkFDbkMsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztxQkFDeEQ7aUJBQ0o7YUFDSjtTQUNKO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDaEI7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07Z0JBQ1osV0FBVyxFQUFFLE1BQU07Z0JBQ25CLGlCQUFpQixFQUFFLE1BQU07Z0JBQ3pCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixRQUFRLEVBQUUsT0FBTztnQkFDakIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO2dCQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3hEO1NBQ0o7UUFDRCxZQUFZLEVBQUU7WUFDVjtnQkFDSSxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JDLGVBQWUsRUFBRSxPQUFPO2dCQUN4QixvQkFBb0IsRUFBRSxPQUFPO2dCQUM3QixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksWUFBWSxFQUFFLElBQUk7d0JBQ2xCLEtBQUssRUFBRSxNQUFNO3dCQUNiLE9BQU8sRUFBRSxNQUFNO3dCQUNmLFlBQVksRUFBRSxPQUFPO3dCQUNyQixjQUFjLEVBQUUsSUFBSTt3QkFDcEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtxQkFDekM7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7Q0FDSixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSw2QkFBNkIsR0FBRyxJQUFBLGdCQUFLLEVBQWlDLCtCQUErQixFQUFFLG1DQUFtQyxDQUFDLENBQUM7QUFDbEosa0JBQWUsNkJBQTZCLENBQUMifQ==