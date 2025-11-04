const post = async (url, body, header) => {
    console.log("=== REQUEST UTILS POST ===");
    const bodyString = JSON.stringify(body);
    const bodyBytes = new TextEncoder().encode(bodyString);
    console.log("Body string:", bodyString);
    console.log("Body bytes length:", bodyBytes.length);
    console.log("Body string length:", bodyString.length);
    // Aggiungi esplicitamente Content-Length
    const headersWithLength = {
        ...header,
        "Content-Length": bodyBytes.length.toString(),
    };
    console.log("Headers con Content-Length:", JSON.stringify(headersWithLength, null, 2));
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headersWithLength,
            body: bodyString,
        });
        console.log("Response status:", response.status);
        // IMPORTANTE: Logga il body della risposta per vedere il messaggio d'errore completo
        const responseText = await response.text();
        console.log("Response body (raw):", responseText);
        // Ricrea la response per non consumarla
        return new Response(responseText, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    }
    catch (error) {
        console.error("❌ ERRORE IN FETCH:", error);
        throw error;
    }
};
// console.log("=== REQUEST UTILS POST ===");
// console.log("URL completo:", url);
// console.log("Body type:", typeof body);
// console.log("Body keys:", body ? Object.keys(body) : "null");
// console.log("JSON.stringify del body:", JSON.stringify(body));
// console.log("Body stringificato length:", JSON.stringify(body).length);
// console.log("Headers type:", typeof header);
// console.log("Headers oggetto:", JSON.stringify(header, null, 2));
// const response = await fetch(url, {
// 	method: "POST",
// 	headers: header,
// 	body: JSON.stringify(body),
// });
// console.log("=== FETCH COMPLETED ===");
// console.log("Response status:", response.status);
// console.log("Response ok:", response.ok);
// console.log("Response statusText:", response.statusText);
// console.log(
// 	"Response headers:",
// 	JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)
// );
// return response;
const get = async (url, header) => {
    const response = await fetch(url, {
        method: "GET",
        headers: header,
    });
    return response;
};
export default { get, post };
//# sourceMappingURL=requestUtils.js.map