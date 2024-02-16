import Data from '../models/Data';

const createDecouverteForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertes.decouverteCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const readDecouverteForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertes.decouverteReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const updateDecouverteForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertes.decouverteUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};

const deleteDecouverteForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertes.decouverteDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });

    await dataFinded?.save();
};

export { createDecouverteForExtracting, readDecouverteForExtracting, updateDecouverteForExtracting, deleteDecouverteForExtracting };
