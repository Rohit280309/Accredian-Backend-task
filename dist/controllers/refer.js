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
exports.addReferralHandler = exports.ReferHandler = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const email_service_1 = require("../services/email.service");
const ReferHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { yourName, yourEmail, friendName, friendEmail, friendPhone, course } = req.body;
        const referral = yield prisma_1.default.referral.create({
            data: {
                referrerName: yourName,
                referrerEmail: yourEmail,
                referredName: friendName,
                referredEmail: friendEmail,
                course: course,
                friendPhone: friendPhone | 0,
                status: "PENDING"
            }
        });
        const mail = yield (0, email_service_1.sendMail)({
            email: friendEmail,
            type: "RefSend",
            id: referral.id,
            course: course
        });
        yield prisma_1.default.referral.update({
            where: {
                id: referral.id
            },
            data: {
                status: "SENT"
            }
        });
        res.status(200).json({ success: true, message: "Referral send" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.ReferHandler = ReferHandler;
const addReferralHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { course, id } = req.body;
        const referral = yield prisma_1.default.referral.update({
            where: {
                id: parseInt(id),
                course: course
            },
            data: {
                status: "COMPLETED"
            }
        });
        return res.status(200).json({ success: true, message: "Referral Added" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.addReferralHandler = addReferralHandler;
