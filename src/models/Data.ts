import { Schema, model } from 'mongoose';
import IDataModel from '../interfaces/IDataModel';

const dataSchema = new Schema({
    month: Number,
    numberOfConnections: [{ logged: Date, screen: { type: String, default: 'undefined' }, _id: false }],
    admins: {
        adminCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        adminUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        adminReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        adminDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ]
    },
    etablissements: {
        etablissementCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ],
        etablissementUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ],
        etablissementReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ],
        etablissementDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ]
    },
    utilisateurs: {
        utilisateurCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        utilisateurUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        utilisateurReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        utilisateurDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ]
    },
    usagers: {
        usagerCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        usagerUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        usagerReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        usagerOuted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                }
            }
        ],
        usagerDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ]
    },
    skillsAndKnowsHow: {
        skillsCreated: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                codeJob: String,
                _id: false
            }
        ],
        skillsUpdated: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                codeJob: String,
                _id: false
            }
        ],
        skillsAndKnowHowsReaded: [
            {
                date: Date,
                idReaded: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                _id: false
            }
        ],
        skillsDeleted: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                codeJob: String,
                _id: false
            }
        ],
        knowsHowCreated: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                codeJob: String,
                _id: false
            }
        ],
        knowsHowUpdated: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                codeJob: String,
                _id: false
            }
        ],
        knowsHowDeleted: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                codeJob: String,
                _id: false
            }
        ],
        jobContextCreated: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                categorie: String
            }
        ],
        jobContextUpdated: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                categorie: String
            }
        ],
        jobContextDeleted: [
            {
                date: Date,
                idFrom: {
                    type: Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                code: String,
                categorie: String
            }
        ]
    },
    partenaires: {
        partenaireCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ],
        partenaireUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ],
        partenaireReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ],
        partenaireDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ]
    },
    entreprise: {
        entrepriseCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        entrepriseUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        entrepriseReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        entrepriseDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ]
    },
    interlocutor: {
        interlocutorCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorAddedToAnEntreprise: [
            {
                date: Date,
                idInterlocutor: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        interlocutorRemovedToAnEntreprise: [
            {
                date: Date,
                idInterlocutor: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ]
    },
    conventions: {
        conventionCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ],
        conventionUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ],
        conventionReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ],
        conventionDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ]
    },
    contacts: {
        contactCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ],
        contactAffiliated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        contactUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ],
        contactReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ],
        contactDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ]
    },
    collectivities: {
        collectivityCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ],
        collectivityUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ],
        collectivityReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ],
        collectivityDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ]
    },
    workStations: {
        workStationCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ],
        workStationUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ],
        workStationReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ],
        workStationDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ]
    },
    missions: {
        missionCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ],
        missionUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ],
        missionReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ],
        missionDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Mission'
                }
            }
        ]
    },
    actions: {
        actionCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ],
        actionUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ],
        actionReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ],
        actionDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ]
    },
    offerJobs: {
        offerJobCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ],
        offerJobUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ],
        offerJobReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ],
        offerJobDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ]
    },
    eventOfferJobs: {
        eventOfferJobCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ],
        eventOfferJobUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ],
        eventOfferJobReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ],
        eventOfferJobDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ]
    },
    intermediateOfferJobs: {
        intermediateOfferJobCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ],
        intermediateOfferJobUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ],
        intermediateOfferJobReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ],
        intermediateOfferJobDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'IntermediateOfferJob'
                }
            }
        ]
    },
    offerJobsSpontaneous: {
        offerJobsSpontaneousCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ],
        offerJobsSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ],
        offerJobsSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ],
        offerJobsSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ]
    },
    jobInterviews: {
        jobInterviewCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ]
    },
    jobInterviewSpontaneouss: {
        jobInterviewSpontaneousCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ]
    },
    decouvertes: {
        decouverteCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        decouverteUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        decouverteReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        decouverteDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ]
    },
    decouvertesSpontaneous: {
        decouvertesSpontaneousCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        decouvertesSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        decouvertesSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        decouvertesSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ]
    },
    employmentContracts: {
        employmentContractCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ]
    },
    employmentContractSpontaneous: {
        employmentContractSpontaneousCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ]
    },
    events: {
        eventCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ],
        eventUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ],
        eventReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ],
        eventDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ]
    },
    rooms: {
        roomCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ],
        roomUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ],
        roomReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ],
        roomDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ]
    },
    adminArchived: {
        adminArchivedUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        adminArchivedReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        adminArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ]
    },
    conventionArchived: {
        conventionArchivedUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'ConventionArchived'
                },
                _id: false
            }
        ],
        conventionArchivedReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'ConventionArchived'
                },
                _id: false
            }
        ],
        conventionArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'ConventionArchived'
                },
                _id: false
            }
        ]
    },
    partenaireArchived: {
        partenaireArchivedUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'partenaireArchived'
                },
                _id: false
            }
        ],
        partenaireArchivedReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'partenaireArchived'
                },
                _id: false
            }
        ],
        partenaireArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'partenaireArchived'
                },
                _id: false
            }
        ]
    },
    UsagerOut: {
        UsagerOutUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        UsagerOutReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        UsagerOutDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ]
    },
    utilisateurArchived: {
        utilisateurArchivedUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        utilisateurArchivedReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        utilisateurArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ]
    },
    entrepriseArchived: {
        entrepriseArchivedUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EntrepriseArchived'
                },
                _id: false
            }
        ],
        entrepriseArchivedReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EntrepriseArchived'
                },
                _id: false
            }
        ],
        entrepriseArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'EntrepriseArchived'
                },
                _id: false
            }
        ]
    }
});

const Data = model<IDataModel>('Data', dataSchema);
export default Data;
