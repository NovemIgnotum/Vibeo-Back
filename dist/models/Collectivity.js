"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const collectivitySchema = new mongoose_1.Schema({
    name: String,
    address: String,
    zip: Number,
    city: String,
    location: {
        lng: Number,
        lat: Number
    },
    partenaires: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Partenaire'
        }
    ],
    partenairesArchived: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'PartenaireArchived'
        }
    ]
}, {
    timestamps: true
});
const Collectivity = (0, mongoose_1.model)('Collectivity', collectivitySchema);
exports.default = Collectivity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGl2aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Db2xsZWN0aXZpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFHekMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGlCQUFNLENBQ2pDO0lBQ0ksSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsTUFBTTtJQUNmLEdBQUcsRUFBRSxNQUFNO0lBQ1gsSUFBSSxFQUFFLE1BQU07SUFDWixRQUFRLEVBQUU7UUFDTixHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO0tBQ2Q7SUFDRCxXQUFXLEVBQUU7UUFDVDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCO0tBQ0o7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxvQkFBb0I7U0FDNUI7S0FDSjtDQUNKLEVBQ0Q7SUFDSSxVQUFVLEVBQUUsSUFBSTtDQUNuQixDQUNKLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxJQUFBLGdCQUFLLEVBQWdCLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzlFLGtCQUFlLFlBQVksQ0FBQyJ9