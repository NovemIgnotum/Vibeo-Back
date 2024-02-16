import { Schema, model } from 'mongoose';
import ISkillsAndKnowHow from '../interfaces/SkillsAndKnowHow';

const skillsAndKnowHowSchema = new Schema<ISkillsAndKnowHow>(
    {
        skillsAcquired: [
            {
                // enjeu
                code: String,
                libelle: String,
                // Compétences
                skills: [
                    // {
                    //le model a été modifié afin de regler un probleme
                    // code: String,
                    // libelleACOR: String,
                    // libellePoleEmploi: String,
                    // type: String,
                    // level: { type: Number, default: 0 },
                    // previousLevel: [{ level: Number, dateUpdated: Date }],
                    // comments: [{ date: Date, comment: String }]
                    // }
                ]
            }
        ],
        knowHowsAcquired: [
            {
                // categorieSavoirs
                code: String,
                libelle: String,
                // savoirs
                knowHows: [
                    // {
                    //     code: String,
                    //     libelleACOR: String,
                    //     libellePoleEmploi: String,
                    //     type: String,
                    //     level: { type: Number, default: 0 },
                    //     previousLevel: [{ level: Number, dateUpdated: Date }],
                    //     comments: [{ date: Date, comment: String }]
                    // }
                ]
            }
        ],
        jobContextAcquired: [
            {
                code: String,
                libelle: String,
                categorie: String,
                level: { type: Number, default: 0 },
                previousLevel: [{ level: Number, dateUpdated: Date }],
                comments: [{ date: Date, comment: String }]
            }
        ]
    },
    {
        timestamps: true
    }
);

const SkillsAndKnowHow = model<ISkillsAndKnowHow>('SkillsAndKnowHow', skillsAndKnowHowSchema);
export default SkillsAndKnowHow;
