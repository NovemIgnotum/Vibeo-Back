import { Schema, model } from 'mongoose';
import IDataEntreprise from '../interfaces/DataEntreprise';

const dataEntrepriseSchema = new Schema<IDataEntreprise>({
    month: Number,
    interlocutors: {
        interlocutorsCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        interlocutorsUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        interlocutorsReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Interlocutor'
                }
            }
        ],
        interlocutorsDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
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
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        collaborationsUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        collaborationsReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Contact'
                }
            }
        ],
        collaborationsDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
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
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ],
        workStationsUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ],
        workStationsReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkStation'
                }
            }
        ],
        workStationsDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
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
    offerJobs: {
        offerJobsCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobsUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobsReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        offerJobsDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
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
    employmentContracts: {
        employmentContractsCreated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        employmentContractsUpdated: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        employmentContractsReaded: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ],
        employmentContractsDeleted: [
            {
                date: Date,
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'OfferJob'
                }
            }
        ]
    }
});

const DataEntreprise = model<IDataEntreprise>('DataEntreprise', dataEntrepriseSchema);
export default DataEntreprise;
