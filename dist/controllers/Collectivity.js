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
const Collectivity_1 = __importDefault(require("../models/Collectivity"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Data_1 = __importDefault(require("../models/Data"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const Response_1 = __importDefault(require("../library/Response"));
const CollectivityData_1 = require("../functions/CollectivityData");
const axios_1 = __importDefault(require("axios"));
const PartenaireData_1 = require("../functions/PartenaireData");
const config_1 = __importDefault(require("../config/config"));
const createCollectivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { requesterId, name, address, zip, city, location } = req.body;
    const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
    const etablissementFinded = yield Etablissement_1.default.findById(req.params.etablissementId);
    if (!utilisateurFinded || !etablissementFinded) {
        Response_1.default.error({ message: 'The requester has been not found' });
        return res.status(404).json({ message: 'The requester has been not found' });
    }
    else {
        if (!name) {
            Response_1.default.error({ message: 'The name has been not found' });
            return res.status(404).json({ message: 'The name has been not found' });
        }
        else {
            const collectivityFinded = yield Collectivity_1.default.findOne({ name: name, address: address, zip: zip, city: city });
            if (collectivityFinded) {
                Response_1.default.warn({ message: 'This collectivity already exist' });
                return res.status(404).json({ message: 'This collectivity already exist' });
            }
            else {
                const collectivity = new Collectivity_1.default({
                    name,
                    address,
                    zip,
                    city,
                    location
                });
                etablissementFinded.collectivities.push(Object(collectivity));
                yield etablissementFinded.save();
                return collectivity
                    .save()
                    .then((collectivity) => {
                    (0, CollectivityData_1.createCollectivityForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(collectivity._id));
                    res.status(201).json({ collectivity: collectivity });
                })
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
    }
});
const readCollectivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectivityFinded = yield Collectivity_1.default.findById(req.params.collectivityId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!collectivityFinded || !utilisateurFinded) {
            Response_1.default.error('the collectivity or the utilisateur has been not found');
            return res.status(404).json({ error: 'the collectivity or the utilisateur has been not found' });
        }
        else {
            (0, CollectivityData_1.readCollectivityForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(collectivityFinded._id));
            Response_1.default.info('The collectivity has been found ');
            return res.status(200).json({ collectivity: collectivityFinded });
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Etablissement_1.default.findById(req.params.etablissementId)
        .populate('collectivities')
        .select('collectivities')
        .then((collectivities) => res.status(200).json({ count: Object(collectivities).collectivities.length, collectivities: Object(collectivities).collectivities }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updateCollectivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collectivityId = req.params.collectivityId;
    const { male, name, firstname, mobileNum, landlineNum, email, password, passwordConfirmed } = req.body;
    return yield Collectivity_1.default.findById(collectivityId).then((collectivity) => __awaiter(void 0, void 0, void 0, function* () {
        if (!collectivity) {
            return res.status(404).json({ message: 'the collectivity has been not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
                if (typeof male === 'boolean' || firstname) {
                    try {
                        if (typeof male !== 'boolean' || !name || !firstname) {
                            Response_1.default.warn({ message: 'Name or firstname are missing' });
                            return res.status(404).json({ message: 'Name or firstname are missing' });
                        }
                        else {
                            if ((!password && !passwordConfirmed) || password !== passwordConfirmed) {
                                Response_1.default.warn({ message: 'password or passwordConfirmed are missing' });
                                return res.status(404).json({ message: 'password or passwordConfirmed are missing' });
                            }
                            else {
                                const dateNow = new Date();
                                const newData = new Data_1.default({
                                    month: dateNow.getMonth() + 1
                                });
                                const token = uid2(26);
                                const salt = uid2(26);
                                const hash = SHA256(password + salt).toString(encBase64);
                                const partnerAlreadyExist = yield Partenaire_1.default.findOne({ 'account.name': name, 'account.firstname': firstname });
                                const newPartenaire = new Partenaire_1.default({
                                    email,
                                    account: {
                                        male,
                                        name,
                                        firstname,
                                        mobileNum,
                                        landlineNum,
                                        collectivity: collectivity._id
                                    },
                                    datas: { year: dateNow.getFullYear() },
                                    token,
                                    salt,
                                    hash
                                });
                                newPartenaire.datas[0].mounths.push(newData._id);
                                collectivity.partenaires.push(Object(newPartenaire));
                                if (partnerAlreadyExist) {
                                    Response_1.default.warn({ message: 'this partner already exist' });
                                    return res.status(404).json({ message: 'this partner already exist' });
                                }
                                else {
                                    yield newData.save();
                                    yield newPartenaire.save();
                                    yield collectivity.save();
                                    Response_1.default.info('the collectivity has been updated, and the partner has been created');
                                    return res.status(201).json({ message: 'the collectivity has been updated, the partner has been created' });
                                }
                            }
                        }
                    }
                    catch (error) {
                        Response_1.default.error({ message: 'error catched', error });
                        return res.status(500).json({ message: 'error catched', error });
                    }
                }
                else {
                    collectivity.set(req.body);
                    return collectivity
                        .save()
                        .then((collectivity) => res.status(201).json({ collectivity: collectivity }))
                        .finally(() => {
                        (0, CollectivityData_1.updateCollectivityForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(collectivity._id));
                    })
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    }));
});
const deleteCollectivity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
        const collectivityFinded = yield Collectivity_1.default.findById(req.params.collectivityId);
        const etablissementFinded = yield Etablissement_1.default.findOne({ collectivities: Object(collectivityFinded)._id });
        if (!collectivityFinded || !etablissementFinded || !utilisateurFinded) {
            Response_1.default.error('The collectivity or etablissement, or requester has been not found');
            return res.status(404).json('The collectivity or etablissement, or requester has been not found');
        }
        else {
            let count = collectivityFinded.partenaires.length;
            let newTab = [];
            const handleSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/collectivity/create`, {
                    name: collectivityFinded.name,
                    address: collectivityFinded.address,
                    zip: collectivityFinded.zip,
                    city: collectivityFinded.city,
                    location: collectivityFinded.location,
                    _id: collectivityFinded._id,
                    partenaires: collectivityFinded.partenaires,
                    partenairesArchived: collectivityFinded.partenairesArchived,
                    usagers: collectivityFinded.usagers,
                    usagersOuted: collectivityFinded.usagersOuted
                });
                if (response.data.message === `The collectivity ${collectivityFinded.name} has been created` ||
                    response.data.message === `The collectivity ${collectivityFinded.name} has been updated`) {
                    Object(etablissementFinded).collectivities = etablissementFinded.collectivities.filter((element) => JSON.stringify(element) !== JSON.stringify(collectivityFinded._id));
                    yield etablissementFinded.save();
                    yield collectivityFinded.deleteOne();
                    return res.status(200).json('The collectivity has been archived');
                }
                else {
                    Response_1.default.error({ message: 'Something went wrong about the submit' });
                    return res.status(500).json({ message: 'Something went wrong about the submit' });
                }
            });
            collectivityFinded.partenaires.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                const partenaireFinded = yield Partenaire_1.default.findById(el);
                if ((partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.account) === undefined) {
                    Object(collectivityFinded).partenaires = collectivityFinded.partenaires.filter((element) => JSON.stringify(element) !== JSON.stringify(el));
                }
                else {
                    newTab.push(Object(el));
                    Object(collectivityFinded).partenaires = collectivityFinded.partenaires.filter((element) => JSON.stringify(element) !== JSON.stringify(el));
                }
                count--;
                if (count === 0) {
                    for (let i = 0; i < newTab.length; i++) {
                        const partenaireToDelete = yield Partenaire_1.default.findById(newTab[i]);
                        const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/partenaire/create`, {
                            _id: partenaireToDelete && partenaireToDelete._id,
                            email: partenaireToDelete && partenaireToDelete.email,
                            male: partenaireToDelete && partenaireToDelete.account.male,
                            name: partenaireToDelete && partenaireToDelete.account.name,
                            firstname: partenaireToDelete && partenaireToDelete.account.firstname,
                            collectivity: partenaireToDelete && partenaireToDelete.account.collectivity,
                            usagersCreated: partenaireToDelete && partenaireToDelete.usagersCreated,
                            usagersAttribuated: partenaireToDelete && partenaireToDelete.usagersAttribuated,
                            contacts: partenaireToDelete && partenaireToDelete.contacts,
                            autorisations: partenaireToDelete && partenaireToDelete.autorisations,
                            datas: partenaireToDelete && partenaireToDelete.datas,
                            token: partenaireToDelete && partenaireToDelete.token,
                            hash: partenaireToDelete && partenaireToDelete.hash,
                            salt: partenaireToDelete && partenaireToDelete.salt
                        });
                        if (archive.data.message ===
                            `The partenaire ${partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete.account.firstname} ${partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete.account.name} has been created` ||
                            archive.data.message ===
                                `The partenaire ${partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete.account.firstname} ${partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete.account.name} has been updated`) {
                            collectivityFinded.partenairesArchived.push(Object(partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete._id));
                            yield (partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete.deleteOne());
                            (0, PartenaireData_1.deletePartenaireForExtracting)(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0], partenaireToDelete === null || partenaireToDelete === void 0 ? void 0 : partenaireToDelete._id);
                            Object(collectivityFinded).partenaires = collectivityFinded.partenaires.filter((element) => JSON.stringify(element) !== JSON.stringify(el));
                        }
                        else {
                            Response_1.default.info('Something went wrong');
                            return res.status(200).json('Something went wrong');
                        }
                    }
                    yield collectivityFinded.save();
                    handleSubmit();
                }
            }));
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
exports.default = { createCollectivity, readCollectivity, readAll, updateCollectivity, deleteCollectivity };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGVjdGl2aXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL0NvbGxlY3Rpdml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUc3QiwwRUFBa0Q7QUFDbEQsd0VBQWdEO0FBQ2hELHNFQUE4QztBQUM5QywwREFBa0M7QUFDbEMsNEVBQW9EO0FBR3BELG1FQUF5QztBQUd6QyxvRUFLdUM7QUFDdkMsa0RBQTBCO0FBQzFCLGdFQUE0RTtBQUU1RSw4REFBc0M7QUFFdEMsTUFBTSxrQkFBa0IsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDckUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJGLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDN0Msa0JBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO1FBQzlELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFB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