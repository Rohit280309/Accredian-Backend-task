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
exports.userLoginHandler = exports.userSignUpHandler = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const userSignUpHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield prisma_1.default.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(password, salt);
        yield prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hash
            }
        });
        return res.status(201).json({ success: true, message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.userSignUpHandler = userSignUpHandler;
const userLoginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const checkPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!checkPassword) {
            return res.status(201).json({ success: false, message: "Enter correct password" });
        }
        const data = { user: { id: user.id } };
        const token = jsonwebtoken_1.default.sign(data, JWT_SECRET);
        return res.status(200).json({ success: true, token: token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.userLoginHandler = userLoginHandler;
