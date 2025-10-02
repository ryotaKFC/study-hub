"use client"

import { useAuth } from "@/features/auth/auth-provider";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react"
import { Chat, Member } from "./lobby-provider";
import { createClient } from "@/lib/supabase/client";


export function useLobbySubscription( lobbyId: string) {
    const { user } = useAuth();
    
    const [ members, setMembers] = useState<Member[]>([]);
    const [ chats, setChats ] = useState<Chat[]>([]);
    const [ channel, setChannel ] = useState<RealtimeChannel | null>(null);
    
    const supabaseClient = createClient()
    // 参加ロビーの決定
    useEffect(() => {
        if (!user) return;
            
        // チャンネルの決定
        const newChannel =  supabaseClient.channel(String(lobbyId), {
            config: {
                presence: { key: user.id },
                broadcast: { self: true }
            }
        });
        
        // チャットの購読
        newChannel.on("broadcast", { event: "chat" }, ({ payload }) => {
            setChats((prev) => [...prev, payload]);
        });
        
        // メンバーの購読
        newChannel.on("presence", { event: "sync" }, () => {
            const state = newChannel.presenceState<Member>();
            const new_members: Member[] = Object.values(state).flat();
            setMembers(new_members);
        });
        
        // チャンネルへ参加
        newChannel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await newChannel.track({
                    user_id: user.id,
                    display_name: user.user_metadata.name || "ななしさん",
                });
            }
        });

        setChannel(newChannel);
        return (() => {
            supabaseClient.removeChannel(newChannel);
        })


    }, [lobbyId, supabaseClient, user]);
    
    return { members, chats, channel };
}
