"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const partenaireSchema = new mongoose_1.Schema({
    email: { type: String, lowerCase: true },
    account: {
        male: { type: Boolean, required: true },
        name: { type: String, required: true },
        firstname: { type: String, required: true },
        mobileNum: Number,
        landlineNum: Number,
        collectivity: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Collectivity' }
    },
    usagersCreated: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager UsagerOut' }],
    usagersAttribuated: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Usager UsagerOut' }],
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
    expoPushToken: String,
    token: String,
    hash: String,
    salt: String
}, {
    timestamps: true
});
const Partenaire = (0, mongoose_1.model)('Partenaire', partenaireSchema);
exports.default = Partenaire;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGVuYWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUGFydGVuYWlyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLGdCQUFnQixHQUFHLElBQUksaUJBQU0sQ0FDL0I7SUFDSSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7SUFDeEMsT0FBTyxFQUFFO1FBRUwsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ3ZDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtRQUN0QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7UUFDM0MsU0FBUyxFQUFFLE1BQU07UUFDakIsV0FBVyxFQUFFLE1BQU07UUFDbkIsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFO0tBQ3JFO0lBQ0QsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQzFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxDQUFDO0lBQzlFLEtBQUssRUFBRTtRQUNIO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzNCLEdBQUcsRUFBRSxNQUFNO2lCQUNkO2FBQ0o7U0FDSjtLQUNKO0lB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