import e, { NextFunction, Request, Response } from 'express';
import Track from '../models/Track';
import Playlist from '../models/Playlist';
import Band from '../models/Band';
import User from '../models/User';
import cloudinary from '../config/cloudinary';

const createTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.title || !req.body.band || !req.body.genre || !req.body.playlist || !Object(req).files.track) {
            return res.status(400).json({ message: 'Missing parameters' });
        } else {
            const playlistFinded = await Playlist.findById(req.body.playlist);
            if (!playlistFinded) {
                return res.status(404).json({ message: 'Playlist not found' });
            }
            const trackfinded = playlistFinded.tracks.find((track) => Object(track).title === req.body.title);
            if (trackfinded) {
                return res.status(400).json({ message: 'Track already in playlist' });
            }
            const bandFinded = await Band.findById(req.body.band);
            if (!bandFinded) {
                return res.status(404).json({ message: 'Band not found' });
            }

            const audioKeys = Object(req.files).track[0];
            const resultAudio = await cloudinary.v2.uploader.upload(audioKeys.path, { resource_type: 'video' });

            const track = new Track({
                title: req.body.title,
                genre: req.body.genre,
                band: bandFinded._id,
                track: resultAudio.secure_url,
                originalAlbum: playlistFinded._id
            });

            playlistFinded.tracks.push(track);

            await playlistFinded.save();

            await track.save();

            return res.status(200).json({ message: 'Track created', track });
        }
    } catch (error) {
        return res.status(500).json({ message: Object(error).message });
    }
};

const readAllTracks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tracks = await Track.find().populate('band').populate('originalAlbum');
        return res.status(200).json(tracks);
    } catch (error) {
        return res.status(500).json({ message: Object(error).message });
    }
};

const readTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const track = await Track.findById(req.params.id).populate('band').populate('originalAlbum');
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        return res.status(200).json(track);
    } catch (error) {
        return res.status(500).json({ message: Object(error).message });
    }
};

const updateTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        if (req.body.title) {
            track.title = req.body.title;
        }
        if (req.files && Object(req).files.track !== undefined) {
            const trackRes = track.track.split('/').pop();
            cloudinary.v2.uploader.destroy(trackRes?.split('.')[0]);

            const audioKeys = Object(req).files.track[0];
            const resultAudio = await cloudinary.v2.uploader.upload(audioKeys.path, { resource_type: 'video' });
            track.track = resultAudio.secure_url;
        }
        if (req.body.originalAlbum) {
            const findedAlbum = await Playlist.findById(req.body.originalAlbum);
            if (!findedAlbum) {
                return res.status(404).json({ message: 'Album not found' });
            }
            Object(track).originalAlbum = findedAlbum._id;
        }

        await track.save();

        console.log('should be save');

        return res.status(200).json({ message: 'Track updated', track });
    } catch (e) {
        return res.status(500).json({ message: Object(e).message });
    }
};

const deleteTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const trackRes = track.track.split('/').pop();
        cloudinary.v2.uploader.destroy(trackRes?.split('.')[0]);

        await Track.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Track deleted' });
    } catch (e) {
        return res.status(500).json({ message: Object(e).message });
    }
};

const likeTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.user) {
            return res.status(400).json({ message: 'No user provided' });
        }

        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const user = await User.findById(req.body.user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const trackFinded = user.likedTracks.find((trackId) => trackId.toString() === track.id.toString());
        console.log(trackFinded);

        if (trackFinded) {
            return res.status(400).json({ message: 'Track already liked' });
        } else {
            user.likedTracks.push(track.id);
            await user.save();
            return res.status(200).json({ message: 'Track liked' });
        }
    } catch (e) {
        return res.status(500).json({ message: Object(e).message });
    }
};

const dislikeTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.user) {
            return res.status(400).json({ message: 'No user provided' });
        }

        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const user = await User.findById(req.body.user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const trackFinded = user.likedTracks.find((trackId) => trackId.toString() === track.id.toString());
        console.log(trackFinded);

        if (!trackFinded) {
            return res.status(400).json({ message: 'Track not liked' });
        } else {
            user.likedTracks = user.likedTracks.filter((trackId) => trackId.toString() !== track.id.toString());
            await user.save();
            return res.status(200).json({ message: 'Track disliked' });
        }
    } catch (e) {
        return res.status(500).json({ message: Object(e).message });
    }
};
export default { createTrack, readAllTracks, readTrack, updateTrack, deleteTrack, likeTrack, dislikeTrack };
