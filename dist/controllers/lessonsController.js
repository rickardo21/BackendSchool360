import sendRequest from "../utils/sendRequest.js";
import { sortLessonsByHPos } from "../utils/sort.js";
export const lessonsController = async (req, res) => {
    try {
        const body = req.body;
        const tokenHeader = req.headers?.["auth-user-token"] || "";
        const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
        const response = await sendRequest(`students/${body.ident.substring(1)}/lessons/${body.date}`, "GET", null, token);
        console.log(response);
        if (!response.data || !Array.isArray(response.data.lessons)) {
            return res.status(404).json({
                message: "lessons not found",
            });
        }
        const d = sortLessonsByHPos(response.data.lessons);
        response.data.lessons = d;
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