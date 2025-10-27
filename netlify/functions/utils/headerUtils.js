export function _headers(token) {
    var headers = {
        "Content-Type": "application/json",
        "Z-Dev-ApiKey": process.env.Z_DEV_APIKEY ?? "",
        "User-Agent": process.env.USER_AGENT ?? "",
    };
    if (token) {
        headers["Z-Auth-Token"] = token;
    }
    return headers;
}
//# sourceMappingURL=headerUtils.js.map