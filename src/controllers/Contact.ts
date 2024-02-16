import { NextFunction, Request, Response } from 'express';

// Models
import Contact from '../models/Contact';
import Usager from '../models/Usager';
import Utilisateur from '../models/Utilisateur';
import Entreprise from '../models/Entreprise';
import Partenaire from '../models/Partenaire';
import Interlocutor from '../models/Interlocutor';

// Functions
import {
    createContactForExtracting,
    readContactForExtracting,
    updateContactForExtracting,
    deleteContactForExtracting,
    affiliatedContactForExtracting
} from '../functions/Contact';
import Retour from '../library/Response';
import config from '../config/config';
import axios from 'axios';

const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dateContact, typeContact, natureContact, contenuContact } = req.body;
        const utilisateurRequester = await Utilisateur.findById(req.body.requesterId);
        const participants = req.body.participantsArray;
        let counter = req.body.participantsArray.length;
        const contact = new Contact({
            dateContact,
            typeContact,
            natureContact,
            contenuContact
        });
        if (participants.length !== 0) {
            participants.forEach(async (element: string) => {
                const utilisateurFinded = await Utilisateur.findById(element);
                const usagerFinded = await Usager.findById(element);
                const interlocutorFinded = await Interlocutor.findById(element);
                const partenaireFinded = await Partenaire.findById(element);
                utilisateurFinded !== null &&
                    (contact.utilisateur.push(utilisateurFinded._id), affiliatedContactForExtracting(utilisateurFinded.datas[0].mounths[0], contact));
                usagerFinded !== null && (contact.usager.push(usagerFinded._id), usagerFinded.contacts.push(contact._id), await usagerFinded.save());
                interlocutorFinded !== null &&
                    (contact.interlocutor.push(interlocutorFinded._id),
                    interlocutorFinded.contacts.push(contact._id),
                    await interlocutorFinded.save());
                partenaireFinded !== null &&
                    (contact.partenaire.push(partenaireFinded._id), partenaireFinded.contacts.push(contact._id), await partenaireFinded.save());
                counter--;
                if (counter === 0) {
                    contact.utilisateur.push(Object(utilisateurRequester)._id);
                    createContactForExtracting(Object(Object(utilisateurRequester).datas[0].mounths[0]), Object(contact._id));
                    await contact.save();
                    return res.status(200).json({ message: 'Contact created', contact });
                }
            });
        } else {
            Retour.error('There are no participants in the meeting');
            return res.status(404).json('There are no participants in the meeting');
        }
    } catch (error) {
        console.error(error);
        Retour.error({ message: 'Error has been catched', error });
        return res.status(404).json({ message: 'Error has been catched', error });
    }
};

const readContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.contactId;
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const contactFinded = await Contact.findById(contactId);
        if (!contactFinded || !utilisateurFinded) {
            Retour.warn('contact or requester has been not found');
            return res.status(404).json({ error: 'contact or requester has been not found' });
        } else {
            readContactForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(contactId));
            Retour.info('contact readed');
            return res.status(200).json({ contact: contactFinded });
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'error catched', error: error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerFinded = await Usager.findById(req.params.id).populate('contacts').select('contacts');
        const partenaireFinded = await Partenaire.findById(req.params.id).populate('contacts').select('contacts').sort('asc');
        const interlocutorFinded = await Interlocutor.findById(req.params.id).populate('contacts').select('contacts');
        const entrepriseFinded = await Entreprise.findById(req.params.id).populate('contacts').select('contacts');

        if (!usagerFinded && !partenaireFinded && !interlocutorFinded && !entrepriseFinded) {
            Retour.warn('usager or partenaire or interlocutor or entreprise has been not found');
            return res.status(404).json({ error: 'usager or partenaire or interlocutor or entreprise has been not found' });
        } else {
            if (usagerFinded) {
                Retour.info("usager's contacts has been found");
                return res.status(200).json({ message: "usager's contacts has been found", contact: usagerFinded });
            } else if (partenaireFinded) {
                Retour.info("partenaire's contacts has been found");
                return res.status(200).json({ message: "partenaire's contacts has been found", contact: partenaireFinded });
            } else if (interlocutorFinded) {
                Retour.info("interlocutor's contacts has been found");
                return res.status(200).json({ message: "interlocutor's contacts has been found", contact: interlocutorFinded });
            } else if (entrepriseFinded) {
                Retour.info("entreprise's contacts has been found");
                return res.status(200).json({ message: "entreprise's contacts has been found", contact: entrepriseFinded });
            }
            Retour.info('all contact readed');
            return Contact.find()
                .then((contacts) => res.status(200).json({ message: contacts }))
                .catch((error) => res.status(500).json({ error: error.message }));
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
    }
};

const updateContact = (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.contactId;
        return Contact.findById(contactId).then(async (contact) => {
            if (contact) {
                const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
                if (!utilisateurFinded) {
                    Retour.warn('requester has been not found');
                    return res.status(404).json({ message: 'requester has been not found' });
                } else {
                    contact.set(req.body);
                    Retour.info('contact updated');
                    return contact
                        .save()
                        .then((contact) => res.status(201).json({ contact: contact }))
                        .finally(() => {
                            updateContactForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(contact._id));
                        });
                }
            } else {
                Retour.warn('contact not found');
                return res.status(404).json({ message: 'contact not found' });
            }
        });
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error });
    }
};

const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurFinded = req.body.admin;
        const contactFinded = await Contact.findById(req.params.contactId);

        if (!utilisateurFinded || !contactFinded) {
            Retour.warn('utilisatueur or contact has been not found');
            return res.status(404).json({ error: 'utilisatueur or contact has been not found' });
        } else {
            let countPartenaire: number = contactFinded.partenaire.length;
            let countUsager: number = contactFinded.usager.length;
            let countInterlocutor: number = contactFinded.interlocutor.length;
            const archived = await axios.post(`${config.mongooseUrlArchived}/contact/create/`, {
                _id: contactFinded?._id,
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
            const handleSubmited = async () => {
                deleteContactForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(contactFinded?._id));
                await contactFinded?.deleteOne();
                Retour.info('contact has been archived');
                return res.status(200).json({ message: 'contact has been archived' });
            };

            if (
                Object(contactFinded).usager.length !== 0 ||
                Object(contactFinded).partenaire.length !== 0 ||
                Object(contactFinded).interlocutor.length !== 0
            ) {
                const date = new Date(Object(contactFinded).dateContact);
                if (archived.data.message === `the contact of ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} has been archived`) {
                    if (Object(contactFinded).usager.length !== 0) {
                        Object(contactFinded).usager.forEach(async (el: string) => {
                            const usagerFindedToUpdate = await Usager.findById(el);
                            if (usagerFindedToUpdate) {
                                // Afin de supprimer le contact du tableau des usagers présent
                                const arrayToFiltred = Object(usagerFindedToUpdate).contacts.filter(
                                    (element: string) => JSON.stringify(element) !== JSON.stringify(contactFinded._id)
                                );
                                Object(usagerFindedToUpdate).contacts = arrayToFiltred;
                                // Afin de supprimer les usagers du tableau usager dans contact
                                const arrayFromContactToFiltred = Object(contactFinded).usager.filter(
                                    (element: string) => JSON.stringify(element) !== JSON.stringify(usagerFindedToUpdate._id)
                                );
                                Object(contactFinded).usager = arrayFromContactToFiltred;
                                await Object(usagerFindedToUpdate).save();
                            } else {
                                Retour.warn('Usager not available in BDD');
                            }
                            countUsager--;
                            handleCounter();
                        });
                    }
                    if (Object(contactFinded).partenaire.length !== 0) {
                        Object(contactFinded).partenaire.forEach(async (el: string) => {
                            const partenaireFindedToUpdate = await Partenaire.findById(el);
                            if (partenaireFindedToUpdate) {
                                // Afin de supprimer le contact du tableau des partenaires présent
                                const arrayToFiltred = Object(partenaireFindedToUpdate).contacts.filter(
                                    (element: string) => JSON.stringify(element) !== JSON.stringify(contactFinded._id)
                                );
                                Object(partenaireFindedToUpdate).contacts = arrayToFiltred;
                                // Afin de supprimer les partenaires du tableau partenaire dans contact
                                const arrayFromContactToFiltred = Object(contactFinded).partenaire.filter(
                                    (element: string) => JSON.stringify(element) !== JSON.stringify(partenaireFindedToUpdate._id)
                                );
                                Object(contactFinded).partenaire = arrayFromContactToFiltred;
                                await Object(partenaireFindedToUpdate).save();
                            } else {
                                Retour.warn('Partenaire not available in BDD');
                            }
                            countPartenaire--;
                            handleCounter();
                        });
                    }
                    if (Object(contactFinded).interlocutor.length !== 0) {
                        Object(contactFinded).interlocutor.forEach(async (el: string) => {
                            const interlocutorFindedToUpdate = await Interlocutor.findById(el);
                            if (interlocutorFindedToUpdate) {
                                // Afin de supprimer le contact du tableau des interlocutors présent
                                const arrayToFiltred = Object(interlocutorFindedToUpdate).contacts.filter(
                                    (element: string) => JSON.stringify(element) !== JSON.stringify(contactFinded._id)
                                );
                                Object(interlocutorFindedToUpdate).contacts = arrayToFiltred;
                                // Afin de supprimer les interlocutors du tableau interlocutor dans contact
                                const arrayFromContactToFiltred = Object(contactFinded).interlocutor.filter(
                                    (element: string) => JSON.stringify(element) !== JSON.stringify(interlocutorFindedToUpdate._id)
                                );
                                Object(contactFinded).interlocutor = arrayFromContactToFiltred;
                                await Object(interlocutorFindedToUpdate).save();
                            } else {
                                Retour.warn('Interlocutor not available in BDD');
                            }
                            countInterlocutor--;
                            handleCounter();
                        });
                    }
                } else {
                    Retour.error('Something went wrong about archive');
                    return res.status(404).json({ error: 'Something went wrong about archive' });
                }
            } else {
                handleSubmited();
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error });
    }
};

export default { createContact, readContact, readAll, updateContact, deleteContact };
