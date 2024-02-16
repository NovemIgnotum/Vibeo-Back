import { Schema, model } from 'mongoose';
import IUsager from '../interfaces/Usager';

const usagerSchema = new Schema<IUsager>(
    {
        email: String,
        account: {
            _Id: String,
            // Cyrille à souhaité enlever l'objet civility
            male: { type: Boolean, required: true },
            name: { type: String, required: true },
            firstname: { type: String, required: true },
            dateOfBirth: Date,
            cityOfBirth: String,
            adress: String,
            city: String,
            zip: Number,
            // Object du quartier prioritaire
            district: Object,
            location: {
                lng: Number,
                lat: Number
            },
            adressComment: String,
            landlineNumber: Number, // essayer de passer la valeur en string
            mobileNum: Number, // essayer de passer la valeur en string
            phoneOrEmailComment: String
        },
        spouse: {
            type: Schema.Types.ObjectId,
            ref: 'Spouse'
        },
        dateOfAccueil: Date,
        conventionId: {
            type: Schema.Types.ObjectId,
            ref: 'Convention'
        },
        utilisateurAffiliated: {
            type: Schema.Types.ObjectId,
            ref: 'Utilisateur'
        },
        partenaireAffiliated: {
            type: Schema.Types.ObjectId,
            ref: 'Partenaire'
        },
        // // Id des conventions dont il est sorti
        previousConvention: [
            {
                type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
            ref: 'AvailabilityPerDay'
        },
        postAndSkillsAcquired: [
            {
                type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
                ref: 'Contact'
            }
        ],
        prospectings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Prospecting'
            }
        ],
        datas: [
            {
                year: Number,
                mounths: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Data'
                    }
                ]
            }
        ],
        offerJobReceived: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OfferJob'
            }
        ],
        offerJobAccepted: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OfferJob OfferJobArchived'
            }
        ],
        offerJobDenied: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OfferJob OfferJobArchived'
            }
        ],
        offerJobsSpontaneous: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OfferJobSpontaneous'
            }
        ],
        intermediateOfferJobReceived: [
            {
                type: Schema.Types.ObjectId,
                ref: 'IntermediateOfferJob'
            }
        ],
        intermediateOfferJobAccepted: [
            {
                type: Schema.Types.ObjectId,
                ref: 'IntermediateOfferJob IntermediateOfferJobArchived'
            }
        ],
        intermediateOfferJobDenied: [
            {
                type: Schema.Types.ObjectId,
                ref: 'IntermediateOfferJob IntermediateOfferJobArchived'
            }
        ],
        jobInterviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'JobInterview'
            }
        ],
        jobInterviewsSpontaneous: [
            {
                type: Schema.Types.ObjectId,
                ref: 'JobInterviewSpontaneous'
            }
        ],
        decouvertes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Decouverte'
            }
        ],
        decouvertesSpontaneous: [
            {
                type: Schema.Types.ObjectId,
                ref: 'DecouverteSpontaneous'
            }
        ],
        employmentContracts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EmploymentContract'
            }
        ],
        employmentContractsSpontaneous: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EmploymentContractSpontaneous'
            }
        ],
        appointments: [
            {
                month: { type: String, default: 'Janvier' },
                appointments: [
                    {
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
                        type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true
    }
);

const Usager = model<IUsager>('Usager', usagerSchema);
export default Usager;
