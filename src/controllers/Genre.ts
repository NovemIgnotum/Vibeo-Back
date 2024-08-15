import { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

const uid2 = require('uid2');

//Models
import Genre from '../models/Genre';

//library
import Retour from '../library/Response';

const createGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.description || !Object(req).files.picture) {
            Retour.error('One or many fields are missing');
            return res.status(400).json('One or many fields are missing');
        } else {
            if (await Genre.findOne({ name: req.body.name })) {
                Retour.error('This genre already exists');
                return res.status(400).json('This genre already exists');
            } else {
                const file = Object(req).files.picture[0];
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'genres',
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true
                });

                const genre = new Genre({
                    name : req.body.name,
                    description : req.body.description,
                    picture: result.secure_url

                });
                await genre.save();
                return res.status(201).json(genre);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres = await Genre.find();
        return res.status(200).json(genres);
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const getGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        } else {
            const genre = await Genre.findById(req.params.id);
            if (!genre) {
                Retour.error('This genre does not exist');
                return res.status(400).json('This genre does not exist');
            } else {
                return res.status(200).json(genre);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id || !req.body.name || !req.body.description) {
            Retour.error('One or many fields are missing');
            return res.status(400).json('One or many fields are missing');
        } else {
            const genreFinded = await Genre.findById(req.params.id);
            if (!genreFinded) {
                Retour.error('This genre does not exist');
                return res.status(400).json('This genre does not exist');
            } else {
                genreFinded.name = req.body.name;
                genreFinded.description = req.body.description;
                return genreFinded.save().then((genre) => {
                    return res.status(200).json(genre);
                });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            Retour.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        } else {
            if (!(await Genre.findById(req.params.id))) {
                Retour.error('This genre does not exist');
                return res.status(400).json('This genre does not exist');
            } else {
                await Genre.findByIdAndDelete(req.params.id);
                return;
            }
        }
    } catch (error) {}
};
export default { createGenre, getAllGenres, getGenre, updateGenre, deleteGenre };
