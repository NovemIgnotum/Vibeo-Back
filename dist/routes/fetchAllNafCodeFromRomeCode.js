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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const WorkStationsPoleEmploi_1 = __importDefault(require("../models/WorkStationsPoleEmploi"));
const Response_1 = __importDefault(require("../library/Response"));
const router = express_1.default.Router();
router.post('/reload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api-adresse.data.gouv.fr/search/?q=${req.body.adress} ${req.body.zip} ${req.body.city}`);
    if (response.data !== undefined) {
        yield axios_1.default
            .post('https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=partenaire', {
            grant_type: 'client_credentials',
            client_id: `${process.env.LA_BONNE_BOITE_CLIENT_ID}`,
            client_secret: `${process.env.LA_BONNE_BOITE_CLIENT_SECRET}`,
            scope: 'api_labonneboitev1'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
            let timer = 0;
            let id = setInterval(frame, 1500);
            const workStationFinded = yield WorkStationsPoleEmploi_1.default.find();
            function frame() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (timer === workStationFinded.length) {
                        clearInterval(id);
                    }
                    else {
                        let isLoading = false;
                        const entreprisesToProspect = yield axios_1.default.get(`https://api.pole-emploi.io/partenaire/labonneboite/v1/company/?distance=${req.body.distance}&latitude=${response.data.features[0].geometry.coordinates[1]}&longitude=${response.data.features[0].geometry.coordinates[0]}&rome_codes=${workStationFinded[timer].codeROME}&sort=distance&page=${req.body.page}&page_size=100`, {
                            headers: {
                                Authorization: `Bearer ${resp.data.access_token}`
                            }
                        });
                        Object(entreprisesToProspect).data.companies.map((el, index) => {
                            workStationFinded[timer].nafCodes.includes(Object(el).naf) === false &&
                                workStationFinded[timer].nafCodes.push(Object(el).naf);
                        });
                        yield workStationFinded[timer].save();
                        Response_1.default.info(`poste de travail avec le code ROME ${workStationFinded[timer].codeROME} -- temps restant -> ${workStationFinded.length - timer} sec ...`);
                        timer++;
                    }
                });
            }
            return res.status(200).json('Procedure démarrée');
        }));
    }
    else {
        return res.status(404).json({ error: 'statusText doesnt OK', statusText: response.statusText });
    }
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hBbGxOYWZDb2RlRnJvbVJvbWVDb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9mZXRjaEFsbE5hZkNvZGVGcm9tUm9tZUNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLDhGQUFzRTtBQUN0RSxtRUFBMkM7QUFDM0MsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN0QyxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsOENBQThDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDOUIsTUFBTSxlQUFLO2FBQ04sSUFBSSxDQUNELGtGQUFrRixFQUNsRjtZQUNJLFVBQVUsRUFBRSxvQkFBb0I7WUFDaEMsU0FBUyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRTtZQUNwRCxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFO1lBQzVELEtBQUssRUFBRSxvQkFBb0I7U0FDOUIsRUFDRDtZQUNJLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsbUNBQW1DO2FBQ3REO1NBQ0osQ0FDSjthQUNBLElBQUksQ0FBQyxDQUFPLElBQUksRUFBRSxFQUFFO1lBQ2pCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGdDQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRTlELFNBQWUsS0FBSzs7b0JBQ2hCLElBQUksS0FBSyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNyQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLFNBQVMsR0FBWSxLQUFLLENBQUM7d0JBQy9CLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUN6QywyRUFBMkUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLGFBQWEsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsY0FBYyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFlLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsdUJBQXVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsRUFDN1Q7NEJBQ0ksT0FBTyxFQUFFO2dDQUNMLGFBQWEsRUFBRSxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFOzZCQUNwRDt5QkFDSixDQUNKLENBQUM7d0JBQ0YsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFVLEVBQUUsS0FBYSxFQUFFLEVBQUU7NEJBRTNFLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEtBQUs7Z0NBQ2hFLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMvRCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUN0QyxrQkFBUSxDQUFDLElBQUksQ0FDVCxzQ0FBc0MsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSx3QkFDbkUsaUJBQWlCLENBQUMsTUFBTSxHQUFHLEtBQy9CLFVBQVUsQ0FDYixDQUFDO3dCQUNGLEtBQUssRUFBRSxDQUFDO29CQUNaLENBQUM7Z0JBQ0wsQ0FBQzthQUFBO1lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDWCxDQUFDO1NBQU0sQ0FBQztRQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0gsa0JBQWUsTUFBTSxDQUFDIn0=