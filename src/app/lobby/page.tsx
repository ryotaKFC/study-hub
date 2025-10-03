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
                <div className="mx-auto my-8 text-center">
                    <h1 className="font-bold m-4 text-center text-3xl sm:text-5xl">近くのロビー</h1>
                    <p>近くの仲間と勉強しましょう！</p>

                    <Link href="/lobby/create">
                        <Button type="button" size={"lg"} >ロビーの作成</Button>
                    </Link>
                </div>
                <LobbyList initialLobbies={lobbies}/>

            </main>
        </>
    )
}
