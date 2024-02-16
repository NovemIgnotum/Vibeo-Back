import Data from '../models/Data';

const createSkillsForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.skillsCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    await dataFinded?.save();
};
const readSkillsAndKnowHowsForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.skillsAndKnowHowsReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idReaded: Object(idCreated)
    });
    await dataFinded?.save();
};
const updateSkillsForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.skillsUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    await dataFinded?.save();
};

const deleteSkillsForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.skillsDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });

    await dataFinded?.save();
};
const createKnowsHowForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.knowsHowCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    await dataFinded?.save();
};
const updateKnowsHowForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.knowsHowUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });
    await dataFinded?.save();
};

const deleteKnowsHowForExtracting = async (dataId: object, idCreated: object, code: string, codeJob: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.knowsHowDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        codeJob: codeJob
    });

    await dataFinded?.save();
};
const createJobContextForExtracting = async (dataId: object, idCreated: object, code: string, categorie: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.jobContextCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        categorie: categorie
    });
    await dataFinded?.save();
};
const updateJobContextForExtracting = async (dataId: object, idCreated: object, code: string, categorie: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.jobContextUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        categorie: categorie
    });
    await dataFinded?.save();
};

const deleteJobContextForExtracting = async (dataId: object, idCreated: object, code: string, categorie: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.skillsAndKnowsHow.jobContextDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idFrom: Object(idCreated),
        code: code,
        categorie: categorie
    });

    await dataFinded?.save();
};
export {
    createSkillsForExtracting,
    readSkillsAndKnowHowsForExtracting,
    updateSkillsForExtracting,
    deleteSkillsForExtracting,
    createKnowsHowForExtracting,
    updateKnowsHowForExtracting,
    deleteKnowsHowForExtracting,
    createJobContextForExtracting,
    updateJobContextForExtracting,
    deleteJobContextForExtracting
};
