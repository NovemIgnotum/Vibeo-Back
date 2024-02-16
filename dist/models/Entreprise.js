"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const entreprise = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Prospect'
        }
    ],
    interlocutors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Interlocutor'
        }
    ],
    interlocutorsArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Interlocutor'
        }
    ],
    workStations: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'WorkStation'
        }
    ],
    missions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Mission'
        }
    ],
    events: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    datas: [
        {
            year: Number,
            mounths: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'DataEntreprise'
                }
            ]
        }
    ],
    employmentContracts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'EmploymentContract'
        }
    ],
    workStationsArchiveds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'WorkStationArchived'
        }
    ],
    missionsArchived: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'MissionArchived'
        }
    ],
    eventsManagements: [{ entretienDecouverte: Boolean }, { evenements: Boolean }, { iris: Boolean }, { j_ai_une_offre: Boolean }]
}, {
    timestamps: true
});
const Entreprise = (0, mongoose_1.model)('Entreprise', entreprise);
exports.default = Entreprise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50cmVwcmlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRW50cmVwcmlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQ3pCO0lBQ0ksT0FBTyxFQUFFLE1BQU07SUFDZixXQUFXLEVBQUUsTUFBTTtJQUNuQixLQUFLLEVBQUUsTUFBTTtJQUNiLElBQUksRUFBRSxNQUFNO0lBQ1osV0FBVyxFQUFFLE1BQU07SUFDbkIsTUFBTSxFQUFFLE1BQU07SUFDZCxHQUFHLEVBQUUsTUFBTTtJQUNYLElBQUksRUFBRSxNQUFNO0lBQ1osUUFBUSxFQUFFO1FBQ04sR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtLQUNkO0lBQ0QsZ0JBQWdCLEVBQUUsTUFBTTtJQUN4QixPQUFPLEVBQUUsTUFBTTtJQUNmLFlBQVksRUFBRSxNQUFNO0lBQ3BCLHNCQUFzQixFQUFFLE9BQU87SUFDL0IsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixnQkFBZ0IsRUFBRSxNQUFNO0lBQ3hCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUsTUFBTTtJQUNoQixXQUFXLEVBQUU7UUFDVDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxVQUFVO1NBQ2xCO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxjQUFjO1NBQ3RCO0tBQ0o7SUFDRCxzQkFBc0IsRUFBRTtRQUNwQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxjQUFjO1NBQ3RCO0tBQ0o7SUFDRCxZQUFZLEVBQUU7UUFDVjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxhQUFhO1NBQ3JCO0tBQ0o7SUFDRCxRQUFRLEVBQUU7UUFDTjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxTQUFTO1NBQ2pCO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxPQUFPO1NBQ2Y7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxnQkFBZ0I7aUJBQ3hCO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakI7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsb0JBQW9CO1NBQzVCO0tBQ0o7SUFDRCxxQkFBcUIsRUFBRTtRQUNuQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxxQkFBcUI7U0FDN0I7S0FDSjtJQUNELGdCQUFnQixFQUFFO1FBQ2Q7WUFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixHQUFHLEVBQUUsaUJBQWlCO1NBQ3pCO0tBQ0o7SUFDRCxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUM7Q0FDakksRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUNGLE1BQU0sVUFBVSxHQUFHLElBQUEsZ0JBQUssRUFBYyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEUsa0JBQWUsVUFBVSxDQUFDIn0=