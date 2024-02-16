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
const uid2 = require('uid2');
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const EtablissementData_1 = require("../functions/EtablissementData");
const Response_1 = __importDefault(require("../library/Response"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const createEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, adress, zip, location, city, admin } = req.body;
    const etablissementAlreadyExist = yield Etablissement_1.default.findOne({ name: name });
    const etablissementArchived = yield axios_1.default.get(`${config_1.default.mongooseUrlArchived}/etablissement/get/?name=${name}`);
    const etablissement = new Etablissement_1.default({
        name,
        adress,
        zip,
        location,
        city,
        token: uid2(26)
    });
    if (!admin) {
        Response_1.default.error('admin not found');
        return res.status(401).json({ message: 'admin not found' });
    }
    else {
        if (!name || !adress || !zip || !city) {
            Response_1.default.error('some values is missed');
            return res.status(422).json({ message: 'some values is missed' });
        }
        else {
            if (etablissementAlreadyExist) {
                Response_1.default.error('etablissement already exist');
                return res.status(400).json({ message: 'etablissement already exist' });
            }
            else {
                if (!etablissementArchived.data.etablissement) {
                    (0, EtablissementData_1.DataCreateEtablissement)(admin === null || admin === void 0 ? void 0 : admin.datas[0].mounths[0], etablissement._id);
                    yield (admin === null || admin === void 0 ? void 0 : admin.save());
                    Response_1.default.info('etablissement has been created');
                    return etablissement
                        .save()
                        .then((etablissement) => ((0, EtablissementData_1.DataCreateEtablissement)(admin === null || admin === void 0 ? void 0 : admin.datas[0].mounths[0], etablissement._id),
                        res.status(201).json({ etablissement: etablissement })))
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
                else {
                    const newEtablissement = new Etablissement_1.default({
                        _id: etablissementArchived.data.etablissement._id,
                        name: etablissementArchived.data.etablissement.name,
                        adress: etablissementArchived.data.etablissement.adress,
                        zip: etablissementArchived.data.etablissement.zip,
                        city: etablissementArchived.data.etablissement.city,
                        location: etablissementArchived.data.etablissement.location,
                        logo: etablissementArchived.data.etablissement.logo,
                        collectivities: etablissementArchived.data.etablissement.collectivities,
                        conventions: etablissementArchived.data.etablissement.conventions,
                        utilisateurs: etablissementArchived.data.etablissement.utilisateurs,
                        partenaire: etablissementArchived.data.etablissement.partenaire,
                        usagers: etablissementArchived.data.etablissement.usagers,
                        entreprises: etablissementArchived.data.etablissement.entreprises,
                        conventionArchiveds: etablissementArchived.data.etablissement.conventionArchiveds,
                        utillisateurArchiveds: etablissementArchived.data.etablissement.utillisateurArchiveds,
                        UsagerOuts: etablissementArchived.data.etablissement.UsagerOuts,
                        collectivitiesArchived: etablissementArchived.data.etablissement.collectivitiesArchived,
                        token: etablissementArchived.data.etablissement.token
                    });
                    (0, EtablissementData_1.DataCreateEtablissement)(admin === null || admin === void 0 ? void 0 : admin.datas[0].mounths[0], newEtablissement._id);
                    yield admin.save();
                    Response_1.default.info('etablissement has been created');
                    return etablissement
                        .save()
                        .then((etablissement) => res.status(201).json({ message: 'The etablissement returned from the archiveds', etablissement: etablissement }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    }
});
const readEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const etablissement = yield Etablissement_1.default.findById(req.params.etablissementId).populate('conventions utilisateurs collectivities');
        if (!etablissement) {
            Response_1.default.error('Etablissement has been not found');
            return res.status(404).json({ message: 'Etablissement has been not found' });
        }
        else {
            if (adminFinded) {
                (0, EtablissementData_1.ReadEtablissement)(Object(adminFinded === null || adminFinded === void 0 ? void 0 : adminFinded.datas[0].mounths[0]), Object(etablissement._id));
                Response_1.default.info('etablissement has been readed');
                return res.send(etablissement);
            }
            else if (utilisateurFinded) {
                (0, EtablissementData_1.ReadEtablissement)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(etablissement._id));
                Response_1.default.info('etablissement has been readed');
                return res.send({ etablissement: etablissement });
            }
            else {
                Response_1.default.error('Requester has been not found');
                return res.status(404).json({ message: 'Requester has been not found' });
            }
        }
    }
    catch (error) {
        Response_1.default.error('error catched');
        return res.status(500).json({ error: 'error catched' });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Etablissement_1.default.find().countDocuments();
    Response_1.default.info('All Etablissement have been consulted');
    return Etablissement_1.default.find()
        .select('_id name adress zip city')
        .then((etablissements) => res.status(200).json({ count: count, etablissements: etablissements }))
        .catch((error) => {
        Response_1.default.error('error catched'), res.status(500).json({ error: error.message });
    });
});
const updateEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
    const etablissementFinded = yield Etablissement_1.default.findById(req.params.etablissementId);
    if (etablissementFinded) {
        etablissementFinded.set(req.body);
        Response_1.default.info('The Etablissement has been updated');
        return etablissementFinded
            .save()
            .then((etablissement) => {
            (0, EtablissementData_1.UpdateEtablissement)(Object(adminFinded === null || adminFinded === void 0 ? void 0 : adminFinded.datas[0].mounths[0]), Object(etablissementFinded._id)),
                res.status(201).json({ etablissement: etablissement });
        })
            .catch((error) => {
            Response_1.default.info('Error catched'), res.status(500).json({ message: 'Error catched', error: error.message });
        });
    }
    else {
        return res.status(404).json({ message: 'Not found' });
    }
});
const deleteEtablissement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const etablissement = yield Etablissement_1.default.findById(req.params.etablissementId);
        if (!etablissement) {
            Response_1.default.error('etablissement has been not found');
            return res.status(404).json({ message: 'etablissement has been not found' });
        }
        else {
            const adminFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
            const newEtablissementArchived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/etablissement/create`, {
                _id: etablissement._id,
                name: etablissement.name,
                adress: etablissement.adress,
                zip: etablissement.zip,
                city: etablissement.city,
                conventions: etablissement.conventions,
                utilisateurs: etablissement.utilisateurs,
                partenaire: etablissement.partenaire,
                usagers: etablissement.usagers,
                entreprises: etablissement.entreprises,
                conventionArchiveds: etablissement.conventionArchiveds,
                utillisateurArchiveds: etablissement.utillisateurArchiveds,
                UsagerOuts: etablissement.UsagerOuts,
                token: etablissement.token
            });
            if (newEtablissementArchived.data.message === 'etablissement has been archived') {
                (0, EtablissementData_1.DeleteEtablissement)(Object(adminFinded === null || adminFinded === void 0 ? void 0 : adminFinded.datas[0].mounths[0]), Object(etablissement)._id);
                yield (etablissement === null || etablissement === void 0 ? void 0 : etablissement.deleteOne().then(() => {
                    Response_1.default.info('The etablissement has been deleted'), res.status(200).json({ message: 'The etablissement has been deleted' });
                }));
            }
            else {
                Response_1.default.warn('Something went wrong in the archives');
                res.status(200).json('Something went wrong in the archives');
            }
        }
    }
    catch (error) {
        Response_1.default.error('error catched');
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
});
exports.default = { createEtablissement, readEtablissement, readAll, updateEtablissement, deleteEtablissement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXRhYmxpc3NlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9FdGFibGlzc2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBSTdCLDRFQUFvRDtBQUNwRCx3RUFBZ0Q7QUFHaEQsc0VBQXNJO0FBR3RJLG1FQUF5QztBQUN6QyxrREFBMEI7QUFDMUIsOERBQXNDO0FBR3RDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNsRixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQzlELE1BQU0seUJBQXlCLEdBQUcsTUFBTSx1QkFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0JBQU0sQ0FBQyxtQkFBbUIsNEJBQTRCLElBQUksRUFBRSxDQUFDLENBQUM7SUFJL0csTUFBTSxhQUFhLEdBQUcsSUFBSSx1QkFBYSxDQUFDO1FBQ3BDLElBQUk7UUFDSixNQUFNO1FBQ04sR0FBRztRQUNILFFBQVE7UUFDUixJQUFJO1FBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbEIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1Qsa0JBQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGlC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