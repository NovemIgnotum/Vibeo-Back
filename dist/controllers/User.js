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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Response_1 = __importDefault(require("../library/Response"));
const bcrypt = require('bcrypt');
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstName || !req.body.pseudo) {
            Response_1.default.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        }
        else {
            if (yield User_1.default.findOne({ email: req.body.email })) {
                Response_1.default.error('This email is already used');
                return res.status(400).json('This email is already used');
            }
            else {
                if (yield User_1.default.findOne({ pseudo: req.body.pseudo })) {
                    Response_1.default.error('This pseudo is already used');
                    return res.status(400).json('This pseudo is already used');
                }
                else {
                    if (req.body.role === 'user') {
                        const user = new User_1.default({
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            password: req.body.password,
                            name: req.body.name,
                            firstName: req.body.firstName,
                            role: 'user',
                            profilePicture: null,
                            tokenVersion: 0
                        });
                        const salt = yield bcrypt.genSalt(10);
                        const hashedPassword = yield bcrypt.hash(req.body.password, salt);
                        user.password = hashedPassword;
                        yield user.save();
                        res.status(201).json({ message: 'User created', user });
                    }
                    else {
                        const user = new User_1.default({
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            password: req.body.password,
                            name: req.body.name,
                            firstName: req.body.firstName,
                            tokenVersion: 0,
                            profilePicture: null,
                            role: 'admin'
                        });
                        const salt = yield bcrypt.genSalt(10);
                        const hashedPassword = yield bcrypt.hash(req.body.password, salt);
                        user.password = hashedPassword;
                        yield user.save();
                        res.status(201).json({ message: 'Admin created', user });
                    }
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json('User not found');
        }
        user.tokenVersion += 1;
        yield user.save();
        res.status(200).json({ message: 'User logged out' });
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            Response_1.default.error('One or more fields are missing');
            return res.status(400).json('One or more fields are missing');
        }
        else {
            const user = yield User_1.default.findOne({ email: req.body.email });
            if (!user) {
                Response_1.default.error('Email not found');
                return res.status(400).json('Email not found');
            }
            else {
                const validPassword = yield bcrypt.compare(req.body.password, user.password);
                if (!validPassword) {
                    Response_1.default.error('Invalid password');
                    return res.status(400).json('Invalid password');
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: '30m' });
                    return res.status(200).json({ message: 'user connected', token });
                }
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.find();
        res.status(200).json(user);
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            Response_1.default.error('Id field is missing');
            return res.status(400).json('Id field is missing');
        }
        else {
            const user = yield User_1.default.findById(req.params.id);
            if (!user) {
                Response_1.default.error('This user does not exist');
                return res.status(400).json('This user does not exist');
            }
            else {
                res.status(200).json(user);
            }
        }
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
});
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield User_1.default.find({ role: 'user' });
        console.log('---------------------------------------------------');
        console.log(admins);
        res.status(200).json(admins);
    }
    catch (error) {
        Response_1.default.error({ message: 'Error Catched', error });
        res.status(500).json({ message: 'Error Catched', error });
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req.body', req.body);
        const userId = req.params.id;
        if (!userId) {
            Response_1.default.error('Id field is missing');
            return res.status(400).json({ message: 'Id field is missing' });
        }
        const user = yield User_1.default.findById(userId);
        if (!user) {
            Response_1.default.error('This user does not exist');
            return res.status(404).json({ message: 'This user does not exist' });
        }
        if (req.body.pseudo) {
            user.pseudo = req.body.pseudo;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.name) {
            user.name = req.body.name;
        }
        if (req.body.firstName) {
            user.firstName = req.body.firstName;
        }
        if (req.body.tokenVersion) {
            user.tokenVersion = req.body.tokenVersion;
        }
        if (req.body.role) {
            user.role = req.body.role;
        }
        yield user.save();
        res.status(200).json({ message: 'User updated', user });
    }
    catch (error) {
        Response_1.default.error(error);
        res.status(500).json({ message: 'Error Catched', error });
    }
});
exports.default = { createUser, logoutUser, getAllUsers, getUser, getAllAdmins, update, login };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0VBQStCO0FBQy9CLDBEQUFrQztBQUNsQyxtRUFBeUM7QUFJekMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQU0sVUFBVSxHQUFHLENBQU8sR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3JELElBQUksQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckcsa0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUMvQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDbEUsQ0FBQzthQUFNLENBQUM7WUFDSixJQUFJLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsa0JBQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQzlELENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLE1BQU0sY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLENB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