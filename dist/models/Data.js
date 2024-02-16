"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dataSchema = new mongoose_1.Schema({
    month: Number,
    numberOfConnections: [{ logged: Date, screen: { type: String, default: 'undefined' }, _id: false }],
    admins: {
        adminCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        adminUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        adminReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        adminDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ],
        etablissementUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ],
        etablissementReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Etablissement'
                },
                _id: false
            }
        ],
        etablissementDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        utilisateurUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        utilisateurReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Utilisateur'
                },
                _id: false
            }
        ],
        utilisateurDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        usagerUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        usagerReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        usagerOuted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                }
            }
        ],
        usagerDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'SkillsAndKnowHow'
                },
                _id: false
            }
        ],
        skillsDeleted: [
            {
                date: Date,
                idFrom: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ],
        partenaireUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ],
        partenaireReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Partenaire'
                },
                _id: false
            }
        ],
        partenaireDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        entrepriseUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        entrepriseReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        entrepriseDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                _id: false
            }
        ],
        interlocutorAddedToAnEntreprise: [
            {
                date: Date,
                idInterlocutor: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        interlocutorRemovedToAnEntreprise: [
            {
                date: Date,
                idInterlocutor: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ],
        conventionUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ],
        conventionReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Convention'
                },
                _id: false
            }
        ],
        conventionDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ],
        contactAffiliated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        contactUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ],
        contactReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Contact'
                },
                _id: false
            }
        ],
        contactDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ],
        collectivityUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ],
        collectivityReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Collectivity'
                },
                _id: false
            }
        ],
        collectivityDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ],
        workStationUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ],
        workStationReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'WorkStation'
                },
                _id: false
            }
        ],
        workStationDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
    actions: {
        actionCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ],
        actionUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ],
        actionReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Action'
                },
                _id: false
            }
        ],
        actionDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ],
        offerJobUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ],
        offerJobReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJob'
                },
                _id: false
            }
        ],
        offerJobDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ],
        eventOfferJobUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ],
        eventOfferJobReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EventOfferJob'
                }
            }
        ],
        eventOfferJobDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
    offerJobsSpontaneous: {
        offerJobsSpontaneousCreated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ],
        offerJobsSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ],
        offerJobsSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'OfferJobSpontaneous'
                }
            }
        ],
        offerJobsSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterview'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        jobInterviewSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'JobInterviewSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        decouverteUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        decouverteReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        decouverteDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Decouverte'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        decouvertesSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        decouvertesSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                }
            }
        ],
        decouvertesSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'DecouverteSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContract'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractSpontaneousUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractSpontaneousReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Entreprise'
                },
                _id: false
            }
        ],
        employmentContractSpontaneousDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EmploymentContractSpontaneous'
                },
                idUsager: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                idEntreprise: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ],
        eventUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ],
        eventReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Event'
                },
                _id: false
            }
        ],
        eventDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ],
        roomUpdated: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ],
        roomReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Room'
                },
                _id: false
            }
        ],
        roomDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        adminArchivedReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        adminArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'ConventionArchived'
                },
                _id: false
            }
        ],
        conventionArchivedReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'ConventionArchived'
                },
                _id: false
            }
        ],
        conventionArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'partenaireArchived'
                },
                _id: false
            }
        ],
        partenaireArchivedReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'partenaireArchived'
                },
                _id: false
            }
        ],
        partenaireArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        UsagerOutReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Usager'
                },
                _id: false
            }
        ],
        UsagerOutDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        utilisateurArchivedReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'UtilisateurArchived'
                },
                _id: false
            }
        ],
        utilisateurArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
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
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EntrepriseArchived'
                },
                _id: false
            }
        ],
        entrepriseArchivedReaded: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EntrepriseArchived'
                },
                _id: false
            }
        ],
        entrepriseArchivedDeleted: [
            {
                date: Date,
                id: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'EntrepriseArchived'
                },
                _id: false
            }
        ]
    }
});
const Data = (0, mongoose_1.model)('Data', dataSchema);
exports.default = Data;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQUM7SUFDMUIsS0FBSyxFQUFFLE1BQU07SUFDYixtQkFBbUIsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDbkcsTUFBTSxFQUFFO1FBQ0osWUFBWSxFQUFFO1lBQ1Y7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFO29CQUNBLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtpQkFDckI7Z0JBQ0QsR0FBRyxFQUFFLEtBQUs7YUFDYjtTQUNKO1FBQ0QsWUFBWSxFQUFFO1lBQ1Y7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFO29CQUNBLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtpQkFDckI7Z0JBQ0QsR0FBRyxFQUFFLEtBQUs7YUFDYjtTQUNKO1FBQ0QsV0FBVyxFQUFFO1lBQ1Q7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFO29CQUNBLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtpQkFDckI7Z0JBQ0QsR0FBRyxFQUFFLEtBQUs7YUFDYjtTQUNKO1FBQ0QsWUFBWSxFQUFFO1lBQ1Y7Z0JBQ0ksSUFBSSxFQUFFLElBQUk7Z0JBQ1YsRUFBRSxFQUFFO29CQUNBLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxR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