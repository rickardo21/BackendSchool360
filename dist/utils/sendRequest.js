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
        // console.log(header);
        console.log("SendRequestBody: " + body);
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
        const data = (await response.json());
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