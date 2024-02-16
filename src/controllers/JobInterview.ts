import { NextFunction, Request, Response } from 'express';

// Models
import JobInterview from '../models/JobInterview';
import Utilisateur from '../models/Utilisateur';
import WorkStation from '../models/WorkStation';
import Entreprise from '../models/Entreprise';
import Usager from '../models/Usager';
import Interlocutor from '../models/Interlocutor';
import OfferJob from '../models/OfferJob';
import Decouverte from '../models/Decouverte';
import EmploymentContract from '../models/EmploymentContract';

// Library
import Retour from '../library/Response';

// Function
import {
    createJobInterviewForExtracting,
    deleteJobInterviewForExtracting,
    readJobInterviewForExtracting,
    updateJobInterviewForExtracting
} from '../functions/JobInterview';
import { createDecouverteForExtracting } from '../functions/DecouverteData';
import { createEmploymentContractForExtracting } from '../functions/EmploymentContract';
import { updateOfferJobForExtracting, deleteOfferJobForExtracting } from '../functions/OfferJobData';
import axios from 'axios';
import config from '../config/config';

// Je creer un Entretien d'Embauche uniquement quand les dates n'ont pas été définies (pour l'instant)
const createJobInterview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { datePlanned, usagerComment, entrepriseComment } = req.body;

        const offerJobFinded = await OfferJob.findById(req.params.offerJobId);
        const workStationFinded = await WorkStation.findOne({ offerJobs: offerJobFinded?._id });
        const entrepriseFinded = await Entreprise.findOne({ workStations: workStationFinded });
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(offerJobFinded?.usagerPositioned);

        if (!entrepriseFinded || !utilisateurFinded || !usagerFinded || !offerJobFinded) {
            return res.status(404).json({
                error: 'The entreprise, utilisateur, usager or the offer job has been not found'
            });
        } else {
            if (offerJobFinded?.status !== "Usager(e) accepté(e) par l'entreprise sans dates définies") {
                return res.status(401).json({ error: 'The status of the offer job is not available' });
            } else {
                const jobInterview = new JobInterview({
                    datePlanned,
                    status: `Entretien d'embauche prévu le ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`,
                    usager: usagerFinded?._id,
                    entreprise: entrepriseFinded?._id,
                    usagerComment,
                    entrepriseComment
                });

                offerJobFinded.status = `Entretien d'embauche prévu le ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                })}`;
                offerJobFinded.history.push({
                    title: `Entretien d'embauche prévu le ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    })}`,
                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: usagerFinded._id,
                    comment: req.body.comment
                });
                offerJobFinded.jobInterviews.push(Object(jobInterview));
                usagerFinded.jobInterviews.push(Object(jobInterview));
                createJobInterviewForExtracting(
                    Object(utilisateurFinded.datas[0].mounths[0]),
                    Object(offerJobFinded._id),
                    Object(usagerFinded._id),
                    Object(entrepriseFinded?._id)
                );
                await jobInterview.save();
                await offerJobFinded.save();
                await usagerFinded.save();
                return res.status(201).json({ message: 'The job interview has been created', jobInterview });
            }
        }
    } catch (error) {
        console.error({ message: 'Error Catched', error });
        Retour.error({ message: 'Error Catched', error });
        return res.status(500).json({ message: 'Error Catched', error });
    }
};

const readJobInterview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobInterviewFinded = await JobInterview.findById(req.params.jobInterviewId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const interlocutorFinded = await Interlocutor.findById(req.headers.requesterid);
        const usagerFinded = await Usager.findById(req.headers.requesterid);
        if (!jobInterviewFinded) {
            return res.status(404).json({ error: 'the job interview has been not found' });
        } else {
            if (utilisateurFinded) {
                readJobInterviewForExtracting(
                    Object(utilisateurFinded.datas[0].mounths[0]),
                    Object(jobInterviewFinded._id),
                    Object(jobInterviewFinded.usager),
                    Object(jobInterviewFinded.entreprise)
                );
                return res.status(200).json({ message: 'The job intervew has been found', jobInterviewFinded });
            } else if (interlocutorFinded) {
                const entrepriseFinded = await Entreprise.findOne({
                    interlocutors: interlocutorFinded._id
                });
                if (JSON.stringify(entrepriseFinded?._id) !== JSON.stringify(jobInterviewFinded.entreprise)) {
                    return res.status(401).json({ message: 'The interlocutor are not in this company' });
                } else {
                    readJobInterviewForExtracting(
                        Object(interlocutorFinded.datas[0].mounths[0]),
                        Object(jobInterviewFinded._id),
                        Object(jobInterviewFinded.usager),
                        Object(jobInterviewFinded.entreprise)
                    );
                    return res.status(200).json({ message: 'The job intervew has been found', jobInterviewFinded });
                }
            } else if (usagerFinded) {
                if (JSON.stringify(usagerFinded._id) !== JSON.stringify(jobInterviewFinded.usager)) {
                    return res.status(401).json({ message: 'The usager are not the candidate' });
                } else {
                    readJobInterviewForExtracting(
                        Object(usagerFinded.datas[0].mounths[0]),
                        Object(jobInterviewFinded._id),
                        Object(jobInterviewFinded.usager),
                        Object(jobInterviewFinded.entreprise)
                    );
                    return res.status(200).json({ message: 'The job intervew has been found', jobInterviewFinded });
                }
            } else {
                return res.status(200).json({ message: 'The requester has been found' });
            }
        }
    } catch (error) {
        Retour.error('Error catched');
        console.error({ message: 'Error catched', error });
        return res.status(500).json({ message: 'Error catched', error });
    }
};

const updateJobInterview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobInterview = await JobInterview.findById(req.params.jobInterviewId);
        if (!jobInterview) {
            return res.status(404).json({ message: 'The job interview has been not found' });
        } else {
            if (jobInterview.usagerInterested || jobInterview.entrepriseInterested) {
                return res.status(403).json({ error: 'The job interview has been already updated' });
            } else {
                const {
                    requesterId,
                    datePlanned,
                    dateOfAppointment,
                    interestedAboutDecouverte,
                    interestedAboutEmploymentContract,
                    dateOfTheNextJobInterview,
                    usagerInterested,
                    entrepriseInterested,
                    usagerComment,
                    entrepriseComment,
                    offerJobComment,
                    // Decouverte
                    startingDateOfDecouverte,
                    endingDateOfDecouverte,
                    // EmploymentContract
                    startingDateEmploymentContract,
                    endingDateEmploymentContract,
                    contractType,
                    numberHourPerWeek,
                    tasksList,
                    skillsList,
                    endingTryPeriodeDate,
                    continuityOfThepreviousContract,
                    previousContractId
                } = req.body;
                const utilisateurFinded = await Utilisateur.findById(requesterId);
                const offerJobFinded = await OfferJob.findOne({ jobInterviews: jobInterview._id });
                const usagerFinded = await Usager.findById(offerJobFinded?.usagerPositioned);
                if (!utilisateurFinded) {
                    return res.status(404).json({ message: 'requester has been not found' });
                } else {
                    /*======= Pour modifier la date de RDV =======*/
                    if (datePlanned) {
                        jobInterview.datePlanned = datePlanned;
                        jobInterview.status = `Entretien d'embauche repoussé au ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`;
                        usagerComment && jobInterview.usagerComment.push(usagerComment);
                        entrepriseComment && jobInterview.entrepriseComment.push(entrepriseComment);
                        Object(offerJobFinded).status = `Entretien d'embauche repoussé au ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`;
                        Object(offerJobFinded).history.push({
                            title: `Entretien d'embauche repoussé au ${new Date(datePlanned).toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`,
                            date: new Date(),
                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                            for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                            comment: offerJobComment
                        });
                        await offerJobFinded?.save();
                        await jobInterview.save();
                        updateJobInterviewForExtracting(
                            Object(utilisateurFinded.datas[0].mounths[0]),
                            Object(utilisateurFinded._id),
                            Object(jobInterview.usager),
                            Object(jobInterview.entreprise)
                        );
                        return res.status(200).json({ message: 'The date for the job interview has been updated' });
                    } else if (dateOfAppointment) {
                        /*======= Pour updater l'Entretien d'embauche =======*/
                        if (typeof usagerInterested !== 'boolean' || typeof entrepriseInterested !== 'boolean') {
                            return res.status(404).json({
                                error: 'The response of the usager and the entreprise is required'
                            });
                        } else {
                            if (!offerJobFinded || !usagerFinded) {
                                return res.status(401).json({ error: 'The offer job or the usager has been not found' });
                            } else {
                                const workStationFinded = await WorkStation.findOne({
                                    offerJobs: offerJobFinded._id
                                });
                                const entrepriseFinded = await Entreprise.findOne({
                                    workStations: workStationFinded
                                });
                                /**========================================================================
                                 **                           BLOC USAGER(E) ET ENTREPRISE SONT INTERESSÉS
                                 *========================================================================**/
                                if (usagerInterested === true && entrepriseInterested === true) {
                                    jobInterview.dateOfAppointment = dateOfAppointment;
                                    usagerComment && jobInterview.usagerComment.push(usagerComment);
                                    entrepriseComment && jobInterview.entrepriseComment.push(entrepriseComment);
                                    jobInterview.usagerInterested = usagerInterested;
                                    jobInterview.entrepriseInterested = entrepriseInterested;
                                    offerJobFinded?.history.push({
                                        title: `Entretien d'embauche réalisé le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`,
                                        date: new Date(),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    if (interestedAboutDecouverte === false && interestedAboutEmploymentContract === false) {
                                        if (!dateOfTheNextJobInterview) {
                                            return res.status(400).json({
                                                error: 'dateOfTheNextJobInterview is required'
                                            });
                                        } else {
                                            jobInterview.status = `prochain entretien d'embauche prévu le ${new Date(
                                                dateOfTheNextJobInterview
                                            ).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            Object(offerJobFinded).status = `prochain entretien d'embauche prévu le ${new Date(
                                                dateOfTheNextJobInterview
                                            ).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`;
                                            Object(offerJobFinded).history.push({
                                                title: `prochain entretien d'embauche prévu le ${new Date(
                                                    dateOfTheNextJobInterview
                                                ).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`,
                                                date: new Date(),
                                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                                comment: ''
                                            });
                                            const newJobInterview = new JobInterview({
                                                datePlanned: dateOfTheNextJobInterview,
                                                usager: jobInterview.usager,
                                                entreprise: jobInterview.entreprise
                                            });
                                            await offerJobFinded?.save();
                                            await newJobInterview.save();
                                        }
                                    } else {
                                        /**========================================================================
                                         **                            FOR A DECOUVERTE
                                         *========================================================================**/
                                        if (interestedAboutDecouverte === true && interestedAboutEmploymentContract === false) {
                                            if (!startingDateOfDecouverte || !endingDateOfDecouverte) {
                                                Retour.error('startingDateOfDecouverte or endingDateOfDecouverte has been not found');
                                                return res.status(403).json({
                                                    error: 'startingDateOfDecouverte or endingDateOfDecouverte has been not found'
                                                });
                                            } else {
                                                const newDecouverte = new Decouverte({
                                                    isFromAnEvent: false,
                                                    jobName: offerJobFinded.offerName,
                                                    startingDateEmploymentContract: startingDateOfDecouverte,
                                                    endingDate: endingDateOfDecouverte,
                                                    entreprise: Object(entrepriseFinded?._id),
                                                    usager: Object(offerJobFinded.usagerPositioned)
                                                });
                                                usagerComment &&
                                                    newDecouverte.usagerComment.push({
                                                        date: new Date(dateOfAppointment),
                                                        comment: usagerComment
                                                    });
                                                entrepriseComment &&
                                                    newDecouverte.entrepriseComment.push({
                                                        date: new Date(dateOfAppointment),
                                                        comment: entrepriseComment
                                                    });
                                                jobInterview.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString(
                                                    'fr-FR',
                                                    {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    }
                                                )} au ${new Date(endingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`;
                                                offerJobFinded.status = `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString(
                                                    'fr-FR',
                                                    {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    }
                                                )} au ${new Date(endingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`;
                                                offerJobFinded.history.push({
                                                    title: `Découverte prévu du ${new Date(startingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    })} au ${new Date(endingDateOfDecouverte).toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    })}`,
                                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                    for: usagerFinded._id,
                                                    comment: offerJobComment
                                                });
                                                offerJobFinded.decouvertes.push(Object(newDecouverte));
                                                usagerFinded.decouvertes.push(Object(newDecouverte));

                                                await jobInterview.save();
                                                await offerJobFinded.save();
                                                await usagerFinded.save();
                                                await newDecouverte.save();

                                                createDecouverteForExtracting(
                                                    Object(utilisateurFinded.datas[0].mounths[0]),
                                                    Object(newDecouverte._id),
                                                    Object(usagerFinded.id),
                                                    Object(entrepriseFinded?._id)
                                                );
                                                updateJobInterviewForExtracting(
                                                    Object(utilisateurFinded.datas[0].mounths[0]),
                                                    Object(utilisateurFinded._id),
                                                    Object(jobInterview.usager),
                                                    Object(jobInterview.entreprise)
                                                );

                                                return res.status(200).json({
                                                    message: 'The job interview and the offer job has been updated about a decouverte'
                                                });
                                            }
                                            /**========================================================================
                                             **                            FOR A EMPLOYEMENT CONTRACT
                                             *========================================================================**/
                                        } else if (interestedAboutEmploymentContract === true && interestedAboutDecouverte === false) {
                                            if (
                                                !startingDateEmploymentContract ||
                                                !contractType ||
                                                !numberHourPerWeek ||
                                                !endingTryPeriodeDate ||
                                                typeof continuityOfThepreviousContract !== 'boolean'
                                            ) {
                                                Retour.error('Some value(s) is missing');
                                                return res.status(403).json({ error: 'Some value(s) is missing' });
                                            } else {
                                                jobInterview.status = `Démarrage prévu le ${new Date(
                                                    startingDateEmploymentContract
                                                ).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`;
                                                offerJobFinded?.history.push({
                                                    title: `Démarrage prévu le ${new Date(startingDateEmploymentContract).toLocaleDateString(
                                                        'fr-FR',
                                                        {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric'
                                                        }
                                                    )}`,
                                                    date: new Date(),
                                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                    for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                                    comment: ''
                                                });
                                                const newContract = await new EmploymentContract({
                                                    contractType: contractType,
                                                    workName: offerJobFinded.offerName,
                                                    numberOfHour: numberHourPerWeek,
                                                    tasksList: workStationFinded?.knowHowRequired,
                                                    skillsList: workStationFinded?.skillsRequired,
                                                    startingDate: startingDateEmploymentContract,
                                                    endingDate: endingDateEmploymentContract && endingDateEmploymentContract,
                                                    endingTryPeriodeDate,
                                                    continuityOfThepreviousContract,
                                                    previousContract: previousContractId && Object(previousContractId),
                                                    usager: Object(usagerFinded._id),
                                                    entreprise: Object(entrepriseFinded)._id
                                                });

                                                tasksList && tasksList.forEach((el: String) => newContract.tasksList.push(el));
                                                skillsList && skillsList.forEach((el: String) => newContract.skillsList.push(el));

                                                offerJobFinded.status = `Démarrage du contrat prevu le ${new Date(
                                                    startingDateEmploymentContract
                                                ).toLocaleDateString('fr-FR', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric'
                                                })}`;
                                                offerJobFinded.history.push({
                                                    title: `Démarrage du contrat prevu le ${new Date(
                                                        startingDateEmploymentContract
                                                    ).toLocaleDateString('fr-FR', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric'
                                                    })}`,
                                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                    for: usagerFinded._id,
                                                    comment: req.body.comment
                                                });
                                                offerJobFinded.employmentContracts.push(Object(newContract._id));
                                                usagerFinded.employmentContracts.push(Object(newContract._id));

                                                if (continuityOfThepreviousContract === true && !previousContractId) {
                                                    Retour.error('The previousContractId is required');
                                                    return res.status(403).json({
                                                        message: 'The previousContractId is required'
                                                    });
                                                } else {
                                                    updateJobInterviewForExtracting(
                                                        Object(utilisateurFinded.datas[0].mounths[0]),
                                                        Object(utilisateurFinded._id),
                                                        Object(jobInterview.usager),
                                                        Object(jobInterview.entreprise)
                                                    );
                                                    createEmploymentContractForExtracting(
                                                        Object(utilisateurFinded.datas[0].mounths[0]),
                                                        Object(newContract._id),
                                                        Object(usagerFinded._id),
                                                        Object(entrepriseFinded?._id)
                                                    );
                                                    await offerJobFinded.save();
                                                    await usagerFinded.save();
                                                    await jobInterview.save();
                                                    await newContract.save();

                                                    Retour.info(
                                                        'The job interview and the offer job has been updated about a new employment contract'
                                                    );
                                                    return res.status(200).json({
                                                        message:
                                                            'The job interview and the offer job has been updated about a new employment contract'
                                                    });
                                                }
                                            }
                                        } else {
                                            Retour.error(
                                                'interestedAboutDecouverte and interestedAboutEmploymentContract is required but both on true is denied'
                                            );
                                            return res.status(403).json({
                                                message:
                                                    'interestedAboutDecouverte and interestedAboutEmploymentContract is required but both on true is denied'
                                            });
                                        }
                                    }
                                    /**========================================================================
                                     **                           BLOC USAGER OU ENTREPRISE NON INTERESSE
                                     *========================================================================**/
                                } else {
                                    jobInterview.dateOfAppointment = dateOfAppointment;
                                    usagerComment &&
                                        jobInterview.usagerComment.push({
                                            date: dateOfAppointment,
                                            comment: usagerComment
                                        });
                                    entrepriseComment &&
                                        jobInterview.entrepriseComment.push({
                                            date: dateOfAppointment,
                                            comment: entrepriseComment
                                        });
                                    jobInterview.usagerInterested = usagerInterested;
                                    jobInterview.entrepriseInterested = entrepriseInterested;
                                    Object(offerJobFinded).status = 'Disponible';
                                    offerJobFinded?.history.push({
                                        title: `Entretien d'embauche réalisé le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}`,
                                        date: new Date(),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                        comment: offerJobComment
                                    });
                                    const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter(
                                        (el) => JSON.stringify(el) !== JSON.stringify(usagerFinded._id)
                                    );
                                    Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                                    const newArrayFromUsager = usagerFinded.offerJobReceived.filter(
                                        (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded._id)
                                    );
                                    Object(usagerFinded).offerJobReceived = newArrayFromUsager;
                                    if (usagerInterested === false && entrepriseInterested === true) {
                                        jobInterview.status = `refus de l'usager après l'entretien d'embauche`;
                                        offerJobFinded.history.push({
                                            title: `refus de l'usager après l'entretien d'embauche`,
                                            date: new Date(dateOfAppointment),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerFinded._id,
                                            comment: offerJobComment
                                        });
                                        await jobInterview.save();
                                        await usagerFinded.save();
                                        await offerJobFinded.save();
                                        updateJobInterviewForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(utilisateurFinded._id),
                                            Object(jobInterview.usager),
                                            Object(jobInterview.entreprise)
                                        );
                                        return res.status(200).json({
                                            message: 'The USAGER is no longer interested'
                                        });
                                    } else if (usagerInterested === true && entrepriseInterested === false) {
                                        jobInterview.status = `refus de l'entreprise après l'entretien d'embauche`;
                                        offerJobFinded.history.push({
                                            title: `refus de l'entreprise après l'entretien d'embauche`,
                                            date: new Date(dateOfAppointment),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerFinded._id,
                                            comment: offerJobComment
                                        });
                                        await jobInterview.save();
                                        await usagerFinded.save();
                                        await offerJobFinded.save();
                                        updateJobInterviewForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(utilisateurFinded._id),
                                            Object(jobInterview.usager),
                                            Object(jobInterview.entreprise)
                                        );
                                        return res.status(200).json({
                                            message: 'The ENTREPRISE is no longer interested'
                                        });
                                    } else {
                                        //* Si les 2 partis ne sont pas d'accord
                                        jobInterview.status = `refus des 2 parties après l'entretien d'embauche`;
                                        offerJobFinded.history.push({
                                            title: `refus des 2 parties après l'entretien d'embauche`,
                                            date: new Date(dateOfAppointment),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerFinded._id,
                                            comment: offerJobComment
                                        });
                                        await jobInterview.save();
                                        await usagerFinded.save();
                                        await offerJobFinded.save();
                                        updateJobInterviewForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(utilisateurFinded._id),
                                            Object(jobInterview.usager),
                                            Object(jobInterview.entreprise)
                                        );
                                        return res.status(200).json({
                                            message:
                                                'The job interview and the offer job has been updated because no one of them is no longer interested'
                                        });
                                    }
                                }
                            }
                        }
                    } else {
                        return res.status(404).json({ message: 'Nothing has been updated' });
                    }
                }
            }
        }
    } catch (error) {
        console.error({ message: 'Error catched', error: error });
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

const deleteJobInterview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // On peut annuler l'EE mais l'OE reste disponible

        const jobInterviewFinded = await JobInterview.findById(req.params.jobInterviewId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(jobInterviewFinded?.usager);
        const { usagerInterested, entrepriseInterested, usagerComment, entrepriseComment, offerJobComment, offerJobAlreadyTaken, dateOfCancel } =
            req.body;

        if (!jobInterviewFinded || !utilisateurFinded) {
            Retour.error({ error: ' The requester or the job intervew has been not found' });
            return res.status(403).json({ error: 'The requester or the job intervew has been not found' });
        } else {
            const offerJobFinded = await OfferJob.findOne({
                jobInterviews: jobInterviewFinded._id
            });
            const workStationFinded = await WorkStation.findOne({ offerJobs: offerJobFinded?._id });

            if (typeof jobInterviewFinded.usagerInterested === 'boolean' || typeof jobInterviewFinded.entrepriseInterested === 'boolean') {
                /**========================================================================
                 **                           SI LE RDV A DEJA EU LIEUX
                 *========================================================================**/
                Retour.error({ error: ' This job interview has been already passed' });
                return res.status(403).json({ error: 'This job interview has been already passed' });
            } else {
                /**========================================================================
                 **                           SI LE RDV N'A PAS ENCORE EU LIEUX
                 *========================================================================**/
                if (
                    jobInterviewFinded.status.includes("Entretien d'embauche annulé") === true ||
                    jobInterviewFinded.status.includes("Offre déja pourvu par l'entreprise le") === true
                ) {
                    return res.status(403).json({ message: "this job interview has been already 'deleted' " });
                } else {
                    let whoCancel = '';
                    if (usagerInterested === false && entrepriseInterested === true) {
                        whoCancel = "l'usager";
                    } else if (entrepriseInterested === false && usagerInterested === true) {
                        whoCancel = "l'entreprise";
                    } else {
                        whoCancel = 'les 2 parties';
                    }
                    if (typeof usagerInterested === 'boolean' && typeof entrepriseInterested === 'boolean' && whoCancel !== '') {
                        jobInterviewFinded.status = `Entretien d'embauche annulé par ${whoCancel} le ${new Date(dateOfCancel).toLocaleDateString(
                            'fr-FR',
                            {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            }
                        )}`;
                        usagerComment &&
                            jobInterviewFinded.usagerComment.push({
                                date: new Date(dateOfCancel),
                                comment: usagerComment
                            });
                        entrepriseComment &&
                            jobInterviewFinded.entrepriseComment.push({
                                date: new Date(dateOfCancel),
                                comment: entrepriseComment
                            });
                        if (typeof offerJobAlreadyTaken !== 'boolean') {
                            Retour.error({ error: 'offerJobAlreadyTaken is required' });
                            return res.status(500).json({ error: 'offerJobAlreadyTaken is required' });
                        } else {
                            /**========================================================================
                             **   ON VERIFIE SI L'OFFRE EST TOUJOURS D'ACTUALITÉ
                             *========================================================================**/
                            if (offerJobAlreadyTaken === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                Object(offerJobFinded).history.push({
                                    title: `Entretien d'embauche annulé par ${whoCancel} le ${new Date(dateOfCancel).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                    comment: offerJobComment
                                });
                                const newArray = Object(offerJobFinded).usagerPositioned.filter(
                                    (el: string) => JSON.stringify(el) !== JSON.stringify(usagerFinded?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArray;
                                updateOfferJobForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded._id));
                                deleteJobInterviewForExtracting(
                                    Object(utilisateurFinded.datas[0].mounths[0]),
                                    Object(utilisateurFinded._id),
                                    Object(jobInterviewFinded.usager),
                                    Object(jobInterviewFinded.entreprise)
                                );
                                await jobInterviewFinded.save();
                                await offerJobFinded?.save();
                                return res.status(200).json({
                                    error: "The job intervew and the offer job has been updated and the status is 'Disponible"
                                });
                            } else {
                                Object(offerJobFinded).status = `Offre déja pourvu par l'entreprise le ${new Date(
                                    dateOfCancel && dateOfCancel
                                ).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}`;
                                Object(offerJobFinded).history.push({
                                    title: `Offre déja pourvu par l'entreprise le ${new Date(dateOfCancel && dateOfCancel).toLocaleDateString(
                                        'fr-FR',
                                        {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        }
                                    )}`,
                                    date: new Date(),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: `${usagerFinded?.account.firstname} ${usagerFinded?.account.name}`,
                                    comment: offerJobComment
                                });
                                const newArray = Object(offerJobFinded).usagerPositioned.filter(
                                    (el: string) => JSON.stringify(el) !== JSON.stringify(Object(usagerFinded)._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArray;

                                const newArrayAboutWorkStation = Object(workStationFinded).offerJobs.filter(
                                    (el: string) => JSON.stringify(el) !== JSON.stringify(Object(offerJobFinded)._id)
                                );
                                Object(workStationFinded).offerJobs = newArrayAboutWorkStation;
                                Object(workStationFinded).offerJobArchiveds.push(offerJobFinded);
                                const archived = await axios.post(`${config.mongooseUrlArchived}/offerJob/create`, {
                                    _id: Object(offerJobFinded)._id,
                                    contractType: Object(offerJobFinded).contractType,
                                    numberHoursPerWeek: Object(offerJobFinded).numberHoursPerWeek,
                                    createdBy: Object(offerJobFinded).createdBy,
                                    offerName: Object(offerJobFinded).offerName,
                                    salary: Object(offerJobFinded).salary,
                                    hasBeenTakenByOurServices: offerJobAlreadyTaken,
                                    status: `Offre déja pourvu par l'entreprise le ${new Date(dateOfCancel && dateOfCancel).toLocaleDateString(
                                        'fr-FR',
                                        {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        }
                                    )}`,
                                    history: Object(offerJobFinded).history,
                                    usagerPositioned: null,
                                    usagerAcceptedByEntreprise: Object(offerJobFinded).usagerAcceptedByEntreprise,
                                    usagerRefusedByEntreprise: Object(offerJobFinded).usagerRefusedByEntreprise,
                                    usagerWhoAcceptedTheOfferJob: Object(offerJobFinded).usagerWhoAcceptedTheOfferJob,
                                    usagerWhoRefusedTheOfferJob: Object(offerJobFinded).usagerWhoRefusedTheOfferJob,
                                    jobInterviews: Object(offerJobFinded).jobInterviews,
                                    decouvertes: Object(offerJobFinded).decouvertes,
                                    employmentContracts: Object(offerJobFinded).employmentContracts
                                });
                                if (archived.data.message === 'the offer job has been archived') {
                                    await jobInterviewFinded.save();
                                    await workStationFinded?.save();
                                    await offerJobFinded?.deleteOne();
                                    deleteOfferJobForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(utilisateurFinded)._id);
                                    deleteJobInterviewForExtracting(
                                        Object(utilisateurFinded.datas[0].mounths[0]),
                                        Object(utilisateurFinded)._id,
                                        Object(jobInterviewFinded).usager,
                                        Object(jobInterviewFinded).entreprise
                                    );
                                    Retour.info('The job intervew and the offer job has been deleted');
                                    return res.status(200).json('The job intervew and the offer job has been deleted');
                                } else {
                                    Retour.warn('Something went wrong in archives');
                                    return res.status(400).json('Something went wrong in archives');
                                }
                            }
                        }
                    } else {
                        Retour.error({
                            error: 'usagerInterested and entrepriseInterested is required'
                        });
                        return res.status(500).json({
                            error: 'usagerInterested and entrepriseInterested is required'
                        });
                    }
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'Error catrched', error: error });
        return res.status(500).json({ message: 'Error catrched', error: error });
    }
};

export default { createJobInterview, readJobInterview, updateJobInterview, deleteJobInterview };
