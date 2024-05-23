import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Retour from '../library/Response';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            Retour.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        } else {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                tokenVersion: 0
            });
            // Generate a salt to use for password hashing
            const salt = await bcrypt.genSalt(10);

            // Hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Save the hashed password in the user object
            user.password = hashedPassword;

            await user.save();

            res.status(201).json({ message: 'User created', user });
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.name) {
            Retour.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        } else {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                tokenVersion: 0,
                role: 'admin'
            });
            // Generate a salt to use for password hashing
            const salt = await bcrypt.genSalt(10);

            // Hash the password using the generated salt
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Save the hashed password in the user object
            user.password = hashedPassword;

            await user.save();

            res.status(201).json({ message: 'Admin created', user });
        }
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json('User not found');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json('Invalid password');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
        res.status(200).json({ message: 'User logged in', token, user });
    } catch (error) {
        Retour.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
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

export default { createUser, createAdmin, loginUser, logoutUser };
