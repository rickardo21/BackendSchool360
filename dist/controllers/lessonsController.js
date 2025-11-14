import sendRequest from "../utils/sendRequest.js";
import { sortLessonsByHPos } from "../utils/sort.js";
export const lessonsController = async (req, res) => {
    try {
        // CONST
        const { ident, date } = req.query;
        const tokenHeader = req.headers?.["auth-user-token"] || "";
        const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
        // RESPONSE
        const response = await sendRequest(`students/${ident}/lessons/${date}`, "GET", null, token);
        // CHECK IS THE RESPONSE IS OK
        if (!response.data || !Array.isArray(response.data.lessons)) {
            return res.status(404).json({
                message: "lessons not found",
            });
        }
        // SORT THE LESSONS
        const d = sortLessonsByHPos(response.data.lessons);
        response.data.lessons = d;
        // RETURN THE DATA
        return res.status(200).json(response.data);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};
//# sourceMappingURL=lessonsController.js.map