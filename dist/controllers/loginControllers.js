import sendRequest from "../utils/sendRequest.js";
import calcolaMedia from "../utils/media.js";
export const loginController = async (req, res) => {
    try {
        // CONST
        const body = req.body;
        // VARIABLE
        let userData;
        // LOGIN_RESPONSE
        const result = await sendRequest("auth/login", "POST", body);
        // CHECK IF THE LOGIN_RESPONSE IS OK
        if (!result.data) {
            return res.status(400).json({
                message: result.message || "data is null",
            });
        }
        // GRADE_RESPONSE
        const gradesResult = await sendRequest(`students/${result.data.ident.substring(1)}/grades`, "GET", null, result.data.token);
        // CHECK IF THE GRADE_RESPONSE IS OK
        if (!gradesResult.data ||
            !Array.isArray(gradesResult.data.grades) ||
            gradesResult.data.grades.length === 0) {
            return res.status(404).json({
                message: "grades not found",
            });
        }
        // ADDING ADDICTIONAL INFO TO THE USER
        userData = addInfoToUser(result.data, gradesResult.data);
        // RETURN THE DATA
        return res.status(result.status).json(userData);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};
const addInfoToUser = (userResponse, gradesResult) => {
    let userData = userResponse;
    let subject;
    userData.lastMarks = gradesResult.grades?.[0]?.displayValue ?? "N/A";
    const str = gradesResult.grades[0].subjectDesc.trim().split(/\s+/);
    if (str.length > 1) {
        subject = str[0] + "...";
    }
    else
        subject = str[0];
    userData.lastSubject = subject ? subject : "N/A";
    const mark = gradesResult.grades?.[0]?.decimalValue ?? "a";
    userData.marksColor =
        mark == "a"
            ? "#18b2ff5c"
            : mark >= 5 && mark < 6
                ? "#ff7418aa"
                : mark < 5
                    ? "#ff4d4da2"
                    : "#3ce339aa";
    userData.mediaVoti = Math.round(calcolaMedia(gradesResult) * 10) / 10;
    return userData;
};
//# sourceMappingURL=loginControllers.js.map