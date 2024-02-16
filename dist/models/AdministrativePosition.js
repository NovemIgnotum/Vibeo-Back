"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const administravePosition = new mongoose_1.Schema({
    poleEmploi: Boolean,
    dateOfRegistrationAtPoleEmploi: { type: Date, default: null },
    identificationNumberPoleEmploi: { type: String, default: '' },
    rsa: { type: Boolean, default: false },
    dateOfRegistrationAtRsa: { type: Date, default: null },
    identificationNumberRsa: { type: String, default: '' },
    numberOfSecu: Number,
    isHandicaped: { type: Boolean, default: false },
    isHandicapedEndingDate: Date,
    isHandicapedComment: { type: String, default: '' }
}, {
    timestamps: true
});
const AdministrativePosition = (0, mongoose_1.model)('AdministrativePosition', administravePosition);
exports.default = AdministrativePosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5pc3RyYXRpdmVQb3NpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQWRtaW5pc3RyYXRpdmVQb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQWV6QyxNQUFNLG9CQUFvQixHQUFHLElBQUksaUJBQU0sQ0FDbkM7SUFDSSxVQUFVLEVBQUUsT0FBTztJQUNuQiw4QkFBOEIsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtJQUM3RCw4QkFBOEIsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtJQUM3RCxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7SUFDdEMsdUJBQXVCLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7SUFDdEQsdUJBQXVCLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7SUFDdEQsWUFBWSxFQUFFLE1BQU07SUFDcEIsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0lBQy9DLHNCQUFzQixFQUFFLElBQUk7SUFDNUIsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7Q0FDckQsRUFDRDtJQUNJLFVBQVUsRUFBRSxJQUFJO0NBQ25CLENBQ0osQ0FBQztBQUVGLE1BQU0sc0JBQXNCLEdBQUcsSUFBQSxnQkFBSyxFQUEwQix3QkFBd0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlHLGtCQUFlLHNCQUFzQixDQUFDIn0=