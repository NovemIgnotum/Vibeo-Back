"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OfferJob_1 = __importDefault(require("../controllers/OfferJob"));
const router = express_1.default.Router();
router.post('/create/:workStationId', OfferJob_1.default.createOfferJob);
router.post('/createSpontaneous/', OfferJob_1.default.createOfferJobSpontaneous);
router.get('/get/:offerJobId', OfferJob_1.default.readOfferJob);
router.get('/getAll/', OfferJob_1.default.readAll);
router.put('/update/:offerJobId', OfferJob_1.default.updateOfferJob);
router.delete('/delete/:offerJobId', OfferJob_1.default.deleteOfferJob);
router.post('/processing/:offerJobId', OfferJob_1.default.offerJobProcess);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2ZmZXJKb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL09mZmVySm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHVFQUFpRDtBQUVqRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsa0JBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGtCQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUN6RSxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGtCQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxrQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsa0JBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVuRSxrQkFBZSxNQUFNLENBQUMifQ==