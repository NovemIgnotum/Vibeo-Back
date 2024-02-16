"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const prospectingSchema = new mongoose_1.Schema({
    prospectingDate: Date,
    name: String,
    codeRome: String,
    workName: String,
    usagers: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usager'
    },
    entreprises: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Prospect'
        }
    ],
    createdBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Utilisateur'
        }
    ],
    utilisateurAssigned: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Utilisateur'
        }
    ]
}, {
    timestamps: true
});
const Prospecting = (0, mongoose_1.model)('Prospecting', prospectingSchema);
exports.default = Prospecting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvc3BlY3RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1Byb3NwZWN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXlDO0FBR3pDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxpQkFBTSxDQUNoQztJQUNJLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLElBQUksRUFBRSxNQUFNO0lBQ1osUUFBUSxFQUFFLE1BQU07SUFDaEIsUUFBUSxFQUFFLE1BQU07SUFDaEIsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGlCQUFNLENBQUMsS0FBSyxDQUFDLFFBQVE7UUFDM0IsR0FBRyxFQUFFLFFBQVE7S0FDaEI7SUFDRCxXQUFXLEVBQUU7UUFDVDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxVQUFVO1NBQ2xCO0tBQ0o7SUFDRCxTQUFTLEVBQUU7UUFDUDtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxhQUFhO1NBQ3JCO0tBQ0o7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQjtZQUNJLElBQUksRUFBRSxpQkFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQzNCLEdBQUcsRUFBRSxhQUFhO1NBQ3JCO0tBQ0o7Q0FDSixFQUNEO0lBQ0ksVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FDSixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsSUFBQSxnQkFBSyxFQUFlLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzFFLGtCQUFlLFdBQVcsQ0FBQyJ9