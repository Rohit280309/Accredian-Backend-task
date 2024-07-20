import express from "express"
import cors from "cors"
import AuthRouter from "./routes/auth"
import ReferRouter from "./routes/refer"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", AuthRouter)
app.use("/api", ReferRouter)

const PORT = process.env.PORT!;

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
})