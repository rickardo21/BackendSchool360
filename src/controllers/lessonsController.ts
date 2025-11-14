import type { Request, Response } from "express";
import sendRequest from "../utils/sendRequest.js";
import { Lessons } from "../models/type.js";
import { sortLessonsByHPos } from "../utils/sort.js";

export const lessonsController = async (req: Request, res: Response) => {
	try {
		// CONST
		const { ident, date } = req.query as { ident: string; date: string };
		const tokenHeader = req.headers?.["auth-user-token"] || "";
		const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

		// RESPONSE
		const response = await sendRequest<Lessons>(
			`students/${ident}/lessons/${date}`,
			"GET",
			null,
			token
		);

		// CHECK IS THE RESPONSE IS OK
		if (!response.data || !Array.isArray(response.data.lessons)) {
			return res.status(404).json({
				message: "lessons not found",
			});
		}

		// SORT THE LESSONS
		const d = sortLessonsByHPos(response.data.lessons);
		response.data.lessons = d;

		// RETURN THE DATA
		return res.status(200).json(response.data);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
