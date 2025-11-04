import { Header } from "../models/type.js";

export function _headers(token?: string) {
	console.log("=== BUILDING HEADERS ===");
	console.log("Z_DEV_APIKEY from env:", process.env.Z_DEV_APIKEY);
	console.log("Z_DEV_APIKEY length:", process.env.Z_DEV_APIKEY?.length);
	console.log(
		"Z_DEV_APIKEY bytes:",
		Buffer.from(process.env.Z_DEV_APIKEY ?? "").toString("hex")
	);
	console.log("USER_AGENT from env:", process.env.USER_AGENT);
	console.log("USER_AGENT length:", process.env.USER_AGENT?.length);
	console.log("Token presente:", !!token);

	var headers: Header = {
		"Content-Type": "application/json",
		"Z-Dev-ApiKey": process.env.Z_DEV_APIKEY ?? "",
		"User-Agent": process.env.USER_AGENT ?? "",
	};

	if (token) {
		headers["Z-Auth-Token"] = token;
	}

	console.log("Headers costruiti:", JSON.stringify(headers, null, 2));
	console.log("=== HEADERS READY ===");

	return headers;
}
