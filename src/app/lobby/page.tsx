"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { useLobbies } from "./hooks/useLobbies"
import Link from "next/link";
import Card from "@/components/ui/card";



export default function Lobbies() {
    const {lobbies} = useLobbies();

    return (
        <>
            <Navigation/>
            <main>
                <div className="mx-auto my-5 text-center">
                <Link href="/lobby/create">
                    <Button type="button" size={"lg"} >ロビーの作成</Button>
                </Link>
                <h1 className="font-bold m-4 text-center text-3xl sm:text-5xl">Lobbies List</h1>

                </div>
                <div className="px-4 grid grid-cols-1 sm:px-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {lobbies.map((lobby) => (
                        <Card key={lobby.id} className="mx-5 p-12 text-center bg-white">
                            <Link href={`/lobby/${lobby.id}`} className="text-xl sm:text-2xl">
                                {lobby.name}
                            </Link>
                            <div className="">{new Date(lobby.startTime).toLocaleString()}</div>
                        </Card>
                    ))}
                </div>
            </main>
        </>
        
    )
}
