import Data from '../models/Data';

const createRoomForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.rooms.roomCreated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const readRoomForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.rooms.roomReaded.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};
const updateRoomForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.rooms.roomUpdated.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });
    await dataFinded?.save();
};

const deleteRoomForExtracting = async (dataId: object, idCreated: object) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.rooms.roomDeleted.push({
        date: new Date(dateNow.setHours(dateNow.getHours() + 1)),
        id: Object(idCreated)
    });

    await dataFinded?.save();
};

export { createRoomForExtracting, readRoomForExtracting, updateRoomForExtracting, deleteRoomForExtracting };
