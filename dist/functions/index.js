import express from "express";
import serverless from "serverless-http";
import loginRoute from "./routes/loginRoute.js";
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
app.use("/login", loginRoute);
// Rimuovi app.listen()
// Esporta invece il handler compatibile con Netlify Functions
const handler = serverless(app);
export { handler };
//# sourceMappingURL=index.js.map