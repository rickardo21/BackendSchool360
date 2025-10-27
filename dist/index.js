import express from "express";
import loginRoute from "./routes/auth/loginRoute.js";
import dotenv from "dotenv";
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
app.use("/auth/login", loginRoute); // url cambiato
app.get("/", (req, res // url cambiato
) => res.send("API attiva"));
app.listen(PORT, "0.0.0.0", () => {
    console.log("server listening on localhost:" + PORT);
});
//# sourceMappingURL=index.js.map