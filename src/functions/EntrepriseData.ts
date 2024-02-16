// Models
import Data from '../models/Data';

// Entreprise
const createEntrepriseForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.entreprise.entrepriseCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const readEntrepriseForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.entreprise.entrepriseReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const updateEntrepriseForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.entreprise.entrepriseUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};

const deleteEntrepriseForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.entreprise.entrepriseDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });

    await dataFinded?.save();
};

export { createEntrepriseForExtracting, readEntrepriseForExtracting, updateEntrepriseForExtracting, deleteEntrepriseForExtracting };
