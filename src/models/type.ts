type Grade = {
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

export type absence = {
	evtId: number;
	evtCode: string;
	evtDate: string; // formato ISO string, es. "2025-09-25"
	evtHPos: number | null;
	evtValue: any | null; // tipo generico, puoi specificare meglio se sai cosa contiene
	isJustified: boolean;
	justifReasonCode: string | null;
	justifReasonDesc: string | null;
	hoursAbsence: any[]; // array generico, specifica tipo interno se conosciuto
	webJustifStatus: number;
};

export type Absences = {
	events: absence[];
};

export type Note = {
	evtId: number;
	evtText: string; // Testo dell'evento, può contenere newline \n
	evtDate: string; // Data evento in formato stringa ISO, es. "2025-09-24"
	authorName: string; // Nome dell'autore del messaggio
	readStatus: boolean; // Stato di lettura, true o false
};

export type Notes = {
	NTTE: Note[];
	NTCL: Note[];
	NTWN: Note[];
	NTST: Note[];
};

type Attachment = {
	fileName: string;
	attachNum: number;
};

type Publication = {
	pubId: number;
	pubDT: string; // Data e ora in formato ISO string, es. "2025-10-22T00:00:00+02:00"
	readStatus: boolean;
	evtCode: string;
	cntId: number;
	cntValidFrom: string; // Data stringa ISO, es. "2025-10-22"
	cntValidTo: string; // Data stringa ISO, es. "2026-06-08"
	cntValidInRange: boolean;
	cntStatus: string;
	cntTitle: string;
	cntCategory: string;
	cntHasChanged: boolean;
	cntHasAttach: boolean;
	needJoin: boolean;
	needReply: boolean;
	needFile: boolean;
	needSign: boolean;
	dinsert_allegato: string; // Data e ora, es. "2025-10-22 10:15:24"
	attachments: Attachment[];
};

export type Bacheca = {
	items: Publication[];
};

export type HomeworkEvent = {
	evtId: number;
	evtCode: string;
	teacherId: number;
	teacherName: string;
	homeworkDesc: string;
	homeworkDone: boolean;
	expiryDate: string; // data in formato ISO, es. "2025-09-17"
	subjectId: number;
	subjectDesc: string;
	lastStudentMsg: string | null;
	lastTeacherMsg: string | null;
	newMessages: boolean;
	teacherFiles: any[]; // array generico, specifica tipo se noto
	teacherLinks: any[]; // array generico, specifica tipo se noto
	studentFiles: any[]; // array generico, specifica tipo se noto
	correctedFiles: any[]; // array generico, specifica tipo se noto
};

export type Compiti = {
	items: HomeworkEvent[];
};

export type UserModelFullOfInfo = {
	user: User;
	absence: Absences;
	lessons: Lessons;
	grades: Grades;
	compiti: Compiti;
	todaystatus: absence;
};
