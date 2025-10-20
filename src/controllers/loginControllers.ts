import type { Request, Response } from "express";
import fetch from "node-fetch";

import { _headers } from "../utils/headerUtils.js";

export const loginController = async (req: Request, res: Response) => {
	try {
		const body = req.body;
		const header = _headers();

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
	} catch (error) {
		console.error("Errore nel loginController:", error);
		res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
