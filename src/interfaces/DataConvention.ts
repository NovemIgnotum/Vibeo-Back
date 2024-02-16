import { Document, Types } from 'mongoose';

export default interface IDataConventionModel extends Document {
    month: Number;
    times: {
        orientationAndAccueil: { type: String; default: '' };
        creationAndPropalOfferJob: { type: String; default: '' };
        propalOfferJobAndJobInterview: { type: String; default: '' };
        jobInterviewAndContractStartedDate: { type: String; default: '' };
    };
    orientations: {
        man: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        woman: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
    };
    entrance: {
        man: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        woman: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
    };
    exit: {
        man: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        woman: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
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
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        usagerUpdated: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        usagerReaded: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
        usagerDeleted: [
            {
                date: Date;
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
            }
        ];
    };
    contacts: {
        contactUtilisateurWithUsager: [
            {
                date: Date;
                idContact: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
                idUsager: {
                    type: Types.ObjectId;
                    ref: 'Usager';
                };
            }
        ];
        contactUtilisateurWithInterlocutor: [
            {
                date: Date;
                idContact: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
                idInterlocutor: {
                    type: Types.ObjectId;
                    ref: 'Interlocutor';
                };
            }
        ];
        contactUtilisateurWithPartenaire: [
            {
                date: Date;
                idContact: {
                    type: Types.ObjectId;
                    ref: 'Contact';
                };
                idUtilisateur: {
                    type: Types.ObjectId;
                    ref: 'Utilisateur';
                };
                idPartenaire: {
                    type: Types.ObjectId;
                    ref: 'Partenaire';
                };
            }
        ];
    };
    offerJobs: {
        offerJobCDICreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobCDDOfMoreThan6MonthCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobCDDOfLessThan6MonthCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobHelpedCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobOfLessThan20Hours: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobOfMoreThan20HoursAndLessThan30Hours: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
        offerJobOfMoreThan30Hours: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'OfferJob';
                };
            }
        ];
    };
    contracts: {
        contractsCDICreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
        contractsCDDOfMoreThan6MonthCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
        contractsCDDOfLessThan6MonthCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
        contractsHelpedCreated: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
        contractsOfLessThan20Hours: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
        contractsOfMoreThan20HoursAndLessThan30Hours: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
        contractsOfMoreThan30Hours: [
            {
                date: Date;
                id: {
                    type: Types.ObjectId;
                    ref: 'EmploymentContract';
                };
            }
        ];
    };
}
