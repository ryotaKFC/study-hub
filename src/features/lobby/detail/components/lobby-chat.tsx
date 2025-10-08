"use client"

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLobby } from "../lobby-provider";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/features/auth/auth-provider";

export default function LobbyChat() {
    const { user } = useAuth()
    const { previewMode, chats, isStudyTime , sendMessage } = useLobby();
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

    if(!user && !previewMode) return null;

    return (
        <Card className="sm:px-10">
            <CardHeader>
                <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬チャット</h1>
            </CardHeader>
            <CardContent>
                <Card className="bg-emerald-50/50 px-4">
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
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="w-full flex">
                    <input
                        value={newChat}
                        onChange={(e) => setNewChat(e.target.value)}
                        placeholder="休憩時間のみチャットは利用できます！"
                        className="border rounded-sm w-full flex flex-row-reverse text-sm sm:text-xl"
                    />
                    <Button type="submit" disabled={isStudyTime ? true:false} className="" >送信</Button>
                </form>
            </CardFooter>
        </Card>
    )
}
