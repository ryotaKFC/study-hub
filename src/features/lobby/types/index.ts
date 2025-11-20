import type z from "zod";

export type Lobby = z.infer<typeof import("../schemas").lobbySchema>;

export type LobbyCreationDate = z.infer<
	typeof import("../schemas").creationLobySchema
>;
