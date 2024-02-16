"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const prospectSchema = new mongoose_1.Schema({
    siret: String,
    denomination: String,
    enseigne: String,
    adresse: String,
    zip: Number,
    city: String,
    lng: Number,
    lat: Number,
    codeNaf: String,
    entreprise: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Entreprise'
    },
    distance: String,
    natureContact: String,
    usager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usager'
    },
    isDone: { type: Boolean, default: false },
    theyHaveNeed: Boolean,
    comment: String,
    dateOfCompletion: Date
}, {
    timestamps: true
});
const Prospect = (0, mongoose_1.model)('Prospect', prospectSchema);
exports.default = Prospect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvc3BlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1Byb3NwZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQU0sQ0FDN0I7SUFDSSxLQUFLLEVBQUUsTUFBTTtJQUNiLFlBQVksRUFBRSxNQUFNO0lBQ3BCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsR0FBRyxFQUFFLE1BQU07SUFDWCxJQUFJLEVBQUUsTUFBTTtJQUNaLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLE1BQU07SUFDWCxPQUFPLEVBQUUsTUFBTTtJQUNmLFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1FBQzNCLEdBQUcsRUFBRSxZQUFZO0tBQ3BCO0lBQ0QsUUFBUSxFQUFFLE1BQU07SUFDaEIsYUFBYSxFQUFFLE1BQU07SUFDckIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFFBQVE7S0FDaEI7SUFDRCxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDekMsWUFBWSxFQUFFLE9BQU87SUFDckIsT0FBTyxFQUFFLE1BQU07SUFDZixnQkFBZ0IsRUFBRSxJQUFJO0NBQ3pCLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxJQUFBLGdCQUFLLEVBQVksVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzlELGtCQUFlLFFBQVEsQ0FBQyJ9