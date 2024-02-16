import { NextFunction, Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import Prospect from '../models/Prospect';
import Entreprise from '../models/Entreprise';
import axios from 'axios';
import Contact from '../models/Contact';
import DataEntreprise from '../models/DataEntreprise';
import Etablissement from '../models/Etablissement';

const readProspect = (req: Request, res: Response, next: NextFunction) => {
    const prospectId = req.params.prospectId;

    return Prospect.findById(prospectId)
        .then((prospect) => (prospect ? res.status(200).json({ message: prospect }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateProspect = (req: Request, res: Response, next: NextFunction) => {
    return Prospect.findById(req.params.prospectId).then(async (prospect) => {
        if (prospect) {
            const etablissementFinded = await Etablissement.findOne({ utilisateurs: req.body.requesterId });
            if (!etablissementFinded) {
                return res.status(400).json('requester was not found');
            } else {
                prospect.set(req.body);
                if (prospect.entreprise === null) {
                    const alreadyExist = await Entreprise.findById(prospect.entreprise);
                    if (!alreadyExist) {
                        const dateNow = new Date();
                        const newDataEntreprise = new DataEntreprise({
                            month: dateNow.getMonth() + 1
                        });
                        let location = {};
                        const response = await axios.get(
                            `https://api-adresse.data.gouv.fr/search/?q=${prospect.adresse} ${prospect.city} ${prospect.zip}`
                        );
                        if (response) {
                            location = {
                                lng: response.data.features[0].geometry.coordinates[0],
                                lat: response.data.features[0].geometry.coordinates[1]
                            };
                        }
                        const newEntreprise = new Entreprise({
                            currentName: prospect.denomination,
                            siret: prospect.siret,
                            adressLabel: `${prospect.adresse} ${prospect.zip} ${prospect.city}`,
                            adress: prospect.adresse,
                            zip: prospect.zip,
                            location,
                            city: prospect.city,
                            datas: { year: dateNow.getFullYear() },
                            codeNAF: prospect.codeNaf
                        });
                        newEntreprise.prospecting.push(Object(prospect)._id);
                        newEntreprise.datas[0].mounths.push(newDataEntreprise._id);
                        etablissementFinded.entreprises.push(newEntreprise._id);
                        await newDataEntreprise.save();
                        await newEntreprise.save();
                        await etablissementFinded.save();
                    }
                }
                return prospect
                    .save()
                    .then((prospect) =>
                        res
                            .status(200)
                            .json({ message: prospect.entreprise === null ? 'entreprise created' : 'entreprise updated', prospect: prospect })
                    )
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        } else {
            res.status(404).json({ message: 'Prospect was not found' });
        }
    });
};

const deleteProspect = async (req: Request, res: Response, next: NextFunction) => {
    const prospectId = req.params.prospectId;

    return Prospect.findByIdAndDelete(prospectId)
        .then((prospect) => (prospect ? res.status(200).json({ message: 'Prospect is deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};

export default { readProspect, updateProspect, deleteProspect };
