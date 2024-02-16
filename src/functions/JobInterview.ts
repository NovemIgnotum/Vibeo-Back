import Data from '../models/Data';

const createJobInterviewForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.jobInterviews.jobInterviewCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const readJobInterviewForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.jobInterviews.jobInterviewReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const updateJobInterviewForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.jobInterviews.jobInterviewUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};

const deleteJobInterviewForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.jobInterviews.jobInterviewDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });

    await dataFinded?.save();
};

export { createJobInterviewForExtracting, readJobInterviewForExtracting, updateJobInterviewForExtracting, deleteJobInterviewForExtracting };
