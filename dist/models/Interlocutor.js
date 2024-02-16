"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interlocutorSchema = new mongoose_1.Schema({
    email: { type: String, lowerCase: true },
    account: {
        male: { type: Boolean, required: true },
        name: { type: String, required: true },
        firstname: { type: String, required: true },
        positionHeld: String,
        mobileNum: Number,
        landlineNum: Number,
        workSpot: String
    },
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
    entreprises: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Entreprise'
        }
    ],
    contacts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Contact'
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
    autorisations: [String],
    isActivated: { type: Boolean, default: false },
    token: String,
    salt: String,
    hash: String
}, {
    timestamps: true
});
const Interlocutor = (0, mongoose_1.model)('Interlocutor', interlocutorSchema);
exports.default = Interlocutor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJsb2N1dG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9JbnRlcmxvY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0Q7QUFHaEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLGlCQUFNLENBQ2pDO0lBRUksS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0lBQ3hDLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtRQUN2QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7UUFDdEMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQzNDLFlBQVksRUFBRSxNQUFNO1FBQ3BCLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLFdBQVcsRUFBRSxNQUFNO1FBQ25CLFFBQVEsRUFBRSxNQUFNO0tBQ25CO0lBQ0QsS0FBSyxFQUFFO1FBQ0g7WUFDSSxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRTtnQkFDTDtvQkFDSSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFDM0IsR0FBRyxFQUFFLE1BQU07aUJBQ2Q7YUFDSjtTQUNKO0tBQ0o7SUFFRCxXQUFXLEVBQUU7UUFDVDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxZQUFZO1NBQ3BCO0tBQ0o7SUFDRCxRQUFRLEVBQUU7UUFDTjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxTQUFTO1NBQ2pCO0tBQ0o7SUFDRCxZQUFZLEVBQUU7UUFDVjtZQUNJLEtBQUssRUFBRSxFQUFFLElB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