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
const Contact_1 = __importDefault(require("../models/Contact"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Contact_2 = require("../functions/Contact");
const Response_1 = __importDefault(require("../library/Response"));
const config_1 = __importDefault(require("../config/config"));
const axios_1 = __importDefault(require("axios"));
const createContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dateContact, typeContact, natureContact, contenuContact } = req.body;
        const utilisateurRequester = yield Utilisateur_1.default.findById(req.body.requesterId);
        const participants = req.body.participantsArray;
        let counter = req.body.participantsArray.length;
        const contact = new Contact_1.default({
            dateContact,
            typeContact,
            natureContact,
            contenuContact
        });
        if (participants.length !== 0) {
            participants.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
                const utilisateurFinded = yield Utilisateur_1.default.findById(element);
                const usagerFinded = yield Usager_1.default.findById(element);
                const interlocutorFinded = yield Interlocutor_1.default.findById(element);
                const partenaireFinded = yield Partenaire_1.default.findById(element);
                utilisateurFinded !== null &&
                    (contact.utilisateur.push(utilisateurFinded._id), (0, Contact_2.affiliatedContactForExtracting)(utilisateurFinded.datas[0].mounths[0], contact));
                usagerFinded !== null && (contact.usager.push(usagerFinded._id), usagerFinded.contacts.push(contact._id), yield usagerFinded.save());
                interlocutorFinded !== null &&
                    (contact.interlocutor.push(interlocutorFinded._id),
                        interlocutorFinded.contacts.push(contact._id),
                        yield interlocutorFinded.save());
                partenaireFinded !== null &&
                    (contact.partenaire.push(partenaireFinded._id), partenaireFinded.contacts.push(contact._id), yield partenaireFinded.save());
                counter--;
                if (counter === 0) {
                    contact.utilisateur.push(Object(utilisateurRequester)._id);
                    (0, Contact_2.createContactForExtracting)(Object(Object(utilisateurRequester).datas[0].mounths[0]), Object(contact._id));
                    yield contact.save();
                    return res.status(200).json({ message: 'Contact created', contact });
                }
            }));
        }
        else {
            Response_1.default.error('There are no participants in the meeting');
            return res.status(404).json('There are no participants in the meeting');
        }
    }
    catch (error) {
        console.error(error);
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(404).json({ message: 'Error has been catched', error });
    }
});
const readContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = req.params.contactId;
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const contactFinded = yield Contact_1.default.findById(contactId);
        if (!contactFinded || !utilisateurFinded) {
            Response_1.default.warn('contact or requester has been not found');
            return res.status(404).json({ error: 'contact or requester has been not found' });
        }
        else {
            (0, Contact_2.readContactForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(contactId));
            Response_1.default.info('contact readed');
            return res.status(200).json({ contact: contactFinded });
        }
    }
    catch (error) {
        console.error({ message: 'error catched', error: error });
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'error catched', error: error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerFinded = yield Usager_1.default.findById(req.params.id).populate('contacts').select('contacts');
        const partenaireFinded = yield Partenaire_1.default.findById(req.params.id).populate('contacts').select('contacts').sort('asc');
        const interlocutorFinded = yield Interlocutor_1.default.findById(req.params.id).populate('contacts').select('contacts');
        const entrepriseFinded = yield Entreprise_1.default.findById(req.params.id).populate('contacts').select('contacts');
        if (!usagerFinded && !partenaireFinded && !interlocutorFinded && !entrepriseFinded) {
            Response_1.default.warn('usager or partenaire or interlocutor or entreprise has been not found');
            return res.status(404).json({ error: 'usager or partenaire or interlocutor or entreprise has been not found' });
        }
        else {
            if (usagerFinded) {
                Response_1.default.info("usager's contacts has been found");
                return res.status(200).json({ message: "usager's contacts has been found", contact: usagerFinded });
            }
            else if (partenaireFinded) {
                Response_1.default.info("partenaire's contacts has been found");
                return res.status(200).json({ message: "partenaire's contacts has been found", contact: partenaireFinded });
            }
            else if (interlocutorFinded) {
                Response_1.default.info("interlocutor's contacts has been found");
                return res.status(200).json({ message: "interlocutor's contacts has been found", contact: interlocutorFinded });
            }
            else if (entrepriseFinded) {
                Response_1.default.info("entreprise's contacts has been found");
                return res.status(200).json({ message: "entreprise's contacts has been found", contact: entrepriseFinded });
            }
            Response_1.default.info('all contact readed');
            return Contact_1.default.find()
                .then((contacts) => res.status(200).json({ message: contacts }))
                .catch((error) => res.status(500).json({ error: error.message }));
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
    }
});
const updateContact = (req, res, next) => {
    try {
        const contactId = req.params.contactId;
        return Contact_1.default.findById(contactId).then((contact) => __awaiter(void 0, void 0, void 0, function* () {
            if (contact) {
                const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
                if (!utilisateurFinded) {
                    Response_1.default.warn('requester has been not found');
                    return res.status(404).json({ message: 'requester has been not found' });
                }
                else {
                    contact.set(req.body);
                    Response_1.default.info('contact updated');
                    return contact
                        .save()
                        .then((contact) => res.status(201).json({ contact: contact }))
                        .finally(() => {
                        (0, Contact_2.updateContactForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(contact._id));
                    });
                }
            }
            else {
                Response_1.default.warn('contact not found');
                return res.status(404).json({ message: 'contact not found' });
            }
        }));
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error });
    }
};
const deleteContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurFinded = req.body.admin;
        const contactFinded = yield Contact_1.default.findById(req.params.contactId);
        if (!utilisateurFinded || !contactFinded) {
            Response_1.default.warn('utilisatueur or contact has been not found');
            return res.status(404).json({ error: 'utilisatueur or contact has been not found' });
        }
        else {
            let countPartenaire = contactFinded.partenaire.length;
            let countUsager = contactFinded.usager.length;
            let countInterlocutor = contactFinded.interlocutor.length;
            const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/contact/create/`, {
                _id: contactFinded === null || contactFinded === void 0 ? void 0 : contactFinded._id,
                dateContact: contactFinded.dateContact,
                typeContact: contactFinded.typeContact,
                natureContact: contactFinded.natureContact,
                contenuContact: contactFinded.contenuContact,
                utilisateur: contactFinded.utilisateur,
                usager: contactFinded.usager,
                interlocutor: contactFinded.interlocutor,
                partenaire: contactFinded.partenaire
            });
            const handleCounter = () => {
                if (countPartenaire === 0 && countUsager === 0 && countInterlocutor === 0) {
                    handleSubmited();
                }
            };
            const handleSubmited = () => __awaiter(void 0, void 0, void 0, function* () {
                (0, Contact_2.deleteContactForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(contactFinded === null || contactFinded === void 0 ? void 0 : contactFinded._id));
                yield (contactFinded === null || contactFinded === void 0 ? void 0 : contactFinded.deleteOne());
                Response_1.default.info('contact has been archived');
                return res.status(200).json({ message: 'contact has been archived' });
            });
            if (Object(contactFinded).usager.length !== 0 ||
                Object(contactFinded).partenaire.length !== 0 ||
                Object(contactFinded).interlocutor.length !== 0) {
                const date = new Date(Object(contactFinded).dateContact);
                if (archived.data.message === `the contact of ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} has been archived`) {
                    if (Object(contactFinded).usager.length !== 0) {
                        Object(contactFinded).usager.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                            const usagerFindedToUpdate = yield Usager_1.default.findById(el);
                            if (usagerFindedToUpdate) {
                                const arrayToFiltred = Object(usagerFindedToUpdate).contacts.filter((element) => JSON.stringify(element) !== JSON.stringify(contactFinded._id));
                                Object(usagerFindedToUpdate).contacts = arrayToFiltred;
                                const arrayFromContactToFiltred = Object(contactFinded).usager.filter((element) => JSON.stringify(element) !== JSON.stringify(usagerFindedToUpdate._id));
                                Object(contactFinded).usager = arrayFromContactToFiltred;
                                yield Object(usagerFindedToUpdate).save();
                            }
                            else {
                                Response_1.default.warn('Usager not available in BDD');
                            }
                            countUsager--;
                            handleCounter();
                        }));
                    }
                    if (Object(contactFinded).partenaire.length !== 0) {
                        Object(contactFinded).partenaire.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                            const partenaireFindedToUpdate = yield Partenaire_1.default.findById(el);
                            if (partenaireFindedToUpdate) {
                                const arrayToFiltred = Object(partenaireFindedToUpdate).contacts.filter((element) => JSON.stringify(element) !== JSON.stringify(contactFinded._id));
                                Object(partenaireFindedToUpdate).contacts = arrayToFiltred;
                                const arrayFromContactToFiltred = Object(contactFinded).partenaire.filter((element) => JSON.stringify(element) !== JSON.stringify(partenaireFindedToUpdate._id));
                                Object(contactFinded).partenaire = arrayFromContactToFiltred;
                                yield Object(partenaireFindedToUpdate).save();
                            }
                            else {
                                Response_1.default.warn('Partenaire not available in BDD');
                            }
                            countPartenaire--;
                            handleCounter();
                        }));
                    }
                    if (Object(contactFinded).interlocutor.length !== 0) {
                        Object(contactFinded).interlocutor.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                            const interlocutorFindedToUpdate = yield Interlocutor_1.default.findById(el);
                            if (interlocutorFindedToUpdate) {
                                const arrayToFiltred = Object(interlocutorFindedToUpdate).contacts.filter((element) => JSON.stringify(element) !== JSON.stringify(contactFinded._id));
                                Object(interlocutorFindedToUpdate).contacts = arrayToFiltred;
                                const arrayFromContactToFiltred = Object(contactFinded).interlocutor.filter((element) => JSON.stringify(element) !== JSON.stringify(interlocutorFindedToUpdate._id));
                                Object(contactFinded).interlocutor = arrayFromContactToFiltred;
                                yield Object(interlocutorFindedToUpdate).save();
                            }
                            else {
                                Response_1.default.warn('Interlocutor not available in BDD');
                            }
                            countInterlocutor--;
                            handleCounter();
                        }));
                    }
                }
                else {
                    Response_1.default.error('Something went wrong about archive');
                    return res.status(404).json({ error: 'Something went wrong about archive' });
                }
            }
            else {
                handleSubmited();
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error });
    }
});
exports.default = { createContact, readContact, readAll, updateContact, deleteContact };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9Db250YWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0EsZ0VBQXdDO0FBQ3hDLDhEQUFzQztBQUN0Qyx3RUFBZ0Q7QUFDaEQsc0VBQThDO0FBQzlDLHNFQUE4QztBQUM5QywwRUFBa0Q7QUFHbEQsa0RBTThCO0FBQzlCLG1FQUF5QztBQUN6Qyw4REFBc0M7QUFDdEMsa0RBQTBCO0FBRTFCLE1BQU0sYUFBYSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDNUUsSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDN0UsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUUsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUNoRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUM7WUFDeEIsV0FBVztZQUNYLFdBQVc7WUFDWCxhQUFhO1lBQ2IsY0FBYztTQUNqQixDQUFDLENBQUM7UUFDSCxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFPLE9BQWUsRUFBRSxFQUFFO2dCQUMzQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlELE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JB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