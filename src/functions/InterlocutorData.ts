import Data from '../models/Data';

const createInterlocuteurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.interlocutor.interlocutorCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const readInterlocuteurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.interlocutor.interlocutorReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};

const updateInterlocuteurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.interlocutor.interlocutorUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};

const deleteInterlocuteurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.interlocutor.interlocutorDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });

    await dataFinded?.save();
};

const interlocuteurAddedForExtracting = async (dataId: object, idInterlocutor: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);

    dataFinded?.interlocutor.interlocutorAddedToAnEntreprise.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idInterlocutor: Object(idInterlocutor),
        idEntreprise: Object(idEntreprise)
    });

    await dataFinded?.save();
};

const interlocuteurRemovedForExtracting = async (dataId: object, idInterlocutor: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.interlocutor.interlocutorRemovedToAnEntreprise.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        idInterlocutor: Object(idInterlocutor),
        idEntreprise: Object(idEntreprise)
    });

    await dataFinded?.save();
};

export {
    createInterlocuteurForExtracting,
    readInterlocuteurForExtracting,
    updateInterlocuteurForExtracting,
    deleteInterlocuteurForExtracting,
    interlocuteurAddedForExtracting,
    interlocuteurRemovedForExtracting
};
