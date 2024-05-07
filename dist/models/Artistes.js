"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const artisteSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    genre: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Genre', required: true },
    albums: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Album' }]
});
const Artiste = (0, mongoose_1.model)('Artiste', artisteSchema);
exports.default = Artiste;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJ0aXN0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0FydGlzdGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQU0sQ0FBVTtJQUN0QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzNDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNyQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNwRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDO0NBQzFELENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUEsZ0JBQUssRUFBVSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekQsa0JBQWUsT0FBTyxDQUFDIn0=