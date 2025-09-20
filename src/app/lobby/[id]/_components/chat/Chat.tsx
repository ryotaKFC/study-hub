"use client"

import { useLobby } from "../../_context/LobbyProviders";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Chat() {
    const { chats, isStudyTime , sendMessage } = useLobby();

    const [ newChat, setNewChat ] = useState("");

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = useCallback( async (e: React.FormEvent) => {
        e.preventDefault();
        await sendMessage(newChat);
        setNewChat("");
    }, [newChat, sendMessage])

    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    })

    return (
        <>
            <Card className="bg-emerald-100/30">
                <div 
                    ref={chatContainerRef}
                    className="list-none overflow-y-auto h-24 sm:h-60">
                    {chats.slice(-20).map(chat => 
                        <li key={chat.chatId} className="text-sm sm:text-xl">
                            {chat.displayName}：{chat.content}
                        </li>
                    )}
                </div>
            </Card>
            <form onSubmit={handleSubmit} className="w-full flex">
                <input
                    value={newChat}
                    onChange={(e) => setNewChat(e.target.value)}
                    placeholder="休憩時間のみチャットは利用できます！"
                    className="border w-full flex flex-row-reverse text-sm sm:text-xl"
                />
                <Button type="submit" disabled={isStudyTime ? true:false} className="" >送信</Button>
            </form>
        </>
    )
}
