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
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const InterlocutorData_1 = require("../functions/InterlocutorData");
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Data_1 = __importDefault(require("../models/Data"));
const Response_1 = __importDefault(require("../library/Response"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const createInterlocutor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId, email, name, firstname, male, positionHeld, mobileNum, landlineNum, workSpot, password, passwordConfirmed } = req.body;
        const entrepriseId = req.params.entrepriseId;
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const entrepriseFinded = yield Entreprise_1.default.findById(entrepriseId);
        if (!utilisateurFinded) {
            return res.status(400).json({ message: 'The "requesterId" parameter is required or the Utilisateur has been not found' });
        }
        else {
            if (!entrepriseFinded) {
                return res.status(400).json({ message: 'Entreprise has been not found' });
            }
            else {
                if (!name || !firstname || !email || !password || !passwordConfirmed) {
                    Response_1.default.warn(`One or more values are missing`);
                    return res.status(400).json(`One or more values are missing`);
                }
                else {
                    const dateNow = new Date();
                    const newData = new Data_1.default({
                        month: dateNow.getMonth() + 1
                    });
                    const token = uid2(26);
                    const salt = uid2(26);
                    const hash = SHA256(password + salt).toString(encBase64);
                    const newInterlocutor = new Interlocutor_1.default({
                        email: email,
                        account: {
                            male: male,
                            name: name,
                            firstname: firstname,
                            positionHeld: positionHeld,
                            mobileNum: mobileNum,
                            landlineNum: landlineNum
                        },
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
                    if (password !== passwordConfirmed) {
                        return res.status(400).json({ message: 'the passwords arent similar' });
                    }
                    else {
                        const interlocutorFinded = yield Interlocutor_1.default.findOne({ 'account.name': name, 'account.firstname': firstname, email: email });
                        if (interlocutorFinded) {
                            return res.status(400).json({ message: 'this interlocutor already exist', interlocutor: interlocutorFinded });
                        }
                        else {
                            entrepriseFinded.interlocutors.push(Object(newInterlocutor));
                            newInterlocutor.datas[0].mounths.push(newData._id);
                            newInterlocutor.entreprises.push(Object(entrepriseFinded));
                            yield entrepriseFinded.save();
                            yield newInterlocutor.save();
                            yield newData.save();
                            (0, InterlocutorData_1.createInterlocuteurForExtracting)(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0], newInterlocutor._id);
                            Response_1.default.info('Interlocutor has been created');
                            return res.status(201).json({ message: 'Interlocutor has been created', interlocuteur: newInterlocutor });
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ error: 'error catched', message: error });
        return res.status(400).json({ error: 'error catched', message: error });
    }
});
const readInterlocutor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interlocutorId = req.params.interlocutorId;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const interlocutorFinded = yield Interlocutor_1.default.findById(interlocutorId);
        if (!utilisateurFinded) {
            return res.status(400).json({ message: 'The "requesterId" parameter is required or the Utilisateur has been not found' });
        }
        else {
            if (!interlocutorFinded) {
                Response_1.default.warn('The Interlocutor has been not found');
                return res.status(400).json({ message: 'The Interlocutor has been not found' });
            }
            else {
                (0, InterlocutorData_1.readInterlocuteurForExtracting)(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0], interlocutorFinded._id);
                Response_1.default.info('An interlocutor has readed');
                return res.status(200).json({ interlocuteur: interlocutorFinded });
            }
        }
    }
    catch (error) {
        Response_1.default.error({ error: 'error catched', message: error });
        return res.status(500).json({ message: 'The error has been catched', error: error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entrepriseFinded = yield Entreprise_1.default.findById(req.params.entrepriseId).populate('interlocutors').select('interlocutors');
        if (!entrepriseFinded) {
            Response_1.default.warn('The entreprise has been not found');
            return res.status(400).json('The entreprise has been not found');
        }
        else {
            return res.status(200).json({ count: entrepriseFinded.interlocutors.length, interlocuteurs: entrepriseFinded });
        }
    }
    catch (error) {
        Response_1.default.error({ error: 'error catched', message: error });
        return res.status(500).json({ message: 'The error has been catched', error: error });
    }
});
const updateInterlocutor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interlocutorId = req.params.interlocutorId;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        return Interlocutor_1.default.findById(interlocutorId).then((interlocutor) => __awaiter(void 0, void 0, void 0, function* () {
            if (!interlocutor || !req.body.requesterId) {
                res.status(404).json({ message: 'The interlocutor or the requester has been not found' });
            }
            else {
                if (!req.body.password) {
                    if (req.body.entrepriseIdToAdded) {
                        const entrepriseFinded = yield Entreprise_1.default.findById(req.body.entrepriseIdToAdded);
                        if (!entrepriseFinded) {
                            Response_1.default.warn('the entreprise has been not found');
                            return res.status(404).json({ message: 'the entreprise has been not found' });
                        }
                        else {
                            const isAlreadyInThere = (el) => JSON.stringify(el) === JSON.stringify(req.body.entrepriseIdToAdded);
                            if (interlocutor.entreprises.findIndex(isAlreadyInThere) === -1) {
                                interlocutor.entreprises.push(Object(entrepriseFinded));
                                entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.interlocutors.push(Object(interlocutor));
                                yield interlocutor.save();
                                yield (entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.save());
                                (0, InterlocutorData_1.interlocuteurAddedForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(interlocutor._id), Object(entrepriseFinded._id));
                                Response_1.default.info('The entreprise has been added to the interlocutor');
                                return res.status(200).json({ message: 'The entreprise has been added to the interlocutor' });
                            }
                            else {
                                Response_1.default.warn('The entreprise already exist in this interlocutor');
                                return res.status(400).json({ message: 'The entreprise already exist in this interlocutor' });
                            }
                        }
                    }
                    else if (req.body.entrepriseIdToRemove) {
                        const entrepriseFinded = yield Entreprise_1.default.findById(req.body.entrepriseIdToRemove);
                        if (entrepriseFinded) {
                            const isInThere = (el) => JSON.stringify(el) === JSON.stringify(req.body.entrepriseIdToRemove);
                            if (interlocutor.entreprises.findIndex(isInThere) !== -1) {
                                entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.interlocutorsArchiveds.push(Object(interlocutor));
                                const entrepriseArray = entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.interlocutors.filter((el) => JSON.stringify(el) !== JSON.stringify(interlocutor._id));
                                const interlocutorArray = interlocutor.entreprises.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(entrepriseFinded)._id));
                                Object(entrepriseFinded).interlocutors = entrepriseArray;
                                Object(interlocutor).entreprises = interlocutorArray;
                                yield (entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.save());
                                yield (interlocutor === null || interlocutor === void 0 ? void 0 : interlocutor.save());
                                (0, InterlocutorData_1.interlocuteurRemovedForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(interlocutor._id), Object(entrepriseFinded._id));
                                Response_1.default.info('The interlocutor has been removed');
                                return res.status(200).json('the interlocutor has been removed');
                            }
                            else {
                                Response_1.default.warn('The interlocutor is not in this company');
                                return res.status(404).json('The interlocutor is not in this company');
                            }
                        }
                        else {
                            Response_1.default.warn('the entreprise has been not found');
                            return res.status(404).json('the entreprise has been not found');
                        }
                    }
                    else {
                        interlocutor.set(req.body);
                        utilisateurFinded
                            ? (0, InterlocutorData_1.updateInterlocuteurForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(interlocutor._id))
                            : (0, InterlocutorData_1.updateInterlocuteurForExtracting)(Object(interlocutor === null || interlocutor === void 0 ? void 0 : interlocutor.datas[0].mounths[0]), Object(interlocutor._id));
                        return interlocutor
                            .save()
                            .then((interlocutor) => {
                            Response_1.default.info('Interlocutor has been updated'), res.status(201).json({ interlocutor: interlocutor });
                        })
                            .catch((error) => res.status(500).json({ error: error.message }));
                    }
                }
                else {
                    if (req.body.password !== req.body.passwordConfirmed) {
                        Response_1.default.warn('the passords arent similare');
                        return res.status(401).json('the passords arent similare');
                    }
                    else {
                        const newHash = SHA256(req.body.password + interlocutor.salt).toString(encBase64);
                        interlocutor.hash = newHash;
                        yield interlocutor.save();
                        Response_1.default.info('the passord has been updated');
                        return res.status(201).json('the passord has been updated');
                    }
                }
            }
        }));
    }
    catch (error) {
        Response_1.default.error({ error: 'error catched', message: error });
        return res.status(500).json({ error: 'error catched', message: error });
    }
});
const deleteInterlocutor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.params.interlocutorId);
        const entrepriseFinded = yield Entreprise_1.default.findOne({ interlocutors: req.params.interlocutorId });
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Response_1.default.warn('The utilisateur has been not found');
            return res.status(404).json('The utilisateur has been not found');
        }
        else {
            if (!interlocutorFinded || !entrepriseFinded) {
                Response_1.default.warn('The interlocutor or the entreprise has been not found');
                return res.status(404).json('The interlocutor or the entreprise has been not found');
            }
            else {
                const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/interlocutor/create`, {
                    _id: interlocutorFinded._id,
                    email: interlocutorFinded.email,
                    male: interlocutorFinded.account.male,
                    name: interlocutorFinded.account.name,
                    firstname: interlocutorFinded.account.firstname,
                    positionHeld: interlocutorFinded.account.positionHeld,
                    mobileNum: interlocutorFinded.account.mobileNum,
                    landlineNum: interlocutorFinded.account.landlineNum,
                    workSpot: interlocutorFinded.account.workSpot,
                    datas: interlocutorFinded.datas,
                    token: interlocutorFinded.token,
                    salt: interlocutorFinded.salt,
                    hash: interlocutorFinded.hash
                });
                if (archive.data.message ===
                    `The interlocutor ${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name} has been created` ||
                    archive.data.message ===
                        `The interlocutor ${interlocutorFinded.account.firstname} ${interlocutorFinded.account.name} has been updated`) {
                    entrepriseFinded.interlocutorsArchiveds.push(Object(interlocutorFinded._id));
                    yield interlocutorFinded.deleteOne();
                    (0, InterlocutorData_1.deleteInterlocuteurForExtracting)(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0], interlocutorFinded._id);
                    const newInterlocutorsArray = entrepriseFinded.interlocutors.filter((el) => JSON.stringify(el) !== JSON.stringify(interlocutorFinded._id));
                    Object(entrepriseFinded).interlocutors = newInterlocutorsArray;
                    yield entrepriseFinded.save();
                    Response_1.default.info('the interlocutor has been removed');
                    return res.status(200).json('the interlocutor has been removed');
                }
                else {
                    Response_1.default.info('Something went wrong');
                    return res.status(200).json('Something went wrong');
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ error: 'error catched', message: error });
        return res.status(500).json({ error: 'error catched', message: error });
    }
});
exports.default = { createInterlocutor, readInterlocutor, readAll, updateInterlocutor, deleteInterlocutor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJsb2N1dG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL0ludGVybG9jdXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUc3QiwwRUFBa0Q7QUFDbEQsc0VBQThDO0FBQzlDLG9FQU91QztBQUN2Qyx3RUFBZ0Q7QUFDaEQsMERBQWtDO0FBQ2xDLG1FQUF5QztBQUN6QyxrREFBMEI7QUFDMUIsOERBQXNDO0FBRXRDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNqRixJQUFJLENBQUM7UUFDRCxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUM1SSxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM3QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG9CQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVB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