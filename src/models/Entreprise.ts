import { Schema, model } from 'mongoose';
import IEntreprise from '../interfaces/Entreprise';

const entreprise = new Schema<IEntreprise>(
    {
        society: String,
        currentName: String,
        siret: Number,
        logo: Object,
        adressLabel: String,
        adress: String,
        zip: Number,
        city: String,
        location: {
            lng: Number,
            lat: Number
        },
        adressComplement: String,
        website: String,
        activityArea: String,
        administratifStateOpen: Boolean,
        headquartersSociety: Boolean,
        numberOfEmployed: String,
        codeNAF: String,
        details: String,
        comments: String,
        prospecting: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Prospect'
            }
        ],
        interlocutors: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Interlocutor'
            }
        ],
        interlocutorsArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Interlocutor'
            }
        ],
        workStations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'WorkStation'
            }
        ],
        missions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Mission'
            }
        ],
        events: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Event'
            }
        ],
        datas: [
            {
                year: Number,
                mounths: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'DataEntreprise'
                    }
                ]
            }
        ],
        employmentContracts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'EmploymentContract'
            }
        ],
        workStationsArchiveds: [
            {
                type: Schema.Types.ObjectId,
                ref: 'WorkStationArchived'
            }
        ],
        missionsArchived: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MissionArchived'
            }
        ],
        eventsManagements: [{ entretienDecouverte: Boolean }, { evenements: Boolean }, { iris: Boolean }, { j_ai_une_offre: Boolean }]
    },
    {
        timestamps: true
    }
);
const Entreprise = model<IEntreprise>('Entreprise', entreprise);
export default Entreprise;
