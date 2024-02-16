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
const Data_1 = __importDefault(require("../models/Data"));
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Usager_1 = __importDefault(require("../models/Usager"));
const PartenaireData_1 = require("../functions/PartenaireData");
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Response_1 = __importDefault(require("../library/Response"));
const Collectivity_1 = __importDefault(require("../models/Collectivity"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const createPartenaire = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collectivityId, requesterId, email, male, name, firstname, mobileNum, landlineNum, civility, password, passwordConfirmed, usagerId } = req.body;
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        let tab = [];
        usagerId.length !== 0 &&
            usagerId.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield Usager_1.default.findById(item);
                if (response) {
                    tab.push(Object(response));
                }
                else {
                    Response_1.default.error('something went wrong about the usagers');
                    return res.status(400).json('something went wrong about the usagers');
                }
            }));
        if (!utilisateurFinded) {
            Response_1.default.error('Requester has been not found');
            return res.status(404).json('Requester has been not found');
        }
        else {
            const collectivityFinded = yield Collectivity_1.default.findById(collectivityId);
            const etablissementFinded = yield Etablissement_1.default.findOne({ collectivities: Object(collectivityFinded)._id });
            if (!collectivityFinded) {
                Response_1.default.error('Convention has been not found');
                return res.status(404).json('Convention has been not found');
            }
            else {
                if (!name || !firstname || !civility) {
                    return res.status(400).json({ error: 'values missing' });
                }
                else {
                    const partenaireFinded = yield Partenaire_1.default.findOne({
                        'account.name': name.toLowerCase(),
                        'account.firstname': firstname.toLowerCase()
                    });
                    if (partenaireFinded) {
                        Response_1.default.warn('Partner already exist');
                        return res.status(400).json({ error: 'Partner already exist', partenaireFinded });
                    }
                    else {
                        if (password !== passwordConfirmed) {
                            Response_1.default.warn('the passwords anrent similare');
                            return res.status(400).json({ error: 'the passwords anrent similare' });
                        }
                        else {
                            const dateNow = new Date();
                            const newData = new Data_1.default({
                                month: dateNow.getMonth() + 1
                            });
                            const token = uid2(26);
                            const salt = uid2(26);
                            const hash = SHA256(password + salt).toString(encBase64);
                            if (tab.length === usagerId.length) {
                                const partenaire = new Partenaire_1.default({
                                    email,
                                    account: {
                                        male,
                                        name,
                                        firstname,
                                        mobileNum,
                                        landlineNum,
                                        collectivity: collectivityFinded._id
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
                                    usagersAttribuated: tab,
                                    datas: { year: dateNow.getFullYear() },
                                    token,
                                    hash,
                                    salt
                                });
                                partenaire.datas[0].mounths.push(newData._id);
                                collectivityFinded.partenaires.push(Object(partenaire));
                                etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.partenaire.push(Object(partenaire));
                                yield newData.save();
                                yield partenaire.save();
                                yield collectivityFinded.save();
                                yield Object(etablissementFinded).save();
                                (0, PartenaireData_1.createPartenaireForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(partenaire._id));
                                Response_1.default.info('Partenaire has been created');
                                return res.status(201).json('Partenaire has been created');
                            }
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readPartenaire = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partenaireFinded = yield Partenaire_1.default.findById(req.params.partenaireId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Response_1.default.error('requester has been not found');
            return res.status(404).json('requester has been not found');
        }
        else {
            if (!partenaireFinded) {
                Response_1.default.error('partenaire has been not found');
                return res.status(404).json('partenaire has been not found');
            }
            else {
                (0, PartenaireData_1.readPartenaireForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(partenaireFinded._id));
                Response_1.default.info('partenaire has been found and returned');
                return res.status(200).json(partenaireFinded);
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Partenaire_1.default.countDocuments();
    return Partenaire_1.default.find()
        .then((partenaires) => res.status(200).json({ count: count, partenaire: partenaires }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updatePartenaire = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const partenaireId = req.params.partenaireId;
    const { requesterId, name, firstname, collectivity, email, newArrayUsagerCretead, newArrayAttribuated, newArrayAutorisations, newPassword, newPasswordConfirmed } = req.body;
    const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
    if (!utilisateurFinded) {
        Response_1.default.error('The requester has been nos not found');
        return res.status(400).json({ message: 'The requester has been nos not found' });
    }
    else {
        return yield Partenaire_1.default.findById(partenaireId).then((partenaire) => {
            if (partenaire) {
                if (Object.keys(req.body).length === 0) {
                    Response_1.default.error('Values not finded for an update');
                    return res.status(404).json({ message: 'values not finded for an update' });
                }
                else {
                    if (name || firstname || collectivity) {
                        name ? (partenaire.account.name = name) : (partenaire.account.name = partenaire.account.name);
                        firstname ? (partenaire.account.firstname = firstname) : (partenaire.account.firstname = partenaire.account.firstname);
                        collectivity
                            ? (partenaire.account.collectivity = collectivity)
                            : (partenaire.account.collectivity = partenaire.account.collectivity);
                    }
                    email ? (partenaire.email = email) : (partenaire.email = partenaire.email);
                    newArrayUsagerCretead
                        ? (partenaire.usagersCreated = newArrayUsagerCretead)
                        : (partenaire.usagersCreated = partenaire.usagersCreated);
                    newArrayAttribuated
                        ? (partenaire.usagersAttribuated = newArrayAttribuated)
                        : (partenaire.usagersAttribuated = partenaire.usagersAttribuated);
                    newArrayAutorisations
                        ? (partenaire.autorisations = newArrayAutorisations)
                        : (partenaire.autorisations = partenaire.autorisations);
                    if (newPassword) {
                        const newSalt = uid2(26);
                        const newHash = SHA256(newPassword + newSalt).toString(encBase64);
                        if (newPassword !== newPasswordConfirmed) {
                            Response_1.default.error("newPassword and newPasswordConfirmed aren't similar");
                            return res.status(500).json("newPassword and newPasswordConfirmed aren't similar");
                        }
                        else {
                            partenaire.salt = newSalt;
                            partenaire.hash = newHash;
                        }
                    }
                    (0, PartenaireData_1.updatePartenaireForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(partenaire._id));
                    return partenaire
                        .save()
                        .then((partenaire) => res.status(201).json({ partenaire: partenaire }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
            else {
                res.status(404).json({ message: 'Not found' });
            }
        });
    }
});
const deletePartenaire = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partenaireFinded = yield Partenaire_1.default.findById(req.params.partenaireId);
        const collectivityFinded = yield Collectivity_1.default.findOne({ partenaires: Object(partenaireFinded)._id });
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
        const etablissementFinded = yield Etablissement_1.default.findOne({ partenaire: Object(partenaireFinded)._id });
        if (!utilisateurFinded) {
            Response_1.default.warn('The utilisateur has been not found');
            return res.status(404).json('The utilisateur has been not found');
        }
        else {
            if (!partenaireFinded || !collectivityFinded) {
                Response_1.default.warn('The partenaire or the collectivity has been not found');
                return res.status(404).json('The partenaire or the collectivity has been not found');
            }
            else {
                const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/partenaire/create`, {
                    _id: partenaireFinded && partenaireFinded._id,
                    email: partenaireFinded && partenaireFinded.email,
                    male: partenaireFinded && partenaireFinded.account.male,
                    name: partenaireFinded && partenaireFinded.account.name,
                    firstname: partenaireFinded && partenaireFinded.account.firstname,
                    collectivity: partenaireFinded && partenaireFinded.account.collectivity,
                    usagersCreated: partenaireFinded && partenaireFinded.usagersCreated,
                    usagersAttribuated: partenaireFinded && partenaireFinded.usagersAttribuated,
                    contacts: partenaireFinded && partenaireFinded.contacts,
                    autorisations: partenaireFinded && partenaireFinded.autorisations,
                    datas: partenaireFinded && partenaireFinded.datas,
                    token: partenaireFinded && partenaireFinded.token,
                    hash: partenaireFinded && partenaireFinded.hash,
                    salt: partenaireFinded && partenaireFinded.salt
                });
                if (archive.data.message ===
                    `The partenaire ${partenaireFinded.account.firstname} ${partenaireFinded.account.name} has been created` ||
                    archive.data.message === `The partenaire ${partenaireFinded.account.firstname} ${partenaireFinded.account.name} has been updated`) {
                    collectivityFinded.partenairesArchived.push(Object(partenaireFinded._id));
                    yield partenaireFinded.deleteOne();
                    (0, PartenaireData_1.deletePartenaireForExtracting)(Object(utilisateurFinded).datas[0].mounths[0], partenaireFinded._id);
                    const newPartenairesArray = collectivityFinded.partenaires.filter((el) => JSON.stringify(el) !== JSON.stringify(partenaireFinded._id));
                    Object(collectivityFinded).partenaires = newPartenairesArray;
                    const newEtablissementArray = Object(etablissementFinded).partenaire.filter((el) => JSON.stringify(el) !== JSON.stringify(partenaireFinded._id));
                    Object(etablissementFinded).partenaire = newEtablissementArray;
                    yield collectivityFinded.save();
                    yield Object(etablissementFinded).save();
                    Response_1.default.info('the partenaire has been removed');
                    return res.status(200).json('the partenaire has been removed');
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
exports.default = { createPartenaire, readPartenaire, readAll, updatePartenaire, deletePartenaire };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGVuYWlyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9QYXJ0ZW5haXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQWtDO0FBRWxDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUc3QixzRUFBOEM7QUFDOUMsOERBQXNDO0FBQ3RDLGdFQUtxQztBQUNyQyx3RUFBZ0Q7QUFDaEQsbUVBQXlDO0FBQ3pDLDBFQUFrRDtBQUNsRCxrREFBMEI7QUFDMUIsOERBQXNDO0FBQ3RDLDRFQUFvRDtBQUVwRCxNQUFNLGdCQUFnQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDL0UsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsR0FDeEksR0FBRyxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRSxJQUFJLEdBQUcsR0FBYSxFQUFFLENBQUM7UUFFdkIsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBTyxJQUFZLEVBQUUsS0FBYSxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JB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