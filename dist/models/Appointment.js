"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    nature: { type: String, required: true },
    content: String,
    dateEvent: { type: Date, required: true },
    guest: {
        interlocutors: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Interlocutor'
            }
        ],
        partenaires: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Partenaire '
            }
        ],
        utilisateurs: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Utilisateur'
            }
        ],
        usagers: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Usager'
            }
        ]
    },
    startHour: Number,
    endHour: Number,
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' },
    allDay: Boolean,
    recurrence: Boolean,
    frequencyRecurrence: Number,
    dateEndRecurrence: Date
}, {
    timestamps: true
});
const Appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
exports.default = Appointment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwb2ludG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0FwcG9pbnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxpQkFBTSxDQUNoQztJQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN2QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDeEMsT0FBTyxFQUFFLE1BQU07SUFDZixTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDekMsS0FBSyxFQUFFO1FBQ0gsYUFBYSxFQUFFO1lBQ1g7Z0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzNCLEdBQUcsRUFBRSxjQUFjO2FBQ3RCO1NBQ0o7UUFFRCxXQUFXLEVBQUU7WUFDVDtnQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFDM0IsR0FBRyxFQUFFLGFBQWE7YUFDckI7U0FDSjtRQUVELFlBQVksRUFBRTtZQUNWO2dCQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUMzQixHQUFHLEVBQUUsYUFBYTthQUNyQjtTQUNKO1FBRUQsT0FBTyxFQUFFO1lBQ0w7Z0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzNCLEdBQUcsRUFBRSxRQUFRO2FBQ2hCO1NBQ0o7S0FDSjtJQUNELFNBQVMsRUFBRSxNQUFNO0lBQ2pCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFDO0lBQ3JELE1BQU0sRUFBRSxPQUFPO0lBQ2YsVUFBVSxFQUFFLE9BQU87SUFDbkIsbUJBQW1CLEVBQUUsTUFBTTtJQUMzQixpQkFBaUIsRUFBRSxJQUFJO0NBQzFCLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxJQUFBLGdCQUFLLEVBQWUsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDMUUsa0JBQWUsV0FBVyxDQUFDIn0=