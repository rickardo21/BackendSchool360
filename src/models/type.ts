export type Grade = {
	subjectId: number;
	subjectCode: string;
	subjectDesc: string;
	evtId: number;
	evtCode: string;
	evtDate: string;
	decimalValue: number | null;
	displayValue: string;
	displaPos: number;
	notesForFamily: string;
	color: string;
	canceled: boolean;
	underlined: boolean;
	periodPos: number;
	periodDesc: string;
	periodLabel: string;
	componentPos: number;
	componentDesc: string;
	weightFactor: number;
	skillId: number;
	gradeMasterId: number;
	skillDesc: string | null;
	skillCode: string | null;
	skillMasterId: number;
	skillValueDesc: string;
	skillValueShortDesc: string | null;
	skillValueNote: string;
	oldskillId: number;
	oldskillDesc: string;
	noAverage: boolean;
	teacherName: string;
};

export type Grades = {
	grades: Grade[];
};

export type Lesson = {
	evtId: number;
	evtDate: string; // ISO date string (es. "2025-10-23")
	evtCode: string;
	evtHPos: number;
	evtDuration: number;
	classDesc: string;
	authorName: string;
	subjectId: number;
	subjectCode: string | null;
	subjectDesc: string;
	lessonType: string;
	lessonArg: string;
};

// Collezione lezioni
export type Lessons = {
	lessons: Lesson[];
};

export type User = {
	ident: string;
	firstName: string;
	lastName: string;
	class?: string;
	lastMarks: string;
	lastSubject: string;
	marksColor: string;
	mediaVoti: number;
	showPwdChangeReminder: boolean;
	tokenAP: string;
	token: string;
	release: string; // ISO string (es. "2025-10-23T21:22:31+02:00")
	expire: string; // ISO string
};

export type Header = {
	"Content-Type": string;
	"Z-Dev-ApiKey": string;
	"User-Agent": string;
	"Z-Auth-Token"?: string;
};
