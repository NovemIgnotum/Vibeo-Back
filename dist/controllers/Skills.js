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
const Usager_1 = __importDefault(require("../models/Usager"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const WorkStationsPoleEmploi_1 = __importDefault(require("../models/WorkStationsPoleEmploi"));
const SkillsAndKnowHow_1 = __importDefault(require("../models/SkillsAndKnowHow"));
const Response_1 = __importDefault(require("../library/Response"));
const SkillsAndKnowsHow_1 = require("../functions/SkillsAndKnowsHow");
const createSkillsForUsager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requesterId, codeJob, codeSkills, codeKnowHows, codeJobsContext, comment } = req.body;
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId).populate('postAndSkillsAcquired');
        const skillsAndKnowHowFinded = yield SkillsAndKnowHow_1.default.findById(Object(usagerFinded).postAndSkillsAcquired[0]._id);
        const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
        const workStationPoleEmploiFinded = yield WorkStationsPoleEmploi_1.default.findOne({ 'jobs.code': codeJob });
        if (!usagerFinded || !utilisateurFinded) {
            Response_1.default.error({ message: 'The Usager or Utilisateur has been not found' });
            return res.status(404).json({ message: 'The Usager or Utilisateur has been not found' });
        }
        else {
            if (!workStationPoleEmploiFinded) {
                Response_1.default.error({ message: 'The workStation has been not found' });
                return res.status(404).json({ message: 'The workStation has been not found' });
            }
            else {
                let counterSkills = 0;
                let counterKnowsHow = 0;
                let counterJobsContext = 0;
                const jobFinded = workStationPoleEmploiFinded.jobs.find((el) => JSON.stringify(Object(el).code) === JSON.stringify(codeJob));
                codeSkills &&
                    codeSkills.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                        const isPresent = (element) => element.code === Object(el).code;
                        const workStationFiltred = workStationPoleEmploiFinded.skills.filter((el) => Object(el).competences.findIndex(isPresent) !== -1);
                        const skillsFiltered = Object(workStationFiltred[0]).competences.filter((element) => Object(element).code === Object(el).code);
                        const indexFinded = (e) => JSON.stringify(Object(e).code) === JSON.stringify(Object(workStationFiltred[0]).enjeu.code);
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
                        }
                        else {
                            const arrayFiltred = Object(skillsAndKnowHowFinded).skillsAcquired[Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded)].skills.filter((elToFiltred) => elToFiltred.code !== undefined && elToFiltred.code !== Object(el).code);
                            Object(skillsAndKnowHowFinded).skillsAcquired[Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded)].skills = arrayFiltred;
                            Object(skillsAndKnowHowFinded).skillsAcquired[Object(skillsAndKnowHowFinded).skillsAcquired.findIndex(indexFinded)].skills.push({
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
                        (0, SkillsAndKnowsHow_1.createSkillsForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHowFinded)._id, Object(el).code, codeJob);
                        counterSkills === codeSkills.length &&
                            (yield Object(skillsAndKnowHowFinded).save(),
                                Response_1.default.info('New skills has been created'),
                                res.status(201).json({ message: 'SkillsAndKnowHow has been addeds', skillsAndKnowHowFinded }));
                    }));
                codeKnowHows &&
                    codeKnowHows.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                        const isPresent = (element) => element.code === Object(el).code;
                        const workStationFiltred = workStationPoleEmploiFinded.KnowHow.filter((el) => Object(el).savoirs.findIndex(isPresent) !== -1);
                        const skillsFiltered = Object(workStationFiltred[0]).savoirs.filter((element) => Object(element).code === Object(el).code);
                        counterKnowsHow++;
                        const indexFinded = (e) => JSON.stringify(Object(e).code) === JSON.stringify(Object(workStationFiltred[0]).categorieSavoirs.code);
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
                        }
                        else {
                            const arrayFiltred = Object(skillsAndKnowHowFinded).knowHowsAcquired[Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded)].knowHows.filter((elToFiltred) => elToFiltred.code !== undefined && elToFiltred.code !== Object(el).code);
                            Object(skillsAndKnowHowFinded).knowHowsAcquired[Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded)].knowHows = arrayFiltred;
                            Object(skillsAndKnowHowFinded).knowHowsAcquired[Object(skillsAndKnowHowFinded).knowHowsAcquired.findIndex(indexFinded)].knowHows.push({
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
                        (0, SkillsAndKnowsHow_1.createKnowsHowForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHowFinded)._id, JSON.stringify(Object(el).code), codeJob);
                        counterKnowsHow === codeKnowHows.length &&
                            (yield Object(skillsAndKnowHowFinded).save(),
                                Response_1.default.info('New knows How has been created'),
                                res.status(201).json({ message: 'SkillsAndKnowHow has been addeds', skillsAndKnowHowFinded }));
                    }));
                codeJobsContext &&
                    codeJobsContext.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
                        const jobContextFiltred = workStationPoleEmploiFinded.jobContext.filter((element) => JSON.stringify(Object(el).code) === JSON.stringify(Object(element).code));
                        counterJobsContext++;
                        const indexFinded = (e) => JSON.stringify(Object(e).code) === JSON.stringify(Object(jobContextFiltred[0]).code);
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
                        }
                        else {
                            if (Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].level !== Object(el).levelSkill) {
                                Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].code = Object(jobContextFiltred[0]).code;
                                Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].libelle = Object(jobContextFiltred[0]).libelle;
                                Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].previousLevel.push({
                                    level: Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].level,
                                    dateUpdated: new Date()
                                });
                                Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].level = Object(el).levelSkill;
                                Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].categorie = Object(jobContextFiltred[0]).categorie;
                                Object(skillsAndKnowHowFinded).jobContextAcquired[Object(skillsAndKnowHowFinded).jobContextAcquired.findIndex(indexFinded)].comments.push({ comment: Object(el).comment, date: new Date() });
                            }
                        }
                        (0, SkillsAndKnowsHow_1.createJobContextForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHowFinded)._id, JSON.stringify(Object(el).code), codeJob);
                        counterJobsContext === codeJobsContext.length &&
                            (yield Object(skillsAndKnowHowFinded).save(),
                                Response_1.default.info('New knows How has been created'),
                                res.status(201).json({ message: 'SkillsAndKnowHow has been addeds', skillsAndKnowHowFinded }));
                    }));
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId).populate('postAndSkillsAcquired');
        const utilisateurFinded = yield Utilisateur_1.default.findById(req.headers.requesterid);
        if (!utilisateurFinded) {
            Response_1.default.error('Requester has been not found');
            return res.status(404).json('Requester has been not found');
        }
        else {
            if (!usagerFinded) {
                Response_1.default.error('Usager has been not found');
                return res.status(404).json('Usager has been not found');
            }
            else {
                (0, SkillsAndKnowsHow_1.readSkillsAndKnowHowsForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded.postAndSkillsAcquired[0])._id, Object('code'), Object('codeJob'));
                return res.status(200).json({
                    skills: Object(usagerFinded).postAndSkillsAcquired[0].skillsAcquired,
                    knowHows: Object(usagerFinded).postAndSkillsAcquired[0].knowHowsAcquired,
                    jobContexts: Object(usagerFinded).postAndSkillsAcquired[0].jobContextAcquired
                });
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const readAll = (req, res, next) => {
    return WorkStationsPoleEmploi_1.default.find()
        .then((skills) => res.status(200).json({ count: skills.length, skills }))
        .catch((error) => res.status(500).json({ error: error.message }));
};
const updateSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skillsAndKnowHow = yield SkillsAndKnowHow_1.default.findById(req.params.skillsAndKnowHowsId);
        if (!skillsAndKnowHow) {
            Response_1.default.error('Skills and KnowHows has been not found');
            return res.status(404).json('Skills and KnowHows has been not found');
        }
        else {
            const { codeSkillToUpdate, codeKnowHowToUpdate } = req.body;
            const utilisateurFinded = yield Utilisateur_1.default.findById(req.body.requesterId);
            if (!utilisateurFinded) {
                Response_1.default.warn('requester has been not found');
                return res.status(404).json({ message: 'requester has been not found' });
            }
            else {
                if (codeSkillToUpdate) {
                    const indexToUpdate = (element) => JSON.stringify(Object(element).code) === JSON.stringify(codeSkillToUpdate.code);
                    const skillToUpdate = Object(skillsAndKnowHow).skillsAcquired.filter((el) => Object(el).skills.findIndex(indexToUpdate) !== -1);
                    const skillFound = skillToUpdate[0].skills.findIndex((elToUpdate) => JSON.stringify(Object(elToUpdate).code) === JSON.stringify(codeSkillToUpdate.code));
                    if (codeSkillToUpdate.levelSkill !== skillToUpdate[0].skills[skillFound].level) {
                        skillToUpdate[0].skills[skillFound] = {
                            code: codeSkillToUpdate.code,
                            libelleACOR: codeSkillToUpdate.libelleACOR,
                            level: codeSkillToUpdate.levelSkill,
                            previousLevel: skillToUpdate[0].skills[skillFound].previousLevel === undefined ||
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
                        yield skillsAndKnowHow.save();
                        (0, SkillsAndKnowsHow_1.updateSkillsForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHow._id), Object(codeSkillToUpdate.code), Object(skillToUpdate[0].skills[skillFound].fromJob.code));
                        Response_1.default.info('The skill has been updated');
                        return res.status(200).json('The skill has been updated');
                    }
                    else {
                        Response_1.default.info('The skill level doesnt changed');
                        return res.status(400).json('The skill level doesnt changed');
                    }
                }
                else if (codeKnowHowToUpdate) {
                    const indexToUpdate = (element) => JSON.stringify(Object(element).code) === JSON.stringify(codeKnowHowToUpdate.code);
                    const knowHowToUpdate = Object(skillsAndKnowHow).knowHowsAcquired.filter((el) => Object(el).knowHows.findIndex(indexToUpdate) !== -1);
                    const knowHowFound = knowHowToUpdate[0].knowHows.findIndex((elToUpdate) => JSON.stringify(Object(elToUpdate).code) === JSON.stringify(codeKnowHowToUpdate.code));
                    if (codeKnowHowToUpdate.levelSkill !== knowHowToUpdate[0].knowHows[knowHowFound].level) {
                        knowHowToUpdate[0].knowHows[knowHowFound] = {
                            code: codeKnowHowToUpdate.code,
                            libelleACOR: codeKnowHowToUpdate.libelleACOR,
                            level: codeKnowHowToUpdate.levelSkill,
                            previousLevel: knowHowToUpdate[0].knowHows[knowHowFound].previousLevel === undefined ||
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
                        yield skillsAndKnowHow.save();
                        (0, SkillsAndKnowsHow_1.updateKnowsHowForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHow._id), Object(codeKnowHowToUpdate.code), Object(knowHowToUpdate[0].knowHows[knowHowFound].fromJob.code));
                        Response_1.default.info('The know how has been updated');
                        return res.status(200).json('The know how has been updated');
                    }
                    else {
                        Response_1.default.info('The skill level doesnt changed');
                        return res.status(400).json('The skill level doesnt changed');
                    }
                }
                else {
                    Response_1.default.warn('The code for the update has been not found');
                    return res.status(404).json('The code for the update has been not found');
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
const deleteSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usagerFinded = yield Usager_1.default.findById(req.params.usagerId);
        const { requesterId, skillIdToDelete, knowHowIdToDelete } = req.body;
        if (!usagerFinded) {
            Response_1.default.warn('The usager has been not found');
            return res.status(404).json('The usager has been not found');
        }
        else {
            const skillsAndKnowHow = yield SkillsAndKnowHow_1.default.findById(usagerFinded.postAndSkillsAcquired[0]);
            const utilisateurFinded = yield Utilisateur_1.default.findById(requesterId);
            if (!utilisateurFinded) {
                Response_1.default.warn('The requester has been not found');
                return res.status(404).json('The requester has been not found');
            }
            else {
                if (skillIdToDelete) {
                    let codeJob = '';
                    skillsAndKnowHow === null || skillsAndKnowHow === void 0 ? void 0 : skillsAndKnowHow.skillsAcquired.map((element) => {
                        const newArray = element.skills.filter((el) => JSON.stringify(el.code) !== JSON.stringify(skillIdToDelete));
                        Object(element).skills = newArray;
                    });
                    (0, SkillsAndKnowsHow_1.deleteSkillsForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHow), Object(skillIdToDelete), codeJob);
                    yield (skillsAndKnowHow === null || skillsAndKnowHow === void 0 ? void 0 : skillsAndKnowHow.save());
                    Response_1.default.info('The skill has been deleted');
                    return res.status(500).json('The skill has been deleted');
                }
                else if (knowHowIdToDelete) {
                    let codeJob = '';
                    skillsAndKnowHow === null || skillsAndKnowHow === void 0 ? void 0 : skillsAndKnowHow.knowHowsAcquired.map((element) => {
                        const newArray = element.knowHows.filter((el) => JSON.stringify(el.code) !== JSON.stringify(knowHowIdToDelete));
                        Object(element).knowHows = newArray;
                    });
                    (0, SkillsAndKnowsHow_1.deleteKnowsHowForExtracting)(Object(utilisateurFinded.datas[0].mounths[0]), Object(skillsAndKnowHow), Object(knowHowIdToDelete), codeJob);
                    yield (skillsAndKnowHow === null || skillsAndKnowHow === void 0 ? void 0 : skillsAndKnowHow.save());
                    Response_1.default.info('The know how has been deleted');
                    return res.status(500).json('The know how has been deleted');
                }
                else {
                    Response_1.default.warn('The id to delete has been not found');
                    return res.status(404).json('The id to delete has been not found');
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'error catched', error });
        return res.status(500).json({ message: 'error catched', error });
    }
});
exports.default = { createSkillsForUsager, readSkills, readAll, updateSkills, deleteSkills };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpbGxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL1NraWxscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLDhEQUFzQztBQUN0Qyx3RUFBZ0Q7QUFDaEQsOEZBQXNFO0FBQ3RFLGtGQUEwRDtBQUcxRCxtRUFBeUM7QUFFekMsc0VBU3dDO0FBRXhDLE1BQU0scUJBQXFCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNwRixJQUFJLENBQUM7UUFDRCxNQUFNLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRTlGLE1BQU0sWUFBWSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNsRyxNQUFNLHNCQUFzQixHQUFHLE1BQU0sMEJBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsSCxNQUFNLGlCQUFpQixHQUFHLE1BQU0scUJBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsTUFBTSwyQkFBMkIsR0FBRyxNQUFNLGdDQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3RDLGtCQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLDhDQUE4QyxFQUFFLENBQUMsQ0FBQztZQUMxRSxPQUFPLEdBQUcsQ0FBQyxNQUFN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