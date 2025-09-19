"use client"

import { useAuth } from "@/lib/supabase/auth-provider";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react"
import type { Member, Chat } from "../_context/LobbyProviders"

type Props = {
    lobbyId: string
}

export function useLobbySubscription({ lobbyId }: Props) {
    const { user } = useAuth();
    const supabaseClient = useSupabase();

    const [ members, setMembers] = useState<Member[]>([]);
    const [ chats, setChats ] = useState<Chat[]>([]);
    const [ channel, setChannel ] = useState<RealtimeChannel | null>(null);

    // 参加ロビーの決定
    useEffect(() => {
        if (!user) return;
            
        // チャンネルの決定
        const newChannel = supabaseClient.channel(String(lobbyId), {
            config: {
                presence: { key: user.id },
                broadcast: {self: true}
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
