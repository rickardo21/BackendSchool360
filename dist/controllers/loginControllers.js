import sendRequest from "../utils/sendRequest.js";
export const loginController = async (req, res) => {
    try {
        const body = req.body;
        // Chiamata generica tipizzata con User
        const result = await sendRequest("auth/login", "POST", body);
        // Verifica che data esista
        if (!result.data) {
            return res.status(400).json({
                message: result.message || "data is null",
            });
        }
        // // Richiesta dei voti
        // const gradesResult = await sendRequest<Grades>(
        // 	`students/${result.data.ident.substring(1)}/grades`,
        // 	"GET",
        // 	null,
        // 	result.data.token
        // );
        // if (
        // 	!gradesResult.data ||
        // 	!Array.isArray(gradesResult.data.grades) ||
        // 	gradesResult.data.grades.length === 0
        // ) {
        // 	return res.status(404).json({
        // 		message: "grades not found",
        // 	});
        // }
        // Aggiorna la proprietà class con sicurezza
        const userData = result.data;
        // userData.lastMarks =
        // 	gradesResult.data?.grades?.[0]?.displayValue ?? "N/A";
        // let subject;
        // const str =
        // 	gradesResult.data.grades[0]!.subjectDesc.trim().split(/\s+/);
        // if (str.length > 1) {
        // 	subject = str[0] + "...";
        // } else subject = str[0];
        // userData.lastSubject = subject ? subject : "N/A";
        // const mark = gradesResult.data?.grades?.[0]?.decimalValue ?? "a";
        // userData.marksColor =
        // 	mark == "a"
        // 		? "#18b2ff5c"
        // 		: mark >= 5 && mark < 6
        // 		? "#ff7418aa"
        // 		: mark < 5
        // 		? "#ff4d4da2"
        // 		: "#3ce339aa";
        // userData.mediaVoti =
        // 	Math.round(calcolaMedia(gradesResult.data) * 10) / 10;
        return res.status(result.status).json(result);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};
//# sourceMappingURL=loginControllers.js.map