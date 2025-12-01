"use client";

import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { joinLobby } from "../actions/join-lobby";
import { leaveLobby } from "../actions/leave-lobby";
import { Chat, Member } from "../types";

export function useLobbySubscription(lobbyId: string, goal: string | null) {
	const { user } = useAuth();

	const [members, setMembers] = useState<Member[]>([]);
	const [chats, setChats] = useState<Chat[]>([]);
	const [channel, setChannel] = useState<RealtimeChannel | null>(null);

	const supabase = createClient();

	// 参加ロビーの決定
	useEffect(() => {
		if (!user || !goal) return;

		// チャンネルの決定
		const newChannel = supabase.channel(lobbyId, {
			config: {
				presence: { key: user.id },
				broadcast: { self: true },
			},
		});

		// チャットの受信
		newChannel.on("broadcast", { event: "chat" }, ({ payload }) => {
			setChats((prev) => [...prev, payload]);
		});

		// メンバーの受信
		newChannel.on("presence", { event: "sync" }, () => {
			const state = newChannel.presenceState<Member>();
			const new_members: Member[] = Object.values(state).flat();
			setMembers(new_members);
		});

		// チャンネルへ参加
		newChannel.subscribe(async (status) => {
			if (status === "SUBSCRIBED") {
				await newChannel.track({
					user_id: user.id,
					display_name: user.user_metadata.name || "ななしさん",
					user_goal: goal,
				});
				// 少し遅延させてから参加処理を行う
				setTimeout(async () => {
					await joinLobby(supabase, newChannel, lobbyId);
				}, 300);
			}
		});

		setChannel(newChannel);

		async function handleExit() {
			if (!newChannel) return;

			await leaveLobby(supabase, newChannel, lobbyId);

			newChannel.unsubscribe();
			supabase.removeChannel(newChannel);
		}

		window.addEventListener("beforeunload", handleExit);
		return () => {
			window.removeEventListener("beforeunload", handleExit);
			handleExit();
		};
	}, [goal, lobbyId, supabase, user]);

	return { channel, members, chats };
}
