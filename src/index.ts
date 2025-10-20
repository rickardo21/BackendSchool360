import express from "express";
import { authApiKey } from "./middleware/authApiKey.js";
import loginRoute from "./routes/loginRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: "http://192.168.1.104:8100/", // porta frontend
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.options("/login", (req, res) => {
	res.sendStatus(200); // risponde ad OPTIONS
});

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.use("/login", loginRoute);

app.listen(3000, "0.0.0.0", () => {
	console.log("Server running on http://0.0.0.0:3000");
});
