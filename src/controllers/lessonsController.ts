import type { Request, Response } from "express";
import sendRequest from "../utils/sendRequest.js";
import { Lesson, Lessons } from "../models/type.js";
import { sortLessonsByHPos } from "../utils/sort.js";

type RequestType<T> = {
	data?: T | null;
	status: number;
	message?: string;
};

export const lessonsController = async (req: Request, res: Response) => {
	try {
		const body = req.body;

		const tokenHeader = req.headers?.["auth-user-token"] || "";
		const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

		const response: RequestType<Lessons> = await sendRequest(
			`students/${body.ident.substring(1)}/lessons/${body.date}`,
			"GET",
			null,
			token
		);

		if (!response.data || !Array.isArray(response.data.lessons)) {
			return res.status(404).json({
				message: "lessons not found",
			});
		}

		const d = sortLessonsByHPos(response.data.lessons);

		response.data.lessons = d;

		return res.status(200).json(response.data);
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
