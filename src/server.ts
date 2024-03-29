// MODULES
import { Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
// Library
import Logging from './library/Logging';
const express = require('express');
const router = express();
const cron = require('node-cron');
const cors = require('cors');

/**================================================================================================
 *                                       TODO List
 * ToDo ****: Faire les dataConvention pour la creation d'un usager
 * ToDo 1: Inclure les contacts dans chaque action
 * ToDo 2: Faire les datas des conventions
 * ToDo 3: Faire la possibilité de creer un contact avec partenaire et usager controllers/contact ligne 18
 * ToDo 5: Se renseigner sur comment entre une pieces jointes dans le tableau interfaces/usager ligne 176
 * ToDo 6: Commencer le cleanCode et le codeReviews avec le dossier 'Components' situé dans la racine du projet
 *
 *================================================================================================**/

mongoose
    .set('strictQuery', false)
    .connect(`${config.mongooseUrl}`, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('mongoDB is cennected');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect');
        Logging.error(error);
    });

// ROUTES

// The server start only if mongo is already connected
const startServer = () => {
    // Check tous les Jours à 00:00 si nous avons changé de mois.
    cron.schedule('0 0 * * *', () => {
        Logging.info('Running a task every day at 00:00');
    });

    router.use(
        cors({
            origin: ['http://localhost:3000']
        })
    );

    router.use((req: Request, res: Response, next: NextFunction) => {
        Logging.info(`Incoming -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging.info(
                `Server Started -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
            );
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json({}));

    // The rules of the API
    router.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept,Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // CRUDS

    // FUNCTIONS

    /**Error handling */
    router.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error(`Route has been not found -> Methode: [${req.method}] - Url: [${req.originalUrl}]`);
        Logging.error(error.message);
        next();
        return res.status(404).json(error.message);
    });

    http.createServer(router).listen(config.port, () => Logging.info(`Server is started on new port ${config.port}`));
};
