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
exports.Schema = exports.ValidateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const Logging_1 = __importDefault(require("../library/Logging"));
const ValidateSchema = (schema) => {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.validateAsync(req.body);
                next();
            }
            catch (error) {
                Logging_1.default.error(error);
                return res.status(422).json({ message: error });
            }
        });
    };
};
exports.ValidateSchema = ValidateSchema;
exports.Schema = {
    admin: {
        create: joi_1.default.object({
            email: joi_1.default.string().required(),
            account: {
                name: joi_1.default.string().required(),
                firstname: joi_1.default.string().required()
            }
        })
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdGVTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWlkZGxld2FyZXMvVmFsaWRhdGVTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdDO0FBRXhDLGlFQUEwQztBQUduQyxNQUFNLGNBQWMsR0FBRyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtJQUNuRCxPQUFPLFVBQWdCLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7O1lBQ2xFLElBQUksQ0FBQztnQkFDRCxNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNiLGlCQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDcEQsQ0FBQztRQUNMLENBQUM7S0FBQSxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBVlcsUUFBQSxjQUFjLGtCQVV6QjtBQUVXLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNILE1BQU0sRUFBRSxhQUFHLENBQUMsTUFBTSxDQUFjO1lBQzVCLEtBQUssRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzlCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsU0FBUyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7YUFDckM7U0FDSixDQUFDO0tBQ0w7Q0FDSixDQUFDIn0=