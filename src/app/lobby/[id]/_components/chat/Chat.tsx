"use client"

import { useLobby } from "../../_context/LobbyProviders";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/supabase/auth-provider";
import { useCallback, useEffect, useState } from "react";

type PresenceChat = {
    chatId: string;
    userId: string;
    displayName: string;
    content: string;
}

export default function Chat() {
    const { user } = useAuth();
    const { channel } = useLobby();

    const [ chats, setChats ] = useState<PresenceChat[]>([]);
    const [ newChat, setNewChat ] = useState("");

    // メッセージの受信
    useEffect(() => {
        if(!channel) return;

        channel.on("broadcast", { event: "chat" }, ({ payload }) => {
            setChats((prev) => [...prev, payload]);
        });
    }, [channel])

    // メッセージの送信
    const sendMessage = useCallback( async (content: string) => {
        if(!content.trim() || !user || !channel) return;
    
        const payload = {
            chatId: crypto.randomUUID(),
            userId: user.id,
            displayName: user.user_metadata.name || "ななしさん",
            content: content,
        }

        await channel.send({
            type: "broadcast",
            event: "chat",
            payload: payload,
        });
    }, [channel, user])

    const handleSubmit = useCallback( async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(newChat);
        setNewChat("");
    }, [newChat, sendMessage])

    return (
        <>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                {chats.map(chat => 
                    <li key={chat.chatId}>
                        {chat.content}
                    </li>
                )}
            </div>
            <form onSubmit={handleSubmit} className="w-full">
                <input value={newChat}
                    onChange={(e) => setNewChat(e.target.value)}
                    placeholder="絵文字のみ使えます！"
                    className="border"
                />
                <Button type="submit">送信</Button>
            </form>
        </>
    )
}
