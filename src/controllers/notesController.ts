import { Request, Response } from "express";
import sendRequest from "../utils/sendRequest.js";
import { Notes } from "../models/type.js";

export const noteController = async (req: Request, res: Response) => {
	try {
		// CONST
		const ident = req.query.ident as string;
		const tokenHeader = req.headers?.["auth-user-token"] || "";
		const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;

		// RESPONSE
		const response = await sendRequest<Notes>(
			`students/${ident}/notes/all`,
			"GET",
			null,
			token
		);

		// CHECK IF RESPONSE IS OK
		if (!response.data) {
			return res.status(response.status).send(response.message);
		}

		// RETURN THE DATA
		return res.status(response.status).send(response.data);
	} catch (error: any) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error instanceof Error ? error.message : error,
		});
	}
};
