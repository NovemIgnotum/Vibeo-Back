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
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');
const AdministrativePosition_1 = __importDefault(require("../models/AdministrativePosition"));
const Usager_1 = __importDefault(require("../models/Usager"));
const createAdministrativePosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { poleEmploi, dateOfRegistrationAtPoleEmploi, identificationNumberPoleEmploi, rsa, dateOfRegistrationAtRsa, identificationNumberRsa, numberOfSecu, isHandicaped, isHandicapedEndingDate, isHandicapedComment } = req.body;
    const usagerId = req.params.usagerId;
    const userFinded = yield Usager_1.default.findById(usagerId);
    if (userFinded) {
        if (!userFinded.administrativePosition) {
            if (poleEmploi !== '' && rsa !== '' && numberOfSecu !== '') {
                const administrativePosition = new AdministrativePosition_1.default({
                    poleEmploi,
                    dateOfRegistrationAtPoleEmploi,
                    identificationNumberPoleEmploi,
                    rsa,
                    dateOfRegistrationAtRsa,
                    identificationNumberRsa,
                    numberOfSecu,
                    isHandicaped,
                    isHandicapedEndingDate,
                    isHandicapedComment
                });
                userFinded.administrativePosition = Object(administrativePosition._id);
                yield userFinded.save();
                return administrativePosition
                    .save()
                    .then((administrativePosition) => res.status(201).json({ administrativePosition: administrativePosition }))
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
            else {
                return res.status(400).json({ message: 'some values missing' });
            }
        }
        else {
            return res.status(400).json({ message: 'It has been already created' });
        }
    }
    else {
        return res.status(400).json({ message: 'usager not finded' });
    }
});
const readAdministrativePosition = (req, res) => {
    const usagerId = req.params.usagerId;
    return AdministrativePosition_1.default.findById(usagerId)
        .populate('AdministrativePosition')
        .then((administrativePosition) => administrativePosition ? res.status(200).json({ message: administrativePosition }) : res.status(404).json({ message: 'Not found' }))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateAdministrativePosition = (req, res) => {
    const administrativePositionId = req.params.administrativePositionId;
    return AdministrativePosition_1.default.findById(administrativePositionId).then((administrativePosition) => {
        if (administrativePosition) {
            administrativePosition.set(req.body);
            return administrativePosition
                .save()
                .then((administrativePosition) => res.status(201).json({ administrativePosition: administrativePosition }))
                .catch((error) => res.status(500).json({ error: error.message }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    });
};
const deleteAdministrativePosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const administrativePositionId = req.params.administrativePositionId;
    return AdministrativePosition_1.default.findByIdAndDelete(administrativePositionId)
        .then((administrativePosition) => administrativePosition
        ? res.status(200).json({ message: 'Administrative position is deleted' })
        : res.status(404).json({ message: 'Not found' }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
exports.default = { createAdministrativePosition, readAdministrativePosition, updateAdministrativePosition, deleteAdministrativePosition };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRtaW5pc3RyYXRpdmVQb3NpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9BZG1pbmlzdHJhdGl2ZVBvc2l0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDM0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDbEQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRzdCLDhGQUFzRTtBQUN0RSw4REFBc0M7QUFDdEMsTUFBTSw0QkFBNEIsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN2RSxNQUFNLEVBQ0YsVUFBVSxFQUNWLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsR0FBRyxFQUNILHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLFlBQVksRUFDWixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ3RCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUNiLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3JDLE1BQU0sVUFBVSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkQsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNyQyxJQUFJLFVBQVUsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxZQUFZLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ3pELE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxnQ0FBc0IsQ0FBQztvQkFDdEQsVUFBVTtvQkFDViw4QkFBOEI7b0JBQzlCLDhCQUE4QjtvQkFDOUIsR0FBRztvQkFDSCx1QkFBdUI7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsWUFBWTtvQkFDWixZQUFZO29CQUNaLHNCQUFzQjtvQkFDdEIsbUJBQW1CO2lCQUN0QixDQUFDLENBQUM7Z0JBQ0gsVUFBVSxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkUsTUFBTSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sc0JBQXNCO3FCQUN4QixJQUFJLEVBQUU7cUJBQ04sSUFBSSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO3FCQUMxRyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUUsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7SUFDTCxDQUFDO1NBQU0sQ0FBQztRQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQztBQUVGLE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDL0QsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFFckMsT0FBTyxnQ0FBc0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1NBQzNDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQztTQUNsQyxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQzdCLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQ3RJO1NBQ0EsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUMsQ0FBQztBQUVGLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDakUsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0lBQ3JFLE9BQU8sZ0NBQXNCLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtRQUM3RixJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFDekIsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxPQUFPLHNCQUFzQjtpQkFDeEIsSUFBSSxFQUFFO2lCQUNOLElBQUksQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixFQUFFLENBQUMsQ0FBQztpQkFDMUcsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFFLENBQUM7YUFBTSxDQUFDO1lBQ0osR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRixNQUFNLDRCQUE0QixHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sd0JBQXdCLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztJQUVyRSxPQUFPLGdDQUFzQixDQUFDLGlCQUFpQixDQUFDLHdCQUF3QixDQUFDO1NBQ3BFLElBQUksQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FDN0Isc0JBQXNCO1FBQ2xCLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUN2RDtTQUNBLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUEsQ0FBQztBQUVGLGtCQUFlLEVBQUUsNEJBQTRCLEVBQUUsMEJBQTBCLEVBQUUsNEJBQTRCLEVBQUUsNEJBQTRCLEVBQUUsQ0FBQyJ9