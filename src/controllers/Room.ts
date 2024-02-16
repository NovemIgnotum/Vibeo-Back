import { NextFunction, Request, Response } from 'express';

// Models
import Room from '../models/Room';
import Utilisateur from '../models/Utilisateur';
import Etablissement from '../models/Etablissement';
import Retour from '../library/Response';
import { createRoomForExtracting, deleteRoomForExtracting, readRoomForExtracting, updateRoomForExtracting } from '../functions/RoomData';
import axios from 'axios';
import config from '../config/config';

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const etablissementFinded = await Etablissement.findById(req.params.etablissementId).populate('rooms').select('rooms');
        if (!etablissementFinded) {
            Retour.warn('Etablissement was not found');
            return res.status(404).json('Etablissement was not found');
        } else {
            if (!req.body.name) {
                Retour.warn('The name of the room was not found');
                return res.status(404).json('The name of the room was not found');
            } else {
                const indexCondition = (element: object) => Object(element).name === req.body.name;
                const indexReturned = etablissementFinded.rooms.findIndex(indexCondition);
                if (indexReturned !== -1) {
                    Retour.warn('The room already exist');
                    return res.status(400).json('The room already exist');
                } else {
                    const newRoom = new Room({
                        name: req.body.name,
                        months: [
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
                                month: 'Octobre',
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
                        ]
                    });
                    etablissementFinded.rooms.push(Object(newRoom));
                    await etablissementFinded.save();
                    await newRoom.save();
                    createRoomForExtracting(Object(req.body.admin.datas[0].mounths[0]), Object(newRoom._id));
                    Retour.info('The room was created');
                    return res.status(201).json('The room was created');
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const readRoom = async (req: Request, res: Response, next: NextFunction) => {
    const roomId = req.params.roomId;
    const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
    if (!utilisateurFinded) {
        Retour.error('Requester was not found');
        return res.status(500).json('Requester was not found');
    } else {
        return Room.findById(roomId)
            .populate('appointments')
            .then((room) => (room ? res.status(200).json(room) : res.status(404).json({ message: 'The room was not found' })))
            .finally(() => {
                updateRoomForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(roomId));
            })
            .catch((error) => res.status(500).json({ error: error.message }));
    }
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Etablissement.findById(req.params.etablissementId)
        .populate('rooms')
        .select('rooms')
        .then((rooms) => {
            rooms ? res.status(200).json(rooms) : res.status(404).json('The etablissement has no room');
        })
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateRoom = (req: Request, res: Response, next: NextFunction) => {
    return Room.findById(req.params.roomId).then(async (room) => {
        if (!room) {
            Retour.error('The room was not found');
            return res.status(404).json('The room was not found');
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.admin._id);
            if (!utilisateurFinded) {
                return res.status(404).json('requester was not found');
            } else {
                if (!req.body.name) {
                    Retour.warn('the name of the room was not found');
                    return res.status(404).json('the name of the room was not found');
                } else {
                    room.name = req.body.name;
                    return room
                        .save()
                        .then((room) => res.status(201).json({ room: room }))
                        .finally(() => {
                            updateRoomForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(room._id));
                        })
                        .catch((error) => {
                            Retour.error({ message: 'Error catched', error: error.message });
                            res.status(500).json({ message: 'Error catched', error: error.message });
                        });
                }
            }
        }
    });
};

const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    const roomTodelete = await Room.findById(req.params.roomId);
    const etablissementFinded = await Etablissement.findOne({ rooms: req.params.roomId });

    const utilisateurFinded = await Utilisateur.findById(req.body.admin._id);
    if (!utilisateurFinded) {
        Retour.warn('Requester was not found');
        return res.status(404).json('Requester was not found');
    } else {
        const roomArchived = await axios.post(`${config.mongooseUrlArchived}/room/create`, {
            _id: roomTodelete?._id,
            name: roomTodelete?.name,
            months: roomTodelete?.months
        });
        if (roomArchived.data.message === '') {
            const newArray = etablissementFinded?.rooms.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(req.params.roomId));
            return await Room.findById(req.params.roomId)
                .then(async (room) =>
                    room
                        ? (Object(etablissementFinded).roomArchiveds.push(roomTodelete),
                          (Object(etablissementFinded).rooms = newArray),
                          await etablissementFinded?.save(),
                          await room.deleteOne(),
                          Retour.info('Room has been archived'),
                          res.status(200).json('Room has been archived'))
                        : (Retour.warn('Room was not found'), res.status(404).json('Room was not found'))
                )
                .finally(() => {
                    deleteRoomForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(req.params.roomId));
                })
                .catch((e) => {
                    Retour.error({ error: e.message });
                    return res.status(500).json({ error: e.message });
                });
        } else {
            Retour.warn('Something went wrong in archives');
            return res.status(400).json('Something went wrong in archives');
        }
    }
};

export default { createRoom, readRoom, readAll, updateRoom, deleteRoom };
