"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const genreSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});
const Genre = (0, mongoose_1.model)('Genre', genreSchema);
exports.default = Genre;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VucmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0dlbnJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sV0FBVyxHQUFHLElBQUksaUJBQU0sQ0FBUTtJQUNsQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0NBQ2hELENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLElBQUEsZ0JBQUssRUFBUSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDakQsa0JBQWUsS0FBSyxDQUFDIn0=