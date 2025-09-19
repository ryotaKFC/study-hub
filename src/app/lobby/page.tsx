"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { useLobbies } from "./hooks/useLobbies"
import Link from "next/link";



export default function Lobbies() {
    const {lobbies} = useLobbies();



    return (
        <main>
            <Navigation/>
            <h1>Lobby一覧</h1>
            <Link href="/lobby/create">
                <Button type="button">ロビーの作成</Button>
            </Link>
            <ul>
                {lobbies.map((lobby) => (
                    <li key={lobby.id}>
                        <a href={`/lobby/${lobby.id}`} className="">{lobby.name}</a>
                        <div className="">{new Date(lobby.startTime).toLocaleString()}</div>
                    </li>
                ))}
            </ul>
        </main>
        
    )
}
