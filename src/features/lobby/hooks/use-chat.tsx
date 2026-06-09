"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/features/auth/auth-provider";
import { useLobby } from "../providers/lobby-provider";
import { Chat } from "../types";

const CHAT_COOLTIME_SECONDS = 300; // 5分

export function useChat(): {
	chats: Chat[];
	disabledChat: boolean;
	handleSubmit: (e: FormEvent<Element>) => void;
	newChat: string;
	setNewChat: React.Dispatch<React.SetStateAction<string>>;
} {
	const { user } = useAuth();
	const { isStudyTime, channel } = useLobby();

	const [newChat, setNewChat] = useState("");

	const [chats, setChats] = useState<Chat[]>([]);
	const sendChatAtRef = useRef<Date | null>(null);
	const [disabledChat, setDisabledChat] = useState<boolean>(true);

	// チャットの送信
	async function handleSubmit(e: React.FormEvent): Promise<void> {
		e.preventDefault();
		if (!newChat.trim() || !user || !channel) return;
		if (isStudyTime) setDisabledChat(true);

		const payload = {
			chatId: crypto.randomUUID(),
			userId: user.id,
			displayName: user.user_metadata.name || "ななしさん",
			content: newChat,
		};

		await channel.send({
			type: "broadcast",
			event: "chat",
			payload: payload,
		});

		sendChatAtRef.current = new Date();
		setNewChat("");
	}

	// チャットの受信
	useEffect(() => {
		if (!channel) return;
		channel.on("broadcast", { event: "chat" }, ({ payload }) => {
			setChats((prev) => [...prev, payload]);
		});
	}, [channel]);

	// チャットのクールタイム
	useEffect(() => {
		if (!isStudyTime) {
			setDisabledChat(false);
			sendChatAtRef.current = null;
			return;
		}

		const interval = setInterval(() => {
			if (sendChatAtRef.current) {
				const elapsed = (Date.now() - sendChatAtRef.current.getTime()) / 1000;
				if (elapsed >= CHAT_COOLTIME_SECONDS) {
					setDisabledChat(false);
					sendChatAtRef.current = null;
				} else {
					setDisabledChat(true);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isStudyTime]);

	return { chats, disabledChat, handleSubmit, newChat, setNewChat };
}
