"use client";

import { RealtimeChannel } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction, use, useState } from "react";
import { useAuth } from "@/features/auth/auth-provider";
import { WelcomeForm } from "../components/lobby-welcome-form";
import { useLobbySubscription } from "../hooks/use-lobby-subscription";
import { Chat, Lobby, Member } from "../types";

type LobbyProviderProps = {
	lobby: Lobby;
	previewMode: boolean;
	children: React.ReactNode;
};

type LobbyContextType = {
	previewMode: boolean;
	lobby: Lobby;
	members: Member[];
	chats: Chat[];
	isStudyTime: boolean;
	channel: RealtimeChannel | null;
	setIsStudyTime: Dispatch<SetStateAction<boolean>>;
	sendMessage: (content: string) => Promise<void>;
};

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProvider({
	lobby,
	previewMode,
	children,
}: LobbyProviderProps) {
	const [goal, setGoal] = useState<string | null>(null);
	const { user } = useAuth();
	const { channel, chats, members } = useLobbySubscription(lobby.lobbyId, goal);
	const [isStudyTime, setIsStudyTime] = useState(false);

	// メッセージの送信
	async function sendMessage(content: string) {
		if (!content.trim() || !user || !channel) return;

		const payload = {
			chatId: crypto.randomUUID(),
			userId: user.id,
			displayName: user.user_metadata.name || "ななしさん",
			content: content,
		};

		await channel.send({
			type: "broadcast",
			event: "chat",
			payload: payload,
		});
	}

	if (!goal && !previewMode) {
		return <WelcomeForm setGoal={setGoal} />;
	} else {
		return (
			<LobbyContext.Provider
				value={{
					previewMode,
					lobby,
					chats,
					members,
					isStudyTime,
					channel,
					setIsStudyTime,
					sendMessage,
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
