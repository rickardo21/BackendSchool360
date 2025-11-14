import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import loginRoute from "./routes/auth/loginRoute.js";
import lessonsRoute from "./routes/lessonsRoute.js";
import homeWorkRoute from "./routes/homeWorkRoute.js";
import noteRoute from "./routes/noteRoute.js";
import assenzeRoute from "./routes/assenzeRoute.js";

import { authApiKey } from "./middleware/authApiKey.js";
import bachecaRoute from "./routes/bachecaRoute.js";
import periodRoute from "./routes/periodRoute.js";
import gradeRoute from "./routes/gradeRoute.js";
import getAllRoute from "./routes/getAllRoute.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 8080;

app.use(express.json());
// app.use(authApiKey);

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["content-type", "auth-user-token"],
	})
);

app.use("/auth/login", loginRoute);
app.use("/lessons", lessonsRoute);
app.use("/homework", homeWorkRoute);
app.use("/notes", noteRoute);
app.use("/bacheca", bachecaRoute);
app.use("/assenze", assenzeRoute);
app.use("/periods", periodRoute);
app.use("/grades", gradeRoute);
app.use("/getAll", getAllRoute);

app.get("/", (req, res) => res.send("API attiva"));
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
}); // health checking

app.listen(PORT, "0.0.0.0", () => {
	console.log("server listening on localhost:" + PORT);
});
