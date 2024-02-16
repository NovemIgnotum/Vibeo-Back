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
const axios_1 = __importDefault(require("axios"));
const EntrepriseData_1 = require("../functions/EntrepriseData");
const cloudinary_1 = __importDefault(require("cloudinary"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const DataEntreprise_1 = __importDefault(require("../models/DataEntreprise"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const Response_1 = __importDefault(require("../library/Response"));
const config_1 = __importDefault(require("../config/config"));
const createEntreprise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { society, currentName, siret, adress, zip, city, adressComplement, activityarea, administratifStateOpen, headquartersSociety, numberOfEmployed, codeNAF, details, comments } = req.body;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const etablissementFinded = yield Etablissement_1.default.findById(req.params.etablissementId);
        if (!etablissementFinded) {
            return res.status(401).json({ error: 'etablissement has been not found' });
        }
        else {
            if ((!society && !currentName) || !siret || !adress || !zip || !city) {
                return res.status(400).json({ message: 'One or more values are missing' });
            }
            else {
                const entrepriseFinded = yield Entreprise_1.default.findOne({ siret: siret });
                let location = {};
                const response = yield axios_1.default.get(`https://api-adresse.data.gouv.fr/search/?q=${adress} ${city} ${zip}`);
                if (response) {
                    location = {
                        lng: response.data.features[0].geometry.coordinates[0],
                        lat: response.data.features[0].geometry.coordinates[1]
                    };
                }
                const dateNow = new Date();
                const newDataEntreprise = new DataEntreprise_1.default({
                    month: dateNow.getMonth() + 1
                });
                if (!Object(req.files).file) {
                    const entreprise = new Entreprise_1.default({
                        society,
                        currentName,
                        siret,
                        adressLabel: `${adress} ${zip} ${city}`,
                        adress,
                        zip,
                        location,
                        city,
                        adressComplement,
                        activityarea,
                        administratifStateOpen,
                        headquartersSociety,
                        numberOfEmployed,
                        codeNAF,
                        details,
                        datas: { year: dateNow.getFullYear() },
                        comments
                    });
                    if (!entreprise) {
                        return res.status(400).json({ message: "entreprise aren't created" });
                    }
                    else {
                        if (entrepriseFinded) {
                            return res.status(400).json({ message: 'entreprise already exist', entreprise: entrepriseFinded });
                        }
                        else {
                            if (!utilisateurFinded) {
                                return res.status(400).json({ message: 'utilisateur has been not finded' });
                            }
                            else {
                                entreprise.datas[0].mounths.push(newDataEntreprise._id);
                                yield newDataEntreprise.save();
                                (0, EntrepriseData_1.createEntrepriseForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), entreprise._id);
                                etablissementFinded.entreprises.push(Object(entreprise));
                                yield etablissementFinded.save();
                                return entreprise
                                    .save()
                                    .then((entreprise) => res.status(201).json({ messsage: 'entreprise is created', entreprise: entreprise }))
                                    .catch((error) => res.status(500).json({ error: error.message }));
                            }
                        }
                    }
                }
                else {
                    const path = Object(req.files).file[0].path;
                    const result = yield cloudinary_1.default.v2.uploader.upload(path);
                    const entreprise = new Entreprise_1.default({
                        society,
                        currentName,
                        siret,
                        adressLabel: `${adress} ${zip} ${city}`,
                        adress,
                        zip,
                        location,
                        logo: result && result.secure_url,
                        city,
                        activityarea,
                        administratifStateOpen,
                        headquartersSociety,
                        numberOfEmployed,
                        codeNAF,
                        details,
                        datas: { year: dateNow.getFullYear() },
                        comments
                    });
                    if (entrepriseFinded) {
                        return res.status(400).json({ message: 'entreprise already exist', entreprise: entrepriseFinded });
                    }
                    else {
                        if (!entreprise) {
                            return res.status(400).json({ message: "entreprise aren't created" });
                        }
                        else {
                            if (!utilisateurFinded) {
                                return res.status(400).json({ message: 'utilisateur has been not finded' });
                            }
                            else {
                                entreprise.datas[0].mounths.push(newDataEntreprise._id);
                                yield newDataEntreprise.save();
                                (0, EntrepriseData_1.createEntrepriseForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(entreprise._id));
                                etablissementFinded.entreprises.push(Object(entreprise));
                                yield etablissementFinded.save();
                                return entreprise
                                    .save()
                                    .then((entreprise) => res.status(201).json({ messsage: 'entreprise is created', entreprise: entreprise }))
                                    .catch((error) => res.status(500).json({ error: error.message }));
                            }
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
const readEntreprise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entrepriseId = req.params.entrepriseId;
    const requesterId = req.headers.requesterid;
    const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
    if (!utilisateurFinded) {
        return res.status(400).json({ message: 'utilisteur not finded' });
    }
    else {
        (0, EntrepriseData_1.readEntrepriseForExtracting)(utilisateurFinded.datas[0].mounths[0], Object(entrepriseId));
        return Entreprise_1.default.findById(entrepriseId)
            .populate('interlocutors workStations missions')
            .populate({
            path: 'interlocutors',
            model: 'Interlocutor',
            populate: {
                path: 'contacts'
            }
        })
            .then((entreprise) => entreprise ? res.status(200).json({ message: entreprise }) : res.status(404).json({ message: 'Entreprise not found' }))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield Entreprise_1.default.countDocuments();
        const entreprises = yield Entreprise_1.default.find();
        return res.status(200).json({ count: count, message: entreprises });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const readAllByEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sort = {};
        let limit = 100;
        let page = Number(req.query.page);
        if (!page) {
            page = 1;
        }
        const requesterFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const etablissementFinded = yield Etablissement_1.default.findById(Object(requesterFinded).etablissement);
        const count = (yield Entreprise_1.default.find({ _id: Object(etablissementFinded).entreprises })).length;
        const entreprisesFinded = yield Entreprise_1.default.find({ _id: Object(etablissementFinded).entreprises })
            .populate('interlocutors')
            .skip(Number(page * limit) - 1 * limit)
            .limit(limit)
            .sort(sort);
        if (!etablissementFinded) {
            Response_1.default.error('requester was not found');
            return res.status(400).json('requester was not found');
        }
        else {
            if (req.query.sort === 'date-desc') {
                sort = { updatedAt: 'desc' };
            }
            else if (req.query.sort === 'date-asc') {
                sort = { updatedAt: 'asc' };
            }
            if (req.query.society) {
                return res.status(200).json({
                    count: entreprisesFinded.filter(({ society }) => society.match(new RegExp(`^${req.query.society}`, 'gi'))).length,
                    entreprises: entreprisesFinded.filter(({ society }) => society.match(new RegExp(`^${req.query.society}`, 'gi')))
                });
            }
            else if (req.query.adressLabel) {
                return res.status(200).json({
                    count: entreprisesFinded.filter(({ adressLabel }) => adressLabel.match(new RegExp(`${req.query.adressLabel}`, 'gi'))).length,
                    entreprises: entreprisesFinded.filter(({ adressLabel }) => adressLabel.match(new RegExp(`${req.query.adressLabel}`, 'gi')))
                });
            }
            else if (req.query.interlocutor) {
                return res.status(200).json({
                    count: entreprisesFinded.filter((entreprise) => entreprise.interlocutors.find((interlocutor) => Object(interlocutor).account.name.match(new RegExp(`^${req.query.interlocutor}`, 'gi')))).length,
                    entreprises: entreprisesFinded.filter((entreprise) => entreprise.interlocutors.find((interlocutor) => Object(interlocutor).account.name.match(new RegExp(`^${req.query.interlocutor}`, 'gi'))))
                });
            }
            else {
                return res.status(200).json({ companiesRemaining: count - (Number(page * limit) - 1 * limit), entreprises: entreprisesFinded });
            }
        }
    }
    catch (error) {
        console.error({ error: error });
        return res.status(400).json({ error: error });
    }
});
const updateEntreprise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entrepriseId = req.params.entrepriseId;
    const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
    if (!utilisateurFinded) {
        return res.status(400).json({ message: 'Utilisateur has been not found' });
    }
    else {
        return Entreprise_1.default.findById(entrepriseId).then((entreprise) => __awaiter(void 0, void 0, void 0, function* () {
            if (entreprise) {
                if (Object(req.files).file) {
                    const path = Object(req.files).file[0].path;
                    const result = yield cloudinary_1.default.v2.uploader.upload(path);
                    entreprise.set({ logo: result.secure_url });
                    (0, EntrepriseData_1.updateEntrepriseForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(entrepriseId));
                    return entreprise
                        .save()
                        .then((entreprise) => res.status(201).json({ message: 'Image has been uploaded', entreprise: entreprise }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
                else {
                    if (req.body.adress) {
                        if (!req.body.adress || !req.body.zip || !req.body.zip) {
                            return res.status(400).json({ message: 'adress , city and zip is required' });
                        }
                        else {
                            let location = {};
                            const response = yield axios_1.default.get(`https://api-adresse.data.gouv.fr/search/?q=${req.body.adress} ${req.body.city} ${req.body.zip}`);
                            if (response) {
                                location = {
                                    lng: response.data.features[0].geometry.coordinates[0],
                                    lat: response.data.features[0].geometry.coordinates[1]
                                };
                            }
                            entreprise.set({
                                adressLabel: `${req.body.adress} ${req.body.zip} ${req.body.city} `,
                                adress: req.body.adress,
                                city: req.body.city,
                                zip: req.body.zip,
                                location: location
                            });
                            (0, EntrepriseData_1.updateEntrepriseForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(entrepriseId));
                            return entreprise
                                .save()
                                .then((entreprise) => res.status(201).json({ messgae: 'Entreprise has been updated', entreprise: entreprise }))
                                .catch((error) => res.status(500).json({ error: error.message }));
                        }
                    }
                    else {
                        entreprise.set(req.body);
                        (0, EntrepriseData_1.updateEntrepriseForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(entrepriseId));
                        return entreprise
                            .save()
                            .then((entreprise) => res.status(201).json({ messgae: 'Entreprise has been updated', entreprise: entreprise }))
                            .catch((error) => res.status(500).json({ error: error.message }));
                    }
                }
            }
            else {
                res.status(404).json({ message: 'Entreprise has been not found' });
            }
        }));
    }
});
const deleteEntreprise = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const entrepriseId = req.params.entrepriseId;
    const requesterId = req.body;
    const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId.admin._id);
    const entrepriseFinded = yield Entreprise_1.default.findById(entrepriseId);
    if (!entrepriseFinded) {
        return res.status(400).json({ error: 'the entreprise has been not found' });
    }
    else {
        const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/entreprise/create`, {
            society: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.society,
            currentName: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.currentName,
            siret: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.siret,
            adressLabel: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.adressLabel,
            adress: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.adress,
            adressComplement: entrepriseFinded.adressComplement,
            zip: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.zip,
            lng: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.location.lng,
            lat: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.location.lat,
            city: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.city,
            logo: entrepriseFinded.logo,
            activityArea: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.activityArea,
            administratifStateOpen: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.administratifStateOpen,
            headquartersSociety: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.headquartersSociety,
            numberOfEmployed: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.numberOfEmployed,
            codeNAF: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.codeNAF,
            details: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.details,
            comments: entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.comments,
            activityarea: entrepriseFinded.activityArea,
            interlocutors: entrepriseFinded.interlocutors,
            workStations: entrepriseFinded.workStations,
            missions: entrepriseFinded.missions,
            events: entrepriseFinded.events,
            datas: entrepriseFinded.datas,
            employmentContracts: entrepriseFinded.employmentContracts,
            interlocutorsArchiveds: entrepriseFinded.interlocutorsArchiveds,
            workStationsArchiveds: entrepriseFinded.workStationsArchiveds,
            missionsArchived: entrepriseFinded.missionsArchived,
            eventsManagements: entrepriseFinded.eventsManagements
        });
        if (archive.data.message === 'entreprise is archived' || archive.data.message === 'entreprise updated in the archive') {
            (0, EntrepriseData_1.deleteEntrepriseForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(entrepriseId));
            yield entrepriseFinded.deleteOne();
            Response_1.default.info('The entreprise has been deleted');
            return res.status(200).json({ message: 'The entreprise has been deleted' });
        }
        else {
            Response_1.default.warn('Something went wrong in archive');
            return res.status(400).json({ message: 'Something went wrong in archive' });
        }
    }
});
const fetchSiretEntreprise = (req, res, next) => {
    try {
        const siret = req.params.siret;
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
                let entreprise = {};
                (() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        entreprise = yield axios_1.default.get(`https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`, {
                            headers: {
                                Authorization: `Bearer ${response.data.access_token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                    }
                    catch (err) {
                        Response_1.default.error(`Error 404... entreprise ${siret} not found`);
                        console.error(Object(err).data);
                    }
                    finally {
                        if (Object(entreprise).data === undefined) {
                            Response_1.default.error('error catched');
                            return res.status(204).json({ message: 'error catched' });
                        }
                        else {
                            let codes = [
                                { code: 'NN', value: 'Unité non employeuse' },
                                { code: 0, value: ' 0 salarié' },
                                { code: 1, value: '1 ou 2 salariés' },
                                { code: 2, value: '3 à 5 salariés' },
                                { code: 3, value: '6 à 9 salariés' },
                                { code: 11, value: '10 à 19 salariés' },
                                { code: 12, value: '20 à 49 salariés' },
                                { code: 21, value: '50 à 99 salariés' },
                                { code: 22, value: '100 à 199 salariés' },
                                { code: 31, value: '200 à 249 salariés' },
                                { code: 32, value: '250 à 499 salariés' },
                                { code: 41, value: '500 à 999 salariés' },
                                { code: 42, value: '1 000 à 1 999 salariés' },
                                { code: 51, value: '2 000 à 4 999 salariés' },
                                { code: 52, value: '5 000 à 9 999 salariés' },
                                { code: 53, value: '10 000 salariés et plus' }
                            ];
                            const entrepriseFinded = yield Entreprise_1.default.findOne({ siret: siret });
                            entrepriseFinded
                                ? Response_1.default.info(`entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} already exist`)
                                : Response_1.default.info(`entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} does'nt exist`);
                            return res.status(200).json({
                                entrepriseFinded: entrepriseFinded
                                    ? `entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} already exist`
                                    : `entreprise ${Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale} does'nt exist`,
                                etablissement: {
                                    society: Object(entreprise).data.etablissement.uniteLegale.denominationUniteLegale,
                                    currentName: Object(entreprise).data.etablissement.uniteLegale.denominationUsuelle1UniteLegale === null
                                        ? Object(entreprise).data.etablissement.periodesEtablissement[0].enseigne1Etablissement
                                        : Object(entreprise).data.etablissement.uniteLegale.denominationUsuelle1UniteLegale,
                                    siret,
                                    adressLabel: `${Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement === null
                                        ? ''
                                        : Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement} ${Object(entreprise).data.etablissement.adresseEtablissement.typeVoieEtablissement} ${Object(entreprise).data.etablissement.adresseEtablissement.libelleVoieEtablissement} ${Object(entreprise).data.etablissement.adresseEtablissement.codePostalEtablissement} ${Object(entreprise).data.etablissement.adresseEtablissement.libelleCommuneEtablissement}`.trim(),
                                    adress: `${Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement === null
                                        ? ''
                                        : Object(entreprise).data.etablissement.adresseEtablissement.numeroVoieEtablissement} ${Object(entreprise).data.etablissement.adresseEtablissement.typeVoieEtablissement} ${Object(entreprise).data.etablissement.adresseEtablissement.libelleVoieEtablissement}`.trim(),
                                    zip: `${Object(entreprise).data.etablissement.adresseEtablissement.codePostalEtablissement}`,
                                    city: `${Object(entreprise).data.etablissement.adresseEtablissement.libelleCommuneEtablissement}`,
                                    adressComplement: `${Object(entreprise).data.etablissement.adresseEtablissement.complementAdresseEtablissement}`,
                                    administratifStateOpen: `${Object(entreprise).data.etablissement.periodesEtablissement[0].dateFin === null ? true : false}`,
                                    headquartersSociety: `${Object(entreprise).data.etablissement.etablissementSiege}`,
                                    numberOfEmployed: Object(entreprise).data.etablissement.trancheEffectifsEtablissement !== 'NN'
                                        ? `${codes[codes.findIndex((code) => code.code === Number(Object(entreprise).data.etablissement.trancheEffectifsEtablissement))].value}`
                                        : 'Unité non employeuse',
                                    codeNAF: `${Object(entreprise).data.etablissement.uniteLegale.activitePrincipaleUniteLegale}`
                                }
                            });
                        }
                    }
                }))();
            });
        });
    }
    catch (error) {
        console.error({
            message: 'error catched',
            error: {
                message: Object(error).message,
                method: Object(error).config.method,
                url: Object(error).config.url,
                code: Object(error).code
            }
        });
        return res.status(500).json({
            message: 'error catched',
            error: {
                message: Object(error).message,
                method: Object(error).config.method,
                url: Object(error).config.url,
                code: Object(error).code
            }
        });
    }
};
exports.default = { createEntreprise, readEntreprise, readAll, readAllByEtablissement, updateEntreprise, deleteEntreprise, fetchSiretEntreprise };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50cmVwcmlzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9FbnRyZXByaXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLGdFQUtxQztBQUNyQyw0REFBb0M7QUFHcEMsc0VBQThDO0FBQzlDLHdFQUFnRDtBQUNoRCw4RUFBc0Q7QUFDdEQsNEVBQW9EO0FBRXBELG1FQUF5QztBQUN6Qyw4REFBc0M7QUFFdEMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQy9FLElBQUksQ0FBQztRQUNELE1BQU0sRUFDRixPQUFPLEVBQ1AsV0FBVyxFQUNYLEtBQUssRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILElBQUksRUFDSixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxPQUFPLEVBQ1AsUUFBUSxFQUNYLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNiLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFL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