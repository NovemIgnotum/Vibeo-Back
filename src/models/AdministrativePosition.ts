import { Schema, model } from 'mongoose';

interface IAdministrativePosition {
    poleEmploi: Boolean;
    dateOfRegistrationAtPoleEmploi: Date;
    identificationNumberPoleEmploi: String;
    rsa: Boolean;
    dateOfRegistrationAtRsa: Date;
    identificationNumberRsa: String;
    numberOfSecu: Number;
    isHandicaped: Boolean;
    isHandicapedEndingDate: Date;
    isHandicapedComment: String;
}

const administravePosition = new Schema<IAdministrativePosition>(
    {
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
    },
    {
        timestamps: true
    }
);

const AdministrativePosition = model<IAdministrativePosition>('AdministrativePosition', administravePosition);
export default AdministrativePosition;
