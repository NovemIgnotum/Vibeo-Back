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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Data_1 = __importDefault(require("../models/Data"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const Logging_1 = __importDefault(require("../library/Logging"));
const Utilisateur_2 = require("../functions/Utilisateur");
const Response_1 = __importDefault(require("../library/Response"));
const createUtilisateur = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, firstname, mobileNum, male, password, passwordConfirmed, isAdmin, autorisations } = req.body;
        const etablissementFinded = yield Etablissement_1.default.findById(req.params.etablissementId);
        const adminFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
        const token = uid2(26);
        const salt = uid2(26);
        const hash = SHA256(password + salt).toString(encBase64);
        const dateNow = new Date();
        const newData = new Data_1.default({
            month: dateNow.getMonth() + 1
        });
        const utilisateur = new Utilisateur_1.default({
            email,
            account: {
                male,
                name,
                firstname,
                mobileNum
            },
            datas: { year: dateNow.getFullYear() },
            admin: isAdmin,
            autorisations,
            etablissement: etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded._id,
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
            token,
            salt,
            hash
        });
        if (!etablissementFinded || !adminFinded) {
            Response_1.default.error('Etablissement or Admin has been not found');
            return res.status(404).json({ message: 'Etablissement or Admin has been not found' });
        }
        else {
            if (!email || !name || !firstname || !mobileNum || !isAdmin) {
                Response_1.default.error(`One or more values are missing`);
                return res.status(400).json({ message: 'One or more values are missing' });
            }
            else {
                if (password !== passwordConfirmed) {
                    Response_1.default.error('the passwords are not similar !');
                    return res.status(400).json({ message: 'the passwords are not similar !' });
                }
                else {
                    const alreadyExist = yield Utilisateur_1.default.findOne({ email: email });
                    if (!alreadyExist) {
                        utilisateur.datas[0].mounths.push(newData._id);
                        yield newData.save();
                        yield utilisateur.save();
                        etablissementFinded.utilisateurs.push(Object(utilisateur));
                        (0, Utilisateur_2.createUtilisateurForExtracting)(Object(adminFinded.datas[0].mounths[0]), Object(utilisateur._id));
                        yield etablissementFinded.save();
                        Logging_1.default.info(`The utilisateur ${utilisateur.account.firstname} ${utilisateur.account.name} has been created`);
                        Response_1.default.log(`The utilisateur ${utilisateur.account.firstname} ${utilisateur.account.name} has been created`);
                        return res.status(201).json({
                            message: `The utilisateur ${utilisateur.account.firstname} ${utilisateur.account.name} has been created`,
                            Utilisateur: utilisateur
                        });
                    }
                    else {
                        Response_1.default.warn('utilisateur already exist');
                        return res.status(403).json({ message: 'utilisateur already exist' });
                    }
                }
            }
        }
    }
    catch (error) {
        if (typeof error === 'string') {
            error.toUpperCase();
        }
        else if (error instanceof Error) {
            error.message;
        }
    }
});
const readUtilisateur = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurId = req.params.utilisateurId;
    const requesterFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
    try {
        const utilisateurFinded = yield Utilisateur_1.default.findById(utilisateurId);
        if (!utilisateurFinded || !requesterFinded) {
            return res.status(404).json({ message: 'utilisateur or Requester has been not found' });
        }
        else {
            (0, Utilisateur_2.readUtilisateurForExtracting)(Object(requesterFinded === null || requesterFinded === void 0 ? void 0 : requesterFinded.datas[0].mounths[0]), Object(utilisateurFinded));
            return res.status(200).json({ message: utilisateurFinded });
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurs = yield Utilisateur_1.default.find();
        const counter = yield Utilisateur_1.default.countDocuments();
        let tab = [];
        utilisateurs.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
            const etablissementFinded = yield Etablissement_1.default.findOne({ utilisateurs: item._id }).select('_id name');
            tab.push({
                utilisateur: item,
                etablissement: etablissementFinded
            });
            if (tab.length === utilisateurs.length) {
                return res.status(200).json({ count: counter, utilisateurs: tab });
            }
        }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const updateUtilisateur = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const utilisateurId = req.params.utilisateurId;
    const adminFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
    if (!adminFinded) {
        return res.status(404).json({ error: 'admin has been not found' });
    }
    else {
        return yield Utilisateur_1.default.findById(utilisateurId).then((utilisateur) => __awaiter(void 0, void 0, void 0, function* () {
            if (!utilisateur) {
                return res.status(404).json({ message: 'the utilisateur has been not found' });
            }
            else {
                if (req.body.account) {
                    utilisateur.account = req.body.account;
                }
                else if (req.body.password) {
                    if (req.body.password !== req.body.passwordConfirmed) {
                        return res.status(401).json({ error: 'password and passwordConfirmed arent similare' });
                    }
                    else {
                        const newHash = SHA256(req.body.password + utilisateur.salt).toString(encBase64);
                        utilisateur.hash = newHash;
                    }
                }
                if (req.body.isAdmin) {
                    utilisateur.admin = req.body.isAdmin;
                }
                (0, Utilisateur_2.updateUtilisateurForExtracting)(Object(adminFinded.datas[0].mounths[0]), Object(utilisateur._id));
                return utilisateur
                    .save()
                    .then((utilisateur) => res.status(201).json({ message: 'Utilisateur updated', utilisateur: utilisateur }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }));
    }
});
const deleteUtilisateur = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.params.utilisateurId);
        const requesterFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
        if (!utilisateurFinded || !requesterFinded) {
            return res.status(400).json({ message: 'utilisateur or the requester has been not found' });
        }
        else {
            const archive = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/utilisateur/create/`, {
                _id: utilisateurFinded._id,
                male: utilisateurFinded.account.male,
                email: utilisateurFinded.email,
                name: utilisateurFinded.account.name,
                firstname: utilisateurFinded.account.firstname,
                mobileNum: utilisateurFinded.account.mobileNum,
                datas: utilisateurFinded.datas,
                admin: utilisateurFinded.admin,
                appointment: utilisateurFinded.appointments,
                autorisations: utilisateurFinded.autorisations,
                token: utilisateurFinded.token,
                salt: utilisateurFinded.salt,
                hash: utilisateurFinded.hash
            });
            if (archive.data.message ===
                `The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been created` ||
                archive.data.message === `The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been updated`) {
                yield Etablissement_1.default.findOne({ utilisateurs: utilisateurFinded._id }).then((etablissement) => {
                    const newArray = etablissement === null || etablissement === void 0 ? void 0 : etablissement.utilisateurs.filter((el) => JSON.stringify(el) !== JSON.stringify(utilisateurFinded._id));
                    Object(etablissement).utilisateurs = newArray;
                    Object(etablissement).save();
                });
                (0, Utilisateur_2.deleteUtilisateurForExtracting)(Object(requesterFinded.datas[0].mounths[0]), Object(utilisateurFinded._id));
                yield utilisateurFinded.deleteOne();
                Response_1.default.info(`The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been created`);
                return res
                    .status(200)
                    .json({ message: `The utilisateur ${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} has been created` });
            }
            else {
                Response_1.default.info('the Utilisateur was not archived');
                return res.status(400).json({ message: 'the Utilisateur was not archived' });
            }
        }
    }
    catch (error) {
        Response_1.default.error('Error catched');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
});
exports.default = { createUtilisateur, readUtilisateur, readAll, updateUtilisateur, deleteUtilisateur };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGlzYXRldXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvVXRpbGlzYXRldXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMzQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0Isa0RBQTBCO0FBQzFCLDhEQUFzQztBQUd0Qyx3RUFBZ0Q7QUFDaEQsMERBQWtDO0FBQ2xDLDRFQUFvRDtBQUdwRCxpRUFBeUM7QUFDekMsMERBS2tDO0FBQ2xDLG1FQUF5QztBQUV6QyxNQUFNLGlCQUFpQixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDaEYsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2xILE1BQU0sbUJBQW1CLEdBQUcsTUFBTSx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sV0FBVyxHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkUsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixNQUFNLElBQUksR0FBVyxNQUFNLENBQUMsUUFB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