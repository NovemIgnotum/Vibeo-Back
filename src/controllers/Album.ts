import { NextFunction, Request, Response } from 'express';

const uid2 = require('uid2');

import Retour from '../library/Response';
import Album from '../models/Album';
import Band from '../models/Band';

const createAlbum = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.band) {
            Retour.error('One or many fields are missing');
            return res.status(400).json('One or many fields are missing');
        } else {
            if (await Album.findOne({ name: req.body.name })) {
                Retour.error('This album already exists');
                return res.status(400).json('This album already exists');
            } else {
                if (!(await Band.findById(req.body.band))) {
                    Retour.error('This band does not exist');
                    return res.status(400).json('This band does not exist');
                } else {
                    const { name, band } = req.body;
                    const album = new Album({
                        name,
                        band
                    });
                    await album.save();
                    await Band.findByIdAndUpdate(req.body.band, { $push: { albums: album._id } });
                    res.status(201).json(album);
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAllAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAlbum = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Album.findById(req.params.id))) {
                Retour.error('This album does not exist');
                return res.status(400).json('This album does not exist');
            } else {
                const album = await Album.findById(req.params.id);
                res.status(200).json(album);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const updateAlbum = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Album.findById(req.params.id))) {
                Retour.error('This album does not exist');
                return res.status(400).json('This album does not exist');
            } else {
                const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(200).json(album);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

export default { createAlbum, getAllAlbums, getAlbum, updateAlbum };
