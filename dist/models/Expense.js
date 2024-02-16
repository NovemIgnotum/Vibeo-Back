"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExpenseSchema = new mongoose_1.Schema({
    date: Number,
    pattern: String,
    price: Number,
    picture: Object
}, {
    timestamps: true
});
const Expense = (0, mongoose_1.model)('Expense', ExpenseSchema);
exports.default = Expense;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwZW5zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRXhwZW5zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFNLENBQzVCO0lBQ0ksSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsTUFBTTtJQUNmLEtBQUssRUFBRSxNQUFNO0lBQ2IsT0FBTyxFQUFFLE1BQU07Q0FDbEIsRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFHLElBQUEsZ0JBQUssRUFBVyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDMUQsa0JBQWUsT0FBTyxDQUFDIn0=