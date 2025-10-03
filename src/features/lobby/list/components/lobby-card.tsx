"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Lobby } from "../../types/lobby";
import { useLobbiesSubscriptions } from "../use-lobbies-subscription";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import LobbyInfo from "./card/lobby-info";

type Props = {
    initialLobbies: Lobby[],
}

export default function LobbyList({initialLobbies}: Props) {
    const [lobbies, setLobbies] = useState<Lobby[]>(initialLobbies);
    useLobbiesSubscriptions(setLobbies);

    return (
        <div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lobbies.map((lobby) => (
                <Card key={lobby.id} className="mx-5 p-5">
                    <CardHeader className="text-xl sm:text-2xl">
                        {lobby.name}
                    </CardHeader>
                    <CardContent>
                        <LobbyInfo lobby={lobby}/>
                    </CardContent>
                    
                    {/* <div className="">{new Date(lobby.startTime).toLocaleString()}</div> */}
                    {/* <LobbyInfo lobby={lobby} /> */}
                    <CardFooter>
                        <Link href={`/lobby/${lobby.id}`} className="w-full" >
                            <Button className="w-full">参加</Button>
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
