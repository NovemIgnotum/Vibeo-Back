"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    name: String,
    months: [
        {
            month: { type: String, default: 'Janvier' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                },
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Fevrier' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Mars' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Avril' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Mai' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Juin' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Juillet' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Aout' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Septembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Octobre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Novembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        },
        {
            month: { type: String, default: 'Decembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                }
            ],
            _id: false,
        }
    ],
});
const Room = (0, mongoose_1.model)('Room', roomSchema);
exports.default = Room;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUm9vbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQVE7SUFDakMsSUFBSSxFQUFFLE1BQU07SUFDWixNQUFNLEVBQUU7UUFDSTtZQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtZQUMzQyxZQUFZLEVBQUU7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxhQUFhO2lCQUNyQjthQUVKO1lBQ0QsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO1lBQzNDLFlBQVksRUFBRTtnQkFDVjtvQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLGFBQWE7aUJBQ3JCO2FBQ0o7WUFDRCxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFDeEMsWUFBWSxFQUFFO2dCQUNWO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUMzQixHQUFHLEVBQUUsYUFBYTtpQkFDckI7YUFDSjtZQUNELEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtZQUN6QyxZQUFZLEVBQUU7Z0JBQ1Y7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcs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