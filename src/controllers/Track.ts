import { NextFunction, Request, Response } from 'express';

import Track from '../models/Track';
import Band from '../models/Band';
import Retour from '../library/Response';
import { PassThrough } from 'stream';

const createTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.title || !req.body.duration || !req.body.band) {
            Retour.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        } else {
            if (await Band.findOne({ id: req.body.band })) {
                Retour.error('This band does not exist');
                return res.status(400).json('This band does not exist');
            } else {
                const track = new Track({
                    title: req.body.title,
                    duration: req.body.duration,
                    band: req.body.band
                });
                await track.save();
                res.status(201).json({ message: 'Track created', track });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAllTracks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        } else {
            const track = await Track.findById(req.params.id);
            if (!track) {
                Retour.error('This track does not exist');
                return res.status(400).json('This track does not exist');
            } else {
                res.status(200).json(track);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};
const updateTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        } else {
            const track = await Track.findById(req.params.id);
            if (!track) {
                Retour.error('This track does not exist');
                return res.status(400).json('This track does not exist');
            } else {
                if (req.body.title) {
                    track.title = req.body.title;
                }
                if (req.body.duration) {
                    track.duration = req.body.duration;
                }
                if (req.body.band) {
                    track.band = req.body.band;
                }
                await track.save();
                res.status(200).json({ message: 'Track updated', track });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const deleteTrack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        } else {
            if (!(await Track.findById(req.params.id))) {
                Retour.error('This track does not exist');
                return res.status(400).json('This track does not exist');
            } else {
                await Track.findByIdAndDelete(req.params.id);
                res.status(200).json('Track deleted');
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

export default { createTrack, getAllTracks, getTrack, updateTrack, deleteTrack };
