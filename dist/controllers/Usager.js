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
const Usager_1 = __importDefault(require("../models/Usager"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Data_1 = __importDefault(require("../models/Data"));
const Convention_1 = __importDefault(require("../models/Convention"));
const UsagerData_1 = require("../functions/UsagerData");
const config_1 = __importDefault(require("../config/config"));
const Response_1 = __importDefault(require("../library/Response"));
const SkillsAndKnowHow_1 = __importDefault(require("../models/SkillsAndKnowHow"));
const axios_1 = __importDefault(require("axios"));
const AvailabilityPerDay_1 = __importDefault(require("../models/AvailabilityPerDay"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const createUsager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requesterId = req.body.requesterId;
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const partenaireFinded = yield Partenaire_1.default.findById(requesterId);
        if (!utilisateurFinded && !partenaireFinded) {
            Response_1.default.error('the utilisateur or the partenaire has been not found');
            return res.status(400).json({ message: 'the utilisateur or the partenaire has been not found' });
        }
        else {
            const { email, male, name, firstname, dateOfBirth, adress, city, zip, location, mobileNum, ownEntreprise, password, passwordConfirmed, utilisateurId, partenaireId, prescription, conventionId } = req.body;
            const conventionFinded = yield Convention_1.default.findById(conventionId);
            const etablissementFinded = yield Etablissement_1.default.findOne({ conventions: Object(conventionFinded)._id });
            const dateNow = new Date();
            const newData = new Data_1.default({
                month: dateNow.getMonth() + 1
            });
            const token = uid2(26);
            const salt = uid2(26);
            const hash = SHA256(password + salt).toString(encBase64);
            const newSkillsAndKnowsHow = new SkillsAndKnowHow_1.default();
            const availabilityPerDay = new AvailabilityPerDay_1.default({
                monday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                tuesday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                wednesday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                thusday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                friday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                saturday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                sunday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ]
            });
            const usager = new Usager_1.default({
                email,
                account: {
                    male,
                    name: name.toLowerCase(),
                    firstname: firstname.toLowerCase(),
                    dateOfBirth,
                    mobileNum,
                    adress,
                    city,
                    zip,
                    location
                },
                prescription: {
                    motif: prescription
                },
                ownEntreprise,
                availabilityPerDay,
                appointments: [
                    {
                        month: 'Janvier',
                        appointments: []
                    },
                    {
                        month: 'Fevrier',
                        appointments: []
                    },
                    {
                        month: 'Mars',
                        appointments: []
                    },
                    {
                        month: 'Avril',
                        appointments: []
                    },
                    {
                        month: 'Mai',
                        appointments: []
                    },
                    {
                        month: 'Juin',
                        appointments: []
                    },
                    {
                        month: 'Juillet',
                        appointments: []
                    },
                    {
                        month: 'Aout',
                        appointments: []
                    },
                    {
                        month: 'Septembre',
                        appointments: []
                    },
                    {
                        month: 'octobre',
                        appointments: []
                    },
                    {
                        month: 'Novembre',
                        appointments: []
                    },
                    {
                        month: 'Decembre',
                        appointments: []
                    }
                ],
                datas: { year: dateNow.getFullYear() },
                token,
                salt,
                hash
            });
            if (!conventionFinded) {
                Response_1.default.warn('the convention has been not found ');
                return res.status(400).json({ message: 'the convention has been not found !' });
            }
            else {
                if (name && firstname) {
                    if (password && password === passwordConfirmed) {
                        const alreadyExist = yield Usager_1.default.findOne({
                            'account.name': name.toLowerCase(),
                            'account.firstname': firstname.toLowerCase()
                        });
                        if (!alreadyExist) {
                            usager.datas[0].mounths.push(newData._id);
                            Object(usager).postAndSkillsAcquired.push(Object(newSkillsAndKnowsHow));
                            Object(usager).conventionId = conventionFinded._id;
                            partenaireFinded && (Object(usager).partenaireAffiliated = Object(partenaireFinded));
                            if (utilisateurId) {
                                const utilisateur = yield Utilisateur_1.default.findById(utilisateurId);
                                Object(utilisateur).usagers.push(Object(usager));
                                Object(usager).utilisateurAffiliated = Object(utilisateur);
                                conventionFinded.orientations.push(Object(usager));
                                yield Object(utilisateur).save();
                            }
                            else {
                                conventionFinded.prescriptions.push(Object(usager));
                            }
                            if (partenaireId) {
                                const partenaire = yield Partenaire_1.default.findById(partenaireId);
                                if (!partenaire) {
                                    Response_1.default.warn("partenaire was not found with 'partenaireId'");
                                    return res.status(400).json("partenaire was not found with 'partenaireId'");
                                }
                                else {
                                    Object(usager).partenaireAffiliated = Object(partenaire);
                                    Object(partenaire).usagersAttribuated.push(Object(usager));
                                    yield (partenaire === null || partenaire === void 0 ? void 0 : partenaire.save());
                                }
                            }
                            Object(etablissementFinded).usagers.push(Object(usager)._id);
                            yield newSkillsAndKnowsHow.save();
                            yield usager.save();
                            yield newData.save();
                            yield availabilityPerDay.save();
                            yield conventionFinded.save();
                            yield Object(etablissementFinded).save();
                            utilisateurFinded && (0, UsagerData_1.createUsagerForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(usager));
                            partenaireFinded && (0, UsagerData_1.createUsagerForExtracting)(Object(partenaireFinded).datas[0].mounths[0], Object(usager));
                            Response_1.default.info('An usager has been created');
                            return res.status(201).json({ message: 'It has been created', usager: usager });
                        }
                        else {
                            Response_1.default.error('usager already exist');
                            return res.status(403).json({ message: 'usager already exist', usager: usager });
                        }
                    }
                    else {
                        Response_1.default.warn('the passwords are not similar ');
                        return res.status(400).json({ message: 'the passwords are not similar !' });
                    }
                }
                else {
                    Response_1.default.warn('all values not found');
                    return res.status(400).json({ message: 'all values not found' });
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error catched');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const readUsager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const usagerId = req.params.usagerId;
        const usagerFinded = yield Usager_1.default.findById(usagerId).populate('contacts administrativePosition availabilityPerDay');
        if (usagerFinded && utilisateurFinded) {
            (0, UsagerData_1.readUsagerForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded));
            return res.status(200).json({ usager: usagerFinded });
        }
        else {
            return res.status(404).json({ message: 'Usager or Utilisateur was not found' });
        }
    }
    catch (error) {
        Response_1.default.error('Error catched');
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const conventionFinded = yield Convention_1.default.findById(req.params.conventionId).populate('prescriptions orientations entrees usagersOuted');
    if (conventionFinded) {
        return res.status(200).json({
            convention: conventionFinded.name,
            prescriptions: conventionFinded.prescriptions,
            orientations: conventionFinded.orientations,
            entrees: conventionFinded.entrees,
            usagersOuted: conventionFinded.usagersOuted
        });
    }
    else {
        return res.status(400).json({ error: 'Convention was not found' });
    }
});
const readAllByEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
    const etablissementFinded = yield Etablissement_1.default.findOne({ utilisateurs: Object(utilisateurFinded)._id })
        .populate('usagers UsagerOuts partenaire utilisateurs')
        .select('usagers UsagerOuts');
    console.log('etablissementFinded', etablissementFinded);
    if (etablissementFinded && utilisateurFinded) {
        Response_1.default.info(`${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} consults ${etablissementFinded.name} in its directory`);
        return res.status(200).json(etablissementFinded);
    }
    else {
        Response_1.default.error('Etablissement or the requester was not found');
        return res.status(400).json({ error: 'Etablissement or the requester was not found' });
    }
});
const updateUsager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerId = req.params.usagerId;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        if (!utilisateurFinded) {
            Response_1.default.error('The utilisateur has been not found');
            return res.status(404).json({ error: 'The utilisateur has been not found' });
        }
        else {
            const conventionFindedByPrescriptions = yield Convention_1.default.findOne({ prescriptions: usagerId });
            const conventionFindedByOrientations = yield Convention_1.default.findOne({ orientations: usagerId });
            const conventionFindedByEntrees = yield Convention_1.default.findOne({ entrees: usagerId });
            if (!conventionFindedByPrescriptions && !conventionFindedByOrientations && !conventionFindedByEntrees) {
                return Usager_1.default.findById(usagerId)
                    .populate('availabilityPerDay')
                    .then((usager) => __awaiter(void 0, void 0, void 0, function* () {
                    if (usager) {
                        usager.set(req.body);
                        let availabilityPerDayFinded = yield AvailabilityPerDay_1.default.findById(Object(usager).availabilityPerDay);
                        availabilityPerDayFinded = Object(usager).availabilityPerDay;
                        yield Object(availabilityPerDayFinded).save();
                        yield usager.save();
                        (0, UsagerData_1.updateUsagerForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                        Response_1.default.info('Usager already accueilled, and updated');
                        return res.status(200).json('Usager already accueilled, and updated ');
                    }
                }));
            }
            else {
                return Usager_1.default.findById(usagerId)
                    .populate('availabilityPerDay')
                    .then((usager) => __awaiter(void 0, void 0, void 0, function* () {
                    if (usager) {
                        let availabilityPerDayFinded = yield AvailabilityPerDay_1.default.findById(Object(usager).availabilityPerDay);
                        if (conventionFindedByPrescriptions && req.body.utilisateurAffiliatedId) {
                            const utilisatueurAffiliated = yield Utilisateur_1.default.findById(req.body.utilisateurAffiliatedId);
                            usager.utilisateurAffiliated = Object(utilisateurFinded);
                            utilisatueurAffiliated === null || utilisatueurAffiliated === void 0 ? void 0 : utilisatueurAffiliated.usagers.push(Object(usager));
                            Object(conventionFindedByPrescriptions).orientations.push(Object(usager));
                            const newArray = Object(conventionFindedByPrescriptions).prescriptions.filter((element) => JSON.stringify(Object(element)._id) !== JSON.stringify(Object(usager)._id));
                            Object(conventionFindedByPrescriptions).prescriptions = newArray;
                            yield (conventionFindedByPrescriptions === null || conventionFindedByPrescriptions === void 0 ? void 0 : conventionFindedByPrescriptions.save());
                            yield (utilisatueurAffiliated === null || utilisatueurAffiliated === void 0 ? void 0 : utilisatueurAffiliated.save());
                            (0, UsagerData_1.updateUsagerForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                            yield usager.save();
                            return res.status(200).json('Orientation saved');
                        }
                        else if (conventionFindedByOrientations && req.body.dateOfAccueil) {
                            Object(conventionFindedByOrientations).entrees.push(Object(usager));
                            const newArray = Object(conventionFindedByOrientations).orientations.filter((element) => JSON.stringify(Object(element)._id) !== JSON.stringify(Object(usager)._id));
                            Object(conventionFindedByOrientations).orientations = newArray;
                            yield Object(conventionFindedByOrientations).save();
                            (0, UsagerData_1.updateUsagerForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                            return res.status(200).json('Usager was accueilled');
                        }
                        else {
                            usager.set(req.body);
                            availabilityPerDayFinded = Object(usager).availabilityPerDay;
                            yield Object(availabilityPerDayFinded).save();
                            yield usager.save();
                            (0, UsagerData_1.updateUsagerForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                            return res.status(200).json({ message: "Usager's body updated", usager });
                        }
                    }
                    else {
                        res.status(404).json({ message: 'Usager wot found' });
                    }
                }));
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error catched');
        return res.status(403).json({ message: 'Error catched', error });
    }
});
const deleteUsager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const conventionFinded = yield Convention_1.default.findById(req.body.conventionId);
        const etablissementFinded = yield Etablissement_1.default.findOne({ conventions: Object(conventionFinded)._id });
        if (!utilisateurFinded || !usagerFinded || !conventionFinded) {
            return res.status(404).json({ message: 'Usager, Utilisateur or the Convention has been not found' });
        }
        else {
            if (req.body.isAnArchive === false) {
                const newOrientationsArray = conventionFinded.orientations.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(conventionFinded).orientations = newOrientationsArray;
                const newEntreesArray = conventionFinded.entrees.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(conventionFinded).entrees = newEntreesArray;
                const newEtablissementArray = etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.usagers.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(etablissementFinded).usagers = newEtablissementArray;
                Object(etablissementFinded).UsagerOuts.push(usagerFinded._id);
                Object(conventionFinded).usagersOuted.push(Object(usagerFinded));
                (0, UsagerData_1.UsagerOutedForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded._id));
                yield Object(etablissementFinded).save();
                yield conventionFinded.save();
                Response_1.default.log('Usager was pushed in the array of the outed');
                return res.status(200).json('Usager was pushed in the array of the outed');
            }
            else if (req.body.isAnArchive === true) {
                const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/usager/create/${conventionFinded._id}`, {
                    _id: usagerFinded && usagerFinded._id,
                    email: usagerFinded && usagerFinded.email,
                    male: usagerFinded && usagerFinded.account.male,
                    name: usagerFinded && usagerFinded.account.name,
                    firstname: usagerFinded && usagerFinded.account.firstname,
                    dateOfBirth: usagerFinded && usagerFinded.account.dateOfBirth,
                    adress: usagerFinded && usagerFinded.account.adress,
                    city: usagerFinded && usagerFinded.account.city,
                    zip: usagerFinded && usagerFinded.account.zip,
                    district: usagerFinded && usagerFinded.account.district,
                    location: {
                        latitude: usagerFinded && usagerFinded.account.location.lat,
                        longitude: usagerFinded && usagerFinded.account.location.lng
                    },
                    adressComment: usagerFinded && usagerFinded.account.adressComment,
                    landlineNumber: usagerFinded && usagerFinded.account.landlineNumber,
                    mobileNum: usagerFinded && usagerFinded.account.mobileNum,
                    phoneOrEmailComment: usagerFinded && usagerFinded.account.phoneOrEmailComment,
                    dateOfAccueil: usagerFinded && usagerFinded.dateOfAccueil,
                    familySituation: usagerFinded && usagerFinded.familySituation,
                    expoPushToken: usagerFinded && usagerFinded.expoPushToken,
                    childrenSituation: usagerFinded && usagerFinded.childrenSituation,
                    careChild: usagerFinded && usagerFinded.careChild,
                    numberOfChildren: usagerFinded && usagerFinded.numberOfChildren,
                    familySituationComment: usagerFinded && usagerFinded.familySituationComment,
                    lastContact: usagerFinded && usagerFinded.lastContact,
                    availabilityPerDay: usagerFinded && usagerFinded.availabilityPerDay,
                    post: usagerFinded && usagerFinded.postWanted,
                    contacts: usagerFinded && usagerFinded.contacts,
                    token: usagerFinded && usagerFinded.token,
                    hash: usagerFinded && usagerFinded.hash,
                    salt: usagerFinded && usagerFinded.salt
                });
                const newEntreesArray = conventionFinded.entrees.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(conventionFinded).entrees = newEntreesArray;
                const newOutedArray = conventionFinded.usagersOuted.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(conventionFinded).usagersOuted = newOutedArray;
                const newEtablissementArray = etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.UsagerOuts.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(etablissementFinded).UsagerOuts = newEtablissementArray;
                yield Object(etablissementFinded).save();
                if (archive.data.message === `The usager ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been created`) {
                    Response_1.default.info(`The usager ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been created`);
                    Object(conventionFinded).save();
                    (0, UsagerData_1.deleteUsagerForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded._id));
                    return Usager_1.default.findByIdAndDelete(usagerFinded._id).then(() => res.status(200).json(`The usager ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been created`));
                }
                else if (`The usagerArchived ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been updated`) {
                    Response_1.default.info(`The usagerArchived ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been updated`);
                    Object(conventionFinded).save();
                    (0, UsagerData_1.deleteUsagerForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded._id));
                    return Usager_1.default.findByIdAndDelete(usagerFinded._id).then(() => res.status(200).json(`The usagerArchived ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been updated`));
                }
                else {
                    Response_1.default.info('Something went wrong');
                    return res.status(200).json('Something went wrong');
                }
            }
            else {
                Response_1.default.warn('isAnArchive was not found');
                return res.status(400).json('isAnArchive was not found');
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error catched');
        return res.status(403).json({ message: 'Error catched', error });
    }
});
exports.default = { createUsager, readUsager, readAll, readAllByEtablissement, updateUsager, deleteUsager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNhZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL1VzYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUc3Qiw4REFBc0M7QUFDdEMsd0VBQWdEO0FBQ2hELHNFQUE4QztBQUM5QywwREFBa0M7QUFDbEMsc0VBQThDO0FBRTlDLHdEQU1pQztBQUVqQyw4REFBc0M7QUFHdEMsbUVBQXlDO0FBQ3pDLGtGQUEwRDtBQUMxRCxrREFBMEI7QUFDMUIsc0ZBQThEO0FBQzlELDRFQUFvRDtBQUdwRCxNQUFNLFlBQVksR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzNFLElBQUksQ0FBQztRQUNELE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXpDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVsRSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sb0JBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxrQkFBTSxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsc0RBQXNELEVBQUUsQ0FBQyxDQUFDO1FBQ3JHLENBQUM7YUFBTSxDQUFDO1lBQ0osTUFB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V0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO2lCQUNKO2dCQUNELE1BQU0sRUFBRTtvQkFDSjt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtpQkFDSjtnQkFDRCxRQUFRLEVBQUU7b0JBQ047d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7aUJBQ0o7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLENBQUM7d0JBQ1AsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxDQUFDO3dCQUNQLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixLQUFLLEVBQUUsRUFBRTtxQkFDWjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsRUFBRTt3QkFDUixXQUFXLEVBQUUsSUFBSTt3QkFDakIsS0FBSyxFQUFFLEVBQUU7cUJBQ1o7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLEVBQUU7d0JBQ1IsV0FBVyxFQUFFLElBQUk7d0JBQ2pCLEtBQUssRUFBRSxFQUFFO3FCQUNaO29CQUNEO3dCQUNJLElBQUksRUFBRSxFQUFFO3dCQUNSLFdB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