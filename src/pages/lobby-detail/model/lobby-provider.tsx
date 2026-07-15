"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	use,
	useState,
} from "react";
import type { Lobby, Member } from "../../../features/lobby/types";
import { WelcomeForm } from "../components/lobby-welcome-form";
import { useLobbySubscription } from "./use-lobby-subscription";

type LobbyProviderProps = {
	lobbyPromise: Promise<Lobby>;
	previewMode: boolean;
	children: React.ReactNode;
};

type LobbyContextType = {
	previewMode: boolean;
	lobby: Lobby;
	members: Member[];
	isStudyTime: boolean;
	channel: RealtimeChannel | null;
	setIsStudyTime: Dispatch<SetStateAction<boolean>>;
};

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProvider({
	lobbyPromise,
	previewMode,
	children,
}: LobbyProviderProps) {
	const lobby = use(lobbyPromise);
	const [goal, setGoal] = useState<string | null>(null);
	const { channel, members } = useLobbySubscription(lobby.lobbyId, goal);
	const [isStudyTime, setIsStudyTime] = useState(false);

	if (!goal && !previewMode) {
		return <WelcomeForm setGoal={setGoal} />;
	} else {
		return (
			<LobbyContext.Provider
				value={{
					previewMode,
					lobby,

					members,
					isStudyTime,
					channel,
					setIsStudyTime,
				}}
			>
				{children}
			</LobbyContext.Provider>
		);
	}
}

export function useLobby() {
	const context = use(LobbyContext);
	if (context === undefined) {
		throw new Error("ロビーが見つかりませんでした：LobbyProvider.tsx");
	}
	return context;
}
