import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

// Models
import EmploymentContract from '../models/EmploymentContract';
import Utilisateur from '../models/Utilisateur';
import Entreprise from '../models/Entreprise';
import OfferJob from '../models/OfferJob';
import WorkStation from '../models/WorkStation';
import Usager from '../models/Usager';

// Functions
import {
    createEmploymentContractForExtracting,
    readEmploymentContractForExtracting,
    updateEmploymentContractForExtracting,
    deleteEmploymentContractForExtracting
} from '../functions/EmploymentContract';
import { readOfferJobForExtracting, updateOfferJobForExtracting } from '../functions/OfferJobData';

// Libraries
import Retour from '../library/Response';
import config from '../config/config';

const createEmploymentContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            contractType,
            workName,
            numberOfHour,
            tasksList,
            skillsList,
            jobContext,
            usager,
            startingDate,
            endingDate,
            endingTryPeriodeDate,
            continuityOfThepreviousContract,
            previousContractId
        } = req.body;

        const offerJobFinded = await OfferJob.findById(req.params.offerJobId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const workStationFinded = await WorkStation.findOne({
            offerJobs: Object(offerJobFinded)._id
        });
        const entrepriseFinded = await Entreprise.findOne({
            workStations: Object(workStationFinded)._id
        });
        const usagerFinded = await Usager.findById(Object(offerJobFinded).usagerPositioned[0]);
        if (!offerJobFinded || !utilisateurFinded) {
            Retour.error('The offer job or utilisateur has been not found');
            return res.status(404).json({ error: 'The offer job or utilisateur has been not found' });
        } else {
            if (!startingDate || !endingTryPeriodeDate) {
                Retour.error('The startingDate and endingTryPeriodeDate are required');
                return res.status(400).json({ error: 'The startingDate and endingTryPeriodeDate are required' });
            } else {
                if (offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") !== true) {
                    Retour.error('This contract is already started');
                    return res.status(400).json({ error: 'This contract is already started' });
                } else {
                    const employmentContract = new EmploymentContract({
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
                        Retour.error("If continuityOfThepreviousContract is egual to 'true' so previousContractId is required");
                        return res.status(500).json({
                            message: "If continuityOfThepreviousContract is egual to 'true' so previousContractId is required"
                        });
                    } else {
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
                            for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                            comment: req.body.comment
                        });
                        offerJobFinded.employmentContracts.push(Object(employmentContract._id));
                        Object(usagerFinded).employmentContracts.push(Object(employmentContract._id));

                        createEmploymentContractForExtracting(
                            utilisateurFinded.datas[0].mounths[0],
                            employmentContract._id,
                            offerJobFinded.usagerPositioned[0],
                            Object(entrepriseFinded)._id
                        );
                        await offerJobFinded.save(), await employmentContract.save();
                        await usagerFinded?.save();
                        Retour.info('The Employment contract has been created');
                        return res.status(201).json({ message: 'The Employment contract has been created' });
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
};

const readEmploymentContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employmentContract = await EmploymentContract.findById(req.params.employmentContractId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!employmentContract || !utilisateurFinded) {
            Retour.error('The employment contract or the requester has been not found');
            return res.status(404).json({ error: 'The employment contract or the requester has been not found' });
        } else {
            readEmploymentContractForExtracting(
                utilisateurFinded.datas[0].mounths[0],
                employmentContract._id,
                employmentContract.usager,
                employmentContract.entreprise
            );
            return res.status(200).json({ message: 'employment contract has been found', employmentContract });
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Retour.error({ message: 'Requester has been not found' });
            return res.status(404).json({ message: 'Requester has been not found' });
        } else {
            const offerJobFinded = await OfferJob.findById(req.params.offerJobId).populate('employmentContracts').select('employmentContract');
            if (!offerJobFinded) {
                Retour.error({ message: 'the offer job has been not found' });
                return res.status(404).json({ message: 'the offer job has been not found' });
            } else {
                readOfferJobForExtracting(utilisateurFinded.datas[0].mounths[0], offerJobFinded._id);
                return res.status(200).json({ count: offerJobFinded.employmentContracts.length, offerJobFinded });
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
    return EmploymentContract.find()
        .then((employmentContracts) => res.status(200).json({ message: employmentContracts }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateEmploymentContract = (req: Request, res: Response, next: NextFunction) => {
    const employmentContractId = req.params.employmentContractId;
    return EmploymentContract.findById(employmentContractId).then(async (employmentContract) => {
        if (!employmentContract) {
            return res.status(404).json({ message: 'Not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                employmentContract.set(req.body);
                return employmentContract
                    .save()
                    .then((employmentContract) => res.status(201).json({ employmentContract: employmentContract }))
                    .finally(() => {
                        updateEmploymentContractForExtracting(
                            Object(utilisateurFinded?.datas[0].mounths[0]),
                            Object(employmentContract._id),
                            Object(employmentContract.usager),
                            Object(employmentContract.entreprise)
                        );
                    })
                    .catch((error) => res.status(500).json({ error: error.message }));
            }
        }
    });
};

const deleteEmploymentContract = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            contractType,
            workName,
            numberOfHour,
            tasksList,
            skillsList,
            usager,
            entreprise,
            startingDate,
            endingDate,
            endingTryPeriodeDate,
            continuityOfThepreviousContract,
            previousContract,
            offerJobStillAvailable,
            hasBeenCloseByUsager,
            offerJobComment
        } = req.body;
        const employmentContractFinded = await EmploymentContract.findById(req.params.employmentContractId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(employmentContractFinded?.usager);
        if (!employmentContractFinded || !utilisateurFinded) {
            Retour.error({ message: 'Employment contract or requester has been not found' });
            return res.status(404).json({ message: 'Employment contract or requester has been not found' });
        } else {
            const offerJobFinded = await OfferJob.findOne({ employmentContracts: employmentContractFinded._id });
            if (!offerJobFinded) {
                Retour.error({ message: 'the offer job has been not found' });
                return res.status(404).json({ message: 'the offer job has been not found' });
            } else {
                if (offerJobFinded && typeof offerJobStillAvailable !== 'boolean') {
                    Retour.error({ message: 'offerJobStillAvailable is required' });
                    return res.status(400).json({ message: 'offerJobStillAvailable is required' });
                } else {
                    if ((typeof employmentContractFinded.endingDate !== 'string' || !employmentContractFinded.endingDate) && !endingDate) {
                        Retour.error({ message: 'endingDate is required' });
                        return res.status(500).json({ message: 'endingDate is required' });
                    } else {
                        const archived = await axios.post(`${config.mongooseUrlArchived}/employmentContract/create`, {
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
                            deleteEmploymentContractForExtracting(
                                utilisateurFinded.datas[0].mounths[0],
                                employmentContractFinded._id,
                                employmentContractFinded.usager,
                                employmentContractFinded.entreprise
                            );
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

                                const offerJobArchived = await axios.post(`${config.mongooseUrlArchived}/offerJob/create`, {
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

                                await employmentContractFinded.deleteOne();
                                await offerJobFinded.deleteOne();
                                Retour.info('The employment contract and the offer job has been deleted');
                                return res.status(200).json({ message: 'The employment contract and the offer job has been deleted' });
                            } else if (offerJobStillAvailable === true && typeof hasBeenCloseByUsager === 'boolean') {
                                offerJobFinded.status = `Disponible`;
                                offerJobFinded.history.push({
                                    title: `Offre d'emploi redevenue disponible après une rupture de contrat`,
                                    date: new Date(),
                                    by: hasBeenCloseByUsager === true ? "Par l'usager(e)" : "Par l'employeur",
                                    for: hasBeenCloseByUsager === true ? "Contre l'employeur" : "Contre l'usager(e)",
                                    comment: offerJobComment
                                });
                                const newArrayOfferJob = Object(offerJobFinded).usagerPositioned.filter(
                                    (el: String) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayOfferJob;
                                const newArrrayUsager = Object(usagerFinded).offerJobReceived.filter(
                                    (el: String) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id)
                                );
                                Object(usagerFinded).offerJobReceived = newArrrayUsager;
                                await offerJobFinded.save();
                                await employmentContractFinded.deleteOne();
                                updateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJobFinded._id));
                                Retour.info("Employment contract has been deleted and the offer job's still avalaible");
                                return res.status(200).json({ message: "Employment contract has been deleted and the offer job's still avalaible" });
                            } else {
                                return res.status(400).json({ message: 'offerJobStillAvailable and hasBeenCloseByUsager are required' });
                            }
                        } else {
                            Retour.error('something went wrong in BDD Archive');
                            return res.status(400).json('something went wrong in BDD Archive');
                        }
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error has been catched', error });
        return res.status(500).json({ message: 'Error has been catched', error: error });
    }
};

export default {
    createEmploymentContract,
    readEmploymentContract,
    readAll,
    updateEmploymentContract,
    deleteEmploymentContract
};
