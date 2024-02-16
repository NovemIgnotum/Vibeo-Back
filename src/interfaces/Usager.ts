import { Document, Types } from 'mongoose';

export default interface IUsager extends Document {
    email: String;
    account: {
        male: Boolean;
        name: String;
        firstname: String;
        dateOfBirth: Date;
        cityOfBirth: String;
        adress: String;
        city: String;
        zip: Number;
        // Object du quartier prioritaire
        district: Object;
        location: {
            lng: Number;
            lat: Number;
        };
        adressComment: String;
        landlineNumber: Number;
        mobileNum: Number;
        phoneOrEmailComment: String;
    };
    spouse: {
        type: Types.ObjectId;
        ref: 'Spouse';
    };
    conventionId: {
        type: Types.ObjectId;
        ref: 'Convention';
    };
    utilisateurAffiliated: {
        type: Types.ObjectId;
        ref: 'Utilisateur';
    };
    partenaireAffiliated: {
        type: Types.ObjectId;
        ref: 'Partenaire';
    };
    // Id des conventions dont il est sorti
    previousConvention: [
        {
            type: Types.ObjectId;
            ref: 'Convention';
        }
    ];
    prescription: {
        motif: {
            Emploi: { type: Boolean; default: false };
            TNS: { type: Boolean; default: false };
            Stage: { type: Boolean; default: false };
            Evenement: { type: Boolean; default: false };
        };
        file: { type: Object; default: '' };
    };
    standBy: [
        {
            startingDate: Date;
            endingDate: Date;
            comment: String;
        }
    ];
    ownEntreprise: Object;
    familySituation: { type: String; default: '' };
    expoPushToken: { type: String; default: '' };
    childrenSituation: { type: Boolean; default: false };
    careChild: { type: String; default: '' };
    howChildCare: {
        none: { type: Boolean; default: false };
        possibility: { type: Boolean; default: false };
        nursery: { type: Boolean; default: false };
        dayCare: { type: Boolean; default: false };
        himSelf: { type: Boolean; default: false };
    };
    numberOfChildren: Number;
    familySituationComment: { type: String; default: '' };
    lastContact: Date;
    objectif: {
        emploi: { type: Boolean; default: false };
        tns: { type: Boolean; default: false };
        evenement: { type: Boolean; default: false };
        stage: { type: Boolean; default: false };
        comment: String;
    };
    dateOfAccueil: Date;
    levelOfStudy: { type: String; default: '' };
    levelOfStydyComment: { type: String; default: '' };
    administrativePosition: {
        type: Types.ObjectId;
        ref: 'AdministrativePosition ';
    };
    licencesAndAccreditation: {
        licenceDriver: { type: Boolean; default: false };
        licenceDriverType: Object[];
        caces: { type: Boolean; default: false };
        cacesType: Object[];
        electricalAccreditation: { type: Boolean; default: false };
        electricalAccreditationComment: String;
        weldingAccreditation: { type: Boolean; default: false };
        weldingAccreditationComment: String;
        otherComment: String;
    };
    mobility: {
        car: {
            condition: { type: String; default: '' };
            insurance: { type: Boolean; default: false };
            bought: { type: Boolean; default: false };
            rented: { type: Boolean; default: false };
            lended: { type: Boolean; default: false };
        };
        motorcycle: {
            condition: { type: String; default: '' };
            insurance: { type: Boolean; default: false };
            bought: { type: Boolean; default: false };
            rented: { type: Boolean; default: false };
            lended: { type: Boolean; default: false };
        };
        scooter: {
            condition: { type: String; default: '' };
            insurance: { type: Boolean; default: false };
            bought: { type: Boolean; default: false };
            rented: { type: Boolean; default: false };
            lended: { type: Boolean; default: false };
        };
        bicycle: {
            condition: { type: String; default: '' };
            insurance: { type: Boolean; default: false };
            bought: { type: Boolean; default: false };
            rented: { type: Boolean; default: false };
            lended: { type: Boolean; default: false };
        };
        trottinette: {
            condition: { type: String; default: '' };
            insurance: { type: Boolean; default: false };
            bought: { type: Boolean; default: false };
            rented: { type: Boolean; default: false };
            lended: { type: Boolean; default: false };
        };
        carpoolingIsAvailable: { type: Boolean; default: false };
        blablacarAccount: { type: Boolean; default: false };
        otherComment: String;
    };
    actions: [Object]; //type: Types.ObjectId; ref: 'Action'
    availabilityPerDay: {
        type: Types.ObjectId;
        ref: 'AvailabilityPerDay';
    };
    postAndSkillsAcquired: [
        {
            type: Types.ObjectId;
            ref: 'SkillsAndKnowHow';
        }
    ];
    postWanted: [
        {
            workname: String;
            codeRome: String;
        }
    ];
    contacts: [
        {
            type: Types.ObjectId;
            ref: 'Contact';
        }
    ];
    datas: [
        {
            year: Number;
            mounths: [
                {
                    type: Types.ObjectId;
                    ref: 'Data';
                }
            ];
        }
    ];
    // OFFER JOBS
    offerJobReceived: [
        {
            type: Types.ObjectId;
            ref: 'OfferJob';
        }
    ];
    offerJobAccepted: [
        {
            type: Types.ObjectId;
            ref: 'OfferJob OfferJobArchived';
        }
    ];
    offerJobDenied: [
        {
            type: Types.ObjectId;
            ref: 'OfferJob OfferJobArchived';
        }
    ];
    intermediateOfferJobReceived: [
        {
            type: Types.ObjectId;
            ref: 'IntermediateOfferJob';
        }
    ];
    intermediateOfferJobAccepted: [
        {
            type: Types.ObjectId;
            ref: 'IntermediateOfferJob IntermediateOfferJobArchived';
        }
    ];
    intermediateOfferJobDenied: [
        {
            type: Types.ObjectId;
            ref: 'IntermediateOfferJob IntermediateOfferJobArchived';
        }
    ];
    prospectings: [
        {
            type: Types.ObjectId;
            ref: 'Prospecting';
        }
    ];
    offerJobsSpontaneous: [
        {
            type: Types.ObjectId;
            ref: 'OfferJobSpontaneous';
        }
    ];
    // JOB INTERVIEWS
    jobInterviews: [
        {
            type: Types.ObjectId;
            ref: 'JobInterview';
        }
    ];
    jobInterviewsSpontaneous: [
        {
            type: Types.ObjectId;
            ref: 'JobInterviewSpontaneous';
        }
    ];
    // DECOUVERTES
    decouvertes: [
        {
            type: Types.ObjectId;
            ref: 'Decouverte';
        }
    ];
    decouvertesSpontaneous: [
        {
            type: Types.ObjectId;
            ref: 'DecouverteSpontaneous';
        }
    ];
    // EMPLOYMENT CONTRACTS
    employmentContracts: [
        {
            type: Types.ObjectId;
            ref: 'EmploymentContract';
        }
    ];
    employmentContractsSpontaneous: [
        {
            type: Types.ObjectId;
            ref: 'EmploymentContractSpontaneous';
        }
    ];
    appointments: [
        {
            month: { type: String; default: 'Janvier' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Fevrier' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Mars' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Avril' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Mai' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Juin' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Juillet' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Aout' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Septembre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Octobre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Novembre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        },
        {
            month: { type: String; default: 'Decembre' };
            appointments: [
                {
                    type: Types.ObjectId;
                    ref: 'Appointment';
                }
            ];
        }
    ];
    docs: [Object];
    isActivated: Boolean;
    status: String;
    nextMeeting: Date;
    token: String;
    hash: String;
    salt: String;
}
