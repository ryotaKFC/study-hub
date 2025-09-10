"use client"

import { useLobby } from "../../_context/LobbyProviders";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/supabase/auth-provider";
import { useEffect, useState } from "react";

type PresenceChat = {
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
        channel.on("broadcast", { event: "chat" }, ({ payload }) => {
            setChats((prev) => [...prev, payload]);
        });
    })

    // メッセージの送信
    async function sendMessage(content: string) {
        if(!content.trim() || !user || !channel) return;

        const payload = {
            userId: user.id,
            dsplayName: user.user_metadata.name || "ななしさん",
            content: content,
        }

        await channel.send({
            type: "broadcast",
            event: "chat",
            payload: payload,
        });
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        await sendMessage(newChat);
        setNewChat("");
    }
    return (
        <>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                {chats.map(chat => 
                    <li key={chat.content}>
                        {chat.content}
                    </li>
                )}
            </div>
            <form onSubmit={handleCreate}>
                <input value={newChat}
                    onChange={(e) => setNewChat(e.target.value)}
                    placeholder="絵文字のみ使えます！"
                    className=""
                />
                <Button type="submit">送信</Button>
            </form>
        </>
    )
}
