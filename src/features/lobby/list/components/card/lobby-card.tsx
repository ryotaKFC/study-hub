"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Lobby } from "@/features/lobby/types/lobby";
import { LobbyNowMode } from "./lobby-now-mode";
import Link from "next/link";
import { Users, MapPinned, Clock } from "lucide-react"
import { GetRelativeTime } from "@/lib/get-relative-time";

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
                <div className="flex space-x-2">
                    <MapPinned className="h-5 w-4"/>
                    <p className="text-sm font-bold text-gray-600">{lobby.locationName}</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col">
                    <div className="flex justify-between mb-1">
                        <div className="flex space-x-2">
                            <Users className="h-7 w-4" />
                            <p>{lobby.memberCount} 人</p> 
                        </div>
                        <div className="flex space-x-2">
                            <Clock className="h-7 w-4" />
                            <p>{GetRelativeTime(new Date(lobby.lastActivityAt))}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>自習時間:</p>
                        <p>{lobby.studyMin} 分</p>
                    </div>
                    <div className="flex justify-between">
                        <p>休み時間:</p>
                        <p>{lobby.breakMin} 分</p>
                    </div>
                    <div className="flex justify-between">
                        <p>開始時間:</p>
                        <p>{GetRelativeTime(new Date(lobby.startTime))}</p>
                    </div>
                </div>
            </CardContent>
            
            <CardFooter>
                <Link href={`/lobby/${lobby.id}`} className="w-full" >
                    <Button className="w-full">参加</Button>
                </Link>
            </CardFooter>
        </Card>

    )
}
