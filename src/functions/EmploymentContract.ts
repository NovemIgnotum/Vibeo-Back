import Data from '../models/Data';

const createEmploymentContractForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.employmentContracts.employmentContractCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const readEmploymentContractForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.employmentContracts.employmentContractReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};
const updateEmploymentContractForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.employmentContracts.employmentContractUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });
    await dataFinded?.save();
};

const deleteEmploymentContractForExtracting = async (dataId: object, idCreated: object, idUsager: object, idEntreprise: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.employmentContracts.employmentContractDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated),
        idUsager: Object(idUsager),
        idEntreprise: Object(idEntreprise)
    });

    await dataFinded?.save();
};

export { createEmploymentContractForExtracting, readEmploymentContractForExtracting, updateEmploymentContractForExtracting, deleteEmploymentContractForExtracting };
