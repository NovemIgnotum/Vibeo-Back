import Data from '../models/Data';

const createOfferJobForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.offerJobs.offerJobCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const readOfferJobForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.offerJobs.offerJobReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const updateOfferJobForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.offerJobs.offerJobUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};

const deleteOfferJobForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.offerJobs.offerJobDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });

    await dataFinded?.save();
};

export { createOfferJobForExtracting, readOfferJobForExtracting, updateOfferJobForExtracting, deleteOfferJobForExtracting };
