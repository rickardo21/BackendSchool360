export function authApiKey(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (apiKey !== "roTIJIO0bf0VU5Z6LGJSWbPjlClW4eHg") {
        return res.status(401).json({ message: 'API key non valida' });
    }
    next();
}
//# sourceMappingURL=authApiKey.js.map