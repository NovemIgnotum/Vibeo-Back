import axios from 'axios';

import Utilisateur from '../models/Utilisateur';
import Usager from '../models/Usager';
import Interlocutor from '../models/Interlocutor';
import Partenaire from '../models/Partenaire';

const SmsSended = async (text: string, user: string) => {
    const utilisateurFinded = await Utilisateur.findById(user).select('account');
    const usagerFinded = await Usager.findById(user).select('account');
    const interlocutorFinded = await Interlocutor.findById(user).select('account');
    const partenaireFinded = await Partenaire.findById(user).select('account');
    console.log('text->', text);
    console.log('utilisateurFinded from sendSms->', utilisateurFinded);
    console.log('usagerFinded from sendSms->', usagerFinded);
    console.log('interlocutorFinded from sendSms->', interlocutorFinded);
    console.log('partenaireFinded from sendSms->', partenaireFinded);

    // (async () => {
    //     const response = await axios.post(
    //         `${process.env.API_OCTOPUSH_URL}`,
    //         {
    //             sender: 'Acor',
    //             recipients: [
    //                 {
    //                     phone_number: `+33622078791`,
    //                     firstname: `Byt`,
    //                     name: `julien`,
    //                     param3: `Mr`
    //                 }
    //             ],
    //             text: `${text} STOP au 30101`
    //         },
    //         {
    //             headers: {
    //                 'api-key': `${process.env.API_KEY_OCTOPUSH}`,
    //                 'api-login': `${process.env.API_LOGIN_OCTOPUSH}`
    //             }
    //         }
    //     );
    //     console.log('response-->', response.data);
    // })();
};

export default SmsSended;
