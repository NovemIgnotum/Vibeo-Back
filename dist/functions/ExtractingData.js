"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingDate = exports.Login = void 0;
const Data_1 = __importDefault(require("../models/Data"));
const DataEntreprise_1 = __importDefault(require("../models/DataEntreprise"));
const DataConvention_1 = __importDefault(require("../models/DataConvention"));
const Utilisateur_1 = __importDefault(require("../models/Utilisateur"));
const Usager_1 = __importDefault(require("../models/Usager"));
const Partenaire_1 = __importDefault(require("../models/Partenaire"));
const Entreprise_1 = __importDefault(require("../models/Entreprise"));
const Interlocutor_1 = __importDefault(require("../models/Interlocutor"));
const Convention_1 = __importDefault(require("../models/Convention"));
const CheckingDate_1 = __importDefault(require("../library/CheckingDate"));
const Login = (dataId, screenType) => __awaiter(void 0, void 0, void 0, function* () {
    const dateNow = new Date();
    const dataFinded = yield Data_1.default.findById(dataId);
    dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.numberOfConnections.push({ logged: new Date(dateNow.setHours(dateNow.getHours() + 1)), screen: screenType });
    yield (dataFinded === null || dataFinded === void 0 ? void 0 : dataFinded.save());
});
exports.Login = Login;
const checkingDate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        CheckingDate_1.default.start(`CheckingDate's started`);
        const dateNow = new Date();
        const numOfMonthOfYesterday = new Date(dateNow.setDate(dateNow.getDate() - 1)).getMonth() + 1;
        const numOfMonthOfToday = new Date().getMonth() + 1;
        if (numOfMonthOfYesterday !== numOfMonthOfToday) {
            if (numOfMonthOfYesterday === 12) {
                const allUtilisateur = yield Utilisateur_1.default.find().select('datas');
                for (const datasTab of allUtilisateur) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    yield newData.save();
                    datasTab.datas.reverse();
                    yield datasTab.save();
                    CheckingDate_1.default.info(`A new year started for an utilisateur`);
                }
                const allUsager = yield Usager_1.default.find().select('datas');
                for (const datasTab of allUsager) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    yield newData.save();
                    datasTab.datas.reverse();
                    yield datasTab.save();
                    CheckingDate_1.default.info(`A new year started for an usager`);
                }
                const allPartenaire = yield Partenaire_1.default.find().select('datas');
                for (const datasTab of allPartenaire) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    yield newData.save();
                    datasTab.datas.reverse();
                    yield datasTab.save();
                    CheckingDate_1.default.info(`A new year started for a partenaire`);
                }
                const allConvention = yield Convention_1.default.find().select('datas');
                for (const datasTab of allConvention) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    yield newData.save();
                    datasTab.datas.reverse();
                    yield datasTab.save();
                    CheckingDate_1.default.info(`A new year started for a convention`);
                }
                const allInterlocutor = yield Interlocutor_1.default.find().select('datas');
                for (const datasTab of allInterlocutor) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    yield newData.save();
                    datasTab.datas.reverse();
                    yield datasTab.save();
                    CheckingDate_1.default.info(`A new year started for a Interlocutor`);
                }
                const allEntreprise = yield Entreprise_1.default.find().select('datas');
                for (const datasTab of allEntreprise) {
                    const newData = new DataEntreprise_1.default({
                        month: numOfMonthOfToday
                    });
                    datasTab.datas.push({
                        year: new Date().getFullYear(),
                        mounths: [Object(newData)]
                    });
                    yield newData.save();
                    datasTab.datas.reverse();
                    yield datasTab.save();
                    CheckingDate_1.default.info(`A new year started for an entreprise`);
                }
            }
            else {
                const allUtilisateur = yield Utilisateur_1.default.find().select('datas').populate('datas');
                for (const datasTab of allUtilisateur) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        yield newData.save();
                        yield datasTab.save();
                        CheckingDate_1.default.info(`First month started for a Utilisateur`);
                    }
                    else {
                        const numLastMonthInData = yield Data_1.default.findById(datasTab.datas[0].mounths[0]).select('month');
                        if ((numLastMonthInData === null || numLastMonthInData === void 0 ? void 0 : numLastMonthInData.month) !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            yield newData.save();
                            datasTab.datas[0].mounths.reverse();
                            yield datasTab.save();
                            CheckingDate_1.default.info(`A new month started for an Utilisateur`);
                        }
                        else {
                            CheckingDate_1.default.info(`This month already exist for the Utilisateur`);
                        }
                    }
                }
                const allPartenaire = yield Partenaire_1.default.find().select('datas');
                for (const datasTab of allPartenaire) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        yield newData.save();
                        yield datasTab.save();
                        CheckingDate_1.default.info(`First month started for a Partenaire`);
                    }
                    else {
                        const numLastMonthInData = yield Data_1.default.findById(datasTab.datas[0].mounths[0]).select('month');
                        if ((numLastMonthInData === null || numLastMonthInData === void 0 ? void 0 : numLastMonthInData.month) !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            yield newData.save();
                            datasTab.datas[0].mounths.reverse();
                            yield datasTab.save();
                            CheckingDate_1.default.info(`A new month started for a Partenaire`);
                        }
                        else {
                            CheckingDate_1.default.info(`This month already exist for the Partenaire`);
                        }
                    }
                }
                const allUsager = yield Usager_1.default.find().select('datas');
                for (const datasTab of allUsager) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        yield newData.save();
                        yield datasTab.save();
                        CheckingDate_1.default.info(`First month started for a Usager`);
                    }
                    else {
                        const numLastMonthInData = yield Data_1.default.findById(datasTab.datas[0].mounths[0]).select('month');
                        if ((numLastMonthInData === null || numLastMonthInData === void 0 ? void 0 : numLastMonthInData.month) !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            yield newData.save();
                            datasTab.datas[0].mounths.reverse();
                            yield datasTab.save();
                            CheckingDate_1.default.info(`A new month started for an Usager`);
                        }
                        else {
                            CheckingDate_1.default.info(`This month already exist for the Usager`);
                        }
                    }
                }
                const allInterlocutor = yield Interlocutor_1.default.find().select('datas');
                for (const datasTab of allInterlocutor) {
                    const newData = new Data_1.default({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        yield newData.save();
                        yield datasTab.save();
                        CheckingDate_1.default.info(`First month started for a Interlocutor`);
                    }
                    else {
                        const numLastMonthInData = yield Data_1.default.findById(datasTab.datas[0].mounths[0]).select('month');
                        if ((numLastMonthInData === null || numLastMonthInData === void 0 ? void 0 : numLastMonthInData.month) !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            yield newData.save();
                            datasTab.datas[0].mounths.reverse();
                            yield datasTab.save();
                            CheckingDate_1.default.info(`A new month started for an Interlocutor`);
                        }
                        else {
                            CheckingDate_1.default.info(`This month already exist for the Interlocutor`);
                        }
                    }
                }
                const allConvention = yield Convention_1.default.find().select('datas');
                for (const datasTab of allConvention) {
                    const newData = new DataConvention_1.default({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        yield newData.save();
                        yield datasTab.save();
                        CheckingDate_1.default.info(`First month started for a Convention`);
                    }
                    else {
                        const numLastMonthInData = yield DataConvention_1.default.findById(datasTab.datas[0].mounths[0]).select('month');
                        if ((numLastMonthInData === null || numLastMonthInData === void 0 ? void 0 : numLastMonthInData.month) !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            yield newData.save();
                            datasTab.datas[0].mounths.reverse();
                            yield datasTab.save();
                            CheckingDate_1.default.info(`A new month started for a Convention`);
                        }
                        else {
                            CheckingDate_1.default.info(`This month already exist for the Convention`);
                        }
                    }
                }
                const allEntreprise = yield Entreprise_1.default.find().select('datas');
                for (const datasTab of allEntreprise) {
                    const newData = new DataEntreprise_1.default({
                        month: numOfMonthOfToday
                    });
                    if (Object(datasTab).datas.length === 0) {
                        datasTab.datas.push({
                            year: new Date().getFullYear(),
                            mounths: [Object(newData)]
                        });
                        yield newData.save();
                        yield datasTab.save();
                        CheckingDate_1.default.info(`First month started for a Entreprise`);
                    }
                    else {
                        const numLastMonthInData = yield DataEntreprise_1.default.findById(datasTab.datas[0].mounths[0]).select('month');
                        if ((numLastMonthInData === null || numLastMonthInData === void 0 ? void 0 : numLastMonthInData.month) !== numOfMonthOfToday) {
                            datasTab.datas[0].mounths.push(Object(newData));
                            yield newData.save();
                            datasTab.datas[0].mounths.reverse();
                            yield datasTab.save();
                            CheckingDate_1.default.info(`A new month started for a Entreprise`);
                        }
                        else {
                            CheckingDate_1.default.info(`This month already exist for the Entreprise`);
                        }
                    }
                }
            }
        }
        else {
            CheckingDate_1.default.info("Nothing has been changed, it's the same month");
        }
    }
    catch (error) {
        CheckingDate_1.default.error(error);
    }
});
exports.checkingDate = checkingDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0cmFjdGluZ0RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL0V4dHJhY3RpbmdEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBEQUFrQztBQUNsQyw4RUFBc0Q7QUFDdEQsOEVBQXNEO0FBRXRELHdFQUFnRDtBQUNoRCw4REFBc0M7QUFDdEMsc0VBQThDO0FBQzlDLHNFQUE4QztBQUM5QywwRUFBa0Q7QUFDbEQsc0VBQThDO0FBRzlDLDJFQUF5RDtBQUd6RCxNQUFNLEtBQUssR0FBRyxDQUFPLE1BQWMsRUFBRSxVQUFrQixFQUFFLEVBQUU7SUFDdkQsTUFBTSxPQUFPLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3pILE1BQU0sQ0FBQSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsSUFBSSxFQUFFLENBQUEsQ0FBQztBQUM3QixDQUFDLENBQUEsQ0FBQztBQXNSTyxzQkFBSztBQW5SZCxNQUFNLFlBQVksR0FBRyxHQUFTLEVBQUU7SUFDNUIsSUFBSSxDQUFDO1FBQ0Qsc0JBQWtCLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUczQixNQUFNLHFCQUFxQixHQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENB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