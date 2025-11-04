import express from "express";
import loginRoute from "./routes/auth/loginRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import lessonsRoute from "./routes/lessonsRoute.js";
import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.use(express.json());
// app.use(authApiKey);
app.use(cors({
    origin: process.env.CORS_ORIGIN, // DA CAMBIARE
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["content-type", "auth-user-token"],
}));
app.use("/auth/login", loginRoute);
app.use("/lessons", lessonsRoute);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.get("/", (req, res) => res.send("API attiva"));
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
}); // health checking
app.post("/test-curl-login", async (req, res) => {
    const curl = "dawmdaw";
    try {
        const bodyJson = JSON.stringify(req.body);
        const curlCommand = `curl -X POST https://web.spaggiari.eu/rest/v1/auth/login \
            -H "Content-Type: application/json" \
            -H "Z-Dev-ApiKey: Tg1NWEwNGIgIC0K" \
            -H "User-Agent: CVVS/std/4.2.3 Android/12" \
            -d '${bodyJson}' \
            -v --http1.1`;
        const { stdout, stderr } = await execAsync(curlCommand);
        res.json({ stdout, stderr });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, "0.0.0.0", () => {
    console.log("server listening on localhost:" + PORT);
});
//# sourceMappingURL=index.js.map