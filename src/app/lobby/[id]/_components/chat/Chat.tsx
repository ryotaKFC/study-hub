"use client"

import { useLobby } from "../../_context/LobbyProviders";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function Chat() {
    const { chats, sendMessage } = useLobby();
    const [ newChat, setNewChat ] = useState("");
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
