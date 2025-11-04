import { _headers } from "./headerUtils.js";
import requestUtils from "./requestUtils.js";
async function sendRequest(endPoint, method, body, token) {
    try {
        const MAIN_URL = process.env.MAIN_URL ?? "";
        const url = `${MAIN_URL}${endPoint}`;
        let response;
        let header;
        if (token)
            header = _headers(token);
        else
            header = _headers();
        console.log("=== SENDREQUEST START ===");
        console.log("Headers da inviare:", JSON.stringify(header, null, 2));
        console.log("URL API esterna:", MAIN_URL);
        console.log("Endpoint completo:", url);
        console.log("Method:", method);
        if (body) {
            console.log("Body tipo:", typeof body);
            console.log("Body è oggetto:", body && typeof body === "object");
            console.log("JSON.Stringify del body = :", JSON.stringify(body));
        }
        if (method === "POST") {
            response = await requestUtils.post(url, body, header);
        }
        else {
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
        console.log("=== RESPONSE RICEVUTA ===");
        console.log("Response status:", response.status);
        console.log("Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
        const data = (await response.json());
        // LOG 5: Response ricevuta dall'API esterna
        console.log("Response status dall'API esterna:", response.status);
        console.log("Response data:", JSON.stringify(data, null, 2));
        console.log("=== SENDREQUEST END ===");
        return {
            data,
            status: response.status,
        };
    }
    catch (error) {
        return {
            data: null,
            message: error instanceof Error ? error.message : "Request Error",
            status: 500,
        };
    }
}
export default sendRequest;
//# sourceMappingURL=sendRequest.js.map