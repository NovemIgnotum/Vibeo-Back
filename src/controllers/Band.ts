import { NextFunction, Request, Response } from 'express';

const uid2 = require('uid2');

import Band from '../models/Band';
import Retour from '../library/Response';

const createBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.genre || !req.body.members || !req.body.albums) {
            Retour.error('One or many fields are missing');
            return res.status(400).json('One or many fields are missing');
        } else {
            if (await Band.findOne({ name: req.body.nanme })) {
                Retour.error('This band already exists');
                return res.status(400).json('This band already exists');
            } else {
                const { name, genre, members, albums } = req.body;
                const band = new Band({
                    name,
                    genre,
                    members,
                    albums
                });
                await band.save();
                res.status(201).json(band);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAllBands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bands = await Band.find();
        res.status(200).json(bands);
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Band.findById(req.params.id))) {
                Retour.error('This band does not exist');
                return res.status(400).json('This band does not exist');
            } else {
                const band = await Band.findById(req.params.id);
                res.status(200).json(band);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Band.findById(req.params.id))) {
                Retour.error('This band does not exist');
                return res.status(400).json('This band does not exist');
            } else {
                const band = await Band.findById(req.params.id);
                Object(band).members = req.body.members;
                await Object(band).save();
                res.status(200).json(band);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const updateAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Band.findById(req.params.id))) {
                Retour.error('This band does not exist');
                return res.status(400).json('This band does not exist');
            } else {
                const band = await Band.findById(req.params.id);
                Object(band).albums = req.body.albums;
                await Object(band).save();
                res.status(200).json(band);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const updateInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Band.findById(req.params.id))) {
                Retour.error('This band does not exist');
                return res.status(400).json('This band does not exist');
            } else {
                const band = await Band.findById(req.params.id);
                Object(band).name = req.body.name;
                Object(band).genre = req.body.genre;
                await Object(band).save();
                res.status(200).json(band);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const deleteBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('No ID provided');
            return res.status(400).json('No ID provided');
        } else {
            if (!(await Band.findById(req.params.id))) {
                Retour.error('This band does not exist');
                return res.status(400).json('This band does not exist');
            } else {
                await Band.findByIdAndDelete(req.params.id);
                res.status(200).json('Band deleted');
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

export default { createBand, getAllBands, getBand, updateMember, updateAlbums, updateInfo, deleteBand };
