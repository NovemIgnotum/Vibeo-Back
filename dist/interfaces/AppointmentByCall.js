"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentByCallSchema = new mongoose_1.Schema({
    years: [
        {
            year: Number,
            months: [
                {
                    month: { type: String, default: 'Janvier' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Fevrier' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Mars' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Avril' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Mai' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Juin' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Juillet' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Aout' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Septembre' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Octobre' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Novembre' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                },
                {
                    month: { type: String, default: 'Decembre' },
                    appointments: [
                        {
                            type: mongoose_1.Types.ObjectId,
                            ref: 'Appointment',
                        }
                    ],
                }
            ],
            _id: false
        }
    ]
});
const AppointmentByCall = (0, mongoose_1.model)('AppointmentByCall', appointmentByCallSchema);
exports.default = AppointmentByCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwb2ludG1lbnRCeUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJmYWNlcy9BcHBvaW50bWVudEJ5Q2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnRDtBQXlIaEQsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGlCQUFNLENBQXFCO0lBQzNELEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUU7Z0JBQ0o7b0JBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO29CQUMzQyxZQUFZLEVBQUU7d0JBQ1Y7NEJBQ0ksSUFBSSxFQUFFLGdCQUFLLENBQUMsUUFBUTs0QkFDcEIsR0FBRyxFQUFFLGFBQWE7eUJBQ3JCO3FCQUNKO2lCQUNKO2dCQUNEO29CQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtvQkFDM0MsWUFBWSxFQUFFO3dCQUNWOzRCQUNJLElBQUksRUFBRSxnQkFBSyxDQUFDLFFBQVE7NEJBQ3BCLEdBQUcsRUFBRSxhQUFhO3lCQUNyQjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7b0JBQ3hDLFlBQVksRUFBRTt3QkFDVjs0QkFDSSxJQUFJLEVBQUUsZ0JBQUssQ0FBQyxRQUFROzRCQUNwQixHQUFHLEVBQUUsYUFBYTt5QkFDckI7cUJBQ0o7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO29CQUN6QyxZQUFZLEVBQUU7d0JBQ1Y7NEJBQ0ksSUFBSSxFQUFFLGdCQUFLLENBQUMsUUFBUTs0QkFDcEIsR0FBRyxFQUFFLGFBQWE7eUJBQ3JCO3FCQUNKO2lCQUNKO2dCQUNEO29CQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRTtvQkFDdkMsWUFBWSxFQUFFO3dCQUNWOzRCQUNJLElBQUksRUFBRSxnQkFBSyxDQUFDLFFBQVE7NEJBQ3BCLEdBQUcsRUFBRSxhQUFhO3lCQUNyQjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7b0JBQ3hDLFlBQVksRUFBRTt3QkFDVjs0QkFDSSxJQUFJLEVBQUUsZ0JBQUssQ0FBQyxRQUFROzRCQUNwQixHQUFHLEVBQUUsYUFBYTt5QkFDckI7cUJBQ0o7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO29CQUMzQyxZQUFZLEVBQUU7d0JBQ1Y7NEJBQ0ksSUFBSSxFQUFFLGdCQUFLLENBQUMsUUFBUTs0QkFDcEIsR0FBRyxFQUFFLGFBQWE7eUJBQ3JCO3FCQUNKO2lCQUNKO2dCQUNEO29CQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtvQkFDeEMsWUFBWSxFQUFFO3dCQUNWOzRCQUNJLElBQUksRUFBRSxnQkFBSyxDQUFDLFFBQVE7NEJBQ3BCLEdBQUcsRUFBRSxhQUFhO3lCQUNyQjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUU7b0JBQzdDLFlBQVksRUFBRTt3QkFDVjs0QkFDSSxJQUFJLEVBQUUsZ0JBQUssQ0FBQyxRQUFROzRCQUNwQixHQUFHLEVBQUUsYUFBYTt5QkFDckI7cUJBQ0o7aUJBQ0o7Z0JBQ0Q7b0JBQ0ksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO29CQUMzQyxZQUFZLEVBQUU7d0JBQ1Y7NEJBQ0ksSUFBSSxFQUFFLGdCQUFLLENBQUMsUUFBUTs0QkFDcEIsR0FBRyxFQUFFLGFBQWE7eUJBQ3JCO3FCQUNKO2lCQUNKO2dCQUNEO29CQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRTtvQkFDNUMsWUFBWSxFQUFFO3dCQUNWOzRCQUNJLElBQUksRUFBRSxnQkFBSyxDQUFDLFFBQVE7NEJBQ3BCLEdBQUcsRUFBRSxhQUFhO3lCQUNyQjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUU7b0JBQzVDLFlBQVksRUFBRTt3QkFDVjs0QkFDSSxJQUFJLEVBQUUsZ0JBQUssQ0FBQyxRQUFROzRCQUNwQixHQUFHLEVBQUUsYUFBYTt5QkFDckI7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELEdBQUcsRUFBRSxLQUFLO1NBQ2I7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUVILE1BQU0saUJBQWlCLEdBQUcsSUFBQSxnQkFBSyxFQUFxQixtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0FBQ2xHLGtCQUFlLGlCQUFpQixDQUFDIn0=