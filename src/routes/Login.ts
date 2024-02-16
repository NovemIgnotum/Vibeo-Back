import express, { Request, Response, NextFunction } from 'express';
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const router = express.Router();

// FUNCTIONS
import { Login } from '../functions/ExtractingData';

// MODELS
import Utilisateur from '../models/Utilisateur';
import Usager from '../models/Usager';
import Partenaire from '../models/Partenaire';

// LIBRARIES
import Logging from '../library/Logging';
import Etablissement from '../models/Etablissement';

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name, firstname, screenType } = req.body;
    // SI ON A UN NOM ET UN PRENOM C'EST QUE C'EST OBLIGATOIREMENT UN USAGER PUIS SI LE MDP CORRESPOND AU MDP HASHÉ ON RENVOI L'OBJET
    if (name && firstname) {
        const usagerFinded = await Usager.findOne({ 'account.name': name.toLowerCase(), 'account.firstname': firstname.toLowerCase() });
        if (usagerFinded) {
            const hashToLog: string = SHA256(password + usagerFinded.salt).toString(encBase64);
            hashToLog === usagerFinded.hash
                ? res
                      .status(200)
                      .json({ message: "you're logged", usager: usagerFinded })
                      .end(() => {
                          Login(usagerFinded?.datas[0].mounths[0], screenType),
                              Logging.info(`${usagerFinded.account.firstname} ${usagerFinded.account.name} is logged`);
                      })
                : res
                      .status(401)
                      .json({ message: 'wrong password' })
                      .end(() => Logging.error(`${usagerFinded._id} make a wrong password`));
        } else {
            Logging.error('usager not finded');
            return res.status(404).json({ message: 'usager not finded' });
        }
    } else {
        // SINON ON RECHECHE AVEC L'EMAIL DANS LA BDD SI C'EST UN UTILISATEUR || ADMINISTRATEUR || PARTENAIRE PUIS SI LE MDP CORRESPOND AU MDP HASHÉ ON RENVOI L'OBJET
        const utilisateurFinded = await Utilisateur.findOne({ email: email }).populate('prospectings');
        const adminFinded = await Utilisateur.findOne({ email: email }).populate('datas prospectings');
        const partenaireFinded = await Partenaire.findOne({ email: email });
        const etablissementFinded = await Etablissement.findOne({ utilisateurs: utilisateurFinded?._id }).populate('entreprises');

        if (adminFinded) {
            const hashToLog: string = SHA256(password + adminFinded.salt).toString(encBase64);

            hashToLog !== adminFinded.hash
                ? res
                      .status(401)
                      .json({ message: 'wrong password' })
                      .end(() => Logging.error(`${adminFinded._id} make a wrong password`))
                : res
                      .status(200)
                      .json({ message: "you're logged", admin: adminFinded, etablissement: etablissementFinded })
                      .end(() => {
                          Login(adminFinded?.datas[0].mounths[0], screenType),
                              Logging.info(`${adminFinded.account.firstname} ${adminFinded.account.name} is logged`);
                      });
        } else if (utilisateurFinded) {
            const hashToLog: string = SHA256(password + utilisateurFinded.salt).toString(encBase64);
            hashToLog === utilisateurFinded.hash
                ? res
                      .status(200)
                      .json({ message: "you're logged", utilisateur: utilisateurFinded, etablissement: etablissementFinded })
                      .end(() => {
                          Login(utilisateurFinded?.datas[0].mounths[0], screenType),
                              Logging.info(`${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} is logged`);
                      })
                : res
                      .status(401)
                      .json({ message: 'wrong password' })
                      .end(() => Logging.error(`${utilisateurFinded._id} make a wrong password`));
        } else if (partenaireFinded) {
            const hashToLog: string = SHA256(password + partenaireFinded.salt).toString(encBase64);
            hashToLog === partenaireFinded.hash
                ? res
                      .status(200)
                      .json({ message: "you're logged", partenaire: partenaireFinded })
                      .end(() => {
                          Login(partenaireFinded?.datas[0].mounths[0], screenType),
                              Logging.info(`${partenaireFinded.account.firstname} ${partenaireFinded.account.name} is logged`);
                      })
                : res
                      .status(401)
                      .json({ message: 'wrong password' })
                      .end(() => Logging.error(`${partenaireFinded._id} make a wrong password`));
        } else {
            return res.status(404).json({ message: 'Account not finded' });
        }
    }
});

export default router;
