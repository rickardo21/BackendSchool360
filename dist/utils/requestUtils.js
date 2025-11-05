const post = async (url, body, header) => {
    console.log("=== REQUEST UTILS POST ===");
    console.log("URL completo:", url);
    console.log("Body type:", typeof body);
    console.log("Body keys:", body ? Object.keys(body) : "null");
    console.log("JSON.stringify del body:", JSON.stringify(body));
    console.log("Body stringificato length:", JSON.stringify(body).length);
    console.log("Headers type:", typeof header);
    console.log("Headers oggetto:", JSON.stringify(header, null, 2));
    const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
    });
    console.log("=== FETCH COMPLETED ===");
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    console.log("Response statusText:", response.statusText);
    console.log("Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    return response;
};
const get = async (url, header) => {
    const response = await fetch(url, {
        method: "GET",
        headers: header,
    });
    return response;
};
export default { get, post };
//# sourceMappingURL=requestUtils.js.map