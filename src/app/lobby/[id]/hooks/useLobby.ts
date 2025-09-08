"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider";
import { useParams } from "next/navigation";
import { RealtimeChannel } from "@supabase/supabase-js";

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
    const lobbyId = Number(useParams().id);
    const { user } = useAuth();
    const [userId, setUserId] = useState<number>();

    const userChannelRef = useRef<RealtimeChannel | null>(null);
    const chatChannelRef = useRef<RealtimeChannel | null>(null);

    const [ lobby, setLobby ] = useState<Lobby | null>(null);
    const [ users, setUsers ] = useState<User[]>([]);
    const [ chats, setChats ] = useState<Chat[]>([]);

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
        // return data as Lobby;
    }, [lobbyId])

    // usersの取得
    const fetchUsers = useCallback( async() => {
        const { data, error } = await supabaseClient
            .from("lobby_users")
            .select("*")
            .eq("lobby_id", lobbyId);
        if(error) {
            console.error(error);
            return;
        }
        // if (data) setUsers(data);
        return data as User[]
    }, [lobbyId])

    // chatsの取得
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
        // if (data) setChats(data);
        return data as Chat[];
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

    // users購読開始
    const subscribeToUsers = useCallback(() => {
        userChannelRef.current = supabaseClient
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
    }, [lobbyId]);
    // user購読解除
    const unsubscribeFromUsers = useCallback(async () =>{
        if (userChannelRef.current) {
            await supabaseClient.removeChannel(userChannelRef.current);
            userChannelRef.current = null;
        }
    }, [])

    // chats購読開始
    const subscribeToChats = useCallback(() => {
        chatChannelRef.current = supabaseClient
            .channel("public:lobby_chats:"+lobbyId)
            .on(
                "postgres_changes",
                {
                    event:"INSERT",
                    schema:"public",
                    table:"lobby_chats",
                    filter:"lobby_id=eq."+lobbyId,
                },
                (payload) => {
                    const newChat = payload.new as Chat;
                    setChats((prev) => [...prev, newChat]);
                }
            ).subscribe();
    }, [lobbyId]);
    // chats購読解除
    const unsubscribeFromChats = useCallback(async () =>{
        if (chatChannelRef.current) {
            await supabaseClient.removeChannel(chatChannelRef.current);
            chatChannelRef.current = null;
        }
    }, [])

    // 初期処理
    useEffect(() => {
        fetchLobby();
        fetchUsers();
        fetchChats();
    }, [fetchChats, fetchLobby, fetchUsers, joinLobby]);
    
    return { chats, users, lobby, joinLobby, leaveLobby, subscribeToChats, unsubscribeFromChats, subscribeToUsers, unsubscribeFromUsers };
}
