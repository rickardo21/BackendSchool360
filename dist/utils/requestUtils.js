const post = async (url, body, header) => {
    console.log("JSON.Stringify del body = : " + JSON.stringify(body));
    const response = await fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
    });
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