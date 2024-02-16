"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dataEntrepriseSchema = new mongoose_1.Schema({
    month: Number,
    interlocutors: {
        interlocutorsCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        interlocutorsUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        interlocutorsReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        interlocutorsDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ]
    },
    collaborations: {
        collaborationsCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        collaborationsUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        collaborationsReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        collaborationsDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ]
    },
    workStations: {
        workStationsCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ],
        workStationsUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ],
        workStationsReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ],
        workStationsDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ]
    },
    missions: {
        missionCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ],
        missionUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ],
        missionReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ],
        missionDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ]
    },
    offerJobs: {
        offerJobsCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobsUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobsReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobsDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ]
    },
    intermediateOfferJobs: {
        intermediateOfferJobCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ],
        intermediateOfferJobUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ],
        intermediateOfferJobReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ],
        intermediateOfferJobDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ]
    },
    employmentContracts: {
        employmentContractsCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        employmentContractsUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        employmentContractsReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        employmentContractsDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ]
    }
});
const DataEntreprise = (0, mongoose_1.model)('DataEntreprise', dataEntrepriseSchema);
exports.default = DataEntreprise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUVudHJlcHJpc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0RhdGFFbnRyZXByaXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxpQkFBTSxDQUFrQjtJQUNyRCxLQUFLLEVBQUUsTUFBTTtJQUNiLGFBQWEsRUFBRTtRQUNYLG9CQUFvQixFQUFFO1lBQ2xCO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRTtvQkFDQSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGNBQWM7aUJBQ3RCO2FBQ0o7U0FDSjtRQUNELG9CQUFvQixFQUFFO1lBQ2xCO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRTtvQkFDQSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGNBQWM7aUJBQ3RCO2FBQ0o7U0FDSjtRQUNELG1CQUFtQixFQUFFO1lBQ2pCO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRTtvQkFDQSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGNBQWM7aUJBQ3RCO2FBQ0o7U0FDSjtRQUNELG9CQUFvQixFQUFFO1lBQ2xCO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLEVBQUUsRUFBRTtvQkFDQSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGNBQWM7aUJBQ3RCO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsY0FBYyxFQUFFO1FBQ1oscUJBQXFCLEVBQUU7WUFDbkI7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFO29CQUNBLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxR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