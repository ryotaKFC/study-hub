"use client";

import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { joinLobby } from "../actions/join-lobby";
import { Chat, Member } from "./lobby-provider";

export function useLobbySubscription(lobbyId: string, goal: string) {
	const { user } = useAuth();

	const [members, setMembers] = useState<Member[]>([]);
	const [chats, setChats] = useState<Chat[]>([]);
	const [channel, setChannel] = useState<RealtimeChannel | null>(null);

	const supabase = createClient();
	// 参加ロビーの決定
	useEffect(() => {
		if (!user || !goal.trim()) return;

		// チャンネルの決定
		const newChannel = supabase.channel(String(lobbyId), {
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
				setTimeout(async () => {
					const state = newChannel.presenceState();
					const memberCount = Object.keys(state).length;
					console.log(memberCount);
					await joinLobby(supabase, lobbyId, memberCount);
				}, 300);
			}
		});

		setChannel(newChannel);

		const handleExit = async () => {
			if (!newChannel) return;
			const state = newChannel.presenceState();
			const memberCount = Object.keys(state).length;

			await updateLobbyMemberCount(lobbyId, memberCount - 1);
			newChannel.unsubscribe();
			supabase.removeChannel(newChannel);
		};

		window.addEventListener("beforeunload", handleExit);
		return () => {
			window.removeEventListener("beforeunload", handleExit);
			handleExit();
		};
	}, [goal, lobbyId, supabase, user]);

	return { channel, members, chats };
}
