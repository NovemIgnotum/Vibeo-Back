"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contact = new mongoose_1.Schema({
    dateContact: { type: Date, required: true },
    typeContact: { type: String, required: true },
    natureContact: { type: String, required: true },
    contenuContact: { type: String, required: true },
    utilisateur: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Utilisateur'
        }
    ],
    usager: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    interlocutor: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Interlocutor'
        }
    ],
    partenaire: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Partenaire'
        }
    ]
}, {
    timestamps: true
});
const Contact = (0, mongoose_1.model)('Contact', contact);
exports.default = Contact;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ29udGFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFNLENBQ3RCO0lBQ0ksV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBRTNDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUU3QyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFFL0MsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ2hELFdBQVcsRUFBRTtRQUNUO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGFBQWE7U0FDckI7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELFlBQVksRUFBRTtRQUNWO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGNBQWM7U0FDdEI7S0FDSjtJQUNELFVBQVUsRUFBRTtRQUNSO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFlBQVk7U0FDcEI7S0FDSjtDQUNKLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxJQUFBLGdCQUFLLEVBQVcsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELGtCQUFlLE9BQU8sQ0FBQyJ9