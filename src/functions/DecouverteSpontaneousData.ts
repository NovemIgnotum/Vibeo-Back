import Data from '../models/Data';

const createDecouverteSpontaneousForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertesSpontaneous.decouvertesSpontaneousCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const readDecouverteSpontaneousForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertesSpontaneous.decouvertesSpontaneousReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const updateDecouverteSpontaneousForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertesSpontaneous.decouvertesSpontaneousUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};

const deleteDecouverteSpontaneousForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.decouvertesSpontaneous.decouvertesSpontaneousDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });

    await dataFinded?.save();
};

export {
    createDecouverteSpontaneousForExtracting,
    readDecouverteSpontaneousForExtracting,
    updateDecouverteSpontaneousForExtracting,
    deleteDecouverteSpontaneousForExtracting
};
