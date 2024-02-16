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
const axios_1 = __importDefault(require("axios"));
const EmploymentContract_1 = __importDefault(require("../models/EmploymentContract"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const OfferJob_1 = __importDefault(require("../models/OfferJob"));
const WorkStation_1 = __importDefault(require("../models/WorkStation"));
const Usager_1 = __importDefault(require("../models/Usager"));
const EmploymentContract_2 = require("../functions/EmploymentContract");
const OfferJobData_1 = require("../functions/OfferJobData");
const Response_1 = __importDefault(require("../library/Response"));
const config_1 = __importDefault(require("../config/config"));
const createEmploymentContract = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractType, workName, numberOfHour, tasksList, skillsList, jobContext, usager, startingDate, endingDate, endingTryPeriodeDate, continuityOfThepreviousContract, previousContractId } = req.body;
        const offerJobFinded = yield OfferJob_1.default.findById(req.params.offerJobId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const workStationFinded = yield WorkStation_1.default.findOne({
            offerJobs: Object(offerJobFinded)._id
        });
        const entrepriseFinded = yield Entreprise_1.default.findOne({
            workStations: Object(workStationFinded)._id
        });
        const usagerFinded = yield Usager_1.default.findById(Object(offerJobFinded).usagerPositioned[0]);
        if (!offerJobFinded || !utilisateurFinded) {
            Response_1.default.error('The offer job or utilisateur has been not found');
            return res.status(404).json({ error: 'The offer job or utilisateur has been not found' });
        }
        else {
            if (!startingDate || !endingTryPeriodeDate) {
                Response_1.default.error('The startingDate and endingTryPeriodeDate are required');
                return res.status(400).json({ error: 'The startingDate and endingTryPeriodeDate are required' });
            }
            else {
                if (offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") !== true) {
                    Response_1.default.error('This contract is already started');
                    return res.status(400).json({ error: 'This contract is already started' });
                }
                else {
                    const employmentContract = new EmploymentContract_1.default({
                        contractType: contractType ? contractType : offerJobFinded.contractType,
                        workName: workName ? workName : offerJobFinded.offerName,
                        numberOfHour: numberOfHour ? numberOfHour : offerJobFinded.numberHoursPerWeek,
                        tasksList: tasksList ? tasksList : Object(workStationFinded).tasksList,
                        skillsList: skillsList ? skillsList : Object(workStationFinded).skillsList,
                        jobContext: jobContext ? jobContext : Object(workStationFinded).jobContext,
                        usager: usager ? usager : offerJobFinded.usagerPositioned[0],
                        entreprise: Object(entrepriseFinded)._id,
                        startingDate,
                        endingDate,
                        endingTryPeriodeDate,
                        continuityOfThepreviousContract,
                        previousContract: previousContractId && previousContractId
                    });
                    if (typeof continuityOfThepreviousContract === 'boolean' && continuityOfThepreviousContract === true && !previousContractId) {
                        Response_1.default.error("If continuityOfThepreviousContract is egual to 'true' so previousContractId is required");
                        return res.status(500).json({
                            message: "If continuityOfThepreviousContract is egual to 'true' so previousContractId is required"
                        });
                    }
                    else {
                        offerJobFinded.status = `Démarrage du contrat prevu le ${new Date(startingDate).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`;
                        offerJobFinded.history.push({
                            title: `Démarrage du contrat prevu le ${new Date(startingDate).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`,
                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: `${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.firstname} ${usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.account.name}`,
                            comment: req.body.comment
                        });
                        offerJobFinded.employmentContracts.push(Object(employmentContract._id));
                        Object(usagerFinded).employmentContracts.push(Object(employmentContract._id));
                        (0, EmploymentContract_2.createEmploymentContractForExtracting)(utilisateurFinded.datas[0].mounths[0], employmentContract._id, offerJobFinded.usagerPositioned[0], Object(entrepriseFinded)._id);
                        yield offerJobFinded.save(), yield employmentContract.save();
                        yield (usagerFinded === null || usagerFinded === void 0 ? void 0 : usagerFinded.save());
                        Response_1.default.info('The Employment contract has been created');
                        return res.status(201).json({ message: 'The Employment contract has been created' });
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
});
const readEmploymentContract = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employmentContract = yield EmploymentContract_1.default.findById(req.params.employmentContractId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!employmentContract || !utilisateurFinded) {
            Response_1.default.error('The employment contract or the requester has been not found');
            return res.status(404).json({ error: 'The employment contract or the requester has been not found' });
        }
        else {
            (0, EmploymentContract_2.readEmploymentContractForExtracting)(utilisateurFinded.datas[0].mounths[0], employmentContract._id, employmentContract.usager, employmentContract.entreprise);
            return res.status(200).json({ message: 'employment contract has been found', employmentContract });
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Response_1.default.error({ message: 'Requester has been not found' });
            return res.status(404).json({ message: 'Requester has been not found' });
        }
        else {
            const offerJobFinded = yield OfferJob_1.default.findById(req.params.offerJobId).populate('employmentContracts').select('employmentContract');
            if (!offerJobFinded) {
                Response_1.default.error({ message: 'the offer job has been not found' });
                return res.status(404).json({ message: 'the offer job has been not found' });
            }
            else {
                (0, OfferJobData_1.readOfferJobForExtracting)(utilisateurFinded.datas[0].mounths[0], offerJobFinded._id);
                return res.status(200).json({ count: offerJobFinded.employmentContracts.length, offerJobFinded });
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
    return EmploymentContract_1.default.find()
        .then((employmentContracts) => res.status(200).json({ message: employmentContracts }))
        .catch((error) => res.status(500).json({ error: error.message }));
});
const updateEmploymentContract = (req, res, next) => {
    const employmentContractId = req.params.employmentContractId;
    return EmploymentContract_1.default.findById(employmentContractId).then((employmentContract) => __awaiter(void 0, void 0, void 0, function* () {
        if (!employmentContract) {
            return res.status(404).json({ message: 'Not found' });
        }
        else {
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
                employmentContract.set(req.body);
                return employmentContract
                    .save()
                    .then((employmentContract) => res.status(201).json({ employmentContract: employmentContract }))
                    .finally(() => {
                    (0, EmploymentContract_2.updateEmploymentContractForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(employmentContract._id), Object(employmentContract.usager), Object(employmentContract.entreprise));
                })
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
    }));
};
const deleteEmploymentContract = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contractType, workName, numberOfHour, tasksList, skillsList, usager, entreprise, startingDate, endingDate, endingTryPeriodeDate, continuityOfThepreviousContract, previousContract, offerJobStillAvailable, hasBeenCloseByUsager, offerJobComment } = req.body;
        const employmentContractFinded = yield EmploymentContract_1.default.findById(req.params.employmentContractId);
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
        const usagerFinded = yield Usager_1.default.findById(employmentContractFinded === null || employmentContractFinded === void 0 ? void 0 : employmentContractFinded.usager);
        if (!employmentContractFinded || !utilisateurFinded) {
            Response_1.default.error({ message: 'Employment contract or requester has been not found' });
            return res.status(404).json({ message: 'Employment contract or requester has been not found' });
        }
        else {
            const offerJobFinded = yield OfferJob_1.default.findOne({ employmentContracts: employmentContractFinded._id });
            if (!offerJobFinded) {
                Response_1.default.error({ message: 'the offer job has been not found' });
                return res.status(404).json({ message: 'the offer job has been not found' });
            }
            else {
                if (offerJobFinded && typeof offerJobStillAvailable !== 'boolean') {
                    Response_1.default.error({ message: 'offerJobStillAvailable is required' });
                    return res.status(400).json({ message: 'offerJobStillAvailable is required' });
                }
                else {
                    if ((typeof employmentContractFinded.endingDate !== 'string' || !employmentContractFinded.endingDate) && !endingDate) {
                        Response_1.default.error({ message: 'endingDate is required' });
                        return res.status(500).json({ message: 'endingDate is required' });
                    }
                    else {
                        const archived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/employmentContract/create`, {
                            _id: employmentContractFinded._id,
                            contractType: contractType ? contractType : employmentContractFinded.contractType,
                            workName: workName ? workName : employmentContractFinded.workName,
                            numberOfHour: numberOfHour ? numberOfHour : employmentContractFinded.numberOfHour,
                            tasksList: tasksList ? tasksList : employmentContractFinded.tasksList,
                            skillsList: skillsList ? skillsList : employmentContractFinded.skillsList,
                            usager: usager ? usager : employmentContractFinded.usager,
                            entreprise: entreprise ? entreprise : employmentContractFinded.entreprise,
                            startingDate: startingDate ? startingDate : employmentContractFinded.startingDate,
                            endingDate: endingDate ? endingDate : employmentContractFinded.endingDate,
                            endingTryPeriodeDate: endingTryPeriodeDate ? endingTryPeriodeDate : employmentContractFinded.endingTryPeriodeDate,
                            continuityOfThepreviousContract: continuityOfThepreviousContract
                                ? continuityOfThepreviousContract
                                : employmentContractFinded.continuityOfThepreviousContract,
                            previousContract: previousContract ? previousContract : employmentContractFinded.previousContract
                        });
                        if (archived.data.message === 'The employment contract has been archived') {
                            (0, EmploymentContract_2.deleteEmploymentContractForExtracting)(utilisateurFinded.datas[0].mounths[0], employmentContractFinded._id, employmentContractFinded.usager, employmentContractFinded.entreprise);
                            if (offerJobStillAvailable === false && typeof hasBeenCloseByUsager === 'boolean') {
                                offerJobFinded.status = `Archivée après une rupture de contrat`;
                                offerJobFinded.history.push({
                                    title: `Rupture du contrat de travail le ${new Date().toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(),
                                    by: hasBeenCloseByUsager === true ? "Par l'usager(e)" : "Par l'employeur",
                                    for: hasBeenCloseByUsager === true ? "Contre l'employeur" : "Contre l'usager(e)",
                                    comment: offerJobComment
                                });
                                const offerJobArchived = yield axios_1.default.post(`${config_1.default.mongooseUrlArchived}/offerJob/create`, {
                                    _id: offerJobFinded._id,
                                    isFromAnEvent: offerJobFinded.isFromAnEvent,
                                    numOfferJobForTheEvent: offerJobFinded.numOfferJobForTheEvent,
                                    contractType: offerJobFinded.contractType,
                                    numberHoursPerWeek: offerJobFinded.numberHoursPerWeek,
                                    createdBy: offerJobFinded.createdBy,
                                    offerName: offerJobFinded.offerName,
                                    workContract: offerJobFinded.workContract,
                                    salary: offerJobFinded.salary,
                                    status: `Rupture du contrat de travail`,
                                    hasBeenTakenByOurServices: offerJobFinded.hasBeenTakenByOurServices,
                                    history: offerJobFinded.history,
                                    usagerPositioned: offerJobFinded.usagerPositioned,
                                    usagerAcceptedByEntreprise: offerJobFinded.usagerAcceptedByEntreprise,
                                    usagerRefusedByEntreprise: offerJobFinded.usagerRefusedByEntreprise,
                                    usagerWhoAcceptedTheOfferJob: offerJobFinded.usagerWhoAcceptedTheOfferJob,
                                    usagerWhoRefusedTheOfferJob: offerJobFinded.usagerWhoRefusedTheOfferJob,
                                    jobInterviews: offerJobFinded.jobInterviews,
                                    decouvertes: offerJobFinded.decouvertes,
                                    employmentContracts: offerJobFinded.employmentContracts
                                });
                                yield employmentContractFinded.deleteOne();
                                yield offerJobFinded.deleteOne();
                                Response_1.default.info('The employment contract and the offer job has been deleted');
                                return res.status(200).json({ message: 'The employment contract and the offer job has been deleted' });
                            }
                            else if (offerJobStillAvailable === true && typeof hasBeenCloseByUsager === 'boolean') {
                                offerJobFinded.status = `Disponible`;
                                offerJobFinded.history.push({
                                    title: `Offre d'emploi redevenue disponible après une rupture de contrat`,
                                    date: new Date(),
                                    by: hasBeenCloseByUsager === true ? "Par l'usager(e)" : "Par l'employeur",
                                    for: hasBeenCloseByUsager === true ? "Contre l'employeur" : "Contre l'usager(e)",
                                    comment: offerJobComment
                                });
                                const newArrayOfferJob = Object(offerJobFinded).usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id));
                                Object(offerJobFinded).usagerPositioned = newArrayOfferJob;
                                const newArrrayUsager = Object(usagerFinded).offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id));
                                Object(usagerFinded).offerJobReceived = newArrrayUsager;
                                yield offerJobFinded.save();
                                yield employmentContractFinded.deleteOne();
                                (0, OfferJobData_1.updateOfferJobForExtracting)(Object(utilisateurFinded === null || utilisateurFinded === void 0 ? void 0 : utilisateurFinded.datas[0].mounths[0]), Object(offerJobFinded._id));
                                Response_1.default.info("Employment contract has been deleted and the offer job's still avalaible");
                                return res.status(200).json({ message: "Employment contract has been deleted and the offer job's still avalaible" });
                            }
                            else {
                                return res.status(400).json({ message: 'offerJobStillAvailable and hasBeenCloseByUsager are required' });
                            }
                        }
                        else {
                            Response_1.default.error('something went wrong in BDD Archive');
                            return res.status(400).json('something went wrong in BDD Archive');
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
});
exports.default = {
    createEmploymentContract,
    readEmploymentContract,
    readAll,
    updateEmploymentContract,
    deleteEmploymentContract
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1wbG95bWVudENvbnRyYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL0VtcGxveW1lbnRDb250cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUcxQixzRkFBOEQ7QUFDOUQsd0VBQWdEO0FBQ2hELHNFQUE4QztBQUM5QyxrRUFBMEM7QUFDMUMsd0VBQWdEO0FBQ2hELDhEQUFzQztBQUd0Qyx3RUFLeUM7QUFDekMsNERBQW1HO0FBR25HLG1FQUF5QztBQUN6Qyw4REFBc0M7QUFFdEMsTUFBTSx3QkFBd0IsR0FBRyxDQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ3ZGLElBQUksQ0FBQztRQUNELE1BQU0sRUFDRixZQUFZLEVBQ1osUUFBUSxFQUNSLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsK0JBQStCLEVBQy9CLGtCQUFrQixFQUNyQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFFYixNQUFNLGNBQWMsR0FBRyxNQUFNLGtCQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEUsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0UsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHFCQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2hELFNBQVMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRztTQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sb0JBQVUsQ0FBQyxPQUFPLENBQUM7WUFDOUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxpQkFB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