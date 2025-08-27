"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from '@/lib/supabaseClient'

import { Navigation } from "@/components/navigation";
import Timer from "../components/TimerCard";
import Chat from "../components/ChatCard";
import Member from "../components/MemberCard";

type Lobby = {
    id: number;
    name: string;
    start_time: string;
    study_min: number;
    break_min: number;
    created_at: string;
}

type Chat = {
    id: number;
    lobby_id: number;
    user_id?: string;
    display_name?: string;
    content: string; 
    created_at: string;
}

type LobbyUser = {
    id: number;
    lobby_id: number;
    user_id: string;
    display_name?: string;
    joined_at: string;
}

export default function Lobby({ params }: { params: { id: string }}) {
    const lobbyId = params.id;
    const [chats, setChats] = useState<Chat[]>([]);
    const [uers, setUsers] = useState<LobbyUser[]>([]);
    const [message, setMessage] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        fetchInitial();
        // Googleの名前とかでjoinする処理あとでかく
        joinLobby();



    })

    async function fetchInitial() {
        const [{data: chatsData}, {data: usersData}] = await Promise.all([
            supabaseClient.from("lobby_chats").select("*").eq("lobby_id", lobbyId).order("created_at", {ascending:false}).limit(100),
            supabaseClient.from("lobby_users").select("*").eq("lobby_id", lobbyId).order("joined_at", {ascending:false}),
        ])
        if (chatsData) setChats(chatsData as Chat[]);
        if (usersData) setUsers(usersData as LobbyUser[]);
    }

    async function joinLobby() {
        // display nameを入れる処理あとで入れる
        const name = "test";
        setDisplayName(name);

        
    }

    return (
        <div className="min-h-screen bg-emerald-50">
            <Navigation />
            <main className="mx-14 my-7">
                {/* ヘッダー */}
                <div className="text-center hidden sm:inline">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏠 Study Lobby</h1>
                    <p>集中して勉強しましょう</p>
                </div>

                {/* タイマー */}
                <Timer />
                {/* チャット */}
                <Chat />
                {/* メンバー */}
                <Member />
            </main>
        </div>
    )
}
