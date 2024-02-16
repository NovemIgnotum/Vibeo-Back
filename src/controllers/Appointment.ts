import { NextFunction, Request, Response } from 'express';

// Models
import Appointment from '../models/Appointment';
import Utilisateur from '../models/Utilisateur';
import Interlocutor from '../models/Interlocutor';
import Partenaire from '../models/Partenaire';
import Usager from '../models/Usager';
import Room from '../models/Room';

// Library
import Retour from '../library/Response';

const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            requesterId,
            roomId,
            title,
            nature,
            content,
            dateEvent,
            guests,
            startHour,
            endHour,
            allDay,
            recurrence,
            frequencyRecurrence,
            dateEndRecurrence
        } = req.body;
        // Si le rendez-vous est en présentiel
        const roomFinded = await Room.findById(roomId);
        // Si le rendez-vous est est en distanciel
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        const interlocutorFinded = await Interlocutor.findById(requesterId);
        const partenaireFinded = await Partenaire.findById(requesterId);
        const usagerFinded = await Usager.findById(requesterId);

        if (!utilisateurFinded && !interlocutorFinded && !partenaireFinded && !usagerFinded) {
            Retour.warn('requester was not found');
            return res.status(404).json('requester was not found');
        } else {
            if (!title || !nature || !dateEvent) {
                Retour.warn('One or more values are missing');
                return res.status(404).json('One or more values are missing');
            } else {
                let count: number = 0;
                const date = new Date(dateEvent);
                let month = date.getMonth();
                const appointment = new Appointment({
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

                const indexOfTheYear = (element: object) => JSON.stringify(Object(element).year) === JSON.stringify(date.getFullYear());

                let conditionPassed = false;
                let hourFinded = false;

                // Afin de pusher le rendez-vous dans la salle appropriée
                if (nature !== 'visio' && nature !== 'tel') {
                    if (!roomFinded) {
                        Retour.warn('RoomId is missing');
                        return res.status(404).json('RoomId is missing');
                    } else {
                        // Afin de passer la valeur en positif en cas de tableau vide
                        if (Object(roomFinded).months[date.getMonth()].appointments.length === 0) {
                            conditionPassed = true;
                            hourFinded = false;
                        }
                        for (const appointmentId of roomFinded.months[date.getMonth()].appointments) {
                            const dateFinded = await Appointment.findOne(appointmentId).select('startHour endHour location');
                            if (
                                // conditions si la date rendez-vous est deja réservée
                                (JSON.stringify(Object(appointment.location)._id) === JSON.stringify(Object(dateFinded).location) &&
                                    Number(appointment.startHour) >= Number(dateFinded?.startHour) &&
                                    Number(appointment.endHour) <= Number(dateFinded?.endHour)) ||
                                (JSON.stringify(Object(appointment.location)._id) === JSON.stringify(Object(dateFinded).location) &&
                                    Number(appointment.endHour) >= Number(dateFinded?.startHour) &&
                                    Number(appointment.startHour) <= Number(dateFinded?.startHour)) ||
                                (JSON.stringify(Object(appointment.location)._id) === JSON.stringify(Object(dateFinded).location) &&
                                    Number(appointment.startHour) <= Number(dateFinded?.endHour) &&
                                    Number(appointment.endHour) >= Number(dateFinded?.endHour))
                            ) {
                                conditionPassed = true;
                                hourFinded = true;
                            } else {
                                conditionPassed = true;
                                hourFinded = false;
                            }
                        }
                        if (guests.length !== 0) {
                            for (const guest of guests) {
                                const interlocutorGuest = await Interlocutor.findById(guest);
                                const partenaireGuest = await Partenaire.findById(guest);
                                const utilisateurGuest = await Utilisateur.findById(guest);
                                const usagerGuest = await Usager.findById(guest);

                                interlocutorGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.interlocutors.push(Object(interlocutorGuest)),
                                    interlocutorGuest.appointments[date.getMonth()].appointments.push(
                                        Object(appointment),
                                        Object(interlocutorGuest).appointments.year[
                                            Object(interlocutorGuest).appointments.year.findIndex(indexOfTheYear)
                                        ].months[date.getMonth()]
                                    ),
                                    await interlocutorGuest.save());

                                partenaireGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.partenaires.push(Object(partenaireGuest)),
                                    partenaireGuest.appointments[date.getMonth()].appointments.push(Object(appointment)),
                                    await partenaireGuest.save());

                                utilisateurGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.utilisateurs.push(Object(utilisateurGuest)),
                                    utilisateurGuest.appointments[date.getMonth()].appointments.push(Object(appointment)),
                                    await utilisateurGuest.save());

                                usagerGuest &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (appointment.guest.usagers.push(Object(usagerGuest)),
                                    usagerGuest.appointments[date.getMonth()].appointments.push(Object(appointment)),
                                    await usagerGuest.save());

                                count++;
                                count === guests.length &&
                                    conditionPassed === true &&
                                    hourFinded === false &&
                                    (await appointment.save(),
                                    roomFinded.months[date.getMonth()].appointments.push(Object(appointment)),
                                    await Object(roomFinded).save());
                            }
                            if (conditionPassed === true && hourFinded === false) {
                                Retour.info('Appointment added');
                                return res.status(201).json('Appointment added');
                            } else {
                                Retour.info('Appointment already exist about this hour');
                                return res.status(400).json('Appointment already exist about this hour');
                            }
                        } else {
                            Retour.warn('The guest is missing');
                            return res.status(400).json('The guest is missing');
                        }
                    }
                } else {
                    for (const guest of guests) {
                        const interlocutorGuest = await Interlocutor.findById(guest);
                        const partenaireGuest = await Partenaire.findById(guest);
                        const utilisateurGuest = await Utilisateur.findById(guest);
                        const usagerGuest = await Usager.findById(guest);
                        interlocutorGuest &&
                            (appointment.guest.interlocutors.push(Object(interlocutorGuest)),
                            interlocutorGuest.appointments[month].appointments.push(Object(appointment)),
                            await interlocutorGuest.save());

                        partenaireGuest &&
                            (appointment.guest.partenaires.push(Object(partenaireGuest)),
                            partenaireGuest.appointments[month].appointments.push(Object(appointment)),
                            await partenaireGuest.save());

                        utilisateurGuest &&
                            (appointment.guest.utilisateurs.push(Object(utilisateurGuest)),
                            utilisateurGuest.appointments[month].appointments.push(Object(appointment)),
                            await utilisateurGuest.save());

                        usagerGuest &&
                            (appointment.guest.usagers.push(Object(usagerGuest)),
                            usagerGuest.appointments[month].appointments.push(Object(appointment)),
                            await usagerGuest.save());
                    }
                    await appointment.save();
                    Retour.info('Appointment added');
                    return res.status(201).json('Appointment added');
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const readAppointment = (req: Request, res: Response, next: NextFunction) => {
    const appointmentId = req.params.appointmentId;
    return Appointment.findById(appointmentId)
        .then((appointment) => (appointment ? res.status(200).json(appointment) : res.status(404).json({ message: 'The appointment was not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const roomFinded = await Room.findById(req.params.idToFind)
        .populate({
            path: 'months',
            model: 'Appointment',
            populate: {
                path: 'appointments'
            }
        })
        .select('months');
    const usagerFinded = await Usager.findById(req.params.idToFind)
        .populate({
            path: 'appointments',
            model: 'Appointment',
            populate: {
                path: 'appointments'
            }
        })
        .select('appointments account');
    const utilisateurFinded = await Utilisateur.findById(req.params.idToFind)
        .populate({
            path: 'appointments',
            model: 'Appointment',
            populate: {
                path: 'appointments'
            }
        })
        .select('appointments account');
    const partenaireFinded = await Partenaire.findById(req.params.idToFind)
        .populate({
            path: 'appointments',
            model: 'Appointment',
            populate: {
                path: 'appointments'
            }
        })
        .select('appointments account');
    const interloccutorFinded = await Interlocutor.findById(req.params.idToFind)
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
    } else {
        roomFinded && res.status(200).json(roomFinded.months[month]);
        usagerFinded && res.status(200).json({ account: usagerFinded.account, appointments: usagerFinded.appointments[month] });
        utilisateurFinded && res.status(200).json({ account: utilisateurFinded.account, appointments: utilisateurFinded.appointments[month] });
        partenaireFinded && res.status(200).json({ account: partenaireFinded.account, appointments: partenaireFinded.appointments[month] });
        interloccutorFinded && res.status(200).json({ account: interloccutorFinded.account, appointments: interloccutorFinded.appointments[month] });
    }
};

const updateAppointment = (req: Request, res: Response, next: NextFunction) => {
    try {
        return Appointment.findById(req.params.appointmentId).then(async (appointment) => {
            if (!appointment) {
                Retour.warn('Appointment was not found');
                return res.status(404).json({ message: 'Appointment was not found' });
            } else {
                const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
                const interlocutorFinded = await Interlocutor.findById(req.body.requesterId);
                const partenaireFinded = await Partenaire.findById(req.body.requesterId);
                const usagerFinded = await Usager.findById(req.body.requesterId);
                if (!utilisateurFinded && !interlocutorFinded && !partenaireFinded && !usagerFinded) {
                    Retour.warn('requester was not found');
                    return res.status(404).json('requester was not found');
                } else {
                    const { guestToRemove, guestToAdd } = req.body;
                    let count = 0;
                    const date = new Date(appointment.dateEvent).getMonth();
                    // Afin d'ajouter des participants a l'évenement
                    if (guestToRemove) {
                        for (const guest of guestToRemove) {
                            const interlocutorGuest = await Interlocutor.findById(guest);
                            const partenaireGuest = await Partenaire.findById(guest);
                            const utilisateurGuest = await Utilisateur.findById(guest);
                            const usagerGuest = await Usager.findById(guest);

                            interlocutorGuest &&
                                ((Object(appointment.guest).interlocutors = appointment.guest.interlocutors.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(guest)
                                )),
                                (Object(interlocutorGuest).appointments[date].appointments = interlocutorGuest.appointments[date].appointments.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(appointment._id)
                                )),
                                await interlocutorGuest.save());

                            partenaireGuest &&
                                ((Object(appointment.guest).partenaires = appointment.guest.partenaires.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(guest)
                                )),
                                (Object(partenaireGuest).appointments[date].appointments = partenaireGuest.appointments[date].appointments.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(appointment._id)
                                )),
                                await partenaireGuest.save());

                            utilisateurGuest &&
                                ((Object(appointment).guest.utilisateurs = appointment.guest.utilisateurs.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(guest)
                                )),
                                (Object(utilisateurGuest).appointments[date].appointments = utilisateurGuest.appointments[date].appointments.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(appointment._id)
                                )),
                                await utilisateurGuest.save());

                            usagerGuest &&
                                ((Object(appointment.guest).usagers = appointment.guest.usagers.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(guest)
                                )),
                                (Object(usagerGuest).appointments[date].appointments = usagerGuest.appointments[date].appointments.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(appointment._id)
                                )),
                                await usagerGuest.save());
                            count++;
                        }
                        await appointment.save();
                        Retour.info(`guest${guestToRemove.length > 1 ? 's' : ''} removed to the appointment`);
                        return res.status(200).json(`guest${guestToRemove.length > 1 ? 's' : ''} removed to the appointment`);
                        // Afin de supprimer des participants à l'évenement
                    } else if (guestToAdd) {
                        for (const guest of guestToAdd) {
                            const interlocutorGuest = await Interlocutor.findById(guest);
                            const partenaireGuest = await Partenaire.findById(guest);
                            const utilisateurGuest = await Utilisateur.findById(guest);
                            const usagerGuest = await Usager.findById(guest);
                            interlocutorGuest &&
                                (appointment.guest.interlocutors.push(Object(interlocutorGuest)),
                                interlocutorGuest.appointments[date].appointments.push(Object(appointment)),
                                await interlocutorGuest.save());
                            partenaireGuest &&
                                (appointment.guest.partenaires.push(Object(partenaireGuest)),
                                partenaireGuest.appointments[date].appointments.push(Object(appointment)),
                                await partenaireGuest.save());
                            utilisateurGuest &&
                                (appointment.guest.utilisateurs.push(Object(utilisateurGuest)),
                                utilisateurGuest.appointments[date].appointments.push(Object(appointment)),
                                await utilisateurGuest.save());
                            usagerGuest &&
                                (appointment.guest.usagers.push(Object(usagerGuest)),
                                usagerGuest.appointments[date].appointments.push(Object(appointment)),
                                await usagerGuest.save());
                            count++;
                        }
                        await appointment.save();
                        Retour.info(`guest${guestToAdd.length > 1 ? 's' : ''} added to the appointment`);
                        return res.status(200).json(`guest${guestToAdd.length > 1 ? 's' : ''} added to the appointment`);
                    } else {
                        // Afin de modifier le corp de l'évènement
                        appointment.set(req.body);
                    }
                }
            }
        });
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const appointment = await Appointment.findById(req.params.appointmentId);
        if (!appointment) {
            Retour.warn('appointment was not found');
            return res.status(500).json('appointment was not found');
        } else {
            if (
                Object(appointment).guest.interlocutors.length === 0 &&
                Object(appointment).guest.utilisateurs.length === 0 &&
                Object(appointment).guest.usagers.length === 0 &&
                Object(appointment).guest.partenaires.length === 0
            ) {
                Retour.info('appointment without guest has been deleted');
                return res.status(500).json('appointment without guest has been deleted');
            } else {
                for (const interlocutorId of Object(appointment).guest.interlocutors) {
                    const interlocutorFinded = await Interlocutor.findById(interlocutorId);
                    Object(interlocutorFinded?.appointments[appointment.dateEvent.getMonth()]).appointments = interlocutorFinded?.appointments[
                        appointment.dateEvent.getMonth()
                    ].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    await interlocutorFinded?.save();
                }
                for (const utilisateurId of Object(appointment).guest.utilisateurs) {
                    const utilisateurFinded = await Utilisateur.findById(utilisateurId);
                    Object(utilisateurFinded?.appointments[appointment.dateEvent.getMonth()]).appointments = utilisateurFinded?.appointments[
                        appointment.dateEvent.getMonth()
                    ].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    await utilisateurFinded?.save();
                }
                for (const usagerId of Object(appointment).guest.usagers) {
                    const usagerFinded = await Usager.findById(usagerId);
                    Object(usagerFinded?.appointments[appointment.dateEvent.getMonth()]).appointments = usagerFinded?.appointments[
                        appointment.dateEvent.getMonth()
                    ].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    await usagerFinded?.save();
                }
                for (const partenaireId of Object(appointment).guest.partenaires) {
                    const partenaireFinded = await Partenaire.findById(partenaireId);
                    Object(partenaireFinded?.appointments[appointment.dateEvent.getMonth()]).appointments = partenaireFinded?.appointments[
                        appointment.dateEvent.getMonth()
                    ].appointments.filter((el) => JSON.stringify(el) !== JSON.stringify(appointment._id));
                    await partenaireFinded?.save();
                }
                Retour.info('appointment has been deleted');
                return res.status(500).json('appointment has been deleted');
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

export default { createAppointment, readAppointment, readAll, updateAppointment, deleteAppointment };
