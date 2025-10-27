import { Grades } from "../models/type.js";

function calcolaMedia(gradesData: Grades): number {
	if (!gradesData.grades || gradesData.grades.length === 0) {
		return -1;
	}

	const votiValidi = gradesData.grades
		.map((g) => g.decimalValue)
		.filter((v): v is number => v !== null && !isNaN(v));

	if (votiValidi.length === 0) {
		return -1;
	}

	const somma = votiValidi.reduce((r, v) => r + v, 0);

	return somma / votiValidi.length;
}

export default calcolaMedia;
