import z from "zod";

const lobbyNameSchema = z
	.string()
	.min(2, { message: "ロビー名は2文字以上で入力してください!" })
	.max(15, { message: "ロビー名は15文字以内で入力してください!" });

const studyMinSchema = z
	.number()
	.min(5, { message: "勉強時間は5分以上で設定してください!" })
	.max(180, { message: "勉強時間は180分以内で設定してください!" });

const breakMinSchema = z
	.number()
	.min(1, { message: "休憩時間は1分以上で設定してください!" })
	.max(60, { message: "休憩時間は60分以内で設定してください!" });

const locationNameSchema = z
	.string()
	.min(5, { message: "場所の名前は5文字以上で入力してください!" })
	.max(50, { message: "場所の名前は50文字以内で入力してください!" });

const locationSchema = z.object({
	lat: z.number().min(-90).max(90),
	lng: z.number().min(-180).max(180),
});

export const creationLobySchema = z.object({
	lobbyName: lobbyNameSchema,
	startTime: z.string(),
	studyMin: studyMinSchema,
	breakMin: breakMinSchema,
	isPrivate: z.boolean(),
	locationName: locationNameSchema,
	location: locationSchema,
});

export const lobbySchema = z.object({
	lobbyId: z.string(),
	lobbyName: lobbyNameSchema,
	startTime: z.string(),
	studyMin: studyMinSchema,
	breakMin: breakMinSchema,
	isPrivate: z.boolean(),
	locationName: locationNameSchema,
	location: locationSchema,
	lastActivityAt: z.string(),
	memberCount: z.number().min(0),
});
