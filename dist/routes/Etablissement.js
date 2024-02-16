"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Etablissement_1 = __importDefault(require("../controllers/Etablissement"));
const IsAuthenticated_1 = __importDefault(require("../middlewares/IsAuthenticated"));
const router = express_1.default.Router();
router.post('/create', IsAuthenticated_1.default, Etablissement_1.default.createEtablissement);
router.get('/get/:etablissementId', Etablissement_1.default.readEtablissement);
router.get('/get/', IsAuthenticated_1.default, Etablissement_1.default.readAll);
router.put('/update/:etablissementId', IsAuthenticated_1.default, Etablissement_1.default.updateEtablissement);
router.delete('/delete/:etablissementId', IsAuthenticated_1.default, Etablissement_1.default.deleteEtablissement);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXRhYmxpc3NlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvRXRhYmxpc3NlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixpRkFBc0Q7QUFDdEQscUZBQWtFO0FBRWxFLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUseUJBQW9CLEVBQUUsdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzdFLE1BQU0sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsdUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLHlCQUFvQixFQUFFLHVCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUQsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSx5QkFBb0IsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDN0YsTUFBTSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsRUFBRSx5QkFBb0IsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFaEcsa0JBQWUsTUFBTSxDQUFDIn0=