import type { Request, Response, NextFunction } from "express";

export function authApiKey(req: Request, res: Response, next: NextFunction) {
	const apiKey = req.header("x-api-key");
	if (apiKey !== process.env.API_KEY) {
		return res.status(401).json({ message: "API key non valida" });
	}
	next();
}
