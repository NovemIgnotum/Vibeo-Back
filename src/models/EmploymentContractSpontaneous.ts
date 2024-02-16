import { Schema, model } from 'mongoose';
import IEmploymentContractSpontaneous from '../interfaces/EmploymentContractSpontaneous';

const employmentContractSpontaneousSchema = new Schema<IEmploymentContractSpontaneous>(
    {
        contractType: String,
        workName: String,
        numberOfHour: Number,
        tasksList: [String],
        skillsList: [String],
        jobContext: [Object],
        usager: { type: Schema.Types.ObjectId, ref: 'Usager' },
        entreprise: { type: Schema.Types.ObjectId, ref: 'Entreprise' },
        startingDate: Date,
        endingDate: Date,
        endingTryPeriodeDate: Date,
        continuityOfThepreviousContract: Boolean,
        previousContract: {
            type: Schema.Types.ObjectId,
            ref: 'EmploymentContract'
        },
        suiviEmploi: {
            date: Date,
            withWho: {
                type: Schema.Types.ObjectId,
                ref: 'Utilisateur'
            },
            comments: String,
            skillsAcquired: [
                {
                    code: String,
                    libelle: String,
                    skills: [
                        {
                            code: String,
                            libelleACOR: String,
                            libellePoleEmploi: String,
                            type: String,
                            level: { type: Number, default: 0 },
                            previousLevel: [{ level: Number, dateUpdated: Date }]
                        }
                    ]
                }
            ],
            knowHowsAcquired: [
                {
                    code: String,
                    libelle: String,
                    knowHows: [
                        {
                            code: String,
                            libelleACOR: String,
                            libellePoleEmploi: String,
                            type: String,
                            level: { type: Number, default: 0 },
                            previousLevel: [{ level: Number, dateUpdated: Date }]
                        }
                    ]
                }
            ],
            jobContextAcquired: [
                {
                    code: String,
                    libelleACOR: String,
                    libellePoleEmploi: String,
                    categories: String,
                    priority: Boolean,
                    level: { type: Number, default: 0 },
                    previousLevel: [{ level: Number, dateUpdated: Date }]
                }
            ],
            difficulties: [
                {
                    staritngDate: Date,
                    endingDate: Date,
                    from: { type: Schema.Types.ObjectId },
                    jobDifficulties: Boolean,
                    personalDifficulties: Boolean,
                    deadline: Date,
                    actions: [
                        {
                            creationDate: Date,
                            title: String,
                            comment: String,
                            accomplished: Boolean,
                            resolutionDate: Date,
                            byWho: { type: Schema.Types.ObjectId }
                        }
                    ]
                }
            ]
        }
    },
    {
        timestamps: true
    }
);

const EmploymentContractSpontaneous = model<IEmploymentContractSpontaneous>('EmploymentContractSpontaneous', employmentContractSpontaneousSchema);
export default EmploymentContractSpontaneous;
