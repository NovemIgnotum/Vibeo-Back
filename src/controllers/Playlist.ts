import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import Playlist from '../models/Playlist';
import User from '../models/User';
import Band from '../models/Band';
import Retour from '../library/Response';

const createPlaylist = async (req: Request, res: Response) => {
    try {
        const { name, owner } = req.body;

        if (!name || !owner) {
            Retour.error('One or more fields are missing');
            return res.status(400).json({ message: 'One or more fields are missing' });
        }

        const findedUser = await User.findById(owner);
        const findedBand = await Band.findById(owner);

        console.log(findedUser, findedBand);

        if (!findedUser && !findedBand) {
            Retour.error('User or Band not found');
            return res.status(404).json({ message: 'User or band not found' });
        }

        let coverUrl = '';

        if (req.files && Object(req).files.cover && Object(req).files.cover.length > 0) {
            const file = Object(req).files.cover[0];
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'playlists',
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            coverUrl = result.secure_url;
        }

        const playlist = new Playlist({
            name,
            owner,
            cover: coverUrl,
            tracks: []
        });

        await playlist.save();

        if (findedUser) {
            findedUser.playlist.push(playlist._id);
            await findedUser.save();
        }
        if (findedBand) {
            findedBand.albums.push(playlist._id);
            await findedBand.save();
        }

        res.status(201).json({ message: 'Playlist created', playlist });
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error creating playlist', error: Object(error).message });
    }
};

const readPlaylist = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const playlist = await Playlist.findById(req.params.id).populate('tracks');

            if (!playlist) {
                Retour.error('Playlist not found');
                return res.status(404).json({ message: 'Playlist not found' });
            }
            const owner = await User.findById(playlist.owner);
            if (!owner) {
                const band = await Band.findById(playlist.owner);
                if (!band) {
                    return res.status(404).json({ message: 'Owner not found' });
                } else {
                    res.status(200).json({ playlist, band });
                }
            } else {
                res.status(200).json({ playlist, owner });
            }
        }
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error reading playlist', error: Object(error).message });
    }
};

const readAllPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await Playlist.find();
        res.status(200).json({ message: 'All playlists', playlists });
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error reading playlists', error: Object(error).message });
    }
};

const readAllPlaylistsByUser = async (req: Request, res: Response) => {
    try {
        const { owner } = req.params;
        const playlists = await Playlist.find({ owner });
        res.status(200).json({ message: 'All playlists by user', playlists });
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error reading playlists by user', error: Object(error).message });
    }
};

const updatePlaylist = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const playlist = await Playlist.findById(req.params.id);
            if (!playlist) {
                Retour.error('Playlist not found');
                return res.status(404).json({ message: 'Playlist not found' });
            } else {
                const { name } = req.body;
                if (name) {
                    playlist.name = name;
                }

                if (req.files && Object(req).files.cover && Object(req).files.cover.length > 0) {
                    const file = Object(req).files.cover[0];
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'playlists',
                        use_filename: true,
                        unique_filename: false,
                        overwrite: true
                    });
                    playlist.cover = result.secure_url;
                }

                await playlist.save();

                res.status(200).json({ message: 'Playlist updated', playlist });
            }
        }
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error updating playlist', error: Object(error).message });
    }
};

const deletePlaylist = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const playlist = await Playlist.findById(req.params.id);
            if (!playlist) {
                Retour.error('Playlist not found');
                return res.status(404).json({ message: 'Playlist not found' });
            } else {
                const playlistRes = playlist.cover.split('/').pop();
                cloudinary.uploader.destroy(playlistRes?.split('.')[0]);

                await Playlist.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'Playlist deleted' });
            }
        }
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error deleting playlist', error: Object(error).message });
    }
};

export default { createPlaylist, readPlaylist, readAllPlaylists, readAllPlaylistsByUser, updatePlaylist, deletePlaylist };
