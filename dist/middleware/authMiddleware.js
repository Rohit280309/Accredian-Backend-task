"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(500).json({ message: "Please authenticate using valid token" });
        }
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};
exports.authMiddleware = authMiddleware;
