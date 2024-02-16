import { NextFunction, Request, Response } from 'express';
const cloudinary = require('cloudinary');
// Models
import Event from '../models/Event';
import Utilisateur from '../models/Utilisateur';
import WorkStation from '../models/WorkStation';
import Entreprise from '../models/Entreprise';
import Convention from '../models/Convention';
import Usager from '../models/Usager';

// Function
import {
    createEventDataForExtracting,
    deleteEventDataForExtracting,
    readEventDataForExtracting,
    updateEventDataForExtracting
} from '../functions/EventData';

// Library
import Retour from '../library/Response';
import EventOfferJob from '../models/EventOfferJob';

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { conventionId, nameOfEvent, maxNumOfPartenaire, dateAndHourOfEvent, type, workStationId, requesterId, comment } = req.body;
        const conventionFinded = await Convention.findById(conventionId);
        if (!conventionFinded) {
            Retour.warn('Convention has been not found');
            return res.status(404).json('Convention has been not found');
        } else {
            // Si il y a plusieurs poste de travail a inclure dans l'évènement
            let workStationFindedArray: object[] = [];
            const workStationFinded =
                workStationId !== undefined &&
                (typeof workStationId === 'string'
                    ? await WorkStation.findById(workStationId)
                    : workStationId.map(async (item: string, index: number) => {
                          const response = await WorkStation.findById(item);
                          workStationFindedArray.push(Object(response));
                      }));
            const entrepriseFinded = await Entreprise.findOne({ workStations: workStationFinded._id });
            const utilisateurFinded = await Utilisateur.findById(requesterId);
            // Tableau des affiches de l'évènement -> 4 max
            const fileKeys = Object(req.files).file;
            if (!utilisateurFinded) {
                Retour.warn('The requesterId has been not found');
                return res.status(404).json('The requesterId has been not found');
            } else {
                if (type === 'visit' || type === 'halfDay' || type === 'jobCoffe') {
                    if (!nameOfEvent || !dateAndHourOfEvent || !maxNumOfPartenaire) {
                        Retour.warn('nameOfEvent or dateAndHourOfEvent or maxNumOfPartenaire, are missing');
                        return res.status(404).json('nameOfEvent or dateAndHourOfEvent or maxNumOfPartenaire, are missing');
                    } else {
                        let posterArray: string[] = [];
                        const event = new Event({
                            nameOfEvent,
                            maxNumOfPartenaire,
                            dateAndHourOfEvent,
                            type,
                            eventWorkStations: workStationFindedArray,
                            poster: posterArray
                        });
                        workStationFinded !== false && event.entreprise.push(Object(entrepriseFinded)._id);
                        event.history.push({
                            title: `Évènement crée le ${new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`,
                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: 'Les Usager(e)s seront sélectionné(e) plus tard',
                            comment: comment
                        });
                        workStationFinded && typeof workStationId === 'string' && event.eventWorkStations.push(Object(workStationFinded));
                        entrepriseFinded?.events.push(Object(event));
                        conventionFinded.events.push(Object(event));
                        if (!fileKeys) {
                            await entrepriseFinded?.save();
                            await event.save();
                            await conventionFinded.save();
                            createEventDataForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(event._id));
                            Retour.info(`The event '${type}' has been created without picture`);
                            return res.status(201).json(`The event '${type}' has been created without picture`);
                        } else {
                            for (const path of fileKeys) {
                                const result = await cloudinary.v2.uploader.upload(path.path);
                                posterArray.push(result.secure_url);
                            }
                            await entrepriseFinded?.save();
                            await event.save();
                            await conventionFinded.save();
                            createEventDataForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(event._id));
                            Retour.info(`The event '${type}' has been created`);
                            return res.status(201).json(`The event '${type}' has been created`);
                        }
                    }
                } else {
                    Retour.warn('The type of the even is missing');
                    return res.status(404).json('The type of the even is missing');
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const eventFinded = await Event.findById(req.params.eventId);
        if (!utilisateurFinded || !eventFinded) {
            Retour.error('The requester or event has been not found');
            return res.status(404).json('The requester or event has been not found');
        } else {
            readEventDataForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(eventFinded._id));
            Retour.info('The event has been returned');
            return res.status(200).json(eventFinded);
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const count = await Event.countDocuments();
    return Event.find()
        .then((events) => res.status(200).json({ count: count, events: events }))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { usagerToAdd, usagerToRemove, offerJobToAdd, offerJobToRemove, workStationToAdd, workStationToRemove } = req.body;
    // Pour ajouter un usager -> inclure dans un tableau les ID des usagers a inclures
    // Pour supprimer un usager -> inclure dans un tableau les ID des usagers a inclures
    return Event.findById(req.params.eventId).then(async (event) => {
        if (!event) {
            Retour.error('Event has been not found');
            return res.status(404).json({ message: 'Event has been not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                Retour.error('Requester has been not found');
                return res.status(404).json({ message: 'Requester has been not found' });
            } else {
                if (usagerToAdd && usagerToAdd.length !== 0) {
                    let numRefused = 0;
                    let total = usagerToAdd.length;
                    let countSequences = 0;
                    usagerToAdd.length !== 0 &&
                        usagerToAdd.map(async (item: String, index: Number) => {
                            const usagerFinded = await Usager.findById(item);
                            const isAlreadyInside = (element: Object) =>
                                JSON.stringify(Object(element)._id) === JSON.stringify(Object(usagerFinded)._id);
                            event.usagers.findIndex(isAlreadyInside) === -1
                                ? event.usagers.push(Object(usagerFinded))
                                : ((numRefused = numRefused + 1), Retour.warn('Usager already inside the event'));
                            countSequences++;
                            if (countSequences === total) {
                                if (total === numRefused) {
                                    Retour.error(`The Usager${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there`);
                                    return res
                                        .status(404)
                                        .json({ message: `The Usager${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there` });
                                } else {
                                    await event.save();
                                    return res
                                        .status(201)
                                        .json(
                                            `${total - numRefused} usager${total > 1 ? 's' : ''} have been added to the event${
                                                numRefused !== 0 ? `${numRefused} and other were already in there` : ''
                                            }`
                                        );
                                }
                            }
                        });
                } else if (usagerToRemove && usagerToRemove.length !== 0) {
                    let total = usagerToRemove.length;
                    let countSequences = 0;
                    usagerToRemove.map(async (item: String, index: Number) => {
                        const newArray = event.usagers.filter((element) => JSON.stringify(element) !== JSON.stringify(item));
                        Object(event).usagers = newArray;
                        countSequences++;
                        if (total === countSequences) {
                            await event.save();
                            return res.status(201).json({ message: `Usager${usagerToRemove.length > 1 ? 's' : ''} has been removed` });
                        }
                    });
                } else if (offerJobToAdd && offerJobToAdd.length !== 0) {
                    let numRefused = 0;
                    let total = offerJobToAdd.length;
                    let countSequences = 0;
                    offerJobToAdd.map(async (item: String, index: Number) => {
                        const eventOfferJobFinded = await EventOfferJob.findById(item);
                        const workStationFinded = await WorkStation.findOne({ eventOfferJobs: Object(eventOfferJobFinded)._id });
                        const entrepriseFinded = await Entreprise.findOne({ workStations: Object(workStationFinded)._id });
                        const isAlreadyInside = (element: Object) =>
                            JSON.stringify(Object(element)._id) === JSON.stringify(Object(eventOfferJobFinded)._id);
                        event.eventOfferJobs.findIndex(isAlreadyInside) === -1
                            ? event.eventOfferJobs.push(Object(eventOfferJobFinded))
                            : ((numRefused = numRefused + 1), Retour.warn('Event offer job already inside the event'));
                        const onlyIfIsNotInside = (element: Object) => {
                            JSON.stringify(Object(element)._id) === JSON.stringify(Object(entrepriseFinded)._id);
                        };
                        event.entreprise.findIndex(onlyIfIsNotInside) === -1 && event.entreprise.push(Object(entrepriseFinded)._id);
                        countSequences++;
                        if (countSequences === total) {
                            if (total === numRefused) {
                                Retour.error(`The Entrprise${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there`);
                                return res
                                    .status(404)
                                    .json({ message: `The Entrprise${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there` });
                            } else {
                                await event.save();
                                return res
                                    .status(201)
                                    .json(
                                        `${total - numRefused} offer job${total > 1 ? 's' : ''} have been added to the event ${
                                            numRefused !== 0 ? `and ${numRefused} other were already in there` : ''
                                        }`
                                    );
                            }
                        }
                    });
                } else if (offerJobToRemove && offerJobToRemove.length !== 0) {
                    let total = offerJobToRemove.length;
                    if (Object(event).entreprise.length === 0) {
                        Retour.error('There is no entreprise in the event');
                        return res.status(404).json({ message: 'There is no entreprise in the event' });
                    } else {
                        let countSequences = 0;
                        offerJobToRemove.map(async (item: String, index: Number) => {
                            const newArray = event.entreprise.filter((element) => JSON.stringify(element) !== JSON.stringify(item));
                            Object(event).entreprise = newArray;
                            countSequences++;
                            if (total === countSequences) {
                                await event.save();
                                return res.status(201).json({ message: `Entreprise${offerJobToRemove.length > 1 ? 's' : ''} has been removed` });
                            }
                        });
                    }
                } else if (workStationToAdd && workStationToAdd.length !== 0) {
                } else if (workStationToRemove && workStationToRemove.length !== 0) {
                } else {
                    event.set(req.body);
                    return event
                        .save()
                        .then((event) => res.status(201).json({ event: event }))
                        .finally(() => {
                            updateEventDataForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(event._id));
                        })
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    });
};

const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;
    const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
    if (!utilisateurFinded) {
        Retour.error('the requester has been not found');
        return res.status(500).json('the requester has been not found');
    } else {
        return Event.findByIdAndDelete(eventId)
            .then((event) => (event ? res.status(200).json({ message: 'event has been deleteded' }) : res.status(404).json({ message: 'Not found' })))
            .then((event) => deleteEventDataForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(event)._id))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
};

export default { createEvent, readEvent, readAll, updateEvent, deleteEvent };
