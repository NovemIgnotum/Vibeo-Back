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
const Appointment_1 = __importDefault(require("../models/Appointment"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Room_1 = __importDefault(require("../models/Room"));
const Response_1 = __importDefault(require("../library/Response"));
const createAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId, roomId, title, nature, content, dateEvent, guests, startHour, endHour, allDay, recurrence, frequencyRecurrence, dateEndRecurrence } = req.body;
        const roomFinded = yield Room_1.default.findById(roomId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const interlocutorFinded = yield Interlocutor_1.default.findById(requesterId);
        const partenaireFinded = yield Partenaire_1.default.findById(requesterId);
        const usagerFinded = yield Usager_1.default.findById(requesterId);
        if (!utilisateurFinded && !interlocutorFinded && !partenaireFinded && !usagerFinded) {
            Response_1.default.warn('requester was not found');
            return res.status(404).json('requester was not found');
        }
        else {
            if (!title || !nature || !dateEvent) {
                Response_1.default.warn('One or more values are missing');
                return res.status(404).json('One or more values are missing');
            }
            else {
                let count = 0;
                const date = new Date(dateEvent);
                let month = date.getMonth();
                const appointment = new Appointment_1.default({
                    title,
                    nature,
                    content,
                    dateEvent: date,
                    guest: {
                        interlocutors: [],
                        partenaires: [],
                        utilisateurs: [],
                        usagers: []
                    },
                    startHour: new Date(startHour).getTime(),
                    endHour: new Date(endHour).getTime(),
                    location: roomFinded ? roomFinded : undefined,
                    allDay,
                    recurrence,
                    frequencyRecurrence,
                    dateEndRecurrence
                });
                const indexOfTheYear = (element) => JSON.stringify(Object(element).year) === JSON.stringify(date.getFullYear());
                let conditionPassed = false;
                let hourFinded = false;
                if (nature !== 'visio' && nature !== 'tel') {
                    if (!roomFinded) {
                        Response_1.default.warn('RoomId is missing');
                        return res.status(404).json('RoomId is missing');
                    }
                    else {
                        if (Object(roomFinded).months[date.getMonth()].appointments.length === 0) {
                            conditionPassed = true;
                            hourFinded = false;
                        }
                        for (const appointmentId of roomFinded.months[date.getMonth()].appointments) {
                            const dateFinded = yield Appointment_1.default.findOne(appointmentId).select('startHour endHour location');
                            if ((JSON.stringify(Object(appointment.location)._id) === JSON.stringify(Object(dateFinded).location) &&
                                Number(appointment.startHour) >= Number(dateFinded === null || dateFinded === void 0 ? void 0 : dateFinded.startHour) &&
                                Number(appointment.endHour) <= Number(dateFinded === null || dateFinded === void 0 ? void 0 : dateFinded.endHour)) ||
                                (JSON.stringify(Object(appointment.location)._id) === JSON.stringify(Object(dateFinded).location) &&
                                    Number(appointment.endHour) >= Number(dateFinded === null || dateFinded === void 0 ? void 0 : dateFinded.startHour) &&
                                    Number(appointment.startHour) <= Number(dateFinded === null || dateFinded === void 0 ? void 0 : dateFinded.startHour)) ||
                                (JSON.stringify(Object(appointment.location)._id) === JSON.stringify(Object(dateFinded).location) &&
                                    Number(appointment.startHour) <= Number(dateFinded === null || dateFinded === void 0 ? void 0 : dateFinded.endHour) &&
                                    Number(appointment.endHour) >= Number(dateFinded === null || dateFinded === void 0 ? void 0 : dateFinded.endHour))) {
                                conditionPassed = true;
                                hourFinded = true;
                            }
                            else {
                                conditionPassed = true;
                                hourFinded = false;
                            }
                        }
                        if (guests.length !== 0) {
                            for (const guest of guests) {
                                const interlocutorGuest = yield Interlocutor_1.default.findById(guest);
                                const partenaireGuest = yield Partenaire_1.default.findById(guest);
                                const utilisateurGuest = yield Utilisateur_1.default.findById(guest);
                                const usagerGuest = yield Usager_1.default.findById(guest);
                                interlocutorGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.interlocutors.push(Object(interlocutorGuest)),
                                        interlocutorGuest.appointments[date.getMonth()].appointments.push(Object(appointment), Object(interlocutorGuest).appointments.year[Object(interlocutorGuest).appointments.year.findIndex(indexOfTheYear)].months[date.getMonth()]),
                                        yield interlocutorGuest.save());
                                partenaireGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.partenaires.push(Object(partenaireGuest)),
                                        partenaireGuest.appointments[date.getMonth()].appointments.push(Object(appointment)),
                                        yield partenaireGuest.save());
                                utilisateurGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.utilisateurs.push(Object(utilisateurGuest)),
                                        utilisateurGuest.appointments[date.getMonth()].appointments.push(Object(appointment)),
                                        yield utilisateurGuest.save());
                                usagerGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.usagers.push(Object(usagerGuest)),
                                        usagerGuest.appointments[date.getMonth()].appointments.push(Object(appointment)),
                                        yield usagerGuest.save());
                                count++;
                                count === guests.length &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (yield appointment.save(),
                                        roomFinded.months[date.getMonth()].appointments.push(Object(appointment)),
                                        yield Object(roomFinded).save());
                            }
                            if (conditionPassed === true && hourFinded === false) {
                                Response_1.default.info('Appointment added');
                                return res.status(201).json('Appointment added');
                            }
                            else {
                                Response_1.default.info('Appointment already exist about this hour');
                                return res.status(400).json('Appointment already exist about this hour');
                            }
                        }
                        else {
                            Response_1.default.warn('The guest is missing');
                            return res.status(400).json('The guest is missing');
                        }
                    }
                }
                else {
                    for (const guest of guests) {
                        const interlocutorGuest = yield Interlocutor_1.default.findById(guest);
                        const partenaireGuest = yield Partenaire_1.default.findById(guest);
                        const utilisateurGuest = yield Utilisateur_1.default.findById(guest);
                        const usagerGuest = yield Usager_1.default.findById(guest);
                        interlocutorGuest &&
                            (appointment.guest.interlocutors.push(Object(interlocutorGuest)),
                                interlocutorGuest.appointments[month].appointments.push(Object(appointment)),
                                yield interlocutorGuest.save());
                        partenaireGuest &&
                            (appointment.guest.partenaires.push(Object(partenaireGuest)),
                                partenaireGuest.appointments[month].appointments.push(Object(appointment)),
                                yield partenaireGuest.save());
                        utilisateurGuest &&
                            (appointment.guest.utilisateurs.push(Object(utilisateurGuest)),
                                utilisateurGuest.appointments[month].appointments.push(Object(appointment)),
                                yield utilisateurGuest.save());
                        usagerGuest &&
                            (appointment.guest.usagers.push(Object(usagerGuest)),
                                usagerGuest.appointments[month].appointments.push(Object(appointment)),
                                yield usagerGuest.save());
                    }
                    yield appointment.save();
                    Response_1.default.info('Appointment added');
                    return res.status(201).json('Appointment added');
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readAppointment = (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    return Appointment_1.default.findById(appointmentId)
        .then((appointment) => (appointment ? res.status(200).json(appointment) : res.status(404).json({ message: 'The appointment was not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomFinded = yield Room_1.default.findById(req.params.idToFind)
        .populate({
        path: 'months',
        model: 'Appointment',
        populate: {
            path: 'appointments'
        }
    })
        .select('months');
    const usagerFinded = yield Usager_1.default.findById(req.params.idToFind)
        .populate({
        path: 'appointments',
        model: 'Appointment',
        populate: {
            path: 'appointments'
        }
    })
        .select('appointments account');
    const utilisateurFinded = yield Utilisateur_1.default.findById(req.params.idToFind)
        .populate({
        path: 'appointments',
        model: 'Appointment',
        populate: {
            path: 'appointments'
        }
    })
        .select('appointments account');
    const partenaireFinded = yield Partenaire_1.default.findById(req.params.idToFind)
        .populate({
        path: 'appointments',
        model: 'Appointment',
        populate: {
            path: 'appointments'
        }
    })
        .select('appointments account');
    const interloccutorFinded = yield Interlocutor_1.default.findById(req.params.idToFind)
        .populate({
        path: 'appointments',
        model: 'Appointment',
        populate: {
            path: 'appointments'
        }
    })
        .select('appointments account');
    const month = req.body.month;
    if (!month) {
        return res.status(400).json('the month is missing');
    }
    else {
        roomFinded && res.status(200).json(roomFinded.months[month]);
        usagerFinded && res.status(200).json({ account: usagerFinded.account, appointments: usagerFinded.appointments[month] });
        utilisateurFinded && res.status(200).json({ account: utilisateurFinded.account, appointments: utilisateurFinded.appointments[month] });
        partenaireFinded && res.status(200).json({ account: partenaireFinded.account, appointments: partenaireFinded.appointments[month] });
        interloccutorFinded && res.status(200).json({ account: interloccutorFinded.account, appointments: interloccutorFinded.appointments[month] });
    }
});
const updateAppointment = (req, res, next) => {
    try {
        return Appointment_1.default.findById(req.params.appointmentId).then((appointment) => __awaiter(void 0, void 0, void 0, function* () {
            if (!appointment) {
                Response_1.default.warn('Appointment was not found');
                return res.status(404).json({ message: 'Appointment was not found' });
            }
            else {
                const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
                const interlocutorFinded = yield Interlocutor_1.default.findById(req.body.requesterId);
                const partenaireFinded = yield Partenaire_1.default.findById(req.body.requesterId);
                const usagerFinded = yield Usager_1.default.findById(req.body.requesterId);
                if (!utilisateurFinded && !interlocutorFinded && !partenaireFinded && !usagerFinded) {
                    Response_1.default.warn('requester was not found');
                    return res.status(404).json('requester was not found');
                }
                else {
                    const { guestToRemove, guestToAdd } = req.body;
                    let count = 0;
                    const date = new Date(appointment.dateEvent).getMonth();
                    if (guestToRemove) {
                        for (const guest of guestToRemove) {
                            const interlocutorGuest = yield Interlocutor_1.default.findById(guest);
                            const partenaireGuest = yield Partenaire_1.default.findById(guest);
                            const utilisateurGuest = yield Utilisateur_1.default.findById(guest);
                            const usagerGuest = yield Usager_1.default.findById(guest);
                            interlocutorGuest &&
                                ((Object(appointment.guest).interlocutors = appointment.guest.interlocutors.filter((el) => JSON.stringify(el) !== JSON.stringify(guest))),
                                    (Object(interlocutorGuest).appointments[date].appointments = interlocutorGuest.appointments[date].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id))),
                                    yield interlocutorGuest.save());
                            partenaireGuest &&
                                ((Object(appointment.guest).partenaires = appointment.guest.partenaires.filter((el) => JSON.stringify(el) !== JSON.stringify(guest))),
                                    (Object(partenaireGuest).appointments[date].appointments = partenaireGuest.appointments[date].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id))),
                                    yield partenaireGuest.save());
                            utilisateurGuest &&
                                ((Object(appointment).guest.utilisateurs = appointment.guest.utilisateurs.filter((el) => JSON.stringify(el) !== JSON.stringify(guest))),
                                    (Object(utilisateurGuest).appointments[date].appointments = utilisateurGuest.appointments[date].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id))),
                                    yield utilisateurGuest.save());
                            usagerGuest &&
                                ((Object(appointment.guest).usagers = appointment.guest.usagers.filter((el) => JSON.stringify(el) !== JSON.stringify(guest))),
                                    (Object(usagerGuest).appointments[date].appointments = usagerGuest.appointments[date].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id))),
                                    yield usagerGuest.save());
                            count++;
                        }
                        yield appointment.save();
                        Response_1.default.info(`guest${guestToRemove.length > 1 ? 's' : ''} removed to the appointment`);
                        return res.status(200).json(`guest${guestToRemove.length > 1 ? 's' : ''} removed to the appointment`);
                    }
                    else if (guestToAdd) {
                        for (const guest of guestToAdd) {
                            const interlocutorGuest = yield Interlocutor_1.default.findById(guest);
                            const partenaireGuest = yield Partenaire_1.default.findById(guest);
                            const utilisateurGuest = yield Utilisateur_1.default.findById(guest);
                            const usagerGuest = yield Usager_1.default.findById(guest);
                            interlocutorGuest &&
                                (appointment.guest.interlocutors.push(Object(interlocutorGuest)),
                                    interlocutorGuest.appointments[date].appointments.push(Object(appointment)),
                                    yield interlocutorGuest.save());
                            partenaireGuest &&
                                (appointment.guest.partenaires.push(Object(partenaireGuest)),
                                    partenaireGuest.appointments[date].appointments.push(Object(appointment)),
                                    yield partenaireGuest.save());
                            utilisateurGuest &&
                                (appointment.guest.utilisateurs.push(Object(utilisateurGuest)),
                                    utilisateurGuest.appointments[date].appointments.push(Object(appointment)),
                                    yield utilisateurGuest.save());
                            usagerGuest &&
                                (appointment.guest.usagers.push(Object(usagerGuest)),
                                    usagerGuest.appointments[date].appointments.push(Object(appointment)),
                                    yield usagerGuest.save());
                            count++;
                        }
                        yield appointment.save();
                        Response_1.default.info(`guest${guestToAdd.length > 1 ? 's' : ''} added to the appointment`);
                        return res.status(200).json(`guest${guestToAdd.length > 1 ? 's' : ''} added to the appointment`);
                    }
                    else {
                        appointment.set(req.body);
                    }
                }
            }
        }));
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};
const deleteAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield Appointment_1.default.findById(req.params.appointmentId);
        if (!appointment) {
            Response_1.default.warn('appointment was not found');
            return res.status(500).json('appointment was not found');
        }
        else {
            if (Object(appointment).guest.interlocutors.length === 0 &&
                Object(appointment).guest.utilisateurs.length === 0 &&
                Object(appointment).guest.usagers.length === 0 &&
                Object(appointment).guest.partenaires.length === 0) {
                Response_1.default.info('appointment without guest has been deleted');
                return res.status(500).json('appointment without guest has been deleted');
            }
            else {
                for (const interlocutorId of Object(appointment).guest.interlocutors) {
                    const interlocutorFinded = yield Interlocutor_1.default.findById(interlocutorId);
                    Object(interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.appointments[appointment.dateEvent.getMonth()]).appointments = interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.appointments[appointment.dateEvent.getMonth()].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    yield (interlocutorFinded === null || interlocutorFinded === void 0 ? void 0 : interlocutorFinded.save());
                }
                for (const utilisateurId of Object(appointment).guest.utilisateurs) {
                    const utilisateurFinded = yield Utilisateur_1.default.findById(utilisateurId);
                    Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.appointments[appointment.dateEvent.getMonth()]).appointments = utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.appointments[appointment.dateEvent.getMonth()].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    yield (utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.save());
                }
                for (const usagerId of Object(appointment).guest.usagers) {
                    const usagerFinded = yield Usager_1.default.findById(usagerId);
                    Object(usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.appointments[appointment.dateEvent.getMonth()]).appointments = usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.appointments[appointment.dateEvent.getMonth()].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    yield (usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.save());
                }
                for (const partenaireId of Object(appointment).guest.partenaires) {
                    const partenaireFinded = yield Partenaire_1.default.findById(partenaireId);
                    Object(partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.appointments[appointment.dateEvent.getMonth()]).appointments = partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.appointments[appointment.dateEvent.getMonth()].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    yield (partenaireFinded === null || partenaireFinded === void 0 ? void 0 : partenaireFinded.save());
                }
                Response_1.default.info('appointment has been deleted');
                return res.status(500).json('appointment has been deleted');
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
exports.default = { createAppointment, readAppointment, readAll, updateAppointment, deleteAppointment };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwb2ludG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvQXBwb2ludG1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSx3RUFBZ0Q7QUFDaEQsd0VBQWdEO0FBQ2hELDBFQUFrRDtBQUNsRCxzRUFBOEM7QUFDOUMsOERBQXNDO0FBQ3RDLDBEQUFrQztBQUdsQyxtRUFBeUM7QUFFekMsTUFBTSxpQkFBaUIsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ2hGLElBQUksQ0FBQztRQUNELE1BQU0sRUFDRixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04sVUFBVSxFQUNWLG1CQUFtQixFQUNuQixpQkFBaUIsRUFDcEIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRWIsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRS9DLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRSxNQUFNLGtCQUFrQixHQUFHLE1BQU0sc0JBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEUsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLG9CQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2xGLGtCQUFNLENBQUMs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