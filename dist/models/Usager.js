"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usagerSchema = new mongoose_1.Schema({
    email: String,
    account: {
        _Id: String,
        male: { type: Boolean, required: true },
        name: { type: String, required: true },
        firstname: { type: String, required: true },
        dateOfBirth: Date,
        cityOfBirth: String,
        adress: String,
        city: String,
        zip: Number,
        district: Object,
        location: {
            lng: Number,
            lat: Number
        },
        adressComment: String,
        landlineNumber: Number,
        mobileNum: Number,
        phoneOrEmailComment: String
    },
    spouse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Spouse'
    },
    dateOfAccueil: Date,
    conventionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Convention'
    },
    utilisateurAffiliated: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Utilisateur'
    },
    partenaireAffiliated: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Partenaire'
    },
    previousConvention: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Convention'
        }
    ],
    prescription: {
        motif: {
            Emploi: { type: Boolean, default: false },
            TNS: { type: Boolean, default: false },
            Stage: { type: Boolean, default: false },
            Evenement: { type: Boolean, default: false }
        },
        file: { type: Object, default: '' }
    },
    standBy: {
        startingDate: Date,
        endingDate: Date,
        comment: String
    },
    familySituation: { type: String, default: '' },
    expoPushToken: { type: String, default: '' },
    childrenSituation: { type: Boolean, default: false },
    careChild: { type: String, default: '' },
    howChildCare: {
        none: { type: Boolean, default: false },
        possibility: { type: Boolean, default: false },
        nursery: { type: Boolean, default: false },
        dayCare: { type: Boolean, default: false },
        himSelf: { type: Boolean, default: false }
    },
    numberOfChildren: Number,
    familySituationComment: { type: String, default: '' },
    lastContact: Date,
    objectif: {
        emploi: { type: Boolean, default: false },
        tns: { type: Boolean, default: false },
        evenement: { type: Boolean, default: false },
        stage: { type: Boolean, default: false },
        comment: String
    },
    ownEntreprise: Object,
    levelOfStudy: { type: String, default: '' },
    levelOfStydyComment: { type: String, default: '' },
    administrativePosition: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AdministrativePosition'
    },
    licencesAndAccreditation: {
        licenceDriver: { type: Boolean, default: false },
        licenceDriverType: { type: Array, default: [] },
        caces: { type: Boolean, default: false },
        cacesType: { type: Array, default: [] },
        electricalAccreditation: { type: Boolean, default: false },
        electricalAccreditationComment: String,
        weldingAccreditation: { type: Boolean, default: false },
        weldingAccreditationComment: String,
        otherComment: String
    },
    mobility: {
        car: {
            condition: { type: String, default: '' },
            insurance: { type: Boolean, default: false },
            bought: { type: Boolean, default: false },
            rented: { type: Boolean, default: false },
            lended: { type: Boolean, default: false }
        },
        motorcycle: {
            condition: { type: String, default: '' },
            insurance: { type: Boolean, default: false },
            bought: { type: Boolean, default: false },
            rented: { type: Boolean, default: false },
            lended: { type: Boolean, default: false }
        },
        scooter: {
            condition: { type: String, default: '' },
            insurance: { type: Boolean, default: false },
            bought: { type: Boolean, default: false },
            rented: { type: Boolean, default: false },
            lended: { type: Boolean, default: false }
        },
        bicycle: {
            condition: { type: String, default: '' },
            insurance: { type: Boolean, default: false },
            bought: { type: Boolean, default: false },
            rented: { type: Boolean, default: false },
            lended: { type: Boolean, default: false }
        },
        trottinette: {
            condition: { type: String, default: '' },
            insurance: { type: Boolean, default: false },
            bought: { type: Boolean, default: false },
            rented: { type: Boolean, default: false },
            lended: { type: Boolean, default: false }
        },
        carpoolingIsAvailable: { type: Boolean, default: false },
        blablacarAccount: { type: Boolean, default: false },
        otherComment: String
    },
    actions: [Object],
    availabilityPerDay: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AvailabilityPerDay'
    },
    postAndSkillsAcquired: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'SkillsAndKnowHow'
        }
    ],
    postWanted: [
        {
            workname: String,
            codeRome: String,
            _id: false
        }
    ],
    contacts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Contact'
        }
    ],
    prospectings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Prospecting'
        }
    ],
    datas: [
        {
            year: Number,
            mounths: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Data'
                }
            ]
        }
    ],
    offerJobReceived: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OfferJob'
        }
    ],
    offerJobAccepted: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OfferJob OfferJobArchived'
        }
    ],
    offerJobDenied: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OfferJob OfferJobArchived'
        }
    ],
    offerJobsSpontaneous: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'OfferJobSpontaneous'
        }
    ],
    intermediateOfferJobReceived: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'IntermediateOfferJob'
        }
    ],
    intermediateOfferJobAccepted: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'IntermediateOfferJob IntermediateOfferJobArchived'
        }
    ],
    intermediateOfferJobDenied: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'IntermediateOfferJob IntermediateOfferJobArchived'
        }
    ],
    jobInterviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'JobInterview'
        }
    ],
    jobInterviewsSpontaneous: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'JobInterviewSpontaneous'
        }
    ],
    decouvertes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Decouverte'
        }
    ],
    decouvertesSpontaneous: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'DecouverteSpontaneous'
        }
    ],
    employmentContracts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EmploymentContract'
        }
    ],
    employmentContractsSpontaneous: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EmploymentContractSpontaneous'
        }
    ],
    appointments: [
        {
            month: { type: String, default: 'Janvier' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Fevrier' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Mars' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Avril' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Mai' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Juin' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Juillet' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Aout' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Septembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Octobre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Novembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Decembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        }
    ],
    docs: [Object],
    isActivated: { type: Boolean, default: false },
    status: String,
    nextMeeting: Date,
    token: String,
    hash: String,
    salt: String
}, {
    timestamps: true
});
const Usager = (0, mongoose_1.model)('Usager', usagerSchema);
exports.default = Usager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNhZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Vc2FnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFHekMsTUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTSxDQUMzQjtJQUNJLEtBQUssRUFBRSxNQUFNO0lBQ2IsT0FBTyxFQUFFO1FBQ0wsR0FBRyxFQUFFLE1BQU07UUFFWCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7UUFDdkMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ3RDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtRQUMzQyxXQUFXLEVBQUUsSUFBSTtRQUNqQixXQUFXLEVBQUUsTUFBTTtRQUNuQixNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osR0FBRyxFQUFFLE1BQU07UUFFWCxRQUFRLEVBQUUsTUFBTTtRQUNoQixRQUFRLEVBQUU7WUFDTixHQUFHLEVBQUUsTUFBTTtZQUNYLEdBQUcsRUFBRSxNQUFNO1NBQ2Q7UUFDRCxhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsTUFBTTtRQUN0QixTQUFTLEVBQUUsTUFBTTtRQUNqQixtQkFBbUIsRUFBRSxNQUFNO0tBQzlCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFFBQVE7S0FDaEI7SUFDRCxhQUFhLEVBQUUsSUFBSTtJQUNuQixZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsWUFBWTtLQUNwQjtJQUNELHFCQUFxQixFQUFFO1FBQ25CLElBQUksRUFBRSxpQkFB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RSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDNUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQ3pDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUN6QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7U0FDNUM7UUFDRCxPQUFPLEVBQUU7WUFDTCxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDeEMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQzVDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUN6QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDekMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1NBQzVDO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUM1QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDekMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQ3pDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtTQUM1QztRQUNELFdBQVcsRUFBRTtZQUNULFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDNUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1lBQ3pDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUN6QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7U0FDNUM7UUFDRCxxQkFBcUIsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtRQUN4RCxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtRQUNuRCxZQUFZLEVBQUUsTUFBTTtLQUN2QjtJQUNELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNqQixrQkFBa0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUMzQixHQUFHLEVBQUUsb0JBQW9CO0tBQzVCO0lBQ0QscUJBQXFCLEVBQUU7UUFDbkI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsa0JBQWtCO1NBQzFCO0tBQ0o7SUFDRCxVQUFVLEVBQUU7UUFDUjtZQUNJLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEdBQUcsRUFBRSxLQUFLO1NBQ2I7S0FDSjtJQUNELFFBQVEsRUFBRTtRQUNOO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFNBQVM7U0FDakI7S0FDSjtJQUNELFlBQVksRUFBRTtRQUNWO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGFBQWE7U0FDckI7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxNQUFNO2lCQUNkO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxVQUFVO1NBQ2xCO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLDJCQUEyQjtTQUNuQztLQUNKO0lBQ0QsY0FBYyxFQUFFO1FBQ1o7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsMkJBQTJCO1NBQ25DO0tBQ0o7SUFDRCxvQkFBb0IsRUFBRTtRQUNsQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxxQkFBcUI7U0FDN0I7S0FDSjtJQUNELDRCQUE0QixFQUFFO1FBQzFCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLHNCQUFzQjtTQUM5QjtLQUNKO0lBQ0QsNEJBQTRCLEVBQUU7UUFDMUI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsbURBQW1EO1NBQzNEO0tBQ0o7SUFDRCwwQkFBMEIsRUFBRTtRQUN4QjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxtREFBbUQ7U0FDM0Q7S0FDSjtJQUNELGFBQWEsRUFBRTtRQUNYO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGNBQWM7U0FDdEI7S0FDSjtJQUNELHdCQUF3QixFQUFFO1FBQ3RCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLHlCQUF5QjtTQUNqQztLQUNKO0lBQ0QsV0FBVyxFQUFFO1FBQ1Q7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsWUFBWTtTQUNwQjtLQUNKO0lBQ0Qsc0JBQXNCLEVBQUU7UUFDcEI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsdUJBQXVCO1NBQy9CO0tBQ0o7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxvQkFBb0I7U0FDNUI7S0FDSjtJQUNELDhCQUE4QixFQUFFO1FBQzVCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLCtCQUErQjtTQUN2QztLQUNKO0lBQ0QsWUFBWSxFQUFFO1FBQ1Y7WUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDM0MsWUFBWSxFQUFFO2dCQUNWO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtvQkFDbEIsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSjtZQUNELEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtZQUMzQyxZQUFZLEVBQUU7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxhQUFhO29CQUNsQixHQUFHLEVBQUUsS0FBSztpQkFDYjthQUNKO1lBQ0QsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ3hDLFlBQVksRUFBRTtnQkFDVjtvQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGFBQWE7b0JBQ2xCLEdBQUcsRUFBRSxLQUFLO2lCQUNiO2FBQ0o7WUFDRCxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7WUFDekMsWUFBWSxFQUFFO2dCQUNWO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtvQkFDbEIsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSjtZQUNELEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUN2QyxZQUFZLEVBQUU7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxhQUFhO29CQUNsQixHQUFHLEVBQUUsS0FBSztpQkFDYjthQUNKO1lBQ0QsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ3hDLFlBQVksRUFBRTtnQkFDVjtvQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGFBQWE7b0JBQ2xCLEdBQUcsRUFBRSxLQUFLO2lCQUNiO2FBQ0o7WUFDRCxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDM0MsWUFBWSxFQUFFO2dCQUNWO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtvQkFDbEIsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSjtZQUNELEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUN4QyxZQUFZLEVBQUU7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxhQUFhO29CQUNsQixHQUFHLEVBQUUsS0FBSztpQkFDYjthQUNKO1lBQ0QsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFO1lBQzdDLFlBQVksRUFBRTtnQkFDVjtvQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGFBQWE7b0JBQ2xCLEdBQUcsRUFBRSxLQUFLO2lCQUNiO2FBQ0o7WUFDRCxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDM0MsWUFBWSxFQUFFO2dCQUNWO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtvQkFDbEIsR0FBRyxFQUFFLEtBQUs7aUJBQ2I7YUFDSjtZQUNELEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtZQUM1QyxZQUFZLEVBQUU7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxhQUFhO29CQUNsQixHQUFHLEVBQUUsS0FBSztpQkFDYjthQUNKO1lBQ0QsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO1lBQzVDLFlBQVksRUFBRTtnQkFDVjtvQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGFBQWE7b0JBQ2xCLEdBQUcsRUFBRSxLQUFLO2lCQUNiO2FBQ0o7WUFDRCxHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDZCxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDOUMsTUFBTSxFQUFFLE1BQU07SUFDZCxXQUFXLEVBQUUsSUFBSTtJQUNqQixLQUFLLEVBQUUsTUFBTTtJQUNiLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07Q0FDZixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBSyxFQUFVLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN0RCxrQkFBZSxNQUFNLENBQUMifQ==