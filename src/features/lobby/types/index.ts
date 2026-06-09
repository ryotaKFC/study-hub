import type z from "zod";
import { creationLobySchema, lobbySchema } from "../schemas";

export type Lobby = z.infer<typeof lobbySchema>;

export type LobbyCreationDate = z.infer<typeof creationLobySchema>;

export type Member = {
	userId: string;
	displayName: string;
	userGoal: string;
};

export type Chat = {
	chatId: string;
	userId: string;
	displayName: string;
	content: string;
};
