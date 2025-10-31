import { Lesson } from "../models/type.js";

export function sortLessonsByHPos(lessons: Lesson[]): Lesson[] {
	return lessons.sort((a, b) => a.evtHPos - b.evtHPos);
}
