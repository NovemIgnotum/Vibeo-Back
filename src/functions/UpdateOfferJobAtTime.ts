const cron = require('node-cron');
import Response from '../library/Response';
// Models
import OfferJob from '../models/OfferJob';
import Usager from '../models/Usager';

const UpdateOfferJobIn24h = (offerJobId: string) => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const seconde = date.getSeconds();
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();

    cron.schedule(`${seconde} ${minute} ${hour} ${day} * *`, async () => {
        const offerJobFinded = await OfferJob.findById(offerJobId);
        const usagerFinded = await Usager.findById(offerJobFinded?.usagerPositioned[0]);
        if (!offerJobFinded) {
            Response.error('offerJob has been not found');
            cron.stop();
        } else {
            if (offerJobFinded.offerBlockedAutomaticaly === false) {
                cron.stop();
            } else {
                offerJobFinded?.history.push({
                    title: "Pas de réponse de l'usager",
                    date: new Date(new Date().setHours(new Date().getHours() + 1)),
                    by: JSON.stringify(offerJobFinded.usagerPositioned[0]),
                    for: '',
                    comment: "L'offre est redevenue disponible, apres une période de 24h sans réponse"
                });
                Object(offerJobFinded).status = 'Disponible';
                Object(offerJobFinded).offerBlockedAutomaticaly = false;
                Object(offerJobFinded).usagerWhoRefusedTheOfferJob.push(Object(offerJobFinded.usagerPositioned));
                const newArrayFromOfferJob = offerJobFinded.usagerPositioned.filter((el) => JSON.stringify(el) !== JSON.stringify(usagerFinded?._id));
                Object(offerJobFinded).usagerPositioned = newArrayFromOfferJob;
                const newArrayFromUsager = usagerFinded?.offerJobReceived.filter((el) => JSON.stringify(el) !== JSON.stringify(offerJobFinded?._id));
                Object(usagerFinded).offerJobReceived = newArrayFromUsager;
                Object(usagerFinded).offerJobDenied.push(Object(offerJobFinded));
                await usagerFinded?.save();
                await offerJobFinded?.save();
                cron.stop();
            }
        }
    });
};
export { UpdateOfferJobIn24h };
