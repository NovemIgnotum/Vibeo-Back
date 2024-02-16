import { NextFunction, Request, Response } from 'express';

// Models
import Usager from '../models/Usager';
import Utilisateur from '../models/Utilisateur';
import WorkStationsPoleEmploi from '../models/WorkStationsPoleEmploi';
import SkillsAndKnowHow from '../models/SkillsAndKnowHow';

// Library
import Retour from '../library/Response';

import {
    createJobContextForExtracting,
    createKnowsHowForExtracting,
    createSkillsForExtracting,
    deleteKnowsHowForExtracting,
    deleteSkillsForExtracting,
    readSkillsAndKnowHowsForExtracting,
    updateKnowsHowForExtracting,
    updateSkillsForExtracting
} from '../functions/SkillsAndKnowsHow';

const createSkillsForUsager = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requesterId, codeJob, codeSkills, codeKnowHows, codeJobsContext, comment } = req.body;
        // MODELS
        const usagerFinded = await Usager.findById(req.params.usagerId).populate('postAndSkillsAcquired');
        const skillsAndKnowHowFinded = await SkillsAndKnowHow.findById(Object(usagerFinded).postAndSkillsAcquired[0]._id);
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        const workStationPoleEmploiFinded = await WorkStationsPoleEmploi.findOne({ 'jobs.code': codeJob });

        if (!usagerFinded || !utilisateurFinded) {
            Retour.error({ message: 'The Usager or Utilisateur has been not found' });
            return res.status(404).json({ message: 'The Usager or Utilisateur has been not found' });
        } else {
            if (!workStationPoleEmploiFinded) {
                Retour.error({ message: 'The workStation has been not found' });
                return res.status(404).json({ message: 'The workStation has been not found' });
            } else {
                let counterSkills = 0;
                let counterKnowsHow = 0;
                let counterJobsContext = 0;
                // Recherche le metier correspondant dans le tableau workStationPoleEmploiFinded
                const jobFinded = workStationPoleEmploiFinded.jobs.find((el) => JSON.stringify(Object(el).code) === JSON.stringify(codeJob));
                // S'il n'existe pas de tableau de skills alors j'en créée un et je push l'intégralité dans mon model
                /**========================================================================
                 * *                                COMPÉTENCES
                 *========================================================================**/
                codeSkills &&
                    codeSkills.forEach(async (el: object) => {
                        const isPresent = (element: { code: string }) => element.code === Object(el).code;
                        const workStationFiltred = workStationPoleEmploiFinded.skills.filter(
                            (el) => Object(el).competences.findIndex(isPresent) !== -1
                        );
                        const skillsFiltered = Object(workStationFiltred[0]).competences.filter(
                            (element: Object) => Object(element).code === Object(el).code
                        );

                        // Pour la création d'un nouveau model a inclure dans le tableau 'postAndSkillsAcquired' de l'usager
                        const indexFinded = (e: object) =>
                            JSON.stringify(Object(e).code) === JSON.stringify(Object(workStationFiltred[0]).enjeu.code);

                        // Si je trouve la catégorie alors je push la compétences sinon je creer un nouveau tableau
                        if (Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded) === -1) {
                            Object(skillsAndKnowHowFinded).skillsAcquired.push({
                                code: Object(workStationFiltred[0]).enjeu.code,
                                libelle: Object(workStationFiltred[0]).enjeu.libelle,
                                skills: {
                                    code: Object(el).code,
                                    libelleACOR: Object(el).libelleACOR,
                                    libellePoleEmploi: skillsFiltered[0].libelle,
                                    level: Object(el).levelSkill,
                                    fromJob: Object(jobFinded)
                                }
                            });
                        } else {
                            // usager -> tableau des postAndSkillsAcquired -> tableau des skillsAcquired pour l'index trouvé
                            // 1 je verifie si la compétence existe deja dans le tableau trouvé

                            const arrayFiltred = Object(skillsAndKnowHowFinded).skillsAcquired[
                                Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded)
                            ].skills.filter(
                                (elToFiltred: { code: string }) => elToFiltred.code !== undefined && elToFiltred.code !== Object(el).code
                            );

                            // 2 si elle existe alors je la sort du tableau
                            Object(skillsAndKnowHowFinded).skillsAcquired[
                                Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded)
                            ].skills = arrayFiltred;
                            // 3 je push la compétence sélectionné dans le tableau
                            Object(skillsAndKnowHowFinded).skillsAcquired[
                                Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded)
                            ].skills.push({
                                level: Object(el).levelSkill,
                                libellePoleEmploi: JSON.stringify(skillsFiltered[0].libelle),
                                libelleACOR: JSON.stringify(Object(el).libelleACOR),
                                code: Object(el).code,
                                fromJob: Object(jobFinded),
                                comment: comment && [
                                    {
                                        date: new Date(),
                                        comment: comment
                                    }
                                ]
                            });
                        }
                        counterSkills++;
                        createSkillsForExtracting(
                            Object(utilisateurFinded.datas[0].mounths[0]),
                            Object(skillsAndKnowHowFinded)._id,
                            Object(el).code,
                            codeJob
                        );
                        counterSkills === codeSkills.length &&
                            (await Object(skillsAndKnowHowFinded).save(),
                            Retour.info('New skills has been created'),
                            res.status(201).json({ message: 'SkillsAndKnowHow has been addeds', skillsAndKnowHowFinded }));
                    });
                /**========================================================================
                 * *                                SAVOIRS FAIRE
                 *========================================================================**/
                codeKnowHows &&
                    codeKnowHows.forEach(async (el: object) => {
                        const isPresent = (element: { code: string }) => element.code === Object(el).code;
                        const workStationFiltred = workStationPoleEmploiFinded.KnowHow.filter((el) => Object(el).savoirs.findIndex(isPresent) !== -1);
                        const skillsFiltered = Object(workStationFiltred[0]).savoirs.filter(
                            (element: Object) => Object(element).code === Object(el).code
                        );
                        counterKnowsHow++;
                        // Pour la création d'un nouveau model a inclure dans le tableau 'postAndSkillsAcquired' de l'usager
                        const indexFinded = (e: object) =>
                            JSON.stringify(Object(e).code) === JSON.stringify(Object(workStationFiltred[0]).categorieSavoirs.code);

                        if (Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded) === -1) {
                            Object(skillsAndKnowHowFinded).knowHowsAcquired.push({
                                code: Object(workStationFiltred[0]).categorieSavoirs.code,
                                libelle: Object(workStationFiltred[0]).categorieSavoirs.libelle,
                                knowHows: {
                                    level: Object(el).levelSkill,
                                    libellePoleEmploi: JSON.stringify(skillsFiltered[0].libelle),
                                    libelleACOR: JSON.stringify(Object(el).libelleACOR),
                                    code: Object(el).code,
                                    fromJob: Object(jobFinded),
                                    comment: comment && [
                                        {
                                            date: new Date(),
                                            comment: comment
                                        }
                                    ]
                                }
                            });
                        } else {
                            // usager -> tableau des postAndknowHowsAcquired -> tableau des knowHowsAcquired pour l'index trouvé
                            // 1 je verifie si la compétence existe deja dans le tableau trouvé

                            const arrayFiltred = Object(skillsAndKnowHowFinded).knowHowsAcquired[
                                Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded)
                            ].knowHows.filter(
                                (elToFiltred: { code: string }) => elToFiltred.code !== undefined && elToFiltred.code !== Object(el).code
                            );

                            // 2 si elle existe alors je la sort du tableau
                            Object(skillsAndKnowHowFinded).knowHowsAcquired[
                                Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded)
                            ].knowHows = arrayFiltred;
                            // 3 je push la compétence sélectionné dans le tableau
                            Object(skillsAndKnowHowFinded).knowHowsAcquired[
                                Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded)
                            ].knowHows.push({
                                level: Object(el).levelSkill,
                                libellePoleEmploi: JSON.stringify(skillsFiltered[0].libelle),
                                libelleACOR: JSON.stringify(Object(el).libelleACOR),
                                code: Object(el).code,
                                fromJob: Object(jobFinded),
                                comment: comment && [
                                    {
                                        date: new Date(),
                                        comment: comment
                                    }
                                ]
                            });
                        }
                        createKnowsHowForExtracting(
                            Object(utilisateurFinded.datas[0].mounths[0]),
                            Object(skillsAndKnowHowFinded)._id,
                            JSON.stringify(Object(el).code),
                            codeJob
                        );
                        counterKnowsHow === codeKnowHows.length &&
                            (await Object(skillsAndKnowHowFinded).save(),
                            Retour.info('New knows How has been created'),
                            res.status(201).json({ message: 'SkillsAndKnowHow has been addeds', skillsAndKnowHowFinded }));
                    });
                /**========================================================================
                 * *                                CONTEXTE D'EMPLOIS
                 *========================================================================**/
                codeJobsContext &&
                    codeJobsContext.forEach(async (el: object) => {
                        const jobContextFiltred = workStationPoleEmploiFinded.jobContext.filter(
                            (element) => JSON.stringify(Object(el).code) === JSON.stringify(Object(element).code)
                        );
                        counterJobsContext++;
                        // Pour la création d'un nouveau model a inclure dans le tableau 'postAndSkillsAcquired' de l'usager
                        const indexFinded = (e: object) => JSON.stringify(Object(e).code) === JSON.stringify(Object(jobContextFiltred[0]).code);
                        if (Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded) === -1) {
                            Object(skillsAndKnowHowFinded).jobContextAcquired.push({
                                code: Object(jobContextFiltred[0]).code,
                                libelle: Object(jobContextFiltred[0]).libelle,
                                level: Object(el).levelSkill,
                                categorie: Object(jobContextFiltred[0]).categorie,
                                comments: [
                                    {
                                        date: new Date(),
                                        comment: Object(el).comment
                                    }
                                ]
                            });
                        } else {
                            if (
                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].level !== Object(el).levelSkill
                            ) {
                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].code = Object(jobContextFiltred[0]).code;

                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].libelle = Object(jobContextFiltred[0]).libelle;

                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].previousLevel.push({
                                    level: Object(skillsAndKnowHowFinded).jobContextAcquired[
                                        Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                    ].level,
                                    dateUpdated: new Date()
                                });

                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].level = Object(el).levelSkill;

                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].categorie = Object(jobContextFiltred[0]).categorie;

                                Object(skillsAndKnowHowFinded).jobContextAcquired[
                                    Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)
                                ].comments.push({ comment: Object(el).comment, date: new Date() });
                            }
                        }

                        createJobContextForExtracting(
                            Object(utilisateurFinded.datas[0].mounths[0]),
                            Object(skillsAndKnowHowFinded)._id,
                            JSON.stringify(Object(el).code),
                            codeJob
                        );
                        counterJobsContext === codeJobsContext.length &&
                            (await Object(skillsAndKnowHowFinded).save(),
                            Retour.info('New knows How has been created'),
                            res.status(201).json({ message: 'SkillsAndKnowHow has been addeds', skillsAndKnowHowFinded }));
                    });
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};
const readSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerFinded = await Usager.findById(req.params.usagerId).populate('postAndSkillsAcquired');
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Retour.error('Requester has been not found');
            return res.status(404).json('Requester has been not found');
        } else {
            if (!usagerFinded) {
                Retour.error('Usager has been not found');
                return res.status(404).json('Usager has been not found');
            } else {
                readSkillsAndKnowHowsForExtracting(
                    Object(utilisateurFinded.datas[0].mounths[0]),
                    Object(usagerFinded.postAndSkillsAcquired[0])._id,
                    //*  Problem with the compiler
                    Object('code'),
                    Object('codeJob')
                    //*  Problem with the compiler
                );
                return res.status(200).json({
                    skills: Object(usagerFinded).postAndSkillsAcquired[0].skillsAcquired,
                    knowHows: Object(usagerFinded).postAndSkillsAcquired[0].knowHowsAcquired,
                    jobContexts: Object(usagerFinded).postAndSkillsAcquired[0].jobContextAcquired
                });
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return WorkStationsPoleEmploi.find()
        .then((skills) => res.status(200).json({ count: skills.length, skills }))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const skillsAndKnowHow = await SkillsAndKnowHow.findById(req.params.skillsAndKnowHowsId);
        if (!skillsAndKnowHow) {
            Retour.error('Skills and KnowHows has been not found');
            return res.status(404).json('Skills and KnowHows has been not found');
        } else {
            const { codeSkillToUpdate, codeKnowHowToUpdate } = req.body;
            const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                Retour.warn('requester has been not found');
                return res.status(404).json({ message: 'requester has been not found' });
            } else {
                if (codeSkillToUpdate) {
                    // Recherche l'index du savoir faire dans le model SkillsAndKnowHow
                    const indexToUpdate = (element: object) => JSON.stringify(Object(element).code) === JSON.stringify(codeSkillToUpdate.code);

                    const skillToUpdate = Object(skillsAndKnowHow).skillsAcquired.filter(
                        (el: object) => Object(el).skills.findIndex(indexToUpdate) !== -1
                    );
                    // Recherche et update le model
                    const skillFound = skillToUpdate[0].skills.findIndex(
                        (elToUpdate: object) => JSON.stringify(Object(elToUpdate).code) === JSON.stringify(codeSkillToUpdate.code)
                    );
                    if (codeSkillToUpdate.levelSkill !== skillToUpdate[0].skills[skillFound].level) {
                        // si il y a un niveau a changer alors ca push dans le tableau des precedents niveau de cet element
                        skillToUpdate[0].skills[skillFound] = {
                            code: codeSkillToUpdate.code,
                            libelleACOR: codeSkillToUpdate.libelleACOR,
                            level: codeSkillToUpdate.levelSkill,
                            previousLevel:
                                skillToUpdate[0].skills[skillFound].previousLevel === undefined ||
                                skillToUpdate[0].skills[skillFound].previousLevel.length === 0
                                    ? []
                                    : skillToUpdate[0].skills[skillFound].previousLevel,
                            comments: codeSkillToUpdate.comment && [{ date: new Date(), comment: codeSkillToUpdate.comment }],
                            fromJob: skillToUpdate[0].skills[skillFound].fromJob
                        };
                        skillToUpdate[0].skills[skillFound].previousLevel.push({
                            level: skillToUpdate[0].skills[skillFound].level,
                            dateUpdated: new Date()
                        });
                        await skillsAndKnowHow.save();
                        updateSkillsForExtracting(
                            Object(utilisateurFinded.datas[0].mounths[0]),
                            Object(skillsAndKnowHow._id),
                            Object(codeSkillToUpdate.code),
                            Object(skillToUpdate[0].skills[skillFound].fromJob.code)
                        );
                        Retour.info('The skill has been updated');
                        return res.status(200).json('The skill has been updated');
                    } else {
                        Retour.info('The skill level doesnt changed');
                        return res.status(400).json('The skill level doesnt changed');
                    }
                } else if (codeKnowHowToUpdate) {
                    // Recherche l'index du savoir faire dans le model SkillsAndKnowHow
                    const indexToUpdate = (element: object) => JSON.stringify(Object(element).code) === JSON.stringify(codeKnowHowToUpdate.code);
                    const knowHowToUpdate = Object(skillsAndKnowHow).knowHowsAcquired.filter(
                        (el: object) => Object(el).knowHows.findIndex(indexToUpdate) !== -1
                    );

                    // Recherche et update le model
                    const knowHowFound = knowHowToUpdate[0].knowHows.findIndex(
                        (elToUpdate: object) => JSON.stringify(Object(elToUpdate).code) === JSON.stringify(codeKnowHowToUpdate.code)
                    );
                    // si il y a un niveau a changer alors ca push dans le tableau des precedents niveau de cet element
                    if (codeKnowHowToUpdate.levelSkill !== knowHowToUpdate[0].knowHows[knowHowFound].level) {
                        // si il y a un niveau a changer alors ca push dans le tableau des precedents niveau de cet element
                        knowHowToUpdate[0].knowHows[knowHowFound] = {
                            code: codeKnowHowToUpdate.code,
                            libelleACOR: codeKnowHowToUpdate.libelleACOR,
                            level: codeKnowHowToUpdate.levelSkill,
                            previousLevel:
                                knowHowToUpdate[0].knowHows[knowHowFound].previousLevel === undefined ||
                                knowHowToUpdate[0].knowHows[knowHowFound].previousLevel.length === 0
                                    ? []
                                    : knowHowToUpdate[0].knowHows[knowHowFound].previousLevel,
                            comments: codeKnowHowToUpdate.comment && [{ date: new Date(), comment: codeKnowHowToUpdate.comment }],
                            fromJob: knowHowToUpdate[0].knowHows[knowHowFound].fromJob
                        };
                        knowHowToUpdate[0].knowHows[knowHowFound].previousLevel.push({
                            level: knowHowToUpdate[0].knowHows[knowHowFound].level,
                            dateUpdated: new Date()
                        });
                        await skillsAndKnowHow.save();
                        updateKnowsHowForExtracting(
                            Object(utilisateurFinded.datas[0].mounths[0]),
                            Object(skillsAndKnowHow._id),
                            Object(codeKnowHowToUpdate.code),
                            Object(knowHowToUpdate[0].knowHows[knowHowFound].fromJob.code)
                        );
                        Retour.info('The know how has been updated');
                        return res.status(200).json('The know how has been updated');
                    } else {
                        Retour.info('The skill level doesnt changed');
                        return res.status(400).json('The skill level doesnt changed');
                    }
                } else {
                    Retour.warn('The code for the update has been not found');
                    return res.status(404).json('The code for the update has been not found');
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};
const deleteSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerFinded = await Usager.findById(req.params.usagerId);
        const { requesterId, skillIdToDelete, knowHowIdToDelete } = req.body;
        if (!usagerFinded) {
            Retour.warn('The usager has been not found');
            return res.status(404).json('The usager has been not found');
        } else {
            // On recherche la position 0 car la feature "plusieur tableau de compétences" n'est pas encore évoqué
            const skillsAndKnowHow = await SkillsAndKnowHow.findById(usagerFinded.postAndSkillsAcquired[0]);
            const utilisateurFinded = await Utilisateur.findById(requesterId);
            if (!utilisateurFinded) {
                Retour.warn('The requester has been not found');
                return res.status(404).json('The requester has been not found');
            } else {
                if (skillIdToDelete) {
                    let codeJob = '';
                    skillsAndKnowHow?.skillsAcquired.map((element) => {
                        const newArray = element.skills.filter((el) => JSON.stringify(el.code) !== JSON.stringify(skillIdToDelete));
                        Object(element).skills = newArray;
                    });
                    deleteSkillsForExtracting(
                        Object(utilisateurFinded.datas[0].mounths[0]),
                        Object(skillsAndKnowHow),
                        Object(skillIdToDelete),
                        codeJob
                    );
                    await skillsAndKnowHow?.save();
                    Retour.info('The skill has been deleted');
                    return res.status(500).json('The skill has been deleted');
                } else if (knowHowIdToDelete) {
                    let codeJob = '';
                    skillsAndKnowHow?.knowHowsAcquired.map((element) => {
                        const newArray = element.knowHows.filter((el) => JSON.stringify(el.code) !== JSON.stringify(knowHowIdToDelete));
                        Object(element).knowHows = newArray;
                    });
                    deleteKnowsHowForExtracting(
                        Object(utilisateurFinded.datas[0].mounths[0]),
                        Object(skillsAndKnowHow),
                        Object(knowHowIdToDelete),
                        codeJob
                    );
                    await skillsAndKnowHow?.save();
                    Retour.info('The know how has been deleted');
                    return res.status(500).json('The know how has been deleted');
                } else {
                    Retour.warn('The id to delete has been not found');
                    return res.status(404).json('The id to delete has been not found');
                }
            }
        }
    } catch (error) {
        Retour.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
};

export default { createSkillsForUsager, readSkills, readAll, updateSkills, deleteSkills };
