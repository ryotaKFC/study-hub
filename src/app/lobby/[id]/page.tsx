"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client';

import { Navigation } from "@/components/navigation";
import TimerCard from "../components/TimerCard";
import ChatCard from "../components/ChatCard";
import MemberCard from "../components/MemberCard";
import Card from "../components/ui/card";

type Lobby = {
    id: number;
    name: string;
    start_time: string;
    study_min: number;
    break_min: number;
    created_at: string;
}

type LobbyUser = {
    id: number;
    lobby_id: number;
    user_id: string;
    display_name?: string;
    joined_at: string;
}

export default function Lobby({ params }: { params: { id: number }}) {
    const lobbyId = Number(params.id);
    const [users, setUsers] = useState<LobbyUser[]>([]);
    const [displayName, setDisplayName] = useState<string>("");
    const [userId, setUserId] = useState("");

    const supabaseClient = createClient();

    // const fetchInitial = useCallback ( async () => {
    //     const [ {data: usersData}] = await Promise.all([
    //         // supabaseClient.from("lobby_chats").select("*").eq("lobby_id", lobbyId).order("created_at", {ascending:false}).limit(100),
    //         supabaseClient.from("lobby_users").select("*").eq("lobby_id", lobbyId).order("joined_at", {ascending:false}),
    //     ])
    //     if (usersData) setUsers(usersData as LobbyUser[]);
    //     }, [lobbyId, supabaseClient]
    // )
    
    // const joinLobby = useCallback ( async () => {
    //     if(session?.user?.name) {
    //         setDisplayName(session.user.name);
    //     } else {
    //         setDisplayName("ななしさん");
    //     }
    //     const {error} = await supabaseClient
    //         .from("lobby_users")
    //         .insert([{ lobby_id:lobbyId, user_id: userId, display_name: displayName}])
    //         .select()
    //         .single();
    //     if (error) console.error("join error", error);
    // }, [displayName, lobbyId, session.user.name, supabaseClient, userId])

    // const leaveLobby = useCallback(async () => {
    //     const { error } = await supabaseClient
    //         .from("lobby_users")
    //         .delete()
    //         .match({lobby_id: lobbyId, user_id: userId});
    //     if (error) console.error("leave error", error);
    // }, [lobbyId, userId])
    

    // useEffect(() => {
    //     joinLobby();
    //     fetchInitial();
    //     const userChannel = supabaseClient
    //         .channel("public:lobby_users:"+lobbyId)
    //         .on(
    //             "postgres_changes",
    //             { event:"INSERT", schema:"public", table:"lobby_users", filter: "lobby_id=eq."+lobbyId},
    //             (payload) => {
    //                 setUsers(prev => [payload.new as LobbyUser, ...prev]);
    //             }
    //         )
    //         .on(
    //             "postgres_changes",
    //             { event:"DELETE", schema:"public", table:"lobby_users", filter: "lobby_id=eq."+lobbyId},
    //             (payload) => {
    //                 const old = payload.old as LobbyUser;
    //                 setUsers(prev => prev.filter(user => user.id !== old.id));
    //             }
    //         )
    //         .subscribe();

    //         return () => {
    //             leaveLobby();
    //             supabaseClient.removeChannel(userChannel);
    //         };
    // }, [leaveLobby, fetchInitial, joinLobby, lobbyId, session?.user?.name])

    





    return (
        <div className="min-h-screen bg-emerald-50">
            <Navigation />
            <main className="mx-14 my-7">
                {/* ヘッダー */}
                <div className="text-center hidden sm:inline">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏠 ロビー #{lobbyId}</h1>
                    <p>集中して勉強しましょう</p>
                </div>

                {/* タイマー */}
                <TimerCard />
                {/* チャット */}
                {/* <ChatCard /> */}
                {/* <ChatCard/>
                <Card>
                    {users.map(user => (
                        <li key={user.id} className="">
                            {user.display_name ?? user.user_id}
                        </li>
                    ))}
                </Card> */}

                <Card>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.display_name ?? user.user_id}
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* メンバー */}
                <MemberCard />
            </main>
        </div>
    )
}
