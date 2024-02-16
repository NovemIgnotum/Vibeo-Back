import { NextFunction, Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import AdministrativePosition from '../models/AdministrativePosition';
import Usager from '../models/Usager';
const createAdministrativePosition = async (req: Request, res: Response) => {
    const {
        poleEmploi,
        dateOfRegistrationAtPoleEmploi,
        identificationNumberPoleEmploi,
        rsa,
        dateOfRegistrationAtRsa,
        identificationNumberRsa,
        numberOfSecu,
        isHandicaped,
        isHandicapedEndingDate,
        isHandicapedComment
    } = req.body;
    const usagerId = req.params.usagerId;
    const userFinded = await Usager.findById(usagerId);
    if (userFinded) {
        if (!userFinded.administrativePosition) {
            if (poleEmploi !== '' && rsa !== '' && numberOfSecu !== '') {
                const administrativePosition = new AdministrativePosition({
                    poleEmploi,
                    dateOfRegistrationAtPoleEmploi,
                    identificationNumberPoleEmploi,
                    rsa,
                    dateOfRegistrationAtRsa,
                    identificationNumberRsa,
                    numberOfSecu,
                    isHandicaped,
                    isHandicapedEndingDate,
                    isHandicapedComment
                });
                userFinded.administrativePosition = Object(administrativePosition._id);
                await userFinded.save();
                return administrativePosition
                    .save()
                    .then((administrativePosition) => res.status(201).json({ administrativePosition: administrativePosition }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            } else {
                return res.status(400).json({ message: 'some values missing' });
            }
        } else {
            return res.status(400).json({ message: 'It has been already created' });
        }
    } else {
        return res.status(400).json({ message: 'usager not finded' });
    }
};

const readAdministrativePosition = (req: Request, res: Response) => {
    const usagerId = req.params.usagerId;

    return AdministrativePosition.findById(usagerId)
        .populate('AdministrativePosition')
        .then((administrativePosition) =>
            administrativePosition ? res.status(200).json({ message: administrativePosition }) : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateAdministrativePosition = (req: Request, res: Response) => {
    const administrativePositionId = req.params.administrativePositionId;
    return AdministrativePosition.findById(administrativePositionId).then((administrativePosition) => {
        if (administrativePosition) {
            administrativePosition.set(req.body);
            return administrativePosition
                .save()
                .then((administrativePosition) => res.status(201).json({ administrativePosition: administrativePosition }))
                .catch((error) => res.status(500).json({ error: error.message }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    });
};

const deleteAdministrativePosition = async (req: Request, res: Response) => {
    const administrativePositionId = req.params.administrativePositionId;

    return AdministrativePosition.findByIdAndDelete(administrativePositionId)
        .then((administrativePosition) =>
            administrativePosition
                ? res.status(200).json({ message: 'Administrative position is deleted' })
                : res.status(404).json({ message: 'Not found' })
        )
        .catch((error) => res.status(500).json({ error: error.message }));
};

export default { createAdministrativePosition, readAdministrativePosition, updateAdministrativePosition, deleteAdministrativePosition };
