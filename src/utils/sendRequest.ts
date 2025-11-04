import { _headers } from "./headerUtils.js";
import requestUtils from "./requestUtils.js";

type SendRequestResult<T> =
	| { data: T; status: number; message?: never }
	| { data: null; status: number; message: string };

async function sendRequest<T>(
	endPoint: string,
	method: "GET" | "POST",
	body?: any,
	token?: string
): Promise<SendRequestResult<T>> {
	try {
		const MAIN_URL = process.env.MAIN_URL ?? "";
		const url = `${MAIN_URL}${endPoint}`;

		let response;
		let header;

		if (token) header = _headers(token);
		else header = _headers();

		// LOG 4: Verifica gli headers costruiti
		console.log("Headers da inviare:", JSON.stringify(header, null, 2));
		console.log("URL API esterna:", MAIN_URL);

		if (method === "POST") {
			response = await requestUtils.post(url, body, header);
		} else {
			response = await requestUtils.get(url, header);
		}

		const contentType = response.headers.get("content-type") || "";
		if (!contentType.includes("application/json")) {
			const text = await response.text();
			return {
				data: null,
				status: response.status,
				message: `Risposta non JSON ricevuta, content: ${text}`,
			};
		}

		const data = (await response.json()) as T;

		// LOG 5: Response ricevuta dall'API esterna
		console.log("Response status dall'API esterna:", response.status);
		console.log("Response data:", JSON.stringify(data, null, 2));
		console.log("=== LOGIN SUCCESS ===");

		return {
			data,
			status: response.status,
		};
	} catch (error) {
		return {
			data: null,
			message: error instanceof Error ? error.message : "Request Error",
			status: 500,
		};
	}
}

export default sendRequest;
