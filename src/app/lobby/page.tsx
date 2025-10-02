import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { fetchLobbies } from "@/features/lobby/api/fetch-lobby";
import LobbyList from "@/features/lobby/list/components/lobby-card";
import Link from "next/link";



export default async function Lobbies() {
    const lobbies = await fetchLobbies();

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
                <LobbyList initialLobbies={lobbies}/>

            </main>
        </>
    )
}
