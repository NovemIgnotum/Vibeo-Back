"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employmentContractSchema = new mongoose_1.Schema({
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
const EmploymentContract = (0, mongoose_1.model)('EmploymentContract', employmentContractSchema);
exports.default = EmploymentContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95bWVudENvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9FbXBsb3ltZW50Q29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFHekMsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLGlCQUFNLENBQ3ZDO0lBQ0ksWUFBWSxFQUFFLE1BQU07SUFDcEIsUUFBUSxFQUFFLE1BQU07SUFDaEIsWUFBWSxFQUFFLE1BQU07SUFDcEIsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ25CLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNwQixVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDcEIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFO0lBQ3RELFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRTtJQUM5RCxZQUFZLEVBQUUsSUFBSTtJQUNsQixVQUFVLEVBQUUsSUFBSTtJQUNoQixvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLCtCQUErQixFQUFFLE9BQU87SUFDeEMsZ0JBQWdCLEVBQUU7UUFDZCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsb0JBQW9CO0tBQzVCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLElBQUk7UUFDVixPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsYUFBYTtTQUNyQjtRQUNELFFBQVEsRUFBRSxNQUFNO1FBQ2hCLGNBQWMsRUFBRTtZQUNaO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsTUFBTTt3QkFDWixXQUFXLEVBQUUsTUFBTTt3QkFDbkIsaUJBQWlCLEVBQUUsTUFBTTt3QkFDekIsSUFBSSxFQUFFLE1BQU07d0JBQ1osS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3FCQUN4RDtpQkFDSjthQUNKO1NBQ0o7UUFDRCxnQkFBZ0IsRUFBRTtZQUNkO2dCQUNJLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRTtvQkFDTjt3QkFDSSxJQUFJLEVBQUUsTUFBTTt3QkFDWixXQUFXLEVBQUUsTUFBTTt3QkFDbkIsaUJBQWlCLEVBQUUsTUFBTTt3QkFDekIsSUFBSSxFQUFFLE1BQU07d0JBQ1osS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO3FCQUN4RDtpQkFDSjthQUNKO1NBQ0o7UUFDRCxrQkFBa0IsRUFBRTtZQUNoQjtnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7Z0JBQ25DLGFBQWEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDeEQ7U0FDSjtRQUNELFlBQVksRUFBRTtZQUNWO2dCQUNJLFlBQVksRUFBRSxJQUFJO2dCQUNsQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDckMsZUFBZSxFQUFFLE9BQU87Z0JBQ3hCLG9CQUFvQixFQUFFLE9BQU87Z0JBQzdCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxZQUFZLEVBQUUsSUFBSTt3QkFDbEIsS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFLE1BQU07d0JBQ2YsWUFBWSxFQUFFLE9BQU87d0JBQ3JCLGNBQWMsRUFBRSxJQUFJO3dCQUNwQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO3FCQUN6QztpQkFDSjthQUNKO1NBQ0o7S0FDSjtDQUNKLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLGtCQUFrQixHQUFHLElBQUEsZ0JBQUssRUFBc0Isb0JBQW9CLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztBQUN0RyxrQkFBZSxrQkFBa0IsQ0FBQyJ9