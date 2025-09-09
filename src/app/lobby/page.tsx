"use client";

import { useCallback, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { useLobbies } from "./hooks/useLobbies"



export default function Lobbies() {
    const {lobbies, createLobby} = useLobbies();
    const [newLobby, setNewLobby] = useState("");

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        await createLobby(newLobby);
        setNewLobby("");
    }

    return (
        <main>
            <Navigation/>
            <h1>Lobby一覧</h1>
            <form onSubmit={handleCreate}>
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
