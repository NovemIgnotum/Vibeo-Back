import { NextFunction, Request, Response } from 'express';

// Models
import IntermediateOfferJob from '../models/IntermediateOfferJob';
import Utilisateur from '../models/Utilisateur';
import Interlocutor from '../models/Interlocutor';
import Usager from '../models/Usager';
import Partenaire from '../models/Partenaire';
import Mission from '../models/Mission';
import Entreprise from '../models/Entreprise';
import JobInterview from '../models/JobInterview';
import Decouverte from '../models/Decouverte';
import EmploymentContract from '../models/EmploymentContract';

// Functions
import {
    createIntermediateOfferJobForExtracting,
    readIntermediateOfferJobForExtracting,
    updateIntermediateOfferJobForExtracting,
    deleteIntermediateOfferJobForExtracting
} from '../functions/IntermediateOfferJobData';
import { createJobInterviewForExtracting } from '../functions/JobInterview';
import { UpdateIntermediateOfferJobIn24h } from '../functions/UpdateIntermediateOfferJobAtTime';

// Library
import Retour from '../library/Response';
import SmsSended from '../library/SendSms';
import { createDecouverteForExtracting } from '../functions/DecouverteData';
import { createEmploymentContractForExtracting } from '../functions/EmploymentContract';
import config from '../config/config';
import axios from 'axios';

const createIntermediateOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contractType, numberHoursPerWeek, offerName, salary, isFromAnEvent } = req.body;
        const missionFinded = await Mission.findById(req.params.missionId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const usagerFinded = await Usager.findById(req.body.usagerId);

        if (!missionFinded || !utilisateurFinded) {
            Retour.error('The utilisateur or the entreprise has been not found');
            return res.status(404).json({ error: 'The utilisateur or the entreprise has been not found' });
        } else {
            if (!contractType || !numberHoursPerWeek || !salary || !isFromAnEvent) {
                Retour.warn('One or more values are missing');
                return res.status(405).json({ error: 'One or more values are missing' });
            } else {
                const intermediateOfferJob = new IntermediateOfferJob({
                    contractType,
                    isFromAnEvent,
                    numberHoursPerWeek,
                    createdBy: Object(utilisateurFinded?._id),
                    offerName: offerName ? offerName : missionFinded.workname,
                    salary,
                    history: {
                        title: "Création de l'offre intermédiaire",
                        date: new Date().setHours(new Date().getHours() + 1),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        comment: req.body.comment
                    },
                    status: usagerFinded
                        ? `Offre intermédaire soumise le ${new Date().toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric'
                          })}`
                        : 'Disponible'
                });

                usagerFinded && usagerFinded.intermediateOfferJobReceived.push(Object(intermediateOfferJob._id));
                usagerFinded && intermediateOfferJob.usagerPositioned.push(Object(usagerFinded));
                usagerFinded &&
                    intermediateOfferJob.history.push({
                        title: 'Offre intermédaire soumise',
                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                        for: usagerFinded._id,
                        comment: req.body.comment
                    });
                usagerFinded ? (intermediateOfferJob.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1))) : null;
                usagerFinded ? (intermediateOfferJob.offerBlockedAutomaticaly = true) : (intermediateOfferJob.offerBlockedAutomaticaly = false);
                usagerFinded && UpdateIntermediateOfferJobIn24h(intermediateOfferJob._id);
                missionFinded.intermediateOfferJob.push(Object(intermediateOfferJob._id));
                createIntermediateOfferJobForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(intermediateOfferJob._id));
                await intermediateOfferJob.save();
                usagerFinded && (await usagerFinded.save());
                await missionFinded.save();
                Retour.info('the intermediate offer job has been created');
                return res.status(201).json({ message: 'the intermediate offer job has been created' });
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error('error catched');
        return res.status(500).json({ message: 'error catched', error: error });
    }
};

const readIntermediateOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const intermediateOfferJobId = req.params.intermediateOfferJobId;
        const offerJobFinded = await IntermediateOfferJob.findById(intermediateOfferJobId);
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const partenaireFinded = await Partenaire.findById(req.headers.requesterid);
        const usagerFinded = await Usager.findById(req.headers.requesterid);
        const interlocutorFinded = await Interlocutor.findById(req.headers.requesterid);

        if (!offerJobFinded) {
            Retour.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        } else {
            if (!utilisateurFinded && !partenaireFinded && !usagerFinded && !interlocutorFinded) {
                Retour.error('The requester has been not found');
                return res.status(404).json({ error: 'The requester has been not found' });
            } else {
                const creatorFinded = await Utilisateur.findById(offerJobFinded?.createdBy).select('account');
                offerJobFinded.history.push({
                    title: "Consultation de l'offre",
                    date: new Date(),
                    by:
                        (utilisateurFinded && utilisateurFinded._id) ||
                        (partenaireFinded && partenaireFinded._id) ||
                        (usagerFinded && usagerFinded._id) ||
                        (interlocutorFinded && interlocutorFinded._id),
                    for: '',
                    comment: req.body.comment
                });
                await offerJobFinded.save();
                Object(offerJobFinded).createdBy = creatorFinded;

                utilisateurFinded &&
                    readIntermediateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(intermediateOfferJobId));
                partenaireFinded &&
                    readIntermediateOfferJobForExtracting(Object(partenaireFinded?.datas[0].mounths[0]), Object(intermediateOfferJobId));
                usagerFinded && readIntermediateOfferJobForExtracting(Object(usagerFinded?.datas[0].mounths[0]), Object(intermediateOfferJobId));
                interlocutorFinded &&
                    readIntermediateOfferJobForExtracting(Object(interlocutorFinded?.datas[0].mounths[0]), Object(intermediateOfferJobId));
                Retour.info('An offer job has been created');
                return res.status(200).json({ message: 'The offer job has been found', offerJob: offerJobFinded });
            }
        }
    } catch (error) {
        console.error({ message: 'error catched', error: error });
        Retour.error(`${error}`);
        return res.status(500).json({ message: 'error catched', error: error });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    return Mission.findOne({ _id: req.params.missionId })
        .populate('intermediateOfferJob')
        .then((workStation) => res.status(200).json({ count: workStation?.intermediateOfferJob.length, workStation: workStation }))
        .catch((error) => res.status(500).json({ error: error.message }));
};

const updateIntermediateOfferJob = (req: Request, res: Response, next: NextFunction) => {
    const intermediateOfferJobId = req.params.intermediateOfferJobId;
    return IntermediateOfferJob.findById(intermediateOfferJobId).then(async (offerJob) => {
        if (!offerJob) {
            return res.status(404).json({ message: 'Not found' });
        } else {
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                offerJob.set(req.body);
                offerJob.history.push({
                    title: "Modification de l'offre",
                    date: new Date(),
                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                    for: '',
                    comment: req.body.comment
                });
                return offerJob
                    .save()
                    .then((offerJob) => res.status(201).json({ offerJob: offerJob }))
                    .finally(() => {
                        updateIntermediateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(offerJob._id));
                    })
                    .catch((error) => {
                        Retour.error(`${error}`), res.status(500).json({ error: error.message });
                    });
            }
        }
    });
};

const deleteIntermediateOfferJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const offerFinded = await IntermediateOfferJob.findById(req.params.intermediateOfferJobId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const missionFinded = await Mission.findOne({
            intermediateOfferJob: req.params.intermediateOfferJobId
        }).select('intermediateOfferJob offerJobArchiveds');

        if (!offerFinded || !utilisateurFinded) {
            Retour.error(`'the offer job or utilisateur has been not found'`);
            return res.status(404).json({ error: 'the offer job or utilisateur has been not found' });
        } else {
            const { hasBeenTakenByOurServices, dateAboutIntermediateOfferJobAlreadyTaken, offerJobComment } = req.body;
            if (!hasBeenTakenByOurServices) {
                return res.status(404).json({ error: "the hasBeenTakenByOurServices's value has been not found" });
            } else {
                if (offerFinded.usagerPositioned.length >= 1) {
                    return res.status(404).json({ error: 'An usager is positioned on offer job' });
                } else {
                    const archived = await axios.post(`${config.mongooseUrlArchived}/intermediateofferJob/create`, {
                        _id: offerFinded._id,
                        contractType: offerFinded.contractType,
                        numberHoursPerWeek: offerFinded.numberHoursPerWeek,
                        createdBy: offerFinded.createdBy,
                        offerName: offerFinded.offerName,
                        salary: Object(offerFinded).salary,
                        hasBeenTakenByOurServices,
                        status: `Offre déja pourvu par l'entreprise le ${new Date(
                            dateAboutIntermediateOfferJobAlreadyTaken && dateAboutIntermediateOfferJobAlreadyTaken
                        ).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}`,
                        history: offerFinded.history,
                        usagerPositioned: hasBeenTakenByOurServices === true ? offerFinded.usagerPositioned : null,
                        usagerAcceptedByEntreprise: Object(offerFinded).usagerAcceptedByEntreprise,
                        usagerRefusedByEntreprise: Object(offerFinded).usagerRefusedByEntreprise,
                        usagerWhoAcceptedTheIntermediateOfferJob: Object(offerFinded).usagerWhoAcceptedTheIntermediateOfferJob,
                        usagerWhoRefusedTheIntermediateOfferJob: Object(offerFinded).usagerWhoRefusedTheIntermediateOfferJob,
                        jobInterviews: Object(offerFinded).jobInterviews,
                        decouvertes: Object(offerFinded).decouvertes,
                        employmentContracts: Object(offerFinded).employmentContracts
                    });
                    if (archived.data.message === 'the intermediate offer job has been archived') {
                        const newArray = missionFinded?.intermediateOfferJob.filter((el) => JSON.stringify(el) !== JSON.stringify(offerFinded._id));
                        Object(missionFinded).intermediateOfferJob = newArray;
                        missionFinded?.intermediateOfferJobArchiveds.push(Object(offerFinded._id));
                        await missionFinded?.save();
                        deleteIntermediateOfferJobForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), offerFinded._id);
                        await offerFinded.deleteOne();
                        Retour.info('The offer job has been archived');
                        return res.status(200).json({ message: 'The offer job has been archived' });
                    } else {
                        Retour.warn('Something went wrong in archives');
                        return res.status(200).json({ message: 'Something went wrong in archives' });
                    }
                }
            }
        }
    } catch (error) {
        console.error({ error: error });
        Retour.error(`${error}`);
        return res.status(500).json({ error: error });
    }
};

const intermediateOfferJobProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            requesterId,
            nameOfCompany,
            usagerIsInterested,
            entrepriseIsInterested,
            usagerId,
            comment,
            dateOfJobInterview,
            startingDateOfDecouverte,
            endingDateOfDecouverte,
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

        const offerJobFinded = await IntermediateOfferJob.findById(req.params.intermediateOfferJobId);
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        const usagerFindedForPositioning = await Usager.findById(usagerId);
        const missionFinded = await Mission.findOne({ intermediateOfferJob: offerJobFinded?._id });
        const entrepriseFinded = await Entreprise.findOne({ workStations: missionFinded?._id });

        // Usager(e) positionné(e) trouvé(e) à partir de l'offre
        const usagerPositionnedFoundByIntermediateOfferJobTab = await Usager.findOne({
            intermediateOfferJobReceived: req.params.intermediateOfferJobId
        }).select('intermediateOfferJobReceived offerJobAccepted offerJobDenied jobInterviews decouvertes employmentContracts');
        // Usager qui intéragi avec l'offre
        const usagerFinded = await Usager.findById(requesterId);

        if (!offerJobFinded) {
            Retour.error('The offer job has been not found');
            return res.status(404).json({ error: 'The offer job has been not found' });
        } else {
            if (
                offerJobFinded.status.includes("Usager(e) accepté(e) par l'entreprise") === true ||
                offerJobFinded.status.includes("Entretien d'embauche prévu") === true
            ) {
                Retour.error(`The entreprise and the Usager(e) are already agree, please process next step`);
                return res.status(500).json({
                    message: 'The entreprise and the Usager(e) are already agree, please process next step'
                });
            } else {
                /**========================================================================
                 **                            SECTION UTILISATEUR
                 *========================================================================**/
                if (utilisateurFinded) {
                    // Si c'est un Utilisateur qui traite l'offre
                    // SI un Usager est deja positionnée sur l'offre d'emploi
                    if (!usagerPositionnedFoundByIntermediateOfferJobTab) {
                        //*------------------------------------------------------- (ETAPE 1) Afin de soumettre l'offre à un(e) Usager(e) -------------------------------------------------------*/
                        if (usagerFindedForPositioning) {
                            offerJobFinded.usagerPositioned = Object(usagerFindedForPositioning);
                            offerJobFinded.status = `Offre soumise le ${new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}`;
                            offerJobFinded.history.push({
                                title: 'Offre soumise',
                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                for: usagerFindedForPositioning._id,
                                comment: comment
                            });
                            offerJobFinded.offerBlockedAutomaticaly = true;
                            offerJobFinded.offerBlockedUntilDate = new Date(new Date().setDate(new Date().getDate() + 1));
                            UpdateIntermediateOfferJobIn24h(offerJobFinded._id);
                            usagerFindedForPositioning.intermediateOfferJobReceived.push(Object(offerJobFinded));
                            await offerJobFinded.save();
                            await usagerFindedForPositioning.save();
                            SmsSended("Bonjour, Nous avons une offre d'emploi à vous proposer", Object(usagerFindedForPositioning)._id);
                            if (!nameOfCompany) {
                                Retour.info('nameOfCompany is required');
                                return res.status(200).json({ message: 'nameOfCompany is required' });
                            } else {
                                return res.status(200).json({ message: 'Offer job submited' });
                            }
                        } else {
                            Retour.info('Offer job has been not submited');
                            return res.status(200).json({ message: 'Offer job has been not submited' });
                        }
                    } else {
                        if (
                            offerJobFinded.status.includes("Offre réservée par l'usager(e)") === true ||
                            offerJobFinded.status.includes('Offre soumise le') === true
                        ) {
                            //*------------------------------------------------------- (ETAPE 2) afin d'attribuer une date de rdv -------------------------------------------------------*/
                            const dateOfAppointment = req.body.dateOfAppointment;

                            if (dateOfAppointment !== undefined) {
                                Object(offerJobFinded).status = `Proposition prévue le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}`;

                                offerJobFinded.history.push({
                                    title: `Proposition prévue le ${new Date(dateOfAppointment).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}`,
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                    comment: req.body.comment
                                });
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.usagerWhoAcceptedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                await offerJobFinded.save();
                                Retour.info('the date of the appointment has been submitted');
                                return res.status(200).json({ message: 'the date of the appointment has been submitted' });
                            } else if (usagerIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre refusée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByIntermediateOfferJobTab?.offerJobDenied.push(Object(offerJobFinded));
                                await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                await offerJobFinded.save();
                                SmsSended(
                                    "nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible",
                                    usagerPositionnedFoundByIntermediateOfferJobTab?._id
                                );
                                Retour.warn('The usager is not interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is not interested about this offer job'
                                });
                            } else {
                                Retour.error("the date of the appointment or 'usagerIsInterested: false' is missing");
                                return res.status(400).json({
                                    message: "the date of the appointment or 'usagerIsInterested: false' is missing"
                                });
                            }
                            //*------------------------------------------------------- (ETAPE 3) Proposition de l'offre d'emploi à l'usager -------------------------------------------------------*/
                        } else if (offerJobFinded.status.includes('Proposition prévue le') === true) {
                            if (usagerIsInterested === true) {
                                // Si L'Utilisateur(ice) interagi(e) sur l'offre et que l'Usager est intéressé(e)
                                Object(offerJobFinded).status = "Proposition à l'entreprise";
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre acceptée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                usagerPositionnedFoundByIntermediateOfferJobTab.offerJobAccepted.push(Object(offerJobFinded));
                                await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                await offerJobFinded.save();
                                SmsSended(
                                    "l'offre d'emlpoi n°12345678 vous a été réservé nous reviendrons vers vous des que possible",
                                    usagerPositionnedFoundByIntermediateOfferJobTab?._id
                                );
                                Retour.info('The usager is interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is interested about this offer job'
                                });
                            } else if (usagerIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Offre refusée par l'Usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                usagerPositionnedFoundByIntermediateOfferJobTab?.offerJobDenied.push(Object(offerJobFinded));
                                await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                await offerJobFinded.save();
                                SmsSended(
                                    "nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible",
                                    usagerPositionnedFoundByIntermediateOfferJobTab?._id
                                );
                                Retour.warn('The usager is not interested about this offer job');
                                return res.status(200).json({
                                    message: 'The usager is not interested about this offer job'
                                });
                            } else {
                                Retour.error('usagerIsInterested for Utilisateur is missing');
                                return res.status(401).json({
                                    error: "'usagerIsInterested' about etape 3 is missing"
                                });
                            }
                            //*------------------------------------------------------- (ETAPE 4) Afin de donner une reponse favorable de l'entreprise -------------------------------------------------------*/
                        } else if (offerJobFinded.status.includes("Proposition à l'entreprise") === true) {
                            if (entrepriseIsInterested === true) {
                                if (usagerIsInterested === true) {
                                    /**============================================
                                     **               SECTION ENTRETIEN D'EMBAUCHE
                                     *=============================================**/
                                    if (dateOfJobInterview !== undefined) {
                                        offerJobFinded.status = `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString(
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
                                        offerJobFinded.history.push({
                                            title: `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`,
                                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab._id));
                                        const newJobInterview = new JobInterview({
                                            datePlanned: dateOfJobInterview,
                                            status: `Entretien d'embauche prévu le ${new Date(dateOfJobInterview).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric'
                                            })}`,
                                            usager: Object(usagerPositionnedFoundByIntermediateOfferJobTab._id),
                                            entreprise: Object(entrepriseFinded?._id)
                                        });
                                        offerJobFinded.jobInterviews.push(Object(newJobInterview));
                                        usagerPositionnedFoundByIntermediateOfferJobTab.jobInterviews.push(Object(newJobInterview));
                                        await offerJobFinded.save();
                                        await newJobInterview.save();
                                        await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                        createJobInterviewForExtracting(
                                            Object(utilisateurFinded.datas[0].mounths[0]),
                                            Object(offerJobFinded._id),
                                            Object(usagerPositionnedFoundByIntermediateOfferJobTab._id),
                                            Object(entrepriseFinded?._id)
                                        );
                                        Retour.info('The entreprise are interested and would like a job intervew');
                                        return res.status(200).json({
                                            message: 'The entreprise are interested and would like a job intervew'
                                        });
                                    } else if (startingDateOfDecouverte !== undefined || endingDateOfDecouverte !== undefined) {
                                        /**============================================
                                         **               SECTION DÉCOUVERTE
                                         *=============================================**/
                                        if (startingDateOfDecouverte !== undefined && endingDateOfDecouverte !== undefined) {
                                            const newDecouverte = new Decouverte({
                                                isFromAnEvent: false,
                                                jobName: offerJobFinded.offerName,
                                                startingDate: startingDateOfDecouverte,
                                                endingDate: endingDateOfDecouverte,
                                                entreprise: Object(entrepriseFinded?._id),
                                                usager: Object(usagerPositionnedFoundByIntermediateOfferJobTab._id)
                                            });
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
                                                for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.decouvertes.push(Object(newDecouverte));
                                            usagerPositionnedFoundByIntermediateOfferJobTab.decouvertes.push(Object(newDecouverte));
                                            await newDecouverte.save();
                                            await offerJobFinded.save();
                                            await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                            createDecouverteForExtracting(
                                                Object(utilisateurFinded.datas[0].mounths[0]),
                                                Object(newDecouverte._id),
                                                Object(usagerPositionnedFoundByIntermediateOfferJobTab.id),
                                                Object(entrepriseFinded?._id)
                                            );
                                            Retour.info('entreprise are interested about a decouverte');
                                            return res.status(200).json({
                                                message: 'entreprise are interested about a decouverte'
                                            });
                                        } else {
                                            Retour.warn("entreprise are interested about a decouverte but starting's or ending's date is missing");
                                            return res.status(200).json({
                                                message: "entreprise are interested about a decouverte but starting's or ending's date is missing"
                                            });
                                        }
                                    } else if (startingDateEmploymentContract !== undefined) {
                                        /**============================================
                                         **               SECTION CONTRAT DE TRAVAIL
                                         *=============================================**/
                                        if (continuityOfThepreviousContract === true && !previousContractId) {
                                            Retour.info('PreviousContractId is missing');
                                            return res.status(200).json({ message: 'PreviousContractId is missing' });
                                        } else {
                                            const newContract = await new EmploymentContract({
                                                contractType: contractType,
                                                workName: offerJobFinded.offerName,
                                                numberOfHour: numberHourPerWeek,
                                                tasksList,
                                                skillsList,
                                                startingDate: startingDateEmploymentContract,
                                                endingDate: endingDateEmploymentContract && endingDateEmploymentContract,
                                                endingTryPeriodeDate,
                                                continuityOfThepreviousContract,
                                                previousContract: previousContractId && Object(previousContractId),
                                                usager: Object(usagerPositionnedFoundByIntermediateOfferJobTab._id),
                                                entreprise: Object(entrepriseFinded)._id
                                            });
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
                                                title: `Démarrage du contrat prevu le ${new Date(startingDateEmploymentContract).toLocaleDateString(
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
                                                date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                                by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                                for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                                comment: req.body.comment
                                            });
                                            offerJobFinded.employmentContracts.push(Object(newContract._id));
                                            usagerPositionnedFoundByIntermediateOfferJobTab.employmentContracts.push(Object(newContract._id));
                                            createEmploymentContractForExtracting(
                                                Object(utilisateurFinded.datas[0].mounths[0]),
                                                Object(newContract._id),
                                                Object(usagerPositionnedFoundByIntermediateOfferJobTab._id),
                                                Object(entrepriseFinded?._id)
                                            );
                                            await newContract.save();
                                            await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                            await offerJobFinded.save();
                                            Retour.info('Employment contract has been created');
                                            return res.status(200).json({
                                                message: 'Employment contract has been created'
                                            });
                                        }
                                    } else {
                                        offerJobFinded.status = `Usager(e) accepté(e) par l'entreprise sans dates définies`;
                                        offerJobFinded.history.push({
                                            title: `Usager(e) accepté(e) par l'entreprise sans dates définies`,
                                            date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                            by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                            for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                            comment: req.body.comment
                                        });
                                        offerJobFinded.usagerAcceptedByEntreprise.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab._id));
                                        await offerJobFinded.save();
                                        Retour.info(
                                            'entreprise is interested but without date of job interview or decouverte or employment contract'
                                        );
                                        return res.status(200).json({
                                            message: 'entreprise is interested but without date of job interview or decouverte or employment contract'
                                        });
                                    }
                                } else if (usagerIsInterested === false) {
                                    // Si l'usager(e) n'est plus intéressé(e) alors qu'il/elle a quand meme été proposé(e) a l'entreprise
                                    offerJobFinded.status = 'Disponible';
                                    offerJobFinded.history.push({
                                        title: `Usager(e) accepté(e) par l'entreprise mais l'usager(e) n'est plus intéressé(e)`,
                                        date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                        by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                        for: usagerPositionnedFoundByIntermediateOfferJobTab._id,
                                        comment: req.body.comment
                                    });
                                    const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter(
                                        (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab?._id)
                                    );
                                    Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                    offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(
                                        Object(usagerPositionnedFoundByIntermediateOfferJobTab)
                                    );
                                    const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter(
                                        (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                    );
                                    Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                    await offerJobFinded.save();
                                    await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                    Retour.info('entreprise is interested but the Usager is not anymore');
                                    return res.status(200).json({
                                        message: 'entreprise is interested but the Usager is not anymore'
                                    });
                                } else {
                                    Retour.error('entreprise is interested but the UsagerIsInterested is missing');
                                    return res.status(400).json({
                                        message: 'entreprise is interested but the UsagerIsInterested is missing'
                                    });
                                }
                                //*------------------------------------------------------- (ETAPE 4) Afin de donner une reponse defavorable de l'entreprise -------------------------------------------------------*/
                            } else if (entrepriseIsInterested === false) {
                                Object(offerJobFinded).status = 'Disponible';
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                offerJobFinded.history.push({
                                    title: "Usager(e) refusé(e) par l'Entreprise",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name}`,
                                    for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                                    comment: req.body.comment
                                });
                                const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab?._id)
                                );
                                Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                                offerJobFinded.usagerRefusedByEntreprise.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                                const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab.intermediateOfferJobReceived.filter(
                                    (el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id)
                                );
                                Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                                await usagerPositionnedFoundByIntermediateOfferJobTab.save();
                                await offerJobFinded.save();
                                Retour.info('entreprise is not interested');
                                return res.status(200).json({ message: 'entreprise is not interested' });
                            } else {
                                Retour.error('entrepriseIsInterested has been not found');
                                return res.status(404).json({ error: 'entrepriseIsInterested has been not found' });
                            }
                        } else {
                            Retour.error('The entreprise and the usager are already agree');
                            return res.status(401).json({ error: 'The entreprise and the usager are already agree' });
                        }
                    }

                    /**========================================================================
                     **                            SECTION USAGER
                     *========================================================================**/
                } else if (usagerFinded) {
                    //*------------------------------------------------------- (ETAPE 1) Si c'est un Usager(e) qui traite l'offre -------------------------------------------------------*/
                    // o-o-o Il peut seulement réserver l'offre pour lui (pour l'instant) o-o-o
                    //
                    // Si l'offre d'emploi lui est réservée
                    if (JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab?._id) === JSON.stringify(usagerFinded?._id)) {
                        // Si le statut de l'offre d'emploi est "en proposition à l'entreprise"
                        // --------- HAUT DE SECTION RRESERVER POUR LA SUITE ------------
                        // if (offerJobFinded.status.includes('Proposé') !== true || offerJobFinded.status.includes('autopositionné') !== true) {
                        //     Retour.error('The process is already started');
                        //     return res.status(401).json({ error: 'The process is already started' });
                        // } else {
                        //     if (usagerIsInterested === true) {
                        //         // Si l'Usagerest intéressé par l'offre d'emploi
                        //         Object(offerJobFinded).status = "Proposition à l'entreprise";
                        //         offerJobFinded.offerBlockedAutomaticaly = false;
                        //         offerJobFinded.history.push({
                        //             title: "Offre acceptée par l'Usager",
                        //             date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        //             by: Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id,
                        //             for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                        //             comment: req.body.comment
                        //         });
                        //         Object(usagerPositionnedFoundByIntermediateOfferJobTab).offerJobAccepted.push(Object(offerJobFinded));
                        //         await Object(usagerPositionnedFoundByIntermediateOfferJobTab).save();
                        //         await offerJobFinded.save();
                        //         SmsSended("l'offre d'emlpoi n°12345678 à bien été acceptée", usagerFinded?._id);
                        //         Retour.info("l'offre d'emlpoi n°12345678 à bien été acceptée");
                        //         return res.status(200).json({ message: "l'offre d'emlpoi n°12345678 à bien été acceptée" });
                        //     } else if (usagerIsInterested === false) {
                        //         // Si l'Usager n'est pas intéréssé par l'offre d'emploi
                        //         Object(offerJobFinded).status = 'Disponible';
                        //         offerJobFinded.offerBlockedAutomaticaly = false;
                        //         offerJobFinded.history.push({
                        //             title: "Offre refusée par l'Usager",
                        //             date: new Date(new Date().setHours(new Date().getHours() + 1)),
                        //             by: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                        //             for: JSON.stringify(Object(usagerPositionnedFoundByIntermediateOfferJobTab)._id),
                        //             comment: req.body.comment
                        //         });
                        //         const newArrayFromIntermediateOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerPositionnedFoundByIntermediateOfferJobTab?._id));
                        //         Object(offerJobFinded).usagerPositioned = newArrayFromIntermediateOfferJob;
                        //         offerJobFinded.usagerWhoRefusedTheIntermediateOfferJob.push(Object(usagerPositionnedFoundByIntermediateOfferJobTab));
                        //         console.log('The usager is not interested about this offer job');
                        //         const newArrayFromUsager = usagerPositionnedFoundByIntermediateOfferJobTab?.intermediateOfferJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id));
                        //         Object(usagerPositionnedFoundByIntermediateOfferJobTab).intermediateOfferJobReceived = newArrayFromUsager;
                        //         usagerPositionnedFoundByIntermediateOfferJobTab?.offerJobDenied.push(Object(offerJobFinded));
                        //         await Object(usagerPositionnedFoundByIntermediateOfferJobTab).save();
                        //         await offerJobFinded.save();
                        //         SmsSended("nous sommes désolé d'apprendre que cette offre ne vous correspond pas, nous reviendrons vers vous des que possible", usagerPositionnedFoundByIntermediateOfferJobTab?._id);
                        //         Retour.info('The usager is not interested about this offer job');
                        //         return res.status(200).json({ message: 'The usager is not interested about this offer job' });
                        //     } else {
                        //         Retour.error('usagerIsInterested for Usager is missing');
                        //         return res.status(401).json({ error: 'usagerIsInterested for Usager is missing' });
                        //     }
                        // }
                        // --------- BAS DE SECTION RRESERVER POUR LA SUITE ------------
                        Retour.error("fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter");
                        return res.status(200).json({
                            message: "fonctionnalité en cours de suggestion afin qu'il puisse lui meme la traiter"
                        });
                    } else {
                        // Si l'offre d'emploi est disponible
                        if (Object(offerJobFinded).usagerPositioned.length !== 0) {
                            Retour.warn("(non autorisé) usager(e) déja positionné(e) sur l'offre");
                            return res.status(401).json({ message: "usager(e) deja positionné(e) sur l'offre" });
                        } else {
                            if (usagerIsInterested === false) {
                                Retour.warn("Usager(e) pas intéressé(e) par l'offre d'emploi");
                                return res.status(400).json({
                                    message: "Usager(e) pas intéressé(e) par l'offre d'emploi"
                                });
                            } else if (usagerIsInterested === true) {
                                offerJobFinded.usagerPositioned.push(Object(usagerFinded));
                                offerJobFinded.status = `Offre réservée par l'usager(e)`;
                                offerJobFinded.history.push({
                                    title: "Offre réservée par l'usager(e)",
                                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                                    by: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                    for: `${usagerFinded.account.firstname} ${usagerFinded.account.name}`,
                                    comment: comment
                                });
                                offerJobFinded.offerBlockedAutomaticaly = false;
                                usagerFinded.intermediateOfferJobReceived.push(Object(offerJobFinded));
                                await offerJobFinded.save();
                                await usagerFinded.save();
                                SmsSended(
                                    "Bonjour, l'ofre N° 123456789 à bien été réservée nous reviendrons vers vous pour plus d'informations",
                                    Object(usagerFinded)._id
                                );
                                Retour.info("Le positionnement a l'offre d'emploi n°12345678 à bien été acceptée");
                                return res.status(200).json({
                                    message: "Le positionnement a l'offre d'emploi n°12345678 à bien été acceptée"
                                });
                            } else {
                                Retour.error("usagerIsInterested pour que l'Usager(e) se positionne is missing");
                                return res.status(404).json({
                                    error: "usagerIsInterested pour que l'Usager(e) se positionne is missing"
                                });
                            }
                        }
                    }
                } else {
                    Retour.error('requester has been not found');
                    return res.status(404).json({ error: 'requester has been not found' });
                }
            }
        }
    } catch (error) {
        console.error({ message: 'Error catched', error: error });
        Retour.error(`Error catched -> ${error}`);
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

export default {
    createIntermediateOfferJob,
    readIntermediateOfferJob,
    readAll,
    updateIntermediateOfferJob,
    deleteIntermediateOfferJob,
    intermediateOfferJobProcess
};
