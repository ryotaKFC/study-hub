"use server"

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import LobbyList from "@/features/lobby/list/components/lobby-card";
import Link from "next/link";



export default async function Lobbies() {
    // const lobbies = await (fetchNearLobbies());

    return (
        <>
            <Navigation/>
            <main>
                <div className="mx-auto my-8 text-center">
                    <h1 className="font-bold m-4 text-center text-3xl sm:text-5xl">みんなで自習</h1>
                    <p>仲間と一緒に勉強しましょう！</p>

                    
                    <Link href="/lobby/create">
                        <Button type="button" size={"lg"} >ロビーの作成</Button>
                    </Link>
                    
                    
                </div>
                <LobbyList />

            </main>
        </>
    )
}
