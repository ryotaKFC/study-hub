"use server"

import { Navigation } from "@/components/navigation";
import Lobbies from "@/features/lobby/list/lobbies";



export default async function Page() {
    return (
        <>
            <Navigation/>
            <main>
                <div className="mx-auto my-8 text-center">
                    <h1 className="font-bold m-4 text-center text-3xl sm:text-5xl">みんなで自習</h1>
                    <p>仲間と一緒に勉強しましょう！</p>

                </div>
                <Lobbies />


            </main>
        </>
    )
}
