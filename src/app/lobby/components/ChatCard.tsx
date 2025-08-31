import Card from "./ui/card";
import Chat from "./Chat";

import { useEffect, useState } from "react";
import { supabaseClient } from '@/lib/supabaseClient'
import { Button } from "@/components/ui/button";

type Chat = {
    id: number;
    lobby_id: number;
    user_id?: string;
    display_name?: string;
    content: string; 
    created_at: string;
}

export default function ChatCard() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [message, setMessage] = useState("");

    async function sendMessage(e?: React.FormEvent) {
        e?.preventDefault();
        if (!message.trim()) return;
        const payload = {
            lobby_id: lobbyId,
            user_id: userId,
            display_name: displayName,
            content: message,
        }
        const {error} = await supabaseClient.from("lobby_chats").insert([payload]);
        if (error) console.error(error);
        else setMessage("");
    }

    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬絵文字チャット</h1>
            
            {/* <Chat /> */}
        </Card>
    )
}
