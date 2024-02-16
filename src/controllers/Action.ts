import { NextFunction, Request, Response } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import Action from '../models/Action';

const createAction = (req: Request, res: Response, next: NextFunction) => {
    const { email, name, firstname, mobileNum, password, passwordConfirmed } = req.body;

    const token: string = uid2(26);
    const salt: string = uid2(26);
    const hash: string = SHA256(password + salt).toString(encBase64);

    const action = new Action({
        email,
        account: {
            name,
            firstname,
            mobileNum
        },
        token,
        salt,
        hash
    });

    return action
        .save()
        .then((action) => res.status(201).json({ action: action }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const readAction = (req: Request, res: Response, next: NextFunction) => {
    const actionId = req.params.actionId;

    return Action.findById(actionId)
        .then((action) => (action ? res.status(200).json({ message: action }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Action.find()
        .then((actions) => res.status(200).json({ message: actions }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateAction = (req: Request, res: Response, next: NextFunction) => {
    const actionId = req.params.actionId;
    return Action.findById(actionId).then((action) => {
        if (action) {
            action.set(req.body);
            return action
                .save()
                .then((action) => res.status(201).json({ action: action }))
                .catch((error) => res.status(500).json({ error: error.message }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    });
};

const deleteAction = async (req: Request, res: Response, next: NextFunction) => {
    const actionId = req.params.actionId;

    return Action.findByIdAndDelete(actionId)
        .then((action) => (action ? res.status(200).json({ message: 'Action is deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error: error.message }));
};

export default { createAction, readAction, readAll, updateAction, deleteAction };
