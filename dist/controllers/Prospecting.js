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
const Response_1 = __importDefault(require("../library/Response"));
const Prospecting_1 = __importDefault(require("../models/Prospecting"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const axios_1 = __importDefault(require("axios"));
const Prospect_1 = __importDefault(require("../models/Prospect"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const moment = require('moment');
const createProspecting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, codeRome, page, adress, city, zip, distance } = req.body;
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId);
        const options = {
            method: 'POST',
            url: 'https://api.insee.fr/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: `${process.env.API_SIRET_CLIENT_ID}`,
                client_secret: `${process.env.API_SIRET_CLIENT_SECRET}`
            })
        };
        axios_1.default.request(options).then(function (response) {
            return __awaiter(this, void 0, void 0, function* () {
                (() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
                        if (utilisateurFinded !== undefined) {
                            const responseApiGouv = yield axios_1.default.get(`https://api-adresse.data.gouv.fr/search/?q=${req.body.adress} ${req.body.zip} ${req.body.city}`);
                            yield axios_1.default
                                .post('https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire', {
                                grant_type: 'client_credentials',
                                client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
                                client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
                                scope: 'api_labonneboitev1'
                            }, {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            })
                                .then((responsePoleEmploi) => __awaiter(this, void 0, void 0, function* () {
                                if (usagerFinded) {
                                    const utilisateurFindedForProspecting = yield Utilisateur_1.default.findOne({ usagers: usagerFinded });
                                    if (utilisateurFindedForProspecting) {
                                        const newProspecting = new Prospecting_1.default({
                                            name: usagerFinded.account.name.toLocaleUpperCase(),
                                            codeRome: codeRome,
                                            workName: req.body.workName,
                                            entreprises: [],
                                            usagers: usagerFinded,
                                            createdBy: utilisateurFinded
                                        });
                                        let pageNum = 1;
                                        let entrepriseToProspect = [];
                                        let rest = 0;
                                        function entrepriseReturn() {
                                            return __awaiter(this, void 0, void 0, function* () {
                                                const entreprisesFromPoleEmploi = yield axios_1.default.get(`https://api.pole-emploi.io/partenaire/labonneboite/v1/company/?distance=${req.body.distance}&latitude=${responseApiGouv.data.features[0].geometry.coordinates[1]}&longitude=${responseApiGouv.data.features[0].geometry.coordinates[0]}&rome_codes=${codeRome}&sort=distance&page=${pageNum}&page_size=100`, {
                                                    headers: {
                                                        Authorization: `Bearer ${responsePoleEmploi.data.access_token}`
                                                    }
                                                });
                                                const totalPage = entreprisesFromPoleEmploi.data.companies_count / 100;
                                                const isLargerThan30Days = (el) => {
                                                    const first = Object(el).createdAt;
                                                    const second = new Date();
                                                    const x = moment(first);
                                                    const y = moment(second);
                                                    const diffInDays = y.diff(x, 'days');
                                                    if (el !== undefined && diffInDays <= 30) {
                                                        return true;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                };
                                                if (entreprisesFromPoleEmploi.data.companies.length !== 0) {
                                                    let count = 1;
                                                    rest === 0 && (rest = totalPage * 100 - count * pageNum);
                                                    entreprisesFromPoleEmploi.data.companies.map((element) => __awaiter(this, void 0, void 0, function* () {
                                                        const prospectFinded = yield Prospect_1.default.find({
                                                            siret: Object(element).siret
                                                        });
                                                        if (isLargerThan30Days(Object(prospectFinded)[prospectFinded.length - 1]) === false ||
                                                            Object(prospectFinded) === null) {
                                                            entrepriseToProspect.push(element);
                                                        }
                                                        if (count === entreprisesFromPoleEmploi.data.companies.length) {
                                                            if (entrepriseToProspect.length >= 1) {
                                                                entrepriseToProspect.map((el, index) => __awaiter(this, void 0, void 0, function* () {
                                                                    if (index < 20) {
                                                                        const enterpriseAlreadyExist = yield Entreprise_1.default.findOne({
                                                                            siret: Object(el).siret
                                                                        });
                                                                        const result = Object(el).address.split(',').length !== 0 && Object(el).address.split(' ');
                                                                        const newProspect = new Prospect_1.default({
                                                                            siret: Object(el).siret,
                                                                            denomination: Object(el).name,
                                                                            adresse: enterpriseAlreadyExist
                                                                                ? Object(enterpriseAlreadyExist).adress
                                                                                : Object(el).address,
                                                                            zip: enterpriseAlreadyExist
                                                                                ? Object(enterpriseAlreadyExist).zip
                                                                                : result[result.length - 2],
                                                                            city: enterpriseAlreadyExist
                                                                                ? Object(enterpriseAlreadyExist).city
                                                                                : Object(el).city,
                                                                            distance: Object(el).distance,
                                                                            entreprise: enterpriseAlreadyExist && enterpriseAlreadyExist,
                                                                            codeNaf: enterpriseAlreadyExist
                                                                                ? Object(enterpriseAlreadyExist).codeNAF
                                                                                : Object(el).naf,
                                                                            usager: Object(usagerFinded)
                                                                        });
                                                                        Object(el).siret.split('')[0] === '0' && newProspect.siret.length < 14
                                                                            ? (newProspect.siret = `0${newProspect.siret}`)
                                                                            : newProspect.siret;
                                                                        yield newProspect.save();
                                                                        enterpriseAlreadyExist &&
                                                                            (enterpriseAlreadyExist.prospecting.push(Object(newProspect)),
                                                                                yield (enterpriseAlreadyExist === null || enterpriseAlreadyExist === void 0 ? void 0 : enterpriseAlreadyExist.save()));
                                                                        Object(newProspecting).entreprises.length < 20 &&
                                                                            Object(newProspecting).entreprises.push(Object(newProspect));
                                                                        if (entrepriseToProspect.length >= 20 &&
                                                                            Object(newProspecting).entreprises.length === 20) {
                                                                            Object(utilisateurFindedForProspecting).prospectings.push(Object(newProspecting));
                                                                            Object(usagerFinded).prospectings.push(Object(newProspecting));
                                                                            yield newProspecting.save();
                                                                            yield Object(usagerFinded).save();
                                                                            yield Object(utilisateurFindedForProspecting).save();
                                                                            return res.status(200).json({
                                                                                message: 'Prospection created with 20 entreprises maximum',
                                                                                utilisateur: Object(utilisateurFindedForProspecting)
                                                                            });
                                                                        }
                                                                        else if (entrepriseToProspect.length <= 20 &&
                                                                            Object(newProspecting).entreprises.length === entrepriseToProspect.length) {
                                                                            Object(utilisateurFindedForProspecting).prospectings.push(Object(newProspecting));
                                                                            Object(usagerFinded).prospectings.push(Object(newProspecting));
                                                                            enterpriseAlreadyExist &&
                                                                                (enterpriseAlreadyExist.prospecting.push(Object(newProspect)),
                                                                                    yield enterpriseAlreadyExist.save());
                                                                            yield newProspecting.save();
                                                                            yield Object(usagerFinded).save();
                                                                            yield Object(utilisateurFindedForProspecting).save();
                                                                            return res.status(200).json({
                                                                                message: `Prospection created with ${entrepriseToProspect.length} ${entrepriseToProspect.length === 1 ? 'entreprise' : 'entreprises'}`,
                                                                                utilisateur: Object(utilisateurFindedForProspecting)
                                                                            });
                                                                        }
                                                                    }
                                                                }));
                                                            }
                                                            else {
                                                                if (pageNum <= Math.ceil(totalPage) && rest !== 0) {
                                                                    count = 1;
                                                                    pageNum += 1;
                                                                    entrepriseReturn();
                                                                }
                                                                else {
                                                                    return res.status(200).json('0 entreprise after the filters');
                                                                }
                                                            }
                                                        }
                                                        count += 1;
                                                        rest -= 1;
                                                    }));
                                                }
                                                else {
                                                    return res.status(200).json('Have 0 entreprise about this work station');
                                                }
                                            });
                                        }
                                        entrepriseReturn();
                                    }
                                    else {
                                        Response_1.default.error('UtilisateurAffiliated was not found');
                                        return res.status(400).json('UtilisateurAffiliated was not found');
                                    }
                                }
                                else {
                                    Response_1.default.error('Prospecting was not found');
                                    return res.status(400).json('Prospecting was not found');
                                }
                            }));
                        }
                        else {
                            Response_1.default.error(`Error 404... requester was not found`);
                            return res.status(400).json({ error: 'Error 404... requester was not found' });
                        }
                    }
                    catch (err) {
                        Response_1.default.error({ message: `Error catched`, error: Object(err) });
                        return res.status(400).json({ message: `Error catched`, error: Object(err) });
                    }
                }))();
            });
        });
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const readProspecting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId);
        if (usagerFinded) {
            const prospectings = yield Prospect_1.default.find({ usager: usagerFinded }).populate({
                path: 'entreprise',
                model: 'Entreprise',
                populate: {
                    path: 'interlocutors'
                }
            });
            const prospectingsDone = prospectings.filter((el) => Object(el).isDone === true);
            const prospectingsNotDone = prospectings.filter((el) => Object(el).isDone === false);
            Response_1.default.info('Prospecting was found');
            return res.status(200).json({ message: 'Prospecting was found', isDone: prospectingsDone, isNotDone: prospectingsNotDone });
        }
        else {
            Response_1.default.error('Prospecting was not found');
            return res.status(400).json('Prospecting was not found');
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const readAllByUtilisateur = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prospectingsFinded = yield Utilisateur_1.default.findById(req.params.utilisateurId)
            .populate({
            path: 'prospectings',
            model: 'Prospecting',
            populate: [
                {
                    path: 'entreprises'
                }
            ]
        })
            .select('prospectings');
        const prospectFindedToDo = yield Prospecting_1.default.find({ utilisateurAssigned: req.params.utilisateurId }).populate('entreprises');
        if (prospectingsFinded && prospectFindedToDo) {
            Response_1.default.info('prospectings was found');
            return res.status(200).json({ message: 'prospectings was found', forMyUsager: prospectingsFinded, toDo: prospectFindedToDo });
        }
        else {
            Response_1.default.error('prospectings was not found');
            return res.status(400).json('prospectings was not found');
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const readAllByEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const etablissmentFinded = yield Etablissement_1.default.findById(req.params.etablissementId)
            .populate([{ path: 'utilisateurs', select: 'name', populate: [{ path: 'prospectings', model: 'Prospecting' }] }])
            .select('utilisateurs name');
        if (etablissmentFinded) {
            let count = 1;
            let prospectingToAssign = [];
            let prospectingAssigned = [];
            etablissmentFinded === null || etablissmentFinded === void 0 ? void 0 : etablissmentFinded.utilisateurs.every((element) => __awaiter(void 0, void 0, void 0, function* () {
                Object(element).prospectings.map((el) => {
                    if (Object(el).utilisateurAssigned.length === 0) {
                        prospectingToAssign.push(el);
                    }
                    else {
                        prospectingAssigned.push(el);
                    }
                });
                count++;
                if (count === etablissmentFinded.utilisateurs.length) {
                    return res.status(200).json({
                        prospectingToAssign: { count: prospectingToAssign.length, prospectings: prospectingToAssign },
                        prospectingAssigned: { count: prospectingAssigned.length, prospectings: prospectingAssigned }
                    });
                }
            }));
        }
        else {
            return res.status(400).json('Etlablissemment was not found');
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
const updateProspecting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return Prospecting_1.default.findById(req.params.prospectingId)
        .populate('entreprises')
        .then((prospecting) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (prospecting) {
                const { requesterId, utilisateurIdAssigned, prospectingIdToAdding, prospectingIdToRemoved } = req.body;
                const regex = /\//gi;
                if (prospectingIdToAdding) {
                    let names = `${Object(prospecting).name}`;
                    let entreprises = Object(prospecting).entreprises;
                    let prospectingIdToUpdate = [];
                    let utilisateurAssigned = [];
                    prospectingIdToAdding.map((el, i) => __awaiter(void 0, void 0, void 0, function* () {
                        function isAlreadyExist(element) {
                            for (const item of Object(prospecting).name.split(' / ')) {
                                return element === item;
                            }
                        }
                        yield Prospecting_1.default.findById(el).then((prospectingFindedToAdd) => __awaiter(void 0, void 0, void 0, function* () {
                            if ((prospectingFindedToAdd === null || prospectingFindedToAdd === void 0 ? void 0 : prospectingFindedToAdd.name.split(' / ').findIndex(isAlreadyExist)) === -1 &&
                                Object(prospectingFindedToAdd).name.split(' / ').length === 1) {
                                Object(prospecting).name += ` / ${prospectingFindedToAdd === null || prospectingFindedToAdd === void 0 ? void 0 : prospectingFindedToAdd.name}`;
                                entreprises.push(...Object(prospectingFindedToAdd).entreprises);
                                names = names + ` / ${Object(prospectingFindedToAdd).name}`;
                                prospectingIdToUpdate.push(Object(prospectingFindedToAdd)._id);
                                [...Object(prospectingFindedToAdd).utilisateurAssigned].forEach((x, i) => {
                                    if (utilisateurAssigned.findIndex((element) => JSON.stringify(element) === JSON.stringify(x)) === -1) {
                                        utilisateurAssigned.push(Object(x));
                                    }
                                });
                                Object(prospecting).entreprises = [...entreprises];
                                Object(prospecting).utilisateurAssigned = [...utilisateurAssigned];
                                let counter = Object(prospecting).name.split(' / ').length;
                                prospectingIdToUpdate.every((el) => __awaiter(void 0, void 0, void 0, function* () {
                                    yield Prospecting_1.default.findById(el).then((prospectingFinded) => __awaiter(void 0, void 0, void 0, function* () {
                                        Object(prospectingFinded).name = names;
                                        Object(prospectingFinded).entreprises = [...entreprises];
                                        Object(prospectingFinded).utilisateurAssigned = [...utilisateurAssigned];
                                        yield (prospectingFinded === null || prospectingFinded === void 0 ? void 0 : prospectingFinded.save());
                                        counter++;
                                    }));
                                }));
                                counter === names.split(' / ').length &&
                                    (yield Object(prospecting).save(), res.status(200).json('Prospection was updated'));
                            }
                            else {
                                return res.status(400).json('already esxist or is an prospecting shared');
                            }
                        }));
                    }));
                }
                else if (prospectingIdToRemoved) {
                    yield Prospecting_1.default.findById(prospectingIdToRemoved)
                        .populate('entreprises')
                        .then((prospectingToRemoved) => __awaiter(void 0, void 0, void 0, function* () {
                        const usagerFinded = yield Usager_1.default.findById(Object(prospectingToRemoved).usagers).select('account');
                        if (usagerFinded) {
                            prospecting.name =
                                prospecting.name.split(' ').filter((el) => el !== (usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name.toUpperCase())).length === 2
                                    ? prospecting.name
                                        .split(' ')
                                        .filter((el) => el !== (usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name.toUpperCase()))
                                        .join(' ')
                                        .replace(regex, '')
                                        .trim()
                                    : prospecting.name
                                        .split(' ')
                                        .filter((el) => el !== (usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name.toUpperCase()))
                                        .join(' ')
                                        .trim();
                            Object(prospecting).entreprises = prospecting.entreprises.filter((el) => JSON.stringify(Object(el).usager) !== JSON.stringify(Object(usagerFinded)._id));
                            Object(prospectingToRemoved).name = Object(usagerFinded).account.name.toUpperCase();
                            Object(prospectingToRemoved).entreprises = Object(prospectingToRemoved).entreprises.filter((el) => JSON.stringify(Object(el).usager) === JSON.stringify(Object(usagerFinded)._id));
                            yield Object(prospectingToRemoved).save();
                            yield Object(prospecting).save();
                            Response_1.default.info('prospecting was updated');
                            return res.status(400).json('prospecting was updated');
                        }
                        else {
                            Response_1.default.error('usager was not found');
                            return res.status(400).json('usager was not found');
                        }
                    }));
                }
                else if (utilisateurIdAssigned) {
                    const prospectingsToAssigned = yield Prospecting_1.default.find({ name: prospecting.name });
                    if (utilisateurIdAssigned.length > Object(prospecting).utilisateurAssigned.length) {
                        let counter = prospectingsToAssigned.length - 1;
                        prospectingsToAssigned.map((prospecting) => __awaiter(void 0, void 0, void 0, function* () {
                            prospecting.utilisateurAssigned = utilisateurIdAssigned;
                            yield prospecting.save();
                            utilisateurIdAssigned.map((element) => __awaiter(void 0, void 0, void 0, function* () {
                                let newArray = [];
                                const utilisateurFound = yield Utilisateur_1.default.findById(element)
                                    .populate('prospectings')
                                    .select('prospectings account');
                                newArray = Object(utilisateurFound).prospectings;
                                if (newArray.some((prospectingFound) => Object(prospectingFound).name === prospecting.name) === false) {
                                    newArray.push(Object(prospecting));
                                    Object(utilisateurFound).prospectings = newArray;
                                    yield Object(utilisateurFound).save();
                                }
                            }));
                            if (counter !== 0) {
                                counter--;
                            }
                            else {
                                Response_1.default.info(`Prospecting ${prospecting.name} was assigned`);
                                return res.status(200).json({ message: 'Prospecting assigned', prospecting });
                            }
                        }));
                    }
                    else if (utilisateurIdAssigned.length < Object(prospecting).utilisateurAssigned.length) {
                        let arrayIdToDelete = [];
                        let counter = prospecting.utilisateurAssigned.length;
                        prospecting.utilisateurAssigned.map((el) => {
                            utilisateurIdAssigned.findIndex((id) => JSON.stringify(id) === JSON.stringify(el)) === -1 &&
                                arrayIdToDelete.push(el);
                            counter--;
                            if (counter === 0) {
                                arrayIdToDelete.map((elToDelete) => __awaiter(void 0, void 0, void 0, function* () {
                                    const UtilisateurAffiliatedToDelete = yield Utilisateur_1.default.findById(elToDelete)
                                        .populate('prospectings')
                                        .select('prospectings usagers account');
                                    function isAlreadyExist(prospecting) {
                                        for (const usagers of Object(UtilisateurAffiliatedToDelete).usagers) {
                                            return JSON.stringify(Object(prospecting).usagers) === JSON.stringify(usagers);
                                        }
                                    }
                                    if (prospectingsToAssigned.findIndex(isAlreadyExist) === -1) {
                                        Object(UtilisateurAffiliatedToDelete).prospectings = UtilisateurAffiliatedToDelete === null || UtilisateurAffiliatedToDelete === void 0 ? void 0 : UtilisateurAffiliatedToDelete.prospectings.filter((el) => Object(el).name !== prospecting.name);
                                    }
                                    yield Object(UtilisateurAffiliatedToDelete).save();
                                }));
                            }
                        });
                        prospectingsToAssigned.map((prospectingReturn) => __awaiter(void 0, void 0, void 0, function* () {
                            prospectingReturn.utilisateurAssigned = utilisateurIdAssigned;
                            yield prospectingReturn.save();
                        }));
                        Response_1.default.info('return with less length');
                        return res.status(200).json({ message: 'return with less length' });
                    }
                    else {
                        Response_1.default.info('return with same length');
                        return res.status(200).json({ message: 'return with same length' });
                    }
                }
                else {
                    return res.status(200).json('returned without updating');
                }
            }
            else {
                return res.status(404).json({ message: 'The prospecting was not found' });
            }
        }
        catch (error) {
            Response_1.default.error({ message: 'Error catched', error: error });
            return res.status(500).json({ message: 'Error catched', error: error });
        }
    }));
});
const deleteProspecting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prospectingId = req.params.prospectingId;
    return Prospecting_1.default.findByIdAndDelete(prospectingId)
        .then((prospecting) => prospecting ? res.status(200).json({ message: 'Prospecting is deleted' }) : res.status(404).json({ message: 'Not found' }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
exports.default = { createProspecting, readProspecting, readAllByUtilisateur, readAllByEtablissement, updateProspecting, deleteProspecting };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvc3BlY3RpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvUHJvc3BlY3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtRUFBeUM7QUFFekMsd0VBQWdEO0FBQ2hELDhEQUFzQztBQUN0QyxzRUFBOEM7QUFDOUMsa0RBQTBCO0FBQzFCLGtFQUEwQztBQUMxQyx3RUFBZ0Q7QUFDaEQsNEVBQW9EO0FBSXBELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxNQUFNLGlCQUFpQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDaEYsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFFdkUsTUFBTSxZQUFZLEdBQUcsTUFBTSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR2hFLE1BQU0sT0FBTyxHQUFHO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxHQUFHLEVBQUUsNEJBQTRCO1lBQ2pDLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBRTtZQUNoRSxJQUFJLEVBQUUsSUFBSSxlQUFlLENBQUM7Z0JBQ3RCLFVBQVUsRUFBRSxvQkFBb0I7Z0JBQ2hDLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUU7Z0JBQy9DLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUU7YUFDMUQsQ0FBQztTQUNMLENBQUM7UUFHRixlQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FB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