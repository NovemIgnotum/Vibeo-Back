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
const Room_1 = __importDefault(require("../models/Room"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Etablissement_1 = __importDefault(require("../models/Etablissement"));
const Response_1 = __importDefault(require("../library/Response"));
const RoomData_1 = require("../functions/RoomData");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const etablissementFinded = yield Etablissement_1.default.findById(req.params.etablissementId).populate('rooms').select('rooms');
        if (!etablissementFinded) {
            Response_1.default.warn('Etablissement was not found');
            return res.status(404).json('Etablissement was not found');
        }
        else {
            if (!req.body.name) {
                Response_1.default.warn('The name of the room was not found');
                return res.status(404).json('The name of the room was not found');
            }
            else {
                const indexCondition = (element) => Object(element).name === req.body.name;
                const indexReturned = etablissementFinded.rooms.findIndex(indexCondition);
                if (indexReturned !== -1) {
                    Response_1.default.warn('The room already exist');
                    return res.status(400).json('The room already exist');
                }
                else {
                    const newRoom = new Room_1.default({
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
                    yield etablissementFinded.save();
                    yield newRoom.save();
                    (0, RoomData_1.createRoomForExtracting)(Object(req.body.admin.datas[0].mounths[0]), Object(newRoom._id));
                    Response_1.default.info('The room was created');
                    return res.status(201).json('The room was created');
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
});
const readRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
    if (!utilisateurFinded) {
        Response_1.default.error('Requester was not found');
        return res.status(500).json('Requester was not found');
    }
    else {
        return Room_1.default.findById(roomId)
            .populate('appointments')
            .then((room) => (room ? res.status(200).json(room) : res.status(404).json({ message: 'The room was not found' })))
            .finally(() => {
            (0, RoomData_1.updateRoomForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(roomId));
        })
            .catch((error) => res.status(500).json({ error: error.message }));
    }
});
const readAll = (req, res, next) => {
    return Etablissement_1.default.findById(req.params.etablissementId)
        .populate('rooms')
        .select('rooms')
        .then((rooms) => {
        rooms ? res.status(200).json(rooms) : res.status(404).json('The etablissement has no room');
    })
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateRoom = (req, res, next) => {
    return Room_1.default.findById(req.params.roomId).then((room) => __awaiter(void 0, void 0, void 0, function* () {
        if (!room) {
            Response_1.default.error('The room was not found');
            return res.status(404).json('The room was not found');
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
            if (!utilisateurFinded) {
                return res.status(404).json('requester was not found');
            }
            else {
                if (!req.body.name) {
                    Response_1.default.warn('the name of the room was not found');
                    return res.status(404).json('the name of the room was not found');
                }
                else {
                    room.name = req.body.name;
                    return room
                        .save()
                        .then((room) => res.status(201).json({ room: room }))
                        .finally(() => {
                        (0, RoomData_1.updateRoomForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(room._id));
                    })
                        .catch((error) => {
                        Response_1.default.error({ message: 'Error catched', error: error.message });
                        res.status(500).json({ message: 'Error catched', error: error.message });
                    });
                }
            }
        }
    }));
};
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomTodelete = yield Room_1.default.findById(req.params.roomId);
    const etablissementFinded = yield Etablissement_1.default.findOne({ rooms: req.params.roomId });
    const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.admin._id);
    if (!utilisateurFinded) {
        Response_1.default.warn('Requester was not found');
        return res.status(404).json('Requester was not found');
    }
    else {
        const roomArchived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/room/create`, {
            _id: roomTodelete === null || roomTodelete === void 0 ? void 0 : roomTodelete._id,
            name: roomTodelete === null || roomTodelete === void 0 ? void 0 : roomTodelete.name,
            months: roomTodelete === null || roomTodelete === void 0 ? void 0 : roomTodelete.months
        });
        if (roomArchived.data.message === '') {
            const newArray = etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.rooms.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(req.params.roomId));
            return yield Room_1.default.findById(req.params.roomId)
                .then((room) => __awaiter(void 0, void 0, void 0, function* () {
                return room
                    ? (Object(etablissementFinded).roomArchiveds.push(roomTodelete),
                        (Object(etablissementFinded).rooms = newArray),
                        yield (etablissementFinded === null || etablissementFinded === void 0 ? void 0 : etablissementFinded.save()),
                        yield room.deleteOne(),
                        Response_1.default.info('Room has been archived'),
                        res.status(200).json('Room has been archived'))
                    : (Response_1.default.warn('Room was not found'), res.status(404).json('Room was not found'));
            }))
                .finally(() => {
                (0, RoomData_1.deleteRoomForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(req.params.roomId));
            })
                .catch((e) => {
                Response_1.default.error({ error: e.message });
                return res.status(500).json({ error: e.message });
            });
        }
        else {
            Response_1.default.warn('Something went wrong in archives');
            return res.status(400).json('Something went wrong in archives');
        }
    }
});
exports.default = { createRoom, readRoom, readAll, updateRoom, deleteRoom };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9Sb29tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0EsMERBQWtDO0FBQ2xDLHdFQUFnRDtBQUNoRCw0RUFBb0Q7QUFDcEQsbUVBQXlDO0FBQ3pDLG9EQUF5STtBQUN6SSxrREFBMEI7QUFDMUIsOERBQXNDO0FBRXRDLE1BQU0sVUFBVSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDekUsSUFBSSxDQUFDO1FBQ0QsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLHVCQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2SCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUN2QixrQkFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMvRCxDQUFDO2FBQU0sQ0FBQztZQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNqQixrQkFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDdEUsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFD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