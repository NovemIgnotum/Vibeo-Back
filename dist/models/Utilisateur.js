"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utilisateurShema = new mongoose_1.Schema({
    email: { type: String, required: true, lowercase: true },
    account: {
        male: { type: Boolean, required: true },
        name: { type: String, required: true },
        firstname: { type: String, required: true },
        mobileNum: { type: Number, required: true }
    },
    usagers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Usager'
        }
    ],
    datas: [
        {
            year: Number,
            mounths: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Data'
                }
            ]
        }
    ],
    appointments: [
        {
            month: { type: String, default: 'Janvier' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Fevrier' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Mars' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Avril' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Mai' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Juin' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Juillet' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Aout' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Septembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Octobre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Novembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        },
        {
            month: { type: String, default: 'Decembre' },
            appointments: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Appointment',
                    _id: false
                }
            ],
            _id: false
        }
    ],
    prospectings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Prospecting'
        }
    ],
    expenses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Expense'
        }
    ],
    admin: { type: Boolean, required: true },
    autorisations: [String],
    etablissement: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Etablissement' },
    expoPushToken: String,
    token: String,
    hash: String,
    salt: String
}, {
    timestamps: true
});
const Utilisateur = (0, mongoose_1.model)('Utilisateur', utilisateurShema);
exports.default = Utilisateur;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlzYXRldXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1V0aWxpc2F0ZXVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxpQkFBTSxDQUMvQjtJQUNJLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0lBQ3hELE9BQU8sRUFBRTtRQUVMLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtRQUN2QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7UUFDdEMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQzNDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtLQUM5QztJQUNELE9BQU8sRUFBRTtRQUNMO1lBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDM0IsR0FBRyxFQUFFLFFBQVE7U0FDaEI7S0FDSjtJQUNELEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxNQUFNO2lCQUNkO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsWUFBWSxFQUFFO1FBQ1Y7WUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7WUFDM0MsWUFBWSxFQUFFO2dCQUNWO29CQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxR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