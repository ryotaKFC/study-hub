import type z from "zod";
import { creationLobySchema, lobbySchema } from "../schemas";

export type Lobby = z.infer<typeof lobbySchema>;

export type LobbyCreationDate = z.infer<typeof creationLobySchema>;
