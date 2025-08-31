"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { Navigation } from "@/components/navigation";
import Card from "../lobby/components/ui/card";
import { Button } from "@/components/ui/button";

type Lobby = {
    id: number;
    name: string;
    start_time: string;
    study_min: number;
    break_min: number;
    created_at: string;
}

export default function Lobbies() {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [newLobby, setNewLobby] = useState("");

    useEffect(() => {
        
    })

    async function fetchLobbies() {
        const { data, error } = await supabaseClient
            .from("lobbies")
            .select("*")
            .order("created_at", { ascending: false});
        if (error) {
            console.error(error);
            return
        }
        setLobbies(data as Lobby[]);
    }

    async function createLobby(e?: React.FormEvent) {
        e?.preventDefault();
        if (!newLobby.trim()) return;
        const { data, error } = await supabaseClient
            .from("lobbies")
            .insert([{ name: newLobby }])
            .select()
            .single();
        if (error) {
            console.error(error);
            return;
        }
        setNewLobby("");
        setLobbies(prev => [data as Lobby, ...prev]);
    }
    return (
        <main>
            <Navigation/>
            <h1>Lobby一覧</h1>
            <form onSubmit={createLobby}>
                <input value={newLobby} 
                    onChange={(e) => setNewLobby(e.target.value)}
                    placeholder="ロビー名を入力"
                    className=""
                />
                <Button type="submit">作成</Button>
            </form>

            <ul>
                {lobbies.map((lobby) => (
                    <li key={lobby.id}>
                        <a href={`/lobby/${lobby.id}`} className="">{lobby.name}</a>
                        <div className="">{new Date(lobby.created_at).toLocaleString()}</div>
                    </li>
                ))}
            </ul>
        </main>
        
    )
}
