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

export type User = {
    id: number;
    lobby_id: number;
    user_id: string;
    display_name: string;
    joined_at: string;
}

export type Chat = {
    userId: number;
    ChatId: number;
    displayName: string;
    content: string;
}

type PresenceChat = {
    userId: string;
    display_name: string;
    content: string;
}

type PresenceUser= {
    user_id: string;
    display_name: string;
}

type LobbyContextType = {
    channel: RealtimeChannel,
    lobby: Lobby,
    users: PresenceUser[],
    chats: PresenceChat[],
    sendMessage: (content: string) => Promise<void>;
    isStudyTime: boolean;
    setIsStudyTime: Dispatch<SetStateAction<boolean>>;
}

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProviders({ lobbyId, children }: Props) {
    const [isStudyTime, setIsStudyTime] = useState(true);
    const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    const [lobby, setLobby] = useState<Lobby | null>(null);
    const [users, setUsers] = useState<PresenceUser[]>([]);
    const [chats, setChats] = useState<PresenceChat[]>([]);
    
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

    // メッセージ送信
    const sendMessage = useCallback(async (content: string) => {
        if(!content.trim() || !user || !channel) return;

        const payload = {
            userId: user.id,
            dsplay_name: user.user_metadata.name || "ななしさん",
            content: content,
        }

        await channel.send({
            type: "broadcast",
            event: "chat",
            payload: payload,
        });
    }, [channel, user])


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
        
        // チャットの受信
        channel.on("broadcast", { event: "chat" }, ({ payload }) => {
            setChats((prev) => [...prev, payload]);
        });
        
        // ユーザー入退室監視
        channel.on("presence", { event: "sync" }, () => {
            const state = channel.presenceState<PresenceUser>();
            const new_users: PresenceUser[] = Object.values(state).flat();
            setUsers(new_users);
            console.log(new_users);
        });
        
        // ロビーへ参加
        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.track({
                    user_id: user.id,
                    display_name: user?.user_metadata?.name || "ななしさん",
                });
                console.log("こんにちは！"+user.user_metadata.name+"さん");
            }
        });

        // ロビーの設定情報取得
        fetchLobby();
        
        return () => {
            supabaseClient.removeChannel(channel);
        }
    }, [fetchLobby, lobbyId, supabaseClient, user])
    
    if (!lobby || !channel) {
        return <div>Loading...</div>
    }
    
    return (
        <LobbyContext.Provider value={{ lobby, channel, users, chats, isStudyTime, setIsStudyTime, sendMessage }}>
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
