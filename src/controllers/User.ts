import e, { NextFunction, Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
const jwt = require('jsonwebtoken');

import User from '../models/User';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, firstname, password, pseudo } = req.body;
    if (!email || !name || !firstname || !password || !pseudo) {
        return res.status(400).json({ message: 'Missing parameters' });
    } else {
        if (await User.findOne({ pseudo })) {
            return res.status(400).json({ message: 'User already exist' });
        } else {
            if (await User.findOne({ email })) {
                return res.status(400).json({ message: 'User already exist' });
            } else {
                const salt: string = uid2(26);
                const hash: string = SHA256(password + salt).toString(encBase64);

                if (req.body.role) {
                    const role = req.body.role;
                    const user = new User({
                        account: {
                            name,
                            firstname
                        },
                        email,
                        pseudo,
                        role,
                        salt,
                        hash
                    });

                    return user
                        .save()
                        .then((user) => res.status(201).json({ user: user }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                } else {
                    const user = new User({
                        account: {
                            name,
                            firstname
                        },
                        email,
                        pseudo,
                        salt,
                        hash
                    });

                    return user
                        .save()
                        .then((user) => res.status(201).json({ user: user }))
                        .catch((error) => res.status(500).json({ error: error.message }));
                }
            }
        }
    }
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    console.log(userId);

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ message: user }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => res.status(200).json({ message: users }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing parameters' });
    } else {
        console.log(email);
        const findedByIdUser = await User.findOne({ email });
        console.log(findedByIdUser);
        const findedUser = await User.findOne({ email: email });
        if (findedUser) {
            const verificatedHash = SHA256(password + findedUser.salt).toString(encBase64);
            if (verificatedHash === findedUser.hash) {
                const token = jwt.sign({ findedUser }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: 'Connected', token: token });
            } else {
                return res.status(400).json({ message: 'Wrong password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Missing parameters' });
    } else {
        const findedUser = await User.findOne({ email: email });
        if (findedUser) {
            findedUser.tokenVersion++;

            await findedUser.save();

            return res.status(200).json({ message: 'Disconnected' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.id);
        const { email, name, firstname, pseudo } = req.body;
        const userFinded = await User.findById(req.params.id);
        if (!userFinded) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            if (!name || !firstname || !email || !pseudo) {
                return res.status(400).json({ message: 'Missing parameters' });
            } else {
                userFinded.account.name = name;
                userFinded.account.firstname = firstname;
                userFinded.pseudo = pseudo;
                userFinded.email = email;
                if (req.body.password) {
                    const salt: string = uid2(26);
                    const hash: string = SHA256(req.body.password + salt).toString(encBase64);
                    userFinded.hash = hash;
                    userFinded.salt = salt;
                }
                if (req.files && Object(req).files.pic && Object(req).files.pic.length > 0) {
                    if (userFinded.profilePicture) {
                        const userRes = userFinded.profilePicture.split('/').pop();
                        cloudinary.uploader.destroy(userRes?.split('.')[0]);
                    }
                    const file = Object(req).files.pic[0];
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'profilePictures/',
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true
                    });
                    userFinded.profilePicture = result.secure_url;
                }

                if (req.files && Object(req).files.background && Object(req).files.background.length > 0) {
                    if (userFinded.backgroundPicture) {
                        const userRes = userFinded.backgroundPicture.split('/').pop();
                        cloudinary.uploader.destroy(userRes?.split('.')[0]);
                    }
                    const file = Object(req).files.background[0];
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'backgroundPictures/',
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true
                    });
                    userFinded.backgroundPicture = result.secure_url;
                }

                return userFinded
                    .save()
                    .then((user) => res.status(200).json({ user: user }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
    } catch (error) {
        return res.status(500).json({ error: Object(error).message });
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: 'No ID provided' });
        } else {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                const userRes = user.profilePicture.split('/').pop();
                cloudinary.uploader.destroy(userRes?.split('.')[0]);

                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'User deleted' });
            }
        }
    } catch (e) {
        return res.status(500).json({ error: Object(e).message });
    }
};

export default { createUser, readUser, readAll, updateUser, deleteUser, login, logout };
