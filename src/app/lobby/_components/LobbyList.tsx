"use client"

import Link from "next/link";
import CardHeader from "./LobbyCard/Header";
import Card from "@/components/ui/card";
import { useLobbies } from "../hooks/useLobbies";
import LobbyInfo from "./LobbyCard/LobbyInfo";
import { Button } from "@/components/ui/button";

export default function LobbyList() {
    const {lobbies} = useLobbies();

    return (
        <div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lobbies.map((lobby) => (
                <Card variant="background" key={lobby.id} className="mx-5 p-9">
                    <CardHeader>
                        <Link href={`/lobby/${lobby.id}`} className="text-xl sm:text-2xl">
                            {lobby.name}
                        </Link>
                    </CardHeader>
                    
                    {/* <div className="">{new Date(lobby.startTime).toLocaleString()}</div> */}
                    <LobbyInfo lobby={lobby} />
                    <Link href={`/lobby/${lobby.id}`}>
                        <Button className="w-full">参加</Button>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
