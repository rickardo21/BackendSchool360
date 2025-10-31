import { Header } from "../models/type.js";
import { _headers } from "./headerUtils.js";

const post = async (url: string, body: any, header: Header) => {
	console.log("PostRequestBody: " + body);

	console.log("PostRequestJsonBody: " + JSON.stringify(body));

	const response = await fetch(url, {
		method: "POST",
		headers: header,
		body: JSON.stringify(body),
	});

	return response;
};

const get = async (url: string, header: Header) => {
	const response = await fetch(url, {
		method: "GET",
		headers: header,
	});

	return response;
};

export default { get, post };
