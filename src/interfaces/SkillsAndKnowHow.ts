import { Document } from 'mongoose';

export default interface ISkillsAndKnowHow extends Document {
    skillsAcquired: [
        {
            // enjeu
            code: String;
            libelle: String;
            // Compétences
            skills: [
                {
                    code: String;
                    libelleACOR: String;
                    libellePoleEmploi: String;
                    type: String;
                    level: { type: Number; default: 0 };
                    previousLevel: [{ level: Number; dateUpdated: Date }];
                    comments: [{ date: Date; comment: String }];
                }
            ];
        }
    ];
    knowHowsAcquired: [
        {
            // categorieSavoirs
            code: String;
            libelle: String;
            // savoirs
            knowHows: [
                {
                    code: String;
                    libelleACOR: String;
                    libellePoleEmploi: String;
                    type: String;
                    level: { type: Number; default: 0 };
                    previousLevel: [{ level: Number; dateUpdated: Date }];
                    comments: [{ date: Date; comment: String }];
                }
            ];
        }
    ];
    jobContextAcquired: [
        {
            code: String;
            libelle: String;
            categorie: String;
            level: { type: Number; default: 0 };
            previousLevel: [{ level: Number; dateUpdated: Date }];
            comments: [{ date: Date; comment: String }];
        }
    ];
}
