"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Lobby } from "@/features/lobby/types/lobby";
import LobbyInfo from "./lobby-info";
import { LobbyNowMode } from "./lobby-now-mode";
import Link from "next/link";

type Props = {
    lobby: Lobby;
}

export function LobbyCard({lobby}: Props) {
    return(
        <Card key={lobby.id} className="mx-5 p-5">
            <CardHeader className="text-xl sm:text-2xl">
                <div className="flex justify-between">
                    <h1>{lobby.name}</h1>
                    <LobbyNowMode lobby={lobby}/>
                </div>
                <p className="text-sm font-bold text-gray-600">
                    📍{lobby.locationName}
                </p>
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

    )
}
