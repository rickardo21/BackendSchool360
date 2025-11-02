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
		const body = req.body;
		console.log("loginControllerBody: " + req.body);

		// Chiamata generica tipizzata con User
		// const result: RequestType<User> = await sendRequest<User>(
		// 	"auth/login",
		// 	"POST",
		// 	body
		// );

		console.log(process.env.Z_DEV_APIKEY);
		console.log(process.env.USER_AGENT);

		// const resu = await fetch(
		// 	"https://web.spaggiari.eu/rest/v1/auth/login",
		// 	{
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			"Z-Dev-ApiKey": process.env.Z_DEV_APIKEY ?? "",
		// 			"User-Agent": process.env.USER_AGENT ?? "",
		// 		},
		// 		body: JSON.stringify(body),
		// 	}
		// );

		const config = {
			headers: {
				"Content-Type": "application/json",
				"Z-Dev-ApiKey": process.env.Z_DEV_APIKEY ?? "",
				"User-Agent": process.env.USER_AGENT ?? "",
			},
		};

		const data = {
			ident: "S9477262T",
			pass: "Rickardo@07",
			app_code: "CVVS",
		};

		const result = await axios.post(
			"https://web.spaggiari.eu/rest/v1/auth/login",
			data,
			config
		);

		// const result = await resu.json();

		console.log(result);

		return res.status(result.status).json(result.data);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};

// Verifica che data esista
// if (!result.data) {
// 	return res.status(400).json({
// 		message: result.message || "data is null",
// 	});
// }

// // Richiesta dei voti
// const gradesResult = await sendRequest<Grades>(
// 	`students/${result.data.ident.substring(1)}/grades`,
// 	"GET",
// 	null,
// 	result.data.token
// );

// if (
// 	!gradesResult.data ||
// 	!Array.isArray(gradesResult.data.grades) ||
// 	gradesResult.data.grades.length === 0
// ) {
// 	return res.status(404).json({
// 		message: "grades not found",
// 	});
// }

// // Aggiorna la proprietà class con sicurezza
// const userData: User = result.data;

// userData.lastMarks =
// 	gradesResult.data?.grades?.[0]?.displayValue ?? "N/A";

// let subject;

// const str =
// 	gradesResult.data.grades[0]!.subjectDesc.trim().split(/\s+/);
// if (str.length > 1) {
// 	subject = str[0] + "...";
// } else subject = str[0];

// userData.lastSubject = subject ? subject : "N/A";

// const mark = gradesResult.data?.grades?.[0]?.decimalValue ?? "a";

// userData.marksColor =
// 	mark == "a"
// 		? "#18b2ff5c"
// 		: mark >= 5 && mark < 6
// 		? "#ff7418aa"
// 		: mark < 5
// 		? "#ff4d4da2"
// 		: "#3ce339aa";

// userData.mediaVoti =
// 	Math.round(calcolaMedia(gradesResult.data) * 10) / 10;
