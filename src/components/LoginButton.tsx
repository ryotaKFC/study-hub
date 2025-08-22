'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function LoginButton() {
    const {data: session, status} = useSession();

    if (status === "authenticated") {
        return (
            <div className="flex items-center gap-2">
                
                <p>{session.user?.name}</p>
                <Button variant="link" onClick={() => signOut()} >
                    ログアウト
                </Button>
            </div>
        )
    }
    return (
        <Button className="bg-blue-500 hover:bg-blue-500/80" onClick={() => signIn("google")}>
            Goggleでログイン
        </Button>
    )
}
