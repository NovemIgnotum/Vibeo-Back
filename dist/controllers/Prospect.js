"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
const Prospect_1 = __importDefault(require("../models/Prospect"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const axios_1 = __importDefault(require("axios"));
const DataEntreprise_1 = __importDefault(require("../models/DataEntreprise"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const readProspect = (req, res, next) => {
    const prospectId = req.params.prospectId;
    return Prospect_1.default.findById(prospectId)
        .then((prospect) => (prospect ? res.status(200).json({ message: prospect }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateProspect = (req, res, next) => {
    return Prospect_1.default.findById(req.params.prospectId).then((prospect) => __awaiter(void 0, void 0, void 0, function* () {
        if (prospect) {
            const etablissementFinded = yield Etablissement_1.default.findOne({ utilisateurs: req.body.requesterId });
            if (!etablissementFinded) {
                return res.status(400).json('requester was not found');
            }
            else {
                prospect.set(req.body);
                if (prospect.entreprise === null) {
                    const alreadyExist = yield Entreprise_1.default.findById(prospect.entreprise);
                    if (!alreadyExist) {
                        const dateNow = new Date();
                        const newDataEntreprise = new DataEntreprise_1.default({
                            month: dateNow.getMonth() + 1
                        });
                        let location = {};
                        const response = yield axios_1.default.get(`https://api-adresse.data.gouv.fr/search/?q=${prospect.adresse} ${prospect.city} ${prospect.zip}`);
                        if (response) {
                            location = {
                                lng: response.data.features[0].geometry.coordinates[0],
                                lat: response.data.features[0].geometry.coordinates[1]
                            };
                        }
                        const newEntreprise = new Entreprise_1.default({
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
                        yield newDataEntreprise.save();
                        yield newEntreprise.save();
                        yield etablissementFinded.save();
                    }
                }
                return prospect
                    .save()
                    .then((prospect) => res
                    .status(200)
                    .json({ message: prospect.entreprise === null ? 'entreprise created' : 'entreprise updated', prospect: prospect }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
        else {
            res.status(404).json({ message: 'Prospect was not found' });
        }
    }));
};
const deleteProspect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prospectId = req.params.prospectId;
    return Prospect_1.default.findByIdAndDelete(prospectId)
        .then((prospect) => (prospect ? res.status(200).json({ message: 'Prospect is deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
});
exports.default = { readProspect, updateProspect, deleteProspect };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvc3BlY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvUHJvc3BlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMzQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFHN0Isa0VBQTBDO0FBQzFDLHNFQUE4QztBQUM5QyxrREFBMEI7QUFFMUIsOEVBQXNEO0FBQ3RELDRFQUFvRDtBQUVwRCxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3JFLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBRXpDLE9BQU8sa0JBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1NBQy9CLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3SCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxj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