
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LobbyList from "./_components/LobbyList";



export default function Lobbies() {

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
                <LobbyList/>

            </main>
        </>
    )
}
