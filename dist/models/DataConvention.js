"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DataConventionSchema = new mongoose_1.Schema({
    month: Number,
    times: {
        orientationAndAccueil: { type: String, default: '' },
        creationAndPropalOfferJob: { type: String, default: '' },
        propalOfferJobAndJobInterview: { type: String, default: '' },
        jobInterviewAndContractStartedDate: { type: String, default: '' }
    },
    orientations: {
        man: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ],
        woman: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ]
    },
    entrance: {
        man: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ],
        woman: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ]
    },
    exit: {
        man: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ],
        woman: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ]
    },
    usagers: {
        usagerCreated: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ],
        usagerUpdated: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ],
        usagerReaded: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ],
        usagerDeleted: [
            {
                date: Date,
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                }
            }
        ]
    },
    contacts: {
        contactUtilisateurWithUsager: [
            {
                date: Date,
                idContact: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                }
            }
        ],
        contactUtilisateurWithInterlocutor: [
            {
                date: Date,
                idContact: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                idInterlocutor: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        contactUtilisateurWithPartenaire: [
            {
                date: Date,
                idContact: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                idUtilisateur: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                idPartenaire: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Partenaire'
                }
            }
        ]
    },
    offerJobs: {
        offerJobCDICreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobCDDOfMoreThan6MonthCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobCDDOfLessThan6MonthCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobHelpedCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobOfLessThan20Hours: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobOfMoreThan20HoursAndLessThan30Hours: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobOfMoreThan30Hours: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ]
    },
    contracts: {
        contractsCDICreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ],
        contractsCDDOfMoreThan6MonthCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ],
        contractsCDDOfLessThan6MonthCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ],
        contractsHelpedCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ],
        contractsOfLessThan20Hours: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ],
        contractsOfMoreThan20HoursAndLessThan30Hours: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ],
        contractsOfMoreThan30Hours: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                }
            }
        ]
    }
});
const DataConvention = (0, mongoose_1.model)('DataConvention', DataConventionSchema);
exports.default = DataConvention;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YUNvbnZlbnRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0RhdGFDb252ZW50aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxpQkFBTSxDQUF1QjtJQUMxRCxLQUFLLEVBQUUsTUFBTTtJQUNiLEtBQUssRUFBRTtRQUNILHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3BELHlCQUF5QixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3hELDZCQUE2QixFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQzVELGtDQUFrQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0tBQ3BFO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsR0FBRyxFQUFFO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsUUFBUTtpQkFDaEI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtpQkFDckI7YUFDSjtTQUNKO1FBQ0QsS0FBSyxFQUFFO1lBQ0g7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsUUFBUSxFQUFFO29CQUNOLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsUUFBUTtpQkFDaEI7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFR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