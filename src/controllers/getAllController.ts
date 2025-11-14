import { Request, Response } from "express";
import sendRequest from "../utils/sendRequest.js";
import {
	absence,
	Absences,
	Bacheca,
	Compiti,
	Grades,
	HomeworkEvent,
	Lessons,
	Note,
	Notes,
	User,
	UserModelFullOfInfo,
} from "../models/type.js";
import dateFormatter from "../utils/dateFormatter.js";

export const getAllController = async (req: Request, res: Response) => {
	try {
		// CONST
		const body = req.body;

		// LOGIN
		const login = await sendRequest<User>("auth/login/", "POST", body);

		if (!login.data) {
			return res.status(400).json({
				message: login.message || "data is null",
			});
		}

		const user = login.data;
		const ident = user.ident.substring(1);
		const token = user.token;

		// ASSENZE
		const assenze = await sendRequest<Absences>(
			`students/${ident}/absences/details`,
			"GET",
			null,
			token
		);

		if (!assenze.data) {
			return res.status(assenze.status).send(assenze.message);
		}

		const date = dateFormatter(user.release);

		const todaystatus = await sendRequest<Absences>(
			`students/${ident}/absences/details/${date}/${date}`,
			"GET",
			null,
			token
		);

		if (!todaystatus.data) {
			return res.status(todaystatus.status).send(todaystatus.message);
		}

		// GRADE
		const grade = await sendRequest<Grades>(
			`students/${ident}/grades`,
			"GET",
			null,
			token
		);

		if (!grade.data) {
			return res.status(grade.status).send(grade.message);
		}

		// COMPITI
		const compiti = await sendRequest<Compiti>(
			`students/${ident}/homeworks`,
			"GET",
			null,
			token
		);

		if (!compiti.data) {
			return res.status(compiti.status).send(compiti.message);
		}

		let compitiPerOggi: Compiti = { items: [] };

		compiti.data.items.forEach((item: HomeworkEvent) => {
			if (
				new Date(item.expiryDate).toDateString() ===
				new Date().toDateString()
			) {
				compitiPerOggi.items.push(item);
			}

			console.log(
				new Date(item.expiryDate).toDateString() ===
					new Date().toDateString()
			);
		});

		// LESSONS
		const lezioni = await sendRequest<Lessons>(
			`students/${ident}/lessons/${dateFormatter(user.release)}`,
			"GET",
			null,
			token
		);

		if (!lezioni.data) {
			return res.status(lezioni.status).send(lezioni.message);
		}

		// PERIODS
		const periods = await sendRequest<Absences>(
			`students/${ident}/periods`,
			"GET",
			null,
			token
		);

		// CHECK IF RESPONSE IS OK
		if (!periods.data) {
			return res.status(periods.status).send(periods.message);
		}

		// UPGRADING THE USER MODEL
		const data: UserModelFullOfInfo = {
			user: user,
			grades: grade.data,
			lessons: lezioni.data,
			absence: assenze.data,
			compiti: compitiPerOggi,
			todaystatus:
				todaystatus.data.events[0] || (new Object() as absence),
		};

		// RETURN THE DATA
		res.status(login.status).send(data);
	} catch (error: any) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
