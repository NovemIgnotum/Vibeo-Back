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
const cloudinary = require('cloudinary');
const Event_1 = __importDefault(require("../models/Event"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Convention_1 = __importDefault(require("../models/Convention"));
const Usager_1 = __importDefault(require("../models/Usager"));
const EventData_1 = require("../functions/EventData");
const Response_1 = __importDefault(require("../library/Response"));
const EventOfferJob_1 = __importDefault(require("../models/EventOfferJob"));
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conventionId, nameOfEvent, maxNumOfPartenaire, dateAndHourOfEvent, type, workStationId, requesterId, comment } = req.body;
        const conventionFinded = yield Convention_1.default.findById(conventionId);
        if (!conventionFinded) {
            Response_1.default.warn('Convention has been not found');
            return res.status(404).json('Convention has been not found');
        }
        else {
            let workStationFindedArray = [];
            const workStationFinded = workStationId !== undefined &&
                (typeof workStationId === 'string'
                    ? yield WorkStation_1.default.findById(workStationId)
                    : workStationId.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                        const response = yield WorkStation_1.default.findById(item);
                        workStationFindedArray.push(Object(response));
                    })));
            const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: workStationFinded._id });
            const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
            const fileKeys = Object(req.files).file;
            if (!utilisateurFinded) {
                Response_1.default.warn('The requesterId has been not found');
                return res.status(404).json('The requesterId has been not found');
            }
            else {
                if (type === 'visit' || type === 'halfDay' || type === 'jobCoffe') {
                    if (!nameOfEvent || !dateAndHourOfEvent || !maxNumOfPartenaire) {
                        Response_1.default.warn('nameOfEvent or dateAndHourOfEvent or maxNumOfPartenaire, are missing');
                        return res.status(404).json('nameOfEvent or dateAndHourOfEvent or maxNumOfPartenaire, are missing');
                    }
                    else {
                        let posterArray = [];
                        const event = new Event_1.default({
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
                        entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.events.push(Object(event));
                        conventionFinded.events.push(Object(event));
                        if (!fileKeys) {
                            yield (entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.save());
                            yield event.save();
                            yield conventionFinded.save();
                            (0, EventData_1.createEventDataForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(event._id));
                            Response_1.default.info(`The event '${type}' has been created without picture`);
                            return res.status(201).json(`The event '${type}' has been created without picture`);
                        }
                        else {
                            for (const path of fileKeys) {
                                const result = yield cloudinary.v2.uploader.upload(path.path);
                                posterArray.push(result.secure_url);
                            }
                            yield (entrepriseFinded === null || entrepriseFinded === void 0 ? void 0 : entrepriseFinded.save());
                            yield event.save();
                            yield conventionFinded.save();
                            (0, EventData_1.createEventDataForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(event._id));
                            Response_1.default.info(`The event '${type}' has been created`);
                            return res.status(201).json(`The event '${type}' has been created`);
                        }
                    }
                }
                else {
                    Response_1.default.warn('The type of the even is missing');
                    return res.status(404).json('The type of the even is missing');
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        const eventFinded = yield Event_1.default.findById(req.params.eventId);
        if (!utilisateurFinded || !eventFinded) {
            Response_1.default.error('The requester or event has been not found');
            return res.status(404).json('The requester or event has been not found');
        }
        else {
            (0, EventData_1.readEventDataForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(eventFinded._id));
            Response_1.default.info('The event has been returned');
            return res.status(200).json(eventFinded);
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield Event_1.default.countDocuments();
    return Event_1.default.find()
        .then((events) => res.status(200).json({ count: count, events: events }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { usagerToAdd, usagerToRemove, offerJobToAdd, offerJobToRemove, workStationToAdd, workStationToRemove } = req.body;
    return Event_1.default.findById(req.params.eventId).then((event) => __awaiter(void 0, void 0, void 0, function* () {
        if (!event) {
            Response_1.default.error('Event has been not found');
            return res.status(404).json({ message: 'Event has been not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                Response_1.default.error('Requester has been not found');
                return res.status(404).json({ message: 'Requester has been not found' });
            }
            else {
                if (usagerToAdd && usagerToAdd.length !== 0) {
                    let numRefused = 0;
                    let total = usagerToAdd.length;
                    let countSequences = 0;
                    usagerToAdd.length !== 0 &&
                        usagerToAdd.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                            const usagerFinded = yield Usager_1.default.findById(item);
                            const isAlreadyInside = (element) => JSON.stringify(Object(element)._id) === JSON.stringify(Object(usagerFinded)._id);
                            event.usagers.findIndex(isAlreadyInside) === -1
                                ? event.usagers.push(Object(usagerFinded))
                                : ((numRefused = numRefused + 1), Response_1.default.warn('Usager already inside the event'));
                            countSequences++;
                            if (countSequences === total) {
                                if (total === numRefused) {
                                    Response_1.default.error(`The Usager${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there`);
                                    return res
                                        .status(404)
                                        .json({ message: `The Usager${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there` });
                                }
                                else {
                                    yield event.save();
                                    return res
                                        .status(201)
                                        .json(`${total - numRefused} usager${total > 1 ? 's' : ''} have been added to the event${numRefused !== 0 ? `${numRefused} and other were already in there` : ''}`);
                                }
                            }
                        }));
                }
                else if (usagerToRemove && usagerToRemove.length !== 0) {
                    let total = usagerToRemove.length;
                    let countSequences = 0;
                    usagerToRemove.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                        const newArray = event.usagers.filter((element) => JSON.stringify(element) !== JSON.stringify(item));
                        Object(event).usagers = newArray;
                        countSequences++;
                        if (total === countSequences) {
                            yield event.save();
                            return res.status(201).json({ message: `Usager${usagerToRemove.length > 1 ? 's' : ''} has been removed` });
                        }
                    }));
                }
                else if (offerJobToAdd && offerJobToAdd.length !== 0) {
                    let numRefused = 0;
                    let total = offerJobToAdd.length;
                    let countSequences = 0;
                    offerJobToAdd.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                        const eventOfferJobFinded = yield EventOfferJob_1.default.findById(item);
                        const workStationFinded = yield WorkStation_1.default.findOne({ eventOfferJobs: Object(eventOfferJobFinded)._id });
                        const entrepriseFinded = yield Entreprise_1.default.findOne({ workStations: Object(workStationFinded)._id });
                        const isAlreadyInside = (element) => JSON.stringify(Object(element)._id) === JSON.stringify(Object(eventOfferJobFinded)._id);
                        event.eventOfferJobs.findIndex(isAlreadyInside) === -1
                            ? event.eventOfferJobs.push(Object(eventOfferJobFinded))
                            : ((numRefused = numRefused + 1), Response_1.default.warn('Event offer job already inside the event'));
                        const onlyIfIsNotInside = (element) => {
                            JSON.stringify(Object(element)._id) === JSON.stringify(Object(entrepriseFinded)._id);
                        };
                        event.entreprise.findIndex(onlyIfIsNotInside) === -1 && event.entreprise.push(Object(entrepriseFinded)._id);
                        countSequences++;
                        if (countSequences === total) {
                            if (total === numRefused) {
                                Response_1.default.error(`The Entrprise${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there`);
                                return res
                                    .status(404)
                                    .json({ message: `The Entrprise${total > 1 ? 's' : ''} ${total > 1 ? 'are' : 'is'} already in there` });
                            }
                            else {
                                yield event.save();
                                return res
                                    .status(201)
                                    .json(`${total - numRefused} offer job${total > 1 ? 's' : ''} have been added to the event ${numRefused !== 0 ? `and ${numRefused} other were already in there` : ''}`);
                            }
                        }
                    }));
                }
                else if (offerJobToRemove && offerJobToRemove.length !== 0) {
                    let total = offerJobToRemove.length;
                    if (Object(event).entreprise.length === 0) {
                        Response_1.default.error('There is no entreprise in the event');
                        return res.status(404).json({ message: 'There is no entreprise in the event' });
                    }
                    else {
                        let countSequences = 0;
                        offerJobToRemove.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
                            const newArray = event.entreprise.filter((element) => JSON.stringify(element) !== JSON.stringify(item));
                            Object(event).entreprise = newArray;
                            countSequences++;
                            if (total === countSequences) {
                                yield event.save();
                                return res.status(201).json({ message: `Entreprise${offerJobToRemove.length > 1 ? 's' : ''} has been removed` });
                            }
                        }));
                    }
                }
                else if (workStationToAdd && workStationToAdd.length !== 0) {
                }
                else if (workStationToRemove && workStationToRemove.length !== 0) {
                }
                else {
                    event.set(req.body);
                    return event
                        .save()
                        .then((event) => res.status(201).json({ event: event }))
                        .finally(() => {
                        (0, EventData_1.updateEventDataForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(event._id));
                    })
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    }));
});
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
    if (!utilisateurFinded) {
        Response_1.default.error('the requester has been not found');
        return res.status(500).json('the requester has been not found');
    }
    else {
        return Event_1.default.findByIdAndDelete(eventId)
            .then((event) => (event ? res.status(200).json({ message: 'event has been deleteded' }) : res.status(404).json({ message: 'Not found' })))
            .then((event) => (0, EventData_1.deleteEventDataForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(event)._id))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
});
exports.default = { createEvent, readEvent, readAll, updateEvent, deleteEvent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFekMsNERBQW9DO0FBQ3BDLHdFQUFnRDtBQUNoRCx3RUFBZ0Q7QUFDaEQsc0VBQThDO0FBQzlDLHNFQUE4QztBQUM5Qyw4REFBc0M7QUFHdEMsc0RBS2dDO0FBR2hDLG1FQUF5QztBQUN6Qyw0RUFBb0Q7QUFFcEQsTUFBTSxXQUFXLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMxRSxJQUFJLENBQUM7UUFDRCxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ2xJLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNwQixrQkFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUNqRSxDQUFDO2FBQU0sQ0FBQztZQUVKLElBQUksc0JBQXNCLEdBQWEsRUFBRSxDQUFDO1lBQzFDLE1BQU0saUJBQWlCLEdBQ25CLGFBQWEsS0FBSyxTQUFTO2dCQUMzQixDQUFDLE9BQU8sYUFBYSxLQUFLLFFBQVE7b0JBQzlCLENBQUMsQ0FBQyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztvQkFDM0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBTyxJQUFZLEVBQUUsS0FBYSxFQUFFLEVBQUU7d0JBQ3BELE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xELHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEQsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQ2QsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG9CQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDM0YsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWxFLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNyQixrQkFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDdEUsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLElBQUksSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUUsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDN0Qsa0JBQU0sQ0FBQyxJQUFJLENBQUMsc0VBQXNFLENBQUMsQ0FBQzt3QkFDcEYsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO29CQUN4RyxDQUFDO3lCQUFNLENBQUM7d0JBQ0osSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO3dCQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQzs0QkFDcEIsV0FBVzs0QkFDWCxrQkFBa0I7NEJBQ2xCLGtCQUFrQjs0QkFDbEIsSUFBSTs0QkFDSixpQkFBaUIsRUFBRSxzQkFBc0I7NEJBQ3pDLE1BQU0sRUFBRSxXQUFXO3lCQUN0QixDQUFDLENBQUM7d0JBQ0gsaUJBQWlCLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuRixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs0QkFDZixLQUFLLEVBQUUscUJBQXFCLElBQUksSUFBSSxFQUFFLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFO2dDQUMvRCxPQUFPLEVBQUUsTUFBTTtnQ0FDZixJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUsTUFBTTtnQ0FDYixHQUFHLEVBQUUsU0FBUztnQ0FDZCxJQUFJLEVBQUUsU0FBUztnQ0FDZixNQUFNLEVBQUUsU0FBUzs2QkFDcEIsQ0FBQyxFQUFFOzRCQUNKLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM5RCxFQUFFLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7NEJBQzlFLEdBQUcsRUFBRSxnREFBZ0Q7NEJBQ3JELE9BQU8sRUFBRSxPQUFPO3lCQUNuQixDQUFDLENBQUM7d0JBQ0gsaUJBQWlCLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzt3QkFDbEgsZ0JBQWdCLGFBQWhCLGdCQUFnQix1QkFBaEIsZ0JBQWdCLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUNaLE1BQU0sQ0FBQSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDOzRCQUMvQixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDbkIsTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDOUIsSUFBQSx3Q0FBNEIsRUFBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDL0Ysa0JBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLG9DQUFvQyxDQUFDLENBQUM7NEJBQ3BFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLG9DQUFvQyxDQUFDLENBQUM7d0JBQ3hGLENBQUM7NkJBQU0sQ0FBQzs0QkFDSixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dDQUMxQixNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQzlELFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN4QyxDQUFDOzRCQUNELE1BQU0sQ0FBQSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxJQUFJLEVBQUUsQ0FBQSxDQUFDOzRCQUMvQixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDbkIsTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDOUIsSUFBQSx3Q0FBNEIsRUFBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDL0Ysa0JBQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLG9CQUFvQixDQUFDLENBQUM7NEJBQ3BELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLG9CQUFvQixDQUFDLENBQUM7d0JBQ3hFLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO3FCQUFNLENBQUM7b0JBQ0osa0JBQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztvQkFDL0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLGtCQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN4RSxJQUFJLENBQUM7UUFDRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RSxNQUFNLFdBQVcsR0FBRyxNQUFNLGVBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxrQkFBTSxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBQzFELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUM3RSxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUEsc0NBQTBCLEVBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkcsa0JBQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMzQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLGtCQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztBQUNMLENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN0RSxNQUFNLEtBQUssR0FBRyxNQUFNLGVBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQyxPQUFPLGVBQUssQ0FBQyxJQUFJLEVBQUU7U0FDZCxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUN4RSxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUUsQ0FBQyxDQUFBLENBQUM7QUFDRixNQUFNLFdBQVcsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFHekgsT0FBTyxlQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ1Qsa0JBQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN6QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNyQixrQkFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLENBQUMsQ0FBQztZQUM3RSxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDMUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUMvQixJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQzt3QkFDcEIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFPLElBQVksRUFBRSxLQUFhLEVBQUUsRUFBRTs0QkFDbEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDckYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUMzQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dDQUMxQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsa0JBQU0sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDOzRCQUN0RixjQUFjLEVBQUUsQ0FBQzs0QkFDakIsSUFBSSxjQUFjLEtBQUssS0FBSyxFQUFFLENBQUM7Z0NBQzNCLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRSxDQUFDO29DQUN2QixrQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO29DQUMvRixPQUFPLEdBQUc7eUNBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQzt5Q0FDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsYUFBYSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2dDQUM3RyxDQUFDO3FDQUFNLENBQUM7b0NBQ0osTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0NBQ25CLE9BQU8sR0FBRzt5Q0FDTCxNQUFNLENBQUMsR0FBRyxDQUFDO3lDQUNYLElBQUksQ0FDRCxHQUFHLEtBQUssR0FBRyxVQUFVLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdDQUMvQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsa0NBQWtDLENBQUMsQ0FBQyxDQUFDLEVBQ3pFLEVBQUUsQ0FDTCxDQUFDO2dDQUNWLENBQUM7NEJBQ0wsQ0FBQzt3QkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNYLENBQUM7cUJBQU0sSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDdkQsSUFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztvQkFDbEMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixjQUFjLENBQUMsR0FBRyxDQUFDLENBQU8sSUFBWSxFQUFFLEtBQWEsRUFBRSxFQUFFO3dCQUNyRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3JHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO3dCQUNqQyxjQUFjLEVBQUUsQ0FBQzt3QkFDakIsSUFBSSxLQUFLLEtBQUssY0FBYyxFQUFFLENBQUM7NEJBQzNCLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7d0JBQy9HLENBQUM7b0JBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDUCxDQUFDO3FCQUFNLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ3JELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztvQkFDakMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixhQUFhLENBQUMsR0FBRyxDQUFDLENBQU8sSUFBWSxFQUFFLEtBQWEsRUFBRSxFQUFFO3dCQUNwRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sdUJBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9ELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN6RyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sb0JBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDbkcsTUFBTSxlQUFlLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1RixLQUFLLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2xELENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDeEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLGtCQUFNLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0YsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE9BQWUsRUFBRSxFQUFFOzRCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN6RixDQUFDLENBQUM7d0JBQ0YsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUcsY0FBYyxFQUFFLENBQUM7d0JBQ2pCLElBQUksY0FBYyxLQUFLLEtBQUssRUFBRSxDQUFDOzRCQUMzQixJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUUsQ0FBQztnQ0FDdkIsa0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO2dDQUNsRyxPQUFPLEdBQUc7cUNBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQztxQ0FDWCxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7NEJBQ2hILENBQUM7aUNBQU0sQ0FBQztnQ0FDSixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDbkIsT0FBTyxHQUFHO3FDQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUNBQ1gsSUFBSSxDQUNELEdBQUcsS0FBSyxHQUFHLFVBQVUsYUFBYSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUNBQ2xELFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sVUFBVSw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsRUFDekUsRUFBRSxDQUNMLENBQUM7NEJBQ1YsQ0FBQzt3QkFDTCxDQUFDO29CQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztxQkFBTSxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDM0QsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO29CQUNwQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUN4QyxrQkFBTSxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO3dCQUNwRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLENBQUMsQ0FBQztvQkFDcEYsQ0FBQzt5QkFBTSxDQUFDO3dCQUNKLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQU8sSUFBWSxFQUFFLEtBQWEsRUFBRSxFQUFFOzRCQUN2RCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3hHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDOzRCQUNwQyxjQUFjLEVBQUUsQ0FBQzs0QkFDakIsSUFBSSxLQUFLLEtBQUssY0FBYyxFQUFFLENBQUM7Z0NBQzNCLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUNuQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQzs0QkFDckgsQ0FBQzt3QkFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQztxQkFBTSxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDL0QsQ0FBQztxQkFBTSxJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDckUsQ0FBQztxQkFBTSxDQUFDO29CQUNKLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwQixPQUFPLEtBQUs7eUJBQ1AsSUFBSSxFQUFFO3lCQUNOLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt5QkFDdkQsT0FBTyxDQUFDLEdBQUcsRUFBRTt3QkFDVixJQUFBLHdDQUE0QixFQUFDLE1BQU0sQ0FBQyxpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDcEcsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMxRSxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQixrQkFBTSxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNwRSxDQUFDO1NBQU0sQ0FBQztRQUNKLE9BQU8sZUFBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzthQUNsQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN6SSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUEsd0NBQTRCLEVBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0csS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQztBQUVGLGtCQUFlLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDIn0=