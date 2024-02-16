import { Document, Types } from 'mongoose';

export default interface IDataModel extends Document {
    month: Number;
    numberOfConnections: [{ logged: Date; screen: String }];
    admins: {
        adminCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        adminUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        adminReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        adminDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
    };
    etablissements: {
        etablissementCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Etablissement';
                };
            }
        ];
        etablissementUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Etablissement';
                };
            }
        ];
        etablissementReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Etablissement';
                };
            }
        ];
        etablissementDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Etablissement';
                };
            }
        ];
    };
    entreprise: {
        entrepriseCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        entrepriseUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        entrepriseReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        entrepriseDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    interlocutor: {
        interlocutorCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
            }
        ];
        interlocutorUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
            }
        ];
        interlocutorReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
            }
        ];
        interlocutorDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
            }
        ];
        interlocutorAddedToAnEntreprise: [
            {
                date: Date;
                idInterlocutor: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        interlocutorRemovedToAnEntreprise: [
            {
                date: Date;
                idInterlocutor: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    utilisateurs: {
        utilisateurCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        utilisateurUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        utilisateurReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        utilisateurDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
    };
    usagers: {
        usagerCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        usagerUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        usagerReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        usagerOuted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        usagerDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
    };
    skillsAndKnowsHow: {
        skillsCreated: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                codeJob: String;
            }
        ];
        skillsUpdated: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                codeJob: String;
            }
        ];
        skillsAndKnowHowsReaded: [
            {
                date: Date;
                idReaded: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
            }
        ];
        skillsDeleted: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                codeJob: String;
            }
        ];
        knowsHowCreated: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                codeJob: String;
            }
        ];
        knowsHowUpdated: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                codeJob: String;
            }
        ];
        knowsHowDeleted: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                codeJob: String;
            }
        ];
        jobContextCreated: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                categorie: String;
            }
        ];
        jobContextUpdated: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                categorie: String;
            }
        ];
        jobContextDeleted: [
            {
                date: Date;
                idFrom: {
                    type: Types.ObjectId;
                    ref: 'SkillsAndKnowHow';
                };
                code: String;
                categorie: String;
            }
        ];
    };
    partenaires: {
        partenaireCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Partenaire';
                };
            }
        ];
        partenaireUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Partenaire';
                };
            }
        ];
        partenaireReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Partenaire';
                };
            }
        ];
        partenaireDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Partenaire';
                };
            }
        ];
    };
    conventions: {
        conventionCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Convention';
                };
            }
        ];
        conventionUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Convention';
                };
            }
        ];
        conventionReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Convention';
                };
            }
        ];
        conventionDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Convention';
                };
            }
        ];
    };
    contacts: {
        contactCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
            }
        ];
        contactAffiliated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
            }
        ];
        contactUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
            }
        ];
        contactReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
            }
        ];
        contactDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
            }
        ];
    };
    collectivities: {
        collectivityCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Collectivity';
                };
            }
        ];
        collectivityUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Collectivity';
                };
            }
        ];
        collectivityReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Collectivity';
                };
            }
        ];
        collectivityDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Collectivity';
                };
            }
        ];
    };
    workStations: {
        workStationCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'WorkStation';
                };
            }
        ];
        workStationUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'WorkStation';
                };
            }
        ];
        workStationReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'WorkStation';
                };
            }
        ];
        workStationDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'WorkStation';
                };
            }
        ];
    };
    missions: {
        missionCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Mission';
                };
            }
        ];
        missionUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Mission';
                };
            }
        ];
        missionReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Mission';
                };
            }
        ];
        missionDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Mission';
                };
            }
        ];
    };
    actions: {
        actionCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Action';
                };
            },
            { _id: false }
        ];
        actionUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Action';
                };
            }
        ];
        actionReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Action';
                };
            }
        ];
        actionDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Action';
                };
            }
        ];
    };
    offerJobs: {
        offerJobCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
    };
    eventOfferJobs: {
        eventOfferJobCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EventOfferJob';
                };
            }
        ];
        eventOfferJobUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EventOfferJob';
                };
            }
        ];
        eventOfferJobReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EventOfferJob';
                };
            }
        ];
        eventOfferJobDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EventOfferJob';
                };
            }
        ];
    };
    intermediateOfferJobs: {
        intermediateOfferJobCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'IntermediateOfferJob';
                };
            }
        ];
        intermediateOfferJobUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'IntermediateOfferJob';
                };
            }
        ];
        intermediateOfferJobReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'IntermediateOfferJob';
                };
            }
        ];
        intermediateOfferJobDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'IntermediateOfferJob';
                };
            }
        ];
    };
    offerJobsSpontaneous: {
        offerJobsSpontaneousCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJobSpontaneous';
                };
            }
        ];
        offerJobsSpontaneousUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJobSpontaneous';
                };
            }
        ];
        offerJobsSpontaneousReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJobSpontaneous';
                };
            }
        ];
        offerJobsSpontaneousDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJobSpontaneous';
                };
            }
        ];
    };
    jobInterviews: {
        jobInterviewCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        jobInterviewUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        jobInterviewReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        jobInterviewDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    jobInterviewsSpontaneous: {
        jobInterviewSpontaneousCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        jobInterviewSpontaneousUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        jobInterviewSpontaneousReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        jobInterviewSpontaneousDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    decouvertes: {
        decouverteCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        decouverteUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        decouverteReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        decouverteDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    decouvertesSpontaneous: {
        decouvertesSpontaneousCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        decouvertesSpontaneousUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        decouvertesSpontaneousReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        decouvertesSpontaneousDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Decouverte';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    employmentContracts: {
        employmentContractCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        employmentContractUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        employmentContractReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
        employmentContractDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
            }
        ];
    };
    employmentContractSpontaneous: {
        employmentContractSpontaneousCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
                _id: false;
            }
        ];
        employmentContractSpontaneousUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
                _id: false;
            }
        ];
        employmentContractSpontaneousReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
                _id: false;
            }
        ];
        employmentContractSpontaneousDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'JobInterview';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idEntreprise: {
                    type: Types.ObjectId;
                    ref: 'Entreprise';
                };
                _id: false;
            }
        ];
    };
    events: {
        eventCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Event';
                };
            }
        ];
        eventUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Event';
                };
            }
        ];
        eventReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Event';
                };
            }
        ];
        eventDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Event';
                };
            }
        ];
    };
    rooms: {
        roomCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Room';
                };
            }
        ];
        roomUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Room';
                };
            }
        ];
        roomReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Room';
                };
            }
        ];
        roomDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Room';
                };
            }
        ];
    };
    adminArchived: {
        adminArchivedUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'UtilisateurArchived';
                };
            }
        ];
        adminArchivedReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'UtilisateurArchived';
                };
            }
        ];
        adminArchivedDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'UtilisateurArchived';
                };
            }
        ];
    };
    conventionArchived: {
        conventionArchivedUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'ConventionArchived';
                };
            }
        ];
        conventionArchivedReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'ConventionArchived';
                };
            }
        ];
        conventionArchivedDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'ConventionArchived';
                };
            }
        ];
    };
    partenaireArchived: {
        partenaireArchivedUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'partenaireArchived';
                };
            }
        ];
        partenaireArchivedReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'partenaireArchived';
                };
            }
        ];
        partenaireArchivedDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'partenaireArchived';
                };
            }
        ];
    };
    UsagerOut: {
        UsagerOutUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        UsagerOutReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        UsagerOutDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
    };
    utilisateurArchived: {
        utilisateurArchivedUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'UtilisateurArchived';
                };
            }
        ];
        utilisateurArchivedReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'UtilisateurArchived';
                };
            }
        ];
        utilisateurArchivedDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'UtilisateurArchived';
                };
            }
        ];
    };
    entrepriseArchived: {
        entrepriseArchivedUpdated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EntrepriseArchived';
                };
            }
        ];
        entrepriseArchivedReaded: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EntrepriseArchived';
                };
            }
        ];
        entrepriseArchivedDeleted: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EntrepriseArchived';
                };
            }
        ];
    };
}
