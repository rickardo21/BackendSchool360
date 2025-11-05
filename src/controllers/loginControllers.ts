import type { Request, Response } from "express";
import sendRequest from "../utils/sendRequest.js";
import { Grades, Lessons, User } from "../models/type.js";
import calcolaMedia from "../utils/media.js";
import axios from "axios";

type RequestType<T> = {
	data?: T | null;
	status: number;
	message?: string;
};

export const loginController = async (req: Request, res: Response) => {
	try {
		console.log("=== LOGIN REQUEST START ===");
		console.log("Body ricevuto:", JSON.stringify(req.body, null, 2));
		console.log("Headers ricevuti:", JSON.stringify(req.headers, null, 2));

		const body = req.body;

		// LOG 2: Verifica i dati estratti
		console.log("Username estratto:", body.ident);
		console.log("Password presente:", !!body.pass);
		console.log("Password length:", body.pass?.length);

		// ⭐ NUOVO LOG: Verifica l'encoding dei caratteri
		console.log(
			"Password chars:",
			body.pass?.split("").map((c: string) => c.charCodeAt(0))
		);
		console.log(
			"Username chars:",
			body.ident?.split("").map((c: string) => c.charCodeAt(0))
		);

		// LOG 3: Verifica il body che stai per inviare
		console.log(
			"Body da inviare all'API esterna:",
			JSON.stringify(body, null, 2)
		);

		// ⭐ NUOVO LOG: Prima della chiamata a sendRequest
		console.log("=== CHIAMATA SENDREQUEST ===");
		console.log("Endpoint:", "auth/login");
		console.log("Method:", "POST");

		const result: RequestType<User> = await sendRequest<User>(
			"auth/login",
			"POST",
			body
		);

		if (!result.data) {
			return res.status(400).json({
				message: result.message || "data is null",
			});
		}

		const gradesResult = await sendRequest<Grades>(
			`students/${result.data.ident.substring(1)}/grades`,
			"GET",
			null,
			result.data.token
		);

		if (
			!gradesResult.data ||
			!Array.isArray(gradesResult.data.grades) ||
			gradesResult.data.grades.length === 0
		) {
			return res.status(404).json({
				message: "grades not found",
			});
		}

		const userData: User = result.data;

		userData.lastMarks =
			gradesResult.data?.grades?.[0]?.displayValue ?? "N/A";

		let subject;

		const str =
			gradesResult.data.grades[0]!.subjectDesc.trim().split(/\s+/);
		if (str.length > 1) {
			subject = str[0] + "...";
		} else subject = str[0];

		userData.lastSubject = subject ? subject : "N/A";

		const mark = gradesResult.data?.grades?.[0]?.decimalValue ?? "a";

		userData.marksColor =
			mark == "a"
				? "#18b2ff5c"
				: mark >= 5 && mark < 6
				? "#ff7418aa"
				: mark < 5
				? "#ff4d4da2"
				: "#3ce339aa";

		userData.mediaVoti =
			Math.round(calcolaMedia(gradesResult.data) * 10) / 10;

		return res.status(result.status).json(userData);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
