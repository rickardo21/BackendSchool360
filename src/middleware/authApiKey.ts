import type { Request, Response, NextFunction } from "express";

export function authApiKey(req: Request, res: Response, next: NextFunction) {
	const apiKey = req.header("x-api-key");
	if (apiKey !== "roTIJIO0bf0VU5Z6LGJSWbPjlClW4eHg") {
		return res.status(401).json({ message: "API key non valida" });
	}
	next();
}
