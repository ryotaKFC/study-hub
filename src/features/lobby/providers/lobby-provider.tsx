"use client";

import { RealtimeChannel } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction, use, useState } from "react";
import { WelcomeForm } from "../components/lobby-welcome-form";
import { useLobbySubscription } from "../hooks/use-lobby-subscription";
import { Lobby, Member } from "../types";

type LobbyProviderProps = {
	lobby: Lobby;
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
	lobby,
	previewMode,
	children,
}: LobbyProviderProps) {
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
