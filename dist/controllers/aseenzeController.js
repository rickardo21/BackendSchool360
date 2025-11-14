import sendRequest from "../utils/sendRequest.js";
export const assenzeController = async (req, res) => {
    try {
        // CONST
        const ident = req.query.ident;
        const date = req.query.date;
        const tokenHeader = req.headers?.["auth-user-token"] || "";
        const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
        // RESPONSE
        const response = await sendRequest(`students/${ident}/absences/details${date ? `/${date}/${date}` : ""}`, "GET", null, token);
        // CHECK IF RESPONSE IS OK
        if (!response.data) {
            return res.status(response.status).send(response.message);
        }
        // RETURN THE DATA
        return res.status(response.status).send(response.data);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};
//# sourceMappingURL=aseenzeController.js.map