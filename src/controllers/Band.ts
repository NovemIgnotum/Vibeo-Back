import cloudinary from '../config/cloudinary';
import Band from '../models/Band';
import { NextFunction, Request, Response } from 'express';

const createBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, genre, members } = req.body;
        console.log(Object(req).files.profilePic);
        if (!name || !genre || !members || !Object(req).files.profilePic) {
            return res.status(400).json({ message: 'Missing parameters' });
        } else {
            if (await Band.findOne({ name })) {
                return res.status(400).json({ message: 'Band already exist' });
            } else {
                if (members.length < 1) {
                    return res.status(400).json({ message: 'Band must have at least one member' });
                } else {
                    let backgroundPic = '';

                    if (Object(req).files.backgroundPic) {
                        const file = Object(req).files.backgroundPic[0];
                        const result = await cloudinary.uploader.upload(file.path, {
                            folder: 'backgroundPictures/',
                            use_filename: true,
                            unique_filename: true,
                            overwrite: true
                        });

                        backgroundPic = result.secure_url;
                    }
                    const file = Object(req).files.profilePic[0];
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'profilePictures/',
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true
                    });

                    const band = new Band({
                        name,
                        genre,
                        members,
                        profilePic: result.secure_url,
                        backgroundPic: backgroundPic
                    });

                    await band.save();

                    return res.status(201).json({ band: band });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: Object(error).message });
    }
};

const readAllBands = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bands = await Band.find();
        return res.status(200).json({ bands: bands });
    } catch (error) {
        return res.status(500).json({ message: Object(error).message });
    }
};

const readOneBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const band = await Band.findById(req.params.id).populate('genre').populate('albums');
            if (!band) {
                return res.status(404).json({ message: 'Band not found' });
            } else {
                return res.status(200).json({ band: band });
            }
        }
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
};

const updateBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            if (req.body.name || req.body.genre || req.body.members || Object(req).files.profilePic || Object(req).files.backgroundPic) {
                const band = await Band.findById(req.params.id);
                if (!band) {
                    return res.status(404).json({ message: 'Band not found' });
                } else {
                    if (req.body.name) {
                        band.name = req.body.name;
                    }
                    if (req.body.genre) {
                        band.genre = req.body.genre;
                    }
                    if (req.body.members) {
                        band.members = req.body.members;
                    }
                    if (Object(req).files.profilePic) {
                        const bandRes = band.profilePic.split('/').pop();
                        cloudinary.uploader.destroy(bandRes?.split('.')[0]);
                        const file = Object(req).files.profilePic[0];
                        const result = await cloudinary.uploader.upload(file.path, {
                            folder: 'profilePictures/',
                            use_filename: true,
                            unique_filename: true,
                            overwrite: true
                        });

                        band.profilePic = result.secure_url;
                    }
                    if (Object(req).files.backgroundPic) {
                        if (band.backgroundPic) {
                            const bandRes = band.backgroundPic.split('/').pop();
                            cloudinary.uploader.destroy(bandRes?.split('.')[0]);
                        }
                        const file = Object(req).files.backgroundPic[0];
                        const result = await cloudinary.uploader.upload(file.path, {
                            folder: 'backgroundPictures/',
                            use_filename: true,
                            unique_filename: true,
                            overwrite: true
                        });

                        band.backgroundPic = result.secure_url;
                    }

                    await band.save();

                    return res.status(200).json({ band: band });
                }
            }
        }
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
};

const deleteBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const band = await Band.findById(req.params.id);
            if (!band) {
                return res.status(404).json({ message: 'Band not found' });
            } else {
                if (band.profilePic) {
                    const bandRes = band.profilePic.split('/').pop();
                    cloudinary.uploader.destroy(bandRes?.split('.')[0]);
                }
                if (band.backgroundPic) {
                    const bandRes = band.backgroundPic.split('/').pop();
                    cloudinary.uploader.destroy(bandRes?.split('.')[0]);
                }

                await Band.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'Band deleted' });
            }
        }
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
};

const getRandBand = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bands = await Band.aggregate([{ $sample: { size: 3 } }]);
        return res.status(200).json({ bands: bands });
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
}
export default { createBand, readAllBands, readOneBand, updateBand, deleteBand, getRandBand };
