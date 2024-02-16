import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Loggging from '../library/Logging';
import IAdminModel from '../interfaces/Utilisateur';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Loggging.error(error);
            return res.status(422).json({ message: error });
        }
    };
};

export const Schema = {
    admin: {
        create: Joi.object<IAdminModel>({
            email: Joi.string().required(),
            account: {
                name: Joi.string().required(),
                firstname: Joi.string().required()
            }
        })
    }
};
