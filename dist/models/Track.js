"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const trackSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    band: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Band', require: true }
});
const Track = (0, mongoose_1.model)('Track', trackSchema);
exports.default = Track;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1RyYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FBUTtJQUNsQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdkMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO0NBQ3BFLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLElBQUEsZ0JBQUssRUFBUSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDakQsa0JBQWUsS0FBSyxDQUFDIn0=