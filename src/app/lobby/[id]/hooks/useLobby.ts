"use client"

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider";
import { useParams } from "next/navigation";

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

const supabaseClient = createClient();


export function useLobby() {
    const params = useParams();
    const lobbyId = Number(params.id);
    
    const { user } = useAuth();
    const [lobby, setLobby] = useState<Lobby>();
    const [userId, setUserId] = useState<number>();
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);

    
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
        setLobby(data);
    }, [lobbyId])

    // ロビー内ユーザーの取得
    const fetchUsers = useCallback( async() => {
        const { data, error } = await supabaseClient
            .from("lobby_users")
            .select("*")
            .eq("lobby_id", lobbyId);
        if(error) {
            console.error(error);
            return;
        }
        if (data) setUsers(data);
    }, [lobbyId])

    // チャットの取得
    const fetchChats = useCallback( async() => {
        const { data, error } = await supabaseClient
            .from("lobby_chats")
            .select("*")
            .eq("lobby_id", lobbyId)
            .order("created_at", { ascending: true})
            .limit(50);
        if(error) {
            console.error(error);
            return;
        }
        if (data) setChats(data);
    }, [lobbyId])

    // ロビー入室
    const joinLobby = useCallback( async () => {
        if (!user) return;
        const displayName = user?.user_metadata?.name || "名無しさん";
        
        const { data, error } = await supabaseClient
            .from("lobby_users")
            .insert([{ lobby_id: lobbyId, display_name: displayName}])
            .select("id")
            .single();
        if (error) {console.error(error); return};
        if (data) setUserId(data.id);
    }, [lobbyId, user]);

    // ロビー退出
    const leaveLobby = useCallback( async() => {
        if (!userId) return;
        const {error} = await supabaseClient
            .from("lobby_users")
            .delete()
            .eq("id", userId);
        if (error) console.error(error);
    }, [userId])

    // 初期処理
    useEffect(() => {
        joinLobby();
        fetchLobby();
        fetchUsers();
        fetchChats();
    }, [fetchChats, fetchLobby, fetchUsers, joinLobby]);
    
    // 購読処理
    useEffect(() => {
        const supabaseChannel = supabaseClient
            .channel("public:lobby_users:"+lobbyId)
            .on(
                "postgres_changes",
                { 
                    event:"INSERT",
                    schema:"public",
                    table:"lobby_users",
                    filter:"lobby_id=eq."+lobbyId,
                },
                (payload) => {
                    const newUser = payload.new as User;
                    setUsers((prev) => [...prev, newUser]);
                }
            )
            .on(
                "postgres_changes",
                {
                    event:"DELETE",
                    schema:"public",
                    table:"lobby_users",
                    filter:"lobby_id=eq."+lobbyId,
                },
                (payload) => {
                    const old = payload.old as User;
                    setUsers((prev) => prev.filter(user => user.id !== old.id));
                }
            ).subscribe();
        
        const handleBeforeUnload = () => {
            leaveLobby();
            supabaseClient.removeChannel(supabaseChannel)
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            handleBeforeUnload();
        }
    }, [leaveLobby, lobbyId])

    
    return { lobby, users, chats};
}
