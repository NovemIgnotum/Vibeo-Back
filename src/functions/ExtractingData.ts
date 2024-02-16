// Models
import Data from '../models/Data';
import DataEntreprise from '../models/DataEntreprise';
import DataConvention from '../models/DataConvention';

import Utilisateur from '../models/Utilisateur';
import Usager from '../models/Usager';
import Partenaire from '../models/Partenaire';
import Entreprise from '../models/Entreprise';
import Interlocutor from '../models/Interlocutor';
import Convention from '../models/Convention';

// Library
import CheckingDateStatus from '../library/CheckingDate';

// Ajoute dans le data de la personne qui se connecte, une connection avec la date précise
const Login = async (dataId: object, screenType: string) => {
    const dateNow: Date = new Date();
    const dataFinded = await Data.findById(dataId);
    dataFinded?.numberOfConnections.push({ logged: new Date(dateNow.setHours(dateNow.getHours() + 1)), screen: screenType });
    await dataFinded?.save();
};

// Verifie la date du Jour, et modifie le data si le mois est différent.
const checkingDate = async () => {
    try {
        CheckingDateStatus.start(`CheckingDate's started`);
        const dateNow = new Date();

        // Vérifie si la date d'hier n'est pas le dernier jour du mois
        const numOfMonthOfYesterday: number = new Date(dateNow.setDate(dateNow.getDate() - 1)).getMonth() + 1;

        // Vérifie le mois de la date du jour
        const numOfMonthOfToday: number = new Date().getMonth() + 1;

        // Verifie si l'on change de mois
        if (numOfMonthOfYesterday !== numOfMonthOfToday) {
            // Si c'est le dernier mois de l'annee, on creer une nouvelle annee

            if (numOfMonthOfYesterday === 12) {
                // Creer un nouveau tableau pour une nouvelle année de données
                const allUtilisateur = await Utilisateur.find().select('datas');
                for (const datasTab of allUtilisateur) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });

                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    await newData.save();
                    // La methode "reverse()"" est appelé pour trier dand le bon oredre le tableau des datas
                    datasTab.datas.reverse();
                    await datasTab.save();
                    CheckingDateStatus.info(`A new year started for an utilisateur`);
                }
                const allUsager = await Usager.find().select('datas');
                for (const datasTab of allUsager) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });

                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    await newData.save();
                    datasTab.datas.reverse();
                    await datasTab.save();
                    CheckingDateStatus.info(`A new year started for an usager`);
                }
                const allPartenaire = await Partenaire.find().select('datas');
                for (const datasTab of allPartenaire) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });

                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    await newData.save();
                    datasTab.datas.reverse();
                    await datasTab.save();
                    CheckingDateStatus.info(`A new year started for a partenaire`);
                }
                const allConvention = await Convention.find().select('datas');
                for (const datasTab of allConvention) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });

                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    await newData.save();
                    datasTab.datas.reverse();
                    await datasTab.save();
                    CheckingDateStatus.info(`A new year started for a convention`);
                }
                const allInterlocutor = await Interlocutor.find().select('datas');
                for (const datasTab of allInterlocutor) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });

                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    await newData.save();
                    datasTab.datas.reverse();
                    await datasTab.save();
                    CheckingDateStatus.info(`A new year started for a Interlocutor`);
                }
                const allEntreprise = await Entreprise.find().select('datas');
                for (const datasTab of allEntreprise) {
                    const newData = new DataEntreprise({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    await newData.save();
                    datasTab.datas.reverse();
                    await datasTab.save();
                    CheckingDateStatus.info(`A new year started for an entreprise`);
                }
            } else {
                // Creer un nouveau tableau de données pour le nouveau mois en cours
                const allUtilisateur = await Utilisateur.find().select('datas').populate('datas');
                for (const datasTab of allUtilisateur) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        await newData.save();
                        await datasTab.save();
                        CheckingDateStatus.info(`First month started for a Utilisateur`);
                    } else {
                        const numLastMonthInData = await Data.findById(datasTab.datas[0].mounths[0]).select('month');

                        if (numLastMonthInData?.month !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            await newData.save();
                            datasTab.datas[0].mounths.reverse();
                            await datasTab.save();
                            CheckingDateStatus.info(`A new month started for an Utilisateur`);
                        } else {
                            CheckingDateStatus.info(`This month already exist for the Utilisateur`);
                        }
                    }
                }
                const allPartenaire = await Partenaire.find().select('datas');
                for (const datasTab of allPartenaire) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        await newData.save();
                        await datasTab.save();
                        CheckingDateStatus.info(`First month started for a Partenaire`);
                    } else {
                        const numLastMonthInData = await Data.findById(datasTab.datas[0].mounths[0]).select('month');
                        if (numLastMonthInData?.month !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            await newData.save();
                            datasTab.datas[0].mounths.reverse();
                            await datasTab.save();
                            CheckingDateStatus.info(`A new month started for a Partenaire`);
                        } else {
                            CheckingDateStatus.info(`This month already exist for the Partenaire`);
                        }
                    }
                }
                const allUsager = await Usager.find().select('datas');
                for (const datasTab of allUsager) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        await newData.save();
                        await datasTab.save();
                        CheckingDateStatus.info(`First month started for a Usager`);
                    } else {
                        const numLastMonthInData = await Data.findById(datasTab.datas[0].mounths[0]).select('month');
                        if (numLastMonthInData?.month !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            await newData.save();
                            datasTab.datas[0].mounths.reverse();
                            await datasTab.save();
                            CheckingDateStatus.info(`A new month started for an Usager`);
                        } else {
                            CheckingDateStatus.info(`This month already exist for the Usager`);
                        }
                    }
                }
                const allInterlocutor = await Interlocutor.find().select('datas');
                for (const datasTab of allInterlocutor) {
                    const newData = new Data({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        await newData.save();
                        await datasTab.save();
                        CheckingDateStatus.info(`First month started for a Interlocutor`);
                    } else {
                        const numLastMonthInData = await Data.findById(datasTab.datas[0].mounths[0]).select('month');
                        if (numLastMonthInData?.month !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            await newData.save();
                            datasTab.datas[0].mounths.reverse();
                            await datasTab.save();
                            CheckingDateStatus.info(`A new month started for an Interlocutor`);
                        } else {
                            CheckingDateStatus.info(`This month already exist for the Interlocutor`);
                        }
                    }
                }
                const allConvention = await Convention.find().select('datas');
                for (const datasTab of allConvention) {
                    const newData = new DataConvention({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        await newData.save();
                        await datasTab.save();
                        CheckingDateStatus.info(`First month started for a Convention`);
                    } else {
                        const numLastMonthInData = await DataConvention.findById(datasTab.datas[0].mounths[0]).select('month');
                        if (numLastMonthInData?.month !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            await newData.save();
                            datasTab.datas[0].mounths.reverse();
                            await datasTab.save();
                            CheckingDateStatus.info(`A new month started for a Convention`);
                        } else {
                            CheckingDateStatus.info(`This month already exist for the Convention`);
                        }
                    }
                }
                const allEntreprise = await Entreprise.find().select('datas');
                for (const datasTab of allEntreprise) {
                    const newData = new DataEntreprise({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        await newData.save();
                        await datasTab.save();
                        CheckingDateStatus.info(`First month started for a Entreprise`);
                    } else {
                        const numLastMonthInData = await DataEntreprise.findById(datasTab.datas[0].mounths[0]).select('month');
                        if (numLastMonthInData?.month !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            await newData.save();
                            datasTab.datas[0].mounths.reverse();
                            await datasTab.save();
                            CheckingDateStatus.info(`A new month started for a Entreprise`);
                        } else {
                            CheckingDateStatus.info(`This month already exist for the Entreprise`);
                        }
                    }
                }
            }
        } else {
            CheckingDateStatus.info("Nothing has been changed, it's the same month");
        }
    } catch (error) {
        CheckingDateStatus.error(error);
    }
};

export { Login, checkingDate };
