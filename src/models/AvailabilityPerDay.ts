import mongoose, { Schema, model, Types } from 'mongoose';

interface IAvailabilityPerDay {
    monday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
    tuesday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },

        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
    wednesday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },

        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
    thusday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
    friday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
    saturday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
    sunday: [
        {
            time: { type: Number; default: 0 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 1 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 2 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 3 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 4 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 5 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 6 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 7 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 8 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 9 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 10 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 11 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 12 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 13 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 14 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 15 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 16 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 17 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 18 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 19 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 20 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 21 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 22 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        },
        {
            time: { type: Number; default: 23 };
            isAvailable: { type: Boolean; default: true };
            title: '';
        }
    ];
}

const availabilityPerDaySchema = new Schema<IAvailabilityPerDay>(
    {
        monday: [
            {
                time: { type: Number, default: 0, required: true },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },

            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ],
        tuesday: [
            {
                time: { type: Number, default: 0 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },

            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ],
        wednesday: [
            {
                time: { type: Number, default: 0 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },

            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ],
        thusday: [
            {
                time: { type: Number, default: 0 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ],
        friday: [
            {
                time: { type: Number, default: 0 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ],
        saturday: [
            {
                time: { type: Number, default: 0 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ],
        sunday: [
            {
                time: { type: Number, default: 0 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 1 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 2 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 3 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 4 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 5 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 6 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 7 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 8 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 9 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 10 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 11 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 12 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 13 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 14 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 15 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 16 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 17 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 18 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 19 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 20 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 21 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 22 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            },
            {
                time: { type: Number, default: 23 },
                isAvailable: { type: Boolean, default: true },
                title: { type: String, default: '' },
                _id: false
            }
        ]
    },
    {
        timestamps: true
    }
);

const availabilityPerDay = model<IAvailabilityPerDay>('AvailabilityPerDay', availabilityPerDaySchema);
export default availabilityPerDay;
