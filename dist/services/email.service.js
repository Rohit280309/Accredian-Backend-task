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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, type, id, course }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: type === "RefSend" ? "Invitation for Course" : "null",
            html: `<p>Click <a href="${process.env.CLIENT_URL}/addReferral/${course}/${id}">here</a> to get the course 
              or copy paste the link below in your browser. <br>
              ${process.env.CLIENT_URL}/addReferral/${course}/${id} </p>`
        };
        return transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return Object.assign(Object.assign({}, err), { success: false });
            }
            else {
                console.log("Email sent: " + info.response);
                return Object.assign(Object.assign({}, info), { success: true });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.sendMail = sendMail;
