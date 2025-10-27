import express from "express";
import loginRoute from "./routes/auth/loginRoute.js";
import dotenv from "dotenv";
import serverless from "serverless-http";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(express.json());
// app.use(authApiKey);
app.use(cors({
    origin: process.env.CORS_ORIGIN, // DA CAMBIARE
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type"],
}));
app.use("/.netlify/functions/index/auth/login", loginRoute);
app.get("/.netlify/functions/index", (req, res) => res.send("API attiva su Netlify"));
export const handler = serverless(app);
//# sourceMappingURL=index.js.map