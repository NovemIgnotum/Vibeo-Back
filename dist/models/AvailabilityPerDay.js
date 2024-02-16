"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const availabilityPerDaySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
const availabilityPerDay = (0, mongoose_1.model)('AvailabilityPerDay', availabilityPerDaySchema);
exports.default = availabilityPerDay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhaWxhYmlsaXR5UGVyRGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9BdmFpbGFiaWxpdHlQZXJEYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMEQ7QUE2MUIxRCxNQUFNLHdCQUF3QixHQUFHLElBQUksaUJBQU0sQ0FDdkM7SUFDSSxNQUFNLEVBQUU7UUFDSjtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1lBQ2xELFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUVEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0lBQ0QsT0FBTyxFQUFFO1FBQ0w7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBRUQ7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxTQUFTLEVBQUU7UUFDUDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFFRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7S0FDSjtJQUNELE9BQU8sRUFBRTtRQUNMO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0o7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbEMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDbkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFO1lBQzdDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxHQUFHLEVBQUUsS0FBSztTQUNiO0tBQ0o7SUFDRCxRQUFRLEVBQUU7UUFDTjtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7UUFDRDtZQUNJLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUNuQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7WUFDN0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEdBQUcsRUFBRSxLQUFLO1NBQ2I7S0FDSjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtRQUNEO1lBQ0ksSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ25DLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtZQUM3QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDcEMsR0FBRyxFQUFFLEtBQUs7U0FDYjtLQUNKO0NBQ0osRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxnQkFBSyxFQUFzQixvQkFBb0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RHLGtCQUFlLGtCQUFrQixDQUFDIn0=