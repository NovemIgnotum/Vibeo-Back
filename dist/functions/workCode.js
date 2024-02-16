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
exports.searchSkills = exports.updateWorkCode = exports.CreateWorkCode = void 0;
const axios_1 = __importDefault(require("axios"));
const WorkStationsPoleEmploi_1 = __importDefault(require("../models/WorkStationsPoleEmploi"));
const CreateWorkCode = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default
        .post('https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire', {
        grant_type: 'client_credentials',
        client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
        client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
        scope: 'api_rome-fiches-metiersv1'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        const workStation = yield axios_1.default.get('https://api.pole-emploi.io/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier', {
            headers: {
                Authorization: `Bearer ${result.data.access_token}`
            }
        });
        workStation.data.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
            const workStatiosPoleEmploi = new WorkStationsPoleEmploi_1.default({
                name: Object(item).metier.libelle,
                codeROME: Object(item).metier.code
            });
            yield workStatiosPoleEmploi.save();
        }));
    }))
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        let timer = 0;
        const workStations = yield WorkStationsPoleEmploi_1.default.find();
        const handleStart = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const workStation = yield axios_1.default.get(`https://api.pole-emploi.io/partenaire/rome-fiches-metiers/v1/fiches-rome/fiche-metier/${Object(workStations[timer].codeROME)}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Object(workStations)[timer].skills = workStation.data.groupesCompetencesMobilisees;
            Object(workStations)[timer].KnowHow = workStation.data.groupesSavoirs;
            yield workStations[timer].save();
            timer = timer + 1;
            if (timer > workStations.length) {
                clearInterval(handleStart);
            }
        }), 1200);
    }))
        .catch((error) => console.error(error));
});
exports.CreateWorkCode = CreateWorkCode;
const updateWorkCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const workStationPoleEmploi = yield WorkStationsPoleEmploi_1.default.find();
    const token = yield axios_1.default.post('https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire', {
        grant_type: 'client_credentials',
        client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
        client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
        scope: 'api_rome-metiersv1'
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    if (token) {
        let timer = 0;
        const workStationsFinded = yield WorkStationsPoleEmploi_1.default.find();
        const handleStart = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const workStation = yield axios_1.default.get(`https://api.pole-emploi.io/partenaire/rome-metiers/v1/metiers/metier/${workStationPoleEmploi[timer].codeROME}`, {
                headers: {
                    Authorization: `Bearer ${Object(token.data.access_token)}`
                }
            });
            Object(workStationsFinded)[timer].definition = workStation.data.definition;
            Object(workStationsFinded)[timer].jobAccess = workStation.data.accesEmploi;
            Object(workStationsFinded)[timer].jobs = workStation.data.appellations;
            Object(workStationsFinded)[timer].jobContext = workStation.data.contextesTravail;
            yield workStationsFinded[timer].save();
            timer = timer + 1;
            if (timer > workStationsFinded.length) {
                clearInterval(handleStart);
            }
        }), 1200);
    }
});
exports.updateWorkCode = updateWorkCode;
const searchSkills = () => __awaiter(void 0, void 0, void 0, function* () {
    const workStationFinded = yield WorkStationsPoleEmploi_1.default.find();
    console.log('<-<-<-<workStationFinded->->->->->>', Object(workStationFinded)[0].jobs);
});
exports.searchSkills = searchSkills;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya0NvZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL3dvcmtDb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQiw4RkFBc0U7QUFFdEUsTUFBTSxjQUFjLEdBQUcsQ0FBTyxLQUFhLEVBQUUsRUFBRTtJQUMzQyxNQUFNLGVBQUs7U0FDTixJQUFJLENBQ0Qsa0ZBQWtGLEVBQ2xGO1FBQ0ksVUFBVSxFQUFFLG9CQUFvQjtRQUNoQyxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFO1FBQ3BELGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUU7UUFDNUQsS0FBSyxFQUFFLDJCQUEyQjtLQUNyQyxFQUNEO1FBQ0ksT0FBTyxFQUFFO1lBQ0wsY0FBYyxFQUFFLG1DQUFtQztTQUN0RDtLQUNKLENBQ0o7U0FDQSxJQUFJLENBQUMsQ0FBTyxNQUFNLEVBQUUsRUFBRTtRQUNuQixNQUFNLFdBQVcsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsdUZBQXVGLEVBQUU7WUFDekgsT0FBTyxFQUFFO2dCQUNMLGFBQWEsRUFBRSxVQUFVLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ3REO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBTyxJQUFZLEVBQUUsS0FBYSxFQUFFLEVBQUU7WUFDdkQsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGdDQUFzQixDQUFDO2dCQUNyRCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUNqQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ3JDLENBQUMsQ0FBQztZQUNILE1BQU0scUJBQXFCLENBQUMsSUFB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