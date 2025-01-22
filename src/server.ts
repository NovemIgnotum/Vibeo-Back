// MODULES
import { Request, Response, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import Logging from './library/Logging';

//MODEL
import Band from './models/Band';
import Track from './models/Track';
import User from './models/User';
import Playlist from './models/Playlist';
// Library
const express = require('express');
const router = express();
const cron = require('node-cron');
const cors = require('cors');

const port = process.env.PORT || 3000;
mongoose
    .set('strictQuery', false)
    .connect(`${config.mongooseUrl}`, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('mongoDB is connected');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect');
        Logging.error(error);
    });

// ROUTES
import GenreRoutes from './routes/Genre';
import BandRoutes from './routes/Band';
import TrackRoutes from './routes/Track';
import UserRoutes from './routes/User';
import PlaylistRoutes from './routes/Playlist';

// The server start only if mongo is already connected
const startServer = () => {
    cron.schedule('0 0 * * *', () => {
        Logging.info('Running a task every day at 00:00');
    });

    router.use(
        cors({
            origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://localhost:5173'],
            credentials: true
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
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // CRUDS
    router.use('/genre/', GenreRoutes);
    router.use('/band/', BandRoutes);
    router.use('/track/', TrackRoutes);
    router.use('/user/', UserRoutes);
    router.use('/playlist/', PlaylistRoutes);

    // Search route
    router.get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const queryParam = req.params.query as string; // Specify 'query' as string
            console.log(queryParam);
            const regex = new RegExp(queryParam, 'i');
            console.log(regex);

            const results = await Promise.all([
                Band.find({ name: regex }),
                Track.find({ title: regex }),
                User.find({ username: regex }),
                Playlist.find({ name: regex })
            ]);

            const [bands, albums, tracks, users] = results;

            const response = {
                bands,
                albums,
                tracks,
                users
            };

            res.status(200).json(response);
        } catch (error) {
            Logging.error(error);
            next(error);
        }
    });

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
