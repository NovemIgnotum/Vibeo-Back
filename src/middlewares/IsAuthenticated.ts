import { Request, Response, NextFunction } from 'express';

import Admin from '../models/Utilisateur';

const AdminIsAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const adminFinded = await Admin.findOne({
            token: req.headers.authorization.replace('Bearer ', '')
        });
        if (!adminFinded || adminFinded.admin === false) {
            return res.status(401).json({ error: 'Unauthorized' });
        } else {
            req.body.admin = adminFinded;
            // créer une clé "admin" dans req. La route pourra avoir accès à req.body.admin
            return next();
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
export default AdminIsAuthenticated;
