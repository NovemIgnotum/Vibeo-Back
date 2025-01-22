"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const Logging_1 = __importDefault(require("./library/Logging"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Band_1 = __importDefault(require("./models/Band"));
const Track_1 = __importDefault(require("./models/Track"));
const User_1 = __importDefault(require("./models/User"));
const Playlist_1 = __importDefault(require("./models/Playlist"));
const express = require('express');
const router = express();
const cron = require('node-cron');
const cors = require('cors');
const port = process.env.PORT || 3000;
mongoose_1.default
    .set('strictQuery', false)
    .connect(`${config_1.default.mongooseUrl}`, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('mongoDB is connected');
    startServer();
})
    .catch((error) => {
    Logging_1.default.error('Unable to connect');
    Logging_1.default.error(error);
});
const Genre_1 = __importDefault(require("./routes/Genre"));
const Band_2 = __importDefault(require("./routes/Band"));
const Track_2 = __importDefault(require("./routes/Track"));
const User_2 = __importDefault(require("./routes/User"));
const Playlist_2 = __importDefault(require("./routes/Playlist"));
const startServer = () => {
    cron.schedule('0 0 * * *', () => {
        Logging_1.default.info('Running a task every day at 00:00');
    });
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Server Started -> Methode: [${req.method}] - Url: [${req.originalUrl}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204
    }));
    router.use((0, cookie_parser_1.default)());
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json({}));
    router.use((req, res, next) => {
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    router.use('/genre/', Genre_1.default);
    router.use('/band/', Band_2.default);
    router.use('/track/', Track_2.default);
    router.use('/user/', User_2.default);
    router.use('/playlist/', Playlist_2.default);
    router.get('/search/:query', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const queryParam = req.params.query;
            console.log(queryParam);
            const regex = new RegExp(queryParam, 'i');
            console.log(regex);
            const results = yield Promise.all([
                Band_1.default.find({ name: regex }),
                Track_1.default.find({ title: regex }),
                User_1.default.find({ username: regex }),
                Playlist_1.default.find({ name: regex })
            ]);
            const [bands, albums, tracks, users] = results;
            const response = {
                bands,
                albums,
                tracks,
                users
            };
            res.status(200).json(response);
        }
        catch (error) {
            Logging_1.default.error(error);
            next(error);
        }
    }));
    router.use((req, res, next) => {
        const error = new Error(`Route has been not found -> Methode: [${req.method}] - Url: [${req.originalUrl}]`);
        Logging_1.default.error(error.message);
        next();
        return res.status(404).json(error.message);
    });
    http_1.default.createServer(router).listen(config_1.default.port, () => Logging_1.default.info(`Server is started on new port ${config_1.default.port}`));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLGdEQUFxQztBQUNyQyx3REFBZ0M7QUFDaEMsNkRBQXFDO0FBQ3JDLGdFQUF3QztBQUN4QyxrRUFBeUM7QUFHekMseURBQWlDO0FBQ2pDLDJEQUFtQztBQUNuQyx5REFBaUM7QUFDakMsaUVBQXlDO0FBRXpDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN6QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUN0QyxrQkFBUTtLQUNILEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDO0tBQ3pCLE9BQU8sQ0FBQyxHQUFHLGdCQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQztLQUN0RSxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ1AsaUJBQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNyQyxXQUFXLEVBQUUsQ0FBQztBQUNsQixDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNiLGlCQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkMsaUJBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUM7QUFHUCwyREFBeUM7QUFDekMseURBQXVDO0FBQ3ZDLDJEQUF5QztBQUN6Qyx5REFBdUM7QUFDdkMsaUVBQStDO0FBSS9DLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7UUFDNUIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUMzRCxpQkFBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLE1BQU0sYUFBYSxHQUFHLENBQUMsV0FBVyxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUNySCxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDbEIsaUJBQU8sQ0FBQyxJQUFJLENBQ1IsK0JBQStCLEdBQUcsQ0FBQyxNQUFNLGFBQWEsR0FBRyxDQUFDLFdBQVcsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FDN0ksQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxHQUFHLENBQ04sSUFBSSxDQUFDO1FBQ0QsTUFBTSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCLENBQUM7UUFDMUQsT0FBTyxFQUFFLGdDQUFnQztRQUN6QyxXQUFXLEVBQUUsSUFBSTtRQUNqQixvQkFBb0IsRUFBRSxHQUFHO0tBQzVCLENBQUMsQ0FDTCxDQUFDO0lBRUYsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFBLHVCQUFZLEdBQUUsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFHN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1FBQzNELElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLCtCQUErQixDQUFDLENBQUM7WUFDNUUsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUdILE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGVBQVcsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGNBQVUsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGVBQVcsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGNBQVUsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGtCQUFjLENBQUMsQ0FBQztJQUd6QyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDbkYsSUFBSSxDQUFDO1lBQ0QsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFlLENBQUM7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVuQixNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQzlCLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQzFCLGVBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQzVCLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQzlCLGtCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ2pDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7WUFFL0MsTUFBTSxRQUFRLEdBQUc7Z0JBQ2IsS0FBSztnQkFDTCxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sS0FBSzthQUNSLENBQUM7WUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLGlCQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUtILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUMzRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsR0FBRyxDQUFDLE1BQU0sYUFBYSxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUM1RyxpQkFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsSUFBSSxFQUFFLENBQUM7UUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztJQUVILGNBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLGdCQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLGlCQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxnQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0SCxDQUFDLENBQUMifQ==