"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Card from "@/components/ui/card";
import CardHeader from "./card/header";
import LobbyInfo from "./card/info";
import { Lobby } from "../../types/lobby";
import { useLobbiesSubscriptions } from "../use-lobbies-subscription";

type Props = {
    initialLobbies: Lobby[],
}

export default function LobbyList({initialLobbies}: Props) {
    const [lobbies, setLobbies] = useState<Lobby[]>(initialLobbies);
    useLobbiesSubscriptions(setLobbies);

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
