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
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const Playlist_1 = __importDefault(require("../models/Playlist"));
const User_1 = __importDefault(require("../models/User"));
const Band_1 = __importDefault(require("../models/Band"));
const Response_1 = __importDefault(require("../library/Response"));
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, owner } = req.body;
        if (!name || !owner) {
            Response_1.default.error('One or more fields are missing');
            return res.status(400).json({ message: 'One or more fields are missing' });
        }
        const findedUser = yield User_1.default.findById(owner);
        const findedBand = yield Band_1.default.findById(owner);
        console.log(findedUser, findedBand);
        if (!findedUser && !findedBand) {
            Response_1.default.error('User or Band not found');
            return res.status(404).json({ message: 'User or band not found' });
        }
        let coverUrl = '';
        if (req.files && Object(req).files.cover && Object(req).files.cover.length > 0) {
            const file = Object(req).files.cover[0];
            const result = yield cloudinary_1.default.uploader.upload(file.path, {
                folder: 'playlists',
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            coverUrl = result.secure_url;
        }
        const playlist = new Playlist_1.default({
            name,
            owner,
            cover: coverUrl,
            tracks: []
        });
        yield playlist.save();
        if (findedUser) {
            findedUser.playlist.push(playlist._id);
            yield findedUser.save();
        }
        if (findedBand) {
            findedBand.albums.push(playlist._id);
            yield findedBand.save();
        }
        res.status(201).json({ message: 'Playlist created', playlist });
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error creating playlist', error: Object(error).message });
    }
});
const readPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            Response_1.default.error('No ID provided');
            return res.status(400).json({ message: 'No ID provided' });
        }
        else {
            const playlist = yield Playlist_1.default.findById(req.params.id).populate('tracks');
            if (!playlist) {
                Response_1.default.error('Playlist not found');
                return res.status(404).json({ message: 'Playlist not found' });
            }
            else {
                res.status(200).json({ message: 'Playlist found', playlist });
            }
        }
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error reading playlist', error: Object(error).message });
    }
});
const readAllPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlists = yield Playlist_1.default.find();
        res.status(200).json({ message: 'All playlists', playlists });
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error reading playlists', error: Object(error).message });
    }
});
const readAllPlaylistsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { owner } = req.params;
        const playlists = yield Playlist_1.default.find({ owner });
        res.status(200).json({ message: 'All playlists by user', playlists });
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error reading playlists by user', error: Object(error).message });
    }
});
const updatePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            Response_1.default.error('No ID provided');
            return res.status(400).json({ message: 'No ID provided' });
        }
        else {
            const playlist = yield Playlist_1.default.findById(req.params.id);
            if (!playlist) {
                Response_1.default.error('Playlist not found');
                return res.status(404).json({ message: 'Playlist not found' });
            }
            else {
                const { name } = req.body;
                if (name) {
                    playlist.name = name;
                }
                if (req.files && Object(req).files.cover && Object(req).files.cover.length > 0) {
                    const file = Object(req).files.cover[0];
                    const result = yield cloudinary_1.default.uploader.upload(file.path, {
                        folder: 'playlists',
                        use_filename: true,
                        unique_filename: false,
                        overwrite: true
                    });
                    playlist.cover = result.secure_url;
                }
                yield playlist.save();
                res.status(200).json({ message: 'Playlist updated', playlist });
            }
        }
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error updating playlist', error: Object(error).message });
    }
});
const deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            Response_1.default.error('No ID provided');
            return res.status(400).json({ message: 'No ID provided' });
        }
        else {
            const playlist = yield Playlist_1.default.findById(req.params.id);
            if (!playlist) {
                Response_1.default.error('Playlist not found');
                return res.status(404).json({ message: 'Playlist not found' });
            }
            else {
                const playlistRes = playlist.cover.split('/').pop();
                cloudinary_1.default.uploader.destroy(playlistRes === null || playlistRes === void 0 ? void 0 : playlistRes.split('.')[0]);
                yield Playlist_1.default.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'Playlist deleted' });
            }
        }
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error deleting playlist', error: Object(error).message });
    }
});
exports.default = { createPlaylist, readAllPlaylists, readAllPlaylistsByUser, updatePlaylist, deletePlaylist };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvUGxheWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzRUFBOEM7QUFDOUMsa0VBQTBDO0FBQzFDLDBEQUFrQztBQUNsQywwREFBa0M7QUFDbEMsbUVBQXlDO0FBRXpDLE1BQU0sY0FBYyxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3pELElBQUksQ0FBQztRQUNELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUVqQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsa0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUMvQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxjQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLE1BQU0sVUFBVSxHQUFHLE1BQU0sY0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDN0Isa0JBQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2QyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsSUFBSSxRQUFR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