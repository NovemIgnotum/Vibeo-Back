import { NextFunction, Request, Response } from 'express';
// Packages
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

// Models
import Usager from '../models/Usager';
import Utilisateur from '../models/Utilisateur';
import Partenaire from '../models/Partenaire';
import Data from '../models/Data';
import Convention from '../models/Convention';
// FUNCTIONS
import {
    createUsagerForExtracting,
    readUsagerForExtracting,
    updateUsagerForExtracting,
    deleteUsagerForExtracting,
    UsagerOutedForExtracting
} from '../functions/UsagerData';

import config from '../config/config';

// Library
import Retour from '../library/Response';
import SkillsAndKnowHow from '../models/SkillsAndKnowHow';
import axios from 'axios';
import AvailabilityPerDay from '../models/AvailabilityPerDay';
import Etablissement from '../models/Etablissement';

//Recherche de l'usager référent avec l'id recu en params, puis création du nouvel usager
const createUsager = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requesterId = req.body.requesterId;
        // Utilisateur qui fait la requete
        const utilisateurFinded = await Utilisateur.findById(requesterId);
        // Ou Partenaire qui fait la requete
        const partenaireFinded = await Partenaire.findById(requesterId);
        if (!utilisateurFinded && !partenaireFinded) {
            Retour.error('the utilisateur or the partenaire has been not found');
            return res.status(400).json({ message: 'the utilisateur or the partenaire has been not found' });
        } else {
            const {
                email,
                male,
                name,
                firstname,
                dateOfBirth,
                adress,
                city,
                zip,
                location,
                mobileNum,
                ownEntreprise,
                password,
                passwordConfirmed,
                utilisateurId,
                partenaireId,
                prescription,
                conventionId
            } = req.body;

            const conventionFinded = await Convention.findById(conventionId);
            const etablissementFinded = await Etablissement.findOne({ conventions: Object(conventionFinded)._id });
            const dateNow = new Date();
            const newData = new Data({
                month: dateNow.getMonth() + 1
            });

            const token: string = uid2(26);
            const salt: string = uid2(26);
            const hash: string = SHA256(password + salt).toString(encBase64);

            const newSkillsAndKnowsHow = new SkillsAndKnowHow();
            const availabilityPerDay = new AvailabilityPerDay({
                monday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                tuesday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },

                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                wednesday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },

                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                thusday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                friday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                saturday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ],
                sunday: [
                    {
                        time: 0,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 1,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 2,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 3,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 4,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 5,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 6,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 7,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 8,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 9,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 10,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 11,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 12,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 13,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 14,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 15,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 16,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 17,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 18,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 19,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 20,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 21,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 22,
                        isAvailable: true,
                        title: ''
                    },
                    {
                        time: 23,
                        isAvailable: true,
                        title: ''
                    }
                ]
            });

            const usager = new Usager({
                email,
                account: {
                    male,
                    name: name.toLowerCase(),
                    firstname: firstname.toLowerCase(),
                    dateOfBirth,
                    mobileNum,
                    adress,
                    city,
                    zip,
                    location
                },
                prescription: {
                    motif: prescription
                },
                ownEntreprise,
                availabilityPerDay,
                appointments: [
                    {
                        month: 'Janvier',
                        appointments: []
                    },
                    {
                        month: 'Fevrier',
                        appointments: []
                    },
                    {
                        month: 'Mars',
                        appointments: []
                    },
                    {
                        month: 'Avril',
                        appointments: []
                    },
                    {
                        month: 'Mai',
                        appointments: []
                    },
                    {
                        month: 'Juin',
                        appointments: []
                    },
                    {
                        month: 'Juillet',
                        appointments: []
                    },
                    {
                        month: 'Aout',
                        appointments: []
                    },
                    {
                        month: 'Septembre',
                        appointments: []
                    },
                    {
                        month: 'octobre',
                        appointments: []
                    },
                    {
                        month: 'Novembre',
                        appointments: []
                    },
                    {
                        month: 'Decembre',
                        appointments: []
                    }
                ],
                datas: { year: dateNow.getFullYear() },
                token,
                salt,
                hash
            });
            if (!conventionFinded) {
                Retour.warn('the convention has been not found ');
                return res.status(400).json({ message: 'the convention has been not found !' });
            } else {
                if (name && firstname) {
                    if (password && password === passwordConfirmed) {
                        const alreadyExist = await Usager.findOne({
                            'account.name': name.toLowerCase(),
                            'account.firstname': firstname.toLowerCase()
                        });
                        if (!alreadyExist) {
                            // Afin de creer un nouveau tableau de données du mois en cours
                            usager.datas[0].mounths.push(newData._id);
                            Object(usager).postAndSkillsAcquired.push(Object(newSkillsAndKnowsHow));
                            Object(usager).conventionId = conventionFinded._id;
                            partenaireFinded && (Object(usager).partenaireAffiliated = Object(partenaireFinded));
                            // Si l'usager est créé par un utilisateur il apparaitra directement dans les entrées
                            if (utilisateurId) {
                                const utilisateur = await Utilisateur.findById(utilisateurId);
                                Object(utilisateur).usagers.push(Object(usager));
                                Object(usager).utilisateurAffiliated = Object(utilisateur);
                                conventionFinded.orientations.push(Object(usager));
                                await Object(utilisateur).save();
                                // Sinon il apparait dans le tableau des prescriptions de la convention
                            } else {
                                conventionFinded.prescriptions.push(Object(usager));
                            }
                            if (partenaireId) {
                                const partenaire = await Partenaire.findById(partenaireId);
                                if (!partenaire) {
                                    Retour.warn("partenaire was not found with 'partenaireId'");
                                    return res.status(400).json("partenaire was not found with 'partenaireId'");
                                } else {
                                    Object(usager).partenaireAffiliated = Object(partenaire);
                                    Object(partenaire).usagersAttribuated.push(Object(usager));
                                    await partenaire?.save();
                                }
                            }
                            Object(etablissementFinded).usagers.push(Object(usager)._id);
                            await newSkillsAndKnowsHow.save();
                            await usager.save();
                            await newData.save();
                            await availabilityPerDay.save();
                            await conventionFinded.save();
                            await Object(etablissementFinded).save();
                            utilisateurFinded && createUsagerForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(usager));
                            partenaireFinded && createUsagerForExtracting(Object(partenaireFinded).datas[0].mounths[0], Object(usager));
                            Retour.info('An usager has been created');
                            return res.status(201).json({ message: 'It has been created', usager: usager });
                        } else {
                            Retour.error('usager already exist');
                            return res.status(403).json({ message: 'usager already exist', usager: usager });
                        }
                    } else {
                        Retour.warn('the passwords are not similar ');
                        return res.status(400).json({ message: 'the passwords are not similar !' });
                    }
                } else {
                    Retour.warn('all values not found');
                    return res.status(400).json({ message: 'all values not found' });
                }
            }
        }
    } catch (error) {
        Retour.error('Error catched');
        return res.status(500).json({ message: 'Error catched', error: error });
    }
};

// Recherche de l'usager depuis son id recu en params puis le retourne dans la réponse
const readUsager = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
        const usagerId = req.params.usagerId;
        const usagerFinded = await Usager.findById(usagerId).populate('contacts administrativePosition availabilityPerDay');
        if (usagerFinded && utilisateurFinded) {
            readUsagerForExtracting(Object(utilisateurFinded?.datas[0].mounths[0]), Object(usagerFinded));
            return res.status(200).json({ usager: usagerFinded });
        } else {
            return res.status(404).json({ message: 'Usager or Utilisateur was not found' });
        }
    } catch (error) {
        Retour.error('Error catched');
        return res.status(500).json({ message: 'Error catched', error });
    }
};
// Recois en réponse tous les Usagers enregistrer en BDD
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const conventionFinded = await Convention.findById(req.params.conventionId).populate('prescriptions orientations entrees usagersOuted');
    if (conventionFinded) {
        return res.status(200).json({
            convention: conventionFinded.name,
            prescriptions: conventionFinded.prescriptions,
            orientations: conventionFinded.orientations,
            entrees: conventionFinded.entrees,
            usagersOuted: conventionFinded.usagersOuted
        });
    } else {
        return res.status(400).json({ error: 'Convention was not found' });
    }
};
const readAllByEtablissement = async (req: Request, res: Response, next: NextFunction) => {
    const utilisateurFinded = await Utilisateur.findById(req.headers.requesterid);
    const etablissementFinded = await Etablissement.findOne({ utilisateurs: Object(utilisateurFinded)._id })
        .populate('usagers UsagerOuts partenaire utilisateurs')
        .select('usagers UsagerOuts');
    console.log('etablissementFinded', etablissementFinded);

    if (etablissementFinded && utilisateurFinded) {
        Retour.info(`${utilisateurFinded.account.firstname} ${utilisateurFinded.account.name} consults ${etablissementFinded.name} in its directory`);
        return res.status(200).json(etablissementFinded);
    } else {
        Retour.error('Etablissement or the requester was not found');
        return res.status(400).json({ error: 'Etablissement or the requester was not found' });
    }
};
// Permet de rechercher de l'usager avec son _id en params et le modifier.
const updateUsager = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerId = req.params.usagerId;
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        if (!utilisateurFinded) {
            Retour.error('The utilisateur has been not found');
            return res.status(404).json({ error: 'The utilisateur has been not found' });
        } else {
            const conventionFindedByPrescriptions = await Convention.findOne({ prescriptions: usagerId });
            const conventionFindedByOrientations = await Convention.findOne({ orientations: usagerId });
            const conventionFindedByEntrees = await Convention.findOne({ entrees: usagerId });
            if (!conventionFindedByPrescriptions && !conventionFindedByOrientations && !conventionFindedByEntrees) {
                return Usager.findById(usagerId)
                    .populate('availabilityPerDay')
                    .then(async (usager) => {
                        if (usager) {
                            usager.set(req.body);
                            let availabilityPerDayFinded = await AvailabilityPerDay.findById(Object(usager).availabilityPerDay);
                            availabilityPerDayFinded = Object(usager).availabilityPerDay;
                            await Object(availabilityPerDayFinded).save();
                            await usager.save();
                            updateUsagerForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                            Retour.info('Usager already accueilled, and updated');
                            return res.status(200).json('Usager already accueilled, and updated ');
                        }
                    });
            } else {
                return Usager.findById(usagerId)
                    .populate('availabilityPerDay')
                    .then(async (usager) => {
                        if (usager) {
                            let availabilityPerDayFinded = await AvailabilityPerDay.findById(Object(usager).availabilityPerDay);
                            if (conventionFindedByPrescriptions && req.body.utilisateurAffiliatedId) {
                                //* Afin de le passer de prescription a orientation
                                const utilisatueurAffiliated = await Utilisateur.findById(req.body.utilisateurAffiliatedId);
                                usager.utilisateurAffiliated = Object(utilisateurFinded);
                                utilisatueurAffiliated?.usagers.push(Object(usager));
                                Object(conventionFindedByPrescriptions).orientations.push(Object(usager));
                                const newArray = Object(conventionFindedByPrescriptions).prescriptions.filter(
                                    (element: object) => JSON.stringify(Object(element)._id) !== JSON.stringify(Object(usager)._id)
                                );
                                Object(conventionFindedByPrescriptions).prescriptions = newArray;
                                await conventionFindedByPrescriptions?.save();
                                await utilisatueurAffiliated?.save();
                                updateUsagerForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                                await usager.save();
                                return res.status(200).json('Orientation saved');
                            } else if (conventionFindedByOrientations && req.body.dateOfAccueil) {
                                //* Afin de le passer de orientation a entrée
                                Object(conventionFindedByOrientations).entrees.push(Object(usager));
                                const newArray = Object(conventionFindedByOrientations).orientations.filter(
                                    (element: object) => JSON.stringify(Object(element)._id) !== JSON.stringify(Object(usager)._id)
                                );
                                Object(conventionFindedByOrientations).orientations = newArray;
                                await Object(conventionFindedByOrientations).save();
                                updateUsagerForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                                return res.status(200).json('Usager was accueilled');
                            } else {
                                //* Afin d'updater toutes les autres données étapes par étapes (pour l'accueil) ou uniquement 1 seule donnée'
                                usager.set(req.body);
                                availabilityPerDayFinded = Object(usager).availabilityPerDay;
                                await Object(availabilityPerDayFinded).save();
                                await usager.save();
                                updateUsagerForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usager._id));
                                return res.status(200).json({ message: "Usager's body updated", usager });
                            }
                        } else {
                            res.status(404).json({ message: 'Usager wot found' });
                        }
                    });
            }
        }
    } catch (error) {
        Retour.error('Error catched');
        return res.status(403).json({ message: 'Error catched', error });
    }
};
//* Quand un usager est 'supprimer' il disparait de la liste des usagers du model Usager et il apparait dans la liste des usagersOuted du model Usager
const deleteUsager = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usagerFinded = await Usager.findById(req.params.usagerId);
        const utilisateurFinded = await Utilisateur.findById(req.body.requesterId);
        const conventionFinded = await Convention.findById(req.body.conventionId);
        const etablissementFinded = await Etablissement.findOne({ conventions: Object(conventionFinded)._id });
        if (!utilisateurFinded || !usagerFinded || !conventionFinded) {
            return res.status(404).json({ message: 'Usager, Utilisateur or the Convention has been not found' });
        } else {
            if (req.body.isAnArchive === false) {
                const newOrientationsArray = conventionFinded.orientations.filter(
                    (el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id)
                );
                Object(conventionFinded).orientations = newOrientationsArray;
                const newEntreesArray = conventionFinded.entrees.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(conventionFinded).entrees = newEntreesArray;
                const newEtablissementArray = etablissementFinded?.usagers.filter(
                    (el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id)
                );
                Object(etablissementFinded).usagers = newEtablissementArray;
                Object(etablissementFinded).UsagerOuts.push(usagerFinded._id);
                Object(conventionFinded).usagersOuted.push(Object(usagerFinded));
                UsagerOutedForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded._id));
                await Object(etablissementFinded).save();
                await conventionFinded.save();
                Retour.log('Usager was pushed in the array of the outed');
                return res.status(200).json('Usager was pushed in the array of the outed');
            } else if (req.body.isAnArchive === true) {
                const archive = await axios.post(`${config.mongooseUrlArchived}/usager/create/${conventionFinded._id}`, {
                    _id: usagerFinded && usagerFinded._id,
                    email: usagerFinded && usagerFinded.email,
                    male: usagerFinded && usagerFinded.account.male,
                    name: usagerFinded && usagerFinded.account.name,
                    firstname: usagerFinded && usagerFinded.account.firstname,
                    dateOfBirth: usagerFinded && usagerFinded.account.dateOfBirth,
                    adress: usagerFinded && usagerFinded.account.adress,
                    city: usagerFinded && usagerFinded.account.city,
                    zip: usagerFinded && usagerFinded.account.zip,
                    district: usagerFinded && usagerFinded.account.district,
                    location: {
                        latitude: usagerFinded && usagerFinded.account.location.lat,
                        longitude: usagerFinded && usagerFinded.account.location.lng
                    },

                    adressComment: usagerFinded && usagerFinded.account.adressComment,
                    landlineNumber: usagerFinded && usagerFinded.account.landlineNumber,
                    mobileNum: usagerFinded && usagerFinded.account.mobileNum,
                    phoneOrEmailComment: usagerFinded && usagerFinded.account.phoneOrEmailComment,
                    dateOfAccueil: usagerFinded && usagerFinded.dateOfAccueil,
                    familySituation: usagerFinded && usagerFinded.familySituation,
                    expoPushToken: usagerFinded && usagerFinded.expoPushToken,
                    childrenSituation: usagerFinded && usagerFinded.childrenSituation,
                    careChild: usagerFinded && usagerFinded.careChild,
                    numberOfChildren: usagerFinded && usagerFinded.numberOfChildren,
                    familySituationComment: usagerFinded && usagerFinded.familySituationComment,
                    lastContact: usagerFinded && usagerFinded.lastContact,
                    availabilityPerDay: usagerFinded && usagerFinded.availabilityPerDay,
                    post: usagerFinded && usagerFinded.postWanted,
                    contacts: usagerFinded && usagerFinded.contacts,
                    token: usagerFinded && usagerFinded.token,
                    hash: usagerFinded && usagerFinded.hash,
                    salt: usagerFinded && usagerFinded.salt
                });
                const newEntreesArray = conventionFinded.entrees.filter((el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id));
                Object(conventionFinded).entrees = newEntreesArray;
                const newOutedArray = conventionFinded.usagersOuted.filter(
                    (el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id)
                );
                Object(conventionFinded).usagersOuted = newOutedArray;

                const newEtablissementArray = etablissementFinded?.UsagerOuts.filter(
                    (el) => JSON.stringify(Object(el)._id) !== JSON.stringify(usagerFinded._id)
                );
                Object(etablissementFinded).UsagerOuts = newEtablissementArray;
                await Object(etablissementFinded).save();
                if (archive.data.message === `The usager ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been created`) {
                    Retour.info(`The usager ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been created`);
                    Object(conventionFinded).save();
                    deleteUsagerForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded._id));
                    return Usager.findByIdAndDelete(usagerFinded._id).then(() =>
                        res.status(200).json(`The usager ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been created`)
                    );
                } else if (`The usagerArchived ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been updated`) {
                    Retour.info(`The usagerArchived ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been updated`);
                    Object(conventionFinded).save();
                    deleteUsagerForExtracting(Object(utilisateurFinded.datas[0].mounths[0]), Object(usagerFinded._id));
                    return Usager.findByIdAndDelete(usagerFinded._id).then(() =>
                        res.status(200).json(`The usagerArchived ${usagerFinded.account.firstname} ${usagerFinded.account.name} has been updated`)
                    );
                } else {
                    Retour.info('Something went wrong');
                    return res.status(200).json('Something went wrong');
                }
            } else {
                Retour.warn('isAnArchive was not found');
                return res.status(400).json('isAnArchive was not found');
            }
        }
    } catch (error) {
        Retour.error('Error catched');
        return res.status(403).json({ message: 'Error catched', error });
    }
};
//* Exporte l'intégralité des fonctionnalités du CRUD
export default { createUsager, readUsager, readAll, readAllByEtablissement, updateUsager, deleteUsager };
