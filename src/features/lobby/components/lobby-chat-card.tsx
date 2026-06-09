"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";
import { useChat } from "../hooks/use-chat";
import { useLobby } from "../providers/lobby-provider";

export default function LobbyChatCard() {
	const { user } = useAuth();
	const { previewMode } = useLobby();
	const { chats, disabledChat, handleSubmit, newChat, setNewChat } = useChat();
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// チャットが追加されたときにスクロールする
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	});

	if (!user && !previewMode) return null;

	return (
		<Card className="sm:px-10">
			<CardHeader>
				<h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">
					💬チャット
				</h1>
			</CardHeader>
			<CardContent>
				<Card className="bg-emerald-50/50 px-4">
					<div
						ref={chatContainerRef}
						className="list-none overflow-y-auto h-24 sm:h-60"
					>
						{chats.slice(-20).map((chat) => (
							<li key={chat.chatId} className="text-sm sm:text-xl">
								{chat.displayName}：{chat.content}
							</li>
						))}
					</div>
				</Card>
			</CardContent>
			<CardFooter>
				<form onSubmit={handleSubmit} className="w-full flex">
					<input
						value={newChat}
						onChange={(e) => setNewChat(e.target.value)}
						placeholder="勉強中は5分に一度のみ送信可能です"
						className="border rounded-sm w-full flex flex-row-reverse text-sm sm:text-xl"
					/>
					<Button type="submit" disabled={disabledChat} className="">
						送信
					</Button>
				</form>
			</CardFooter>
		</Card>
	);
}
