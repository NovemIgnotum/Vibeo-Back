"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const etablissementSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    adress: { type: String, required: true },
    zip: { type: Number, required: true },
    city: { type: String, required: true },
    location: {
        lng: Number,
        lat: Number
    },
    logo: {
        type: Object
    },
    conventions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Convention'
        }
    ],
    collectivities: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Collectivity'
        }
    ],
    utilisateurs: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Utilisateur'
        }
    ],
    partenaire: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Partenaire'
        }
    ],
    usagers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    entreprises: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Entreprise'
        }
    ],
    Prospectings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Prospecting'
        }
    ],
    rooms: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ],
    conventionArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ConventionArchived'
        }
    ],
    utillisateurArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'UtilisateurArchived'
        }
    ],
    UsagerOuts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    collectivitiesArchived: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'CollectivityArchived'
        }
    ],
    roomArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'RoomArchived'
        }
    ]
}, {
    timestamps: true
});
const Etablissement = (0, mongoose_1.model)('Etablissement', etablissementSchema);
exports.default = Etablissement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXRhYmxpc3NlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRXRhYmxpc3NlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLG1CQUFtQixHQUFHLElBQUksaUJBQU0sQ0FDbEM7SUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3hDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNyQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsUUFBUSxFQUFFO1FBQ04sR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUNELFdBQVcsRUFBRTtRQUNUO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFlBQVk7U0FDcEI7S0FDSjtJQUNELGNBQWMsRUFBRTtRQUNaO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGNBQWM7U0FDdEI7S0FDSjtJQUNELFlBQVksRUFBRTtRQUNWO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGFBQWE7U0FDckI7S0FDSjtJQUNELFVBQVUsRUFBRTtRQUNSO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFlBQVk7U0FDcEI7S0FDSjtJQUNELE9BQU8sRUFBRTtRQUNMO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELFdBQVcsRUFBRTtRQUNUO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFlBQVk7U0FDcEI7S0FDSjtJQUNELFlBQVksRUFBRTtRQUNWO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLGFBQWE7U0FDckI7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLE1BQU07U0FDZDtLQUNKO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsb0JBQW9CO1NBQzVCO0tBQ0o7SUFDRCxxQkFBcUIsRUFBRTtRQUNuQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxxQkFBcUI7U0FDN0I7S0FDSjtJQUNELFVBQVUsRUFBRTtRQUNSO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELHNCQUFzQixFQUFFO1FBQ3BCO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLHNCQUFzQjtTQUM5QjtLQUNKO0lBQ0QsYUFBYSxFQUFFO1FBQ1g7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsY0FBYztTQUN0QjtLQUNKO0NBQ0osRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sYUFBYSxHQUFHLElBQUEsZ0JBQUssRUFBaUIsZUFBZSxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDbEYsa0JBQWUsYUFBYSxDQUFDIn0=