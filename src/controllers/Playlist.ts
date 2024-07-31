// src/controllers/Playlist.ts
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import Playlist from '../models/Playlist';
import Retour from '../library/Response';

const createPlaylist = async (req: Request, res: Response) => {
    try {
        const { name, owner } = req.body;

        if (!name || !owner) {
            Retour.error('One or more fields are missing');
            return res.status(400).json({ message: 'One or more fields are missing' });
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

        res.status(201).json({ message: 'Playlist created', playlist });
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error creating playlist', error: Object(error).message });
    }
};

const readAllPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await Playlist.find().populate('tracks');
        res.status(200).json({ message: 'All playlists', playlists });
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error reading playlists', error: Object(error).message });
    }
};

const readAllPlaylistsByUser = async (req: Request, res: Response) => {
    try {
        const { owner } = req.params;
        const playlists = await Playlist.find({ owner }).populate('tracks');
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

export default { createPlaylist, readAllPlaylists, readAllPlaylistsByUser, updatePlaylist };
