import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Retour from '../library/Response';
import dotenv from 'dotenv';
import multer from 'multer';

const bcrypt = require('bcrypt');

const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstName || !req.body.pseudo) {
            Retour.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        } else {
            if (await User.findOne({ email: req.body.email })) {
                Retour.error('This email is already used');
                return res.status(400).json('This email is already used');
            } else {
                if (await User.findOne({ pseudo: req.body.pseudo })) {
                    Retour.error('This pseudo is already used');
                    return res.status(400).json('This pseudo is already used');
                } else {
                    if (req.body.role === 'user') {
                        const user = new User({
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            password: req.body.password,
                            name: req.body.name,
                            firstName: req.body.firstName,
                            role: 'user',
                            profilePicture: null,
                            tokenVersion: 0
                        });
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(req.body.password, salt);
                        user.password = hashedPassword;

                        await user.save();

                        res.status(201).json({ message: 'User created', user });
                    } else {
                        const user = new User({
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            password: req.body.password,
                            name: req.body.name,
                            firstName: req.body.firstName,
                            tokenVersion: 0,
                            profilePicture: null,
                            role: 'admin'
                        });
                        const salt = await bcrypt.genSalt(10);

                        const hashedPassword = await bcrypt.hash(req.body.password, salt);

                        user.password = hashedPassword;

                        await user.save();

                        res.status(201).json({ message: 'Admin created', user });
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const logoutUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json('User not found');
        }
        user.tokenVersion += 1;
        await user.save();
        res.status(200).json({ message: 'User logged out' });
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            Retour.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        } else {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                Retour.error('Email not found');
                return res.status(400).json('Email not found');
            } else {
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if (!validPassword) {
                    Retour.error('Invalid password');
                    return res.status(400).json('Invalid password');
                } else {
                    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: '30m' });
                    return res.status(200).json({ message: 'user connected', token });
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) {
            Retour.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        } else {
            const user = await User.findById(req.params.id);
            if (!user) {
                Retour.error('This user does not exist');
                return res.status(400).json('This user does not exist');
            } else {
                res.status(200).json(user);
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await User.find({ role: 'user' });
        console.log('---------------------------------------------------');
        console.log(admins);
        res.status(200).json(admins);
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const update = async (req: Request, res: Response) => {
    try {
        console.log('req.body', req.body);
        const userId = req.params.id;

        if (!userId) {
            Retour.error('Id field is missing');
            return res.status(400).json({ message: 'Id field is missing' });
        }

        const user = await User.findById(userId);
        if (!user) {
            Retour.error('This user does not exist');
            return res.status(404).json({ message: 'This user does not exist' });
        }
        // Mise à jour des champs de l'utilisateur
        if (req.body.pseudo) {
            user.pseudo = req.body.pseudo;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.tokenVersion) {
            user.tokenVersion = req.body.tokenVersion;
        }
        if (req.body.role) {
            user.role = req.body.role;
        }
        await user.save();
        res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        Retour.error(error);
        res.status(500).json({ message: 'Error Catched', error });
    }
};

export default { createUser, logoutUser, getAllUsers, getUser, getAllAdmins, update, login };
