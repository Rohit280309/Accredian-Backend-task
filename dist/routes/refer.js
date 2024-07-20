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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const refer_1 = require("../controllers/refer");
const router = express_1.default.Router();
router.post("/refer", [
    (0, express_validator_1.body)("yourName", "Enter your name").isLength({ min: 2 }),
    (0, express_validator_1.body)("yourEmail", "Enter valid email").isEmail(),
    (0, express_validator_1.body)("friendName", "Enter your friend name").isLength({ min: 2 }),
    (0, express_validator_1.body)("friendEmail", "Enter your friend email").isEmail(),
    (0, express_validator_1.body)("course", "Provide a course name").isLength({ min: 2 }),
], authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    yield (0, refer_1.ReferHandler)(req, res);
}));
router.post("/addReferral", [
    (0, express_validator_1.body)("course", "Enter course").isLength({ min: 2 }),
    (0, express_validator_1.body)("id", "Enter id").isNumeric(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    yield (0, refer_1.addReferralHandler)(req, res);
}));
exports.default = router;
