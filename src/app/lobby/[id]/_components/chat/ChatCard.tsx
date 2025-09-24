"use client"

import Card from "@/components/ui/card";
import Chat from "./Chat";
import { useAuth } from "@/lib/supabase/auth-provider";


export default function ChatCard() {
    const { user } = useAuth();
    if (!user) return;
    return (
        <Card variant="background">
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬チャット</h1>
            <Chat />
        </Card>
    )
}
