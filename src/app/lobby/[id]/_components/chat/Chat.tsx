"use client"

import { useLobby } from "../../_context/LobbyProviders";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";

export default function Chat() {
    const { chats, sendMessage } = useLobby();

    const [ newChat, setNewChat ] = useState("");

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
