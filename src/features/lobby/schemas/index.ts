import z from "zod";

export const goalSchema = z
	.string()
	.min(2, { message: "目標は2文字以上で入力してください!" })
	.max(20, { message: "目標は20文字以内で入力してください!" });

const lobbyNameSchema = z
	.string()
	.min(2, { message: "ロビー名は2文字以上で入力してください!" })
	.max(15, { message: "ロビー名は15文字以内で入力してください!" });

const studyMinSchema = z
	.number()
	.min(5, { message: "勉強時間は5分以上で設定してください!" })
	.max(60, { message: "勉強時間は60分以内で設定してください!" });

const breakMinSchema = z
	.number()
	.min(1, { message: "休憩時間は1分以上で設定してください!" })
	.max(15, { message: "休憩時間は15分以内で設定してください!" });

export const creationLobySchema = z.object({
	lobbyName: lobbyNameSchema,
	startTime: z.string(),
	studyMin: studyMinSchema,
	breakMin: breakMinSchema,
	isPrivate: z.boolean(),
	isInSchool: z.boolean(),
});

export const lobbySchema = z.object({
	lobbyId: z.string(),
	lobbyName: lobbyNameSchema,
	startTime: z.string(),
	studyMin: studyMinSchema,
	breakMin: breakMinSchema,
	isPrivate: z.boolean(),
	lastActivityAt: z.string(),
	memberCount: z.number().min(0),
	isInSchool: z.boolean(),
});
