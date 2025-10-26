import express from "express";
import serverless from "serverless-http";
const app = express();
app.use(express.json());
// Se vuoi riattivare CORS:
// app.use(
//   cors({
//     origin: "http://192.168.1.104:8100",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// app.use("/login", loginRoute);
app.post("/login", async (req, res) => {
    try {
        const body = req.body;
        var header = {
            "Content-Type": "application/json",
            "Z-Dev-ApiKey": "Tg1NWEwNGIgIC0K",
            "User-Agent": "CVVS/std/4.2.3 Android/12",
        };
        // "auth/login"
        const url = "https://web.spaggiari.eu/rest/v1/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: header,
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            const text = await response.text();
            return res
                .status(response.status)
                .json({ message: "Risposta non JSON ricevuta", content: text });
        }
        const data = await response.json();
        res.status(response.status).json(data);
    }
    catch (error) {
        console.error("Errore nel loginController:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
});
// Rimuovi app.listen()
// Esporta invece il handler compatibile con Netlify Functions
const handler = serverless(app);
export { handler };
//# sourceMappingURL=index.js.map