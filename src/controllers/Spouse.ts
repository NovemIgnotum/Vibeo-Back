import { NextFunction, Request, Response } from 'express';

// Models
import Usager from '../models/Usager';

//Library
import Retour from '../library/Response';

const createSpouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let oldSpouseName;
        let oldSpouseFirstName;

        //Fonction pour supprimer un conjoint existant
        const removeExistingSpouse = async (usager: object) => {
            if (Object(usager).spouse) {
                const findedSpouse = await Usager.findById(Object(usager).spouse);
                //Dans le cas ou l'id du spouse est corrompu
                if (!findedSpouse) {
                    //Recherche du conjoint corrompu par l'id de l'usager
                    const corruptId = await Usager.findOne({ spouse: Object(usager).id });
                    Object(corruptId).spouse = null;
                    await Object(corruptId).save();
                    oldSpouseName = Object(corruptId).account.name;
                    oldSpouseFirstName = Object(corruptId).account.firstname;
                    return true;
                } else {
                    Object(findedSpouse).spouse = null;
                    await Object(findedSpouse).save();
                    oldSpouseName = findedSpouse.account.name;
                    oldSpouseFirstName = findedSpouse.account.firstname;
                    return true;
                }
            } else {
                return false;
            }
        };

        const futureSpouseFinded = await Usager.findById(req.body.spouseId);
        const usagerFinded = await Usager.findById(req.params.usagerId);
        if (!usagerFinded || !futureSpouseFinded) {
            return res.status(404).json('One or both of the usager has been not found');
        } else {
            if (req.body.spouseId === req.params.usagerId) {
                return res.status(400).json('SpouseId anf UsagerId need to be different');
            }
            //Suppression des conjoints si existants
            if ((await removeExistingSpouse(usagerFinded)) && (await removeExistingSpouse(futureSpouseFinded))) {
                return res.status(200).json({
                    message: `The old spouse ${oldSpouseName} ${oldSpouseFirstName} was replaced by ${futureSpouseFinded.account.name} ${futureSpouseFinded.account.firstname} for the usager ${usagerFinded.account.name} ${usagerFinded.account.firstname} `
                });
            } else {
                Object(usagerFinded).spouse = req.body.spouseId;
                Object(futureSpouseFinded).spouse = req.params.usagerId;
                //Sauvegarde des changements
                await Object(usagerFinded).save();
                await Object(futureSpouseFinded).save();
                return res.status(200).json({
                    message: `${futureSpouseFinded.account.name} ${futureSpouseFinded.account.firstname} is the new spouse of ${usagerFinded.account.name} ${usagerFinded.account.firstname}`
                });
            }
        }
    } catch (error) {
        Retour.error('Error');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

const deleteSpouse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerFinded = await Usager.findById(req.params.usagerId);
        if (!usagerFinded) {
            Retour.error('Usager not found');
            return res.status(404).json({ message: 'Usager not found' });
        } else {
            const findedSpouse = await Usager.findById(Object(usagerFinded).spouse);
            if (!findedSpouse) {
                Retour.error('Usager do not have a spouse to remove');
                return res.status(404).json({ message: 'Usager do not have a spouse to remove' });
            } else {
                Object(usagerFinded).spouse = null;
                Object(findedSpouse).spouse = null;
                await Object(usagerFinded).save();
                await Object(findedSpouse).save();
                return res.status(200).json({ message: 'Spouse removed' });
            }
        }
    } catch (error) {
        Retour.error('Error');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

export default { createSpouse, deleteSpouse };
