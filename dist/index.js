"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const refer_1 = __importDefault(require("./routes/refer"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", auth_1.default);
app.use("/api", refer_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
