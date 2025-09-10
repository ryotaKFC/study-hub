"use client"

import { useSupabase } from "@/lib/supabase/supabase-provider";
import { useAuth } from "@/lib/supabase/auth-provider";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

type Props = {
    lobbyId: number;
    children: React.ReactNode;
}

export type Lobby = {
    id: number;
    name: string;
    start_time: string;
    study_min: number;
    break_min: number;
    created_at: string;
}

type LobbyContextType = {
    isLoading: boolean;
    channel: RealtimeChannel,
    lobby: Lobby,
    isStudyTime: boolean;
    setIsStudyTime: Dispatch<SetStateAction<boolean>>;
}

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProviders({ lobbyId, children }: Props) {
    const [isStudyTime, setIsStudyTime] = useState(true);
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    const [lobby, setLobby] = useState<Lobby | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    
    const supabaseClient= useSupabase();

    
    // ロビーの取得
    const fetchLobby = useCallback( async() => {
        const { data, error } = await supabaseClient
            .from("lobbies")
            .select("*")
            .eq("id", lobbyId)
            .single();
        if(error) {
            console.error(error);
            return;
        }
        setLobby(data as Lobby);
    }, [lobbyId, supabaseClient])



    useEffect(() => {
        if(!user) return;

        // 参加ロビーの決定
        const channel = supabaseClient.channel(String(lobbyId), {
            config: {
                presence: { key: user.id },
                broadcast: {self: true}
            }
        });
        setChannel(channel);
        
        // ロビーへ参加
        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.track({
                    user_id: user.id,
                    display_name: user?.user_metadata?.name || "ななしさん",
                });
            }
        });

        // ロビーの設定情報取得
        fetchLobby();

        return () => {
            supabaseClient.removeChannel(channel);
        }
    }, [fetchLobby, lobbyId, supabaseClient, user])

    
    // チャンネルの取得
    useEffect(() => {
        if(!user) return;
        const channel = supabaseClient.channel(String(lobbyId), {
            config: {
                presence: { key: user.id },
                broadcast: {self: true}
            }
        });
        setChannel(channel);
    },[lobbyId, supabaseClient, user]);

    if (!lobby || !channel) {
        return <div>Loading...</div>
    }
    
    return (
        <LobbyContext.Provider value={{ isLoading, lobby, channel, isStudyTime, setIsStudyTime }}>
            {children}
        </LobbyContext.Provider>
    )
}

export const useLobby = () => {
    const context = useContext(LobbyContext)
    if (context === undefined) {
        throw new Error("ロビーが見つかりませんでした：LobbyProviders.tsx");
    }
    return context;
};
