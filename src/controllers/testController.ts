import type { Request, Response } from "express";
import axios from "axios";
import https from "https";

export const testHttp1LoginController = async (req: Request, res: Response) => {
	try {
		console.log("=== TEST HTTP/1.1 LOGIN ===");
		console.log("Body ricevuto:", req.body);

		const body = req.body;

		// Agent HTTPS per forzare HTTP/1.1
		const httpsAgent = new https.Agent({
			keepAlive: false,
			maxSockets: 1,
		});

		const response = await axios({
			method: "POST",
			url: "https://web.spaggiari.eu/rest/v1/auth/login",
			data: body,
			headers: {
				"Content-Type": "application/json",
				"Z-Dev-ApiKey": process.env.Z_DEV_APIKEY || "",
				"User-Agent": process.env.USER_AGENT || "",
			},
			httpsAgent: httpsAgent,
			validateStatus: () => true, // Accetta qualsiasi status code
		});

		console.log("=== RESPONSE API ===");
		console.log("Status:", response.status);
		console.log("Data:", response.data);
		console.log("Headers:", response.headers);

		return res.status(200).json({
			success: true,
			apiStatus: response.status,
			apiStatusText: response.statusText,
			apiData: response.data,
			apiHeaders: response.headers,
		});
	} catch (error: any) {
		console.error("❌ ERRORE TEST:", error);
		return res.status(500).json({
			success: false,
			error: error.message,
			details: axios.isAxiosError(error)
				? {
						code: error.code,
						message: error.message,
				  }
				: undefined,
		});
	}
};
