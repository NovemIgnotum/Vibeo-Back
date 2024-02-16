import Data from '../models/Data';

const createUtilisateurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.utilisateurs.utilisateurCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const readUtilisateurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.utilisateurs.utilisateurReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const updateUtilisateurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.utilisateurs.utilisateurUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};

const deleteUtilisateurForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.utilisateurs.utilisateurDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });

    await dataFinded?.save();
};

export { createUtilisateurForExtracting, readUtilisateurForExtracting, updateUtilisateurForExtracting, deleteUtilisateurForExtracting };
