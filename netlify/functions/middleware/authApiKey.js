export function authApiKey(req, res, next) {
    const apiKey = req.header("x-api-key");
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: "API key non valida" });
    }
    next();
}
//# sourceMappingURL=authApiKey.js.map