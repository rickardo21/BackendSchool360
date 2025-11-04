import express from "express";
import loginRoute from "./routes/auth/loginRoute.js";
import dotenv from "dotenv";

import cors from "cors";
import lessonsRoute from "./routes/lessonsRoute.js";
import { authApiKey } from "./middleware/authApiKey.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());
// app.use(authApiKey);

app.use(
	cors({
		origin: process.env.CORS_ORIGIN, // DA CAMBIARE
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["content-type", "auth-user-token"],
	})
);

app.use("/auth/login", loginRoute);
app.use("/lessons", lessonsRoute);

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => res.send("API attiva"));
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
}); // health checking

app.listen(PORT, "0.0.0.0", () => {
	console.log("server listening on localhost:" + PORT);
});
