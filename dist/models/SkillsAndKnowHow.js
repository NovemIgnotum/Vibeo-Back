"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const skillsAndKnowHowSchema = new mongoose_1.Schema({
    skillsAcquired: [
        {
            code: String,
            libelle: String,
            skills: []
        }
    ],
    knowHowsAcquired: [
        {
            code: String,
            libelle: String,
            knowHows: []
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
}, {
    timestamps: true
});
const SkillsAndKnowHow = (0, mongoose_1.model)('SkillsAndKnowHow', skillsAndKnowHowSchema);
exports.default = SkillsAndKnowHow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzQW5kS25vd0hvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvU2tpbGxzQW5kS25vd0hvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLHNCQUFzQixHQUFHLElBQUksaUJBQU0sQ0FDckM7SUFDSSxjQUFjLEVBQUU7UUFDWjtZQUVJLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLE1BQU07WUFFZixNQUFNLEVBQUUsRUFXUDtTQUNKO0tBQ0o7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkO1lBRUksSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsTUFBTTtZQUVmLFFBQVEsRUFBRSxFQVVUO1NBQ0o7S0FDSjtJQUNELGtCQUFrQixFQUFFO1FBQ2hCO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNuQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3JELFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDOUM7S0FDSjtDQUNKLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHLElBQUEsZ0JBQUssRUFBb0Isa0JBQWtCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUM5RixrQkFBZSxnQkFBZ0IsQ0FBQyJ9