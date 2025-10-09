"use client"

import { useAuth } from "@/features/auth/auth-provider";
import { Button } from "./ui/button";
import Image from "next/image";


export default function LoginButton() {
    const { user, signInWithGoogle, signOut } = useAuth();

    function handleSignOutButton() {
        const confirmed = window.confirm("ログアウトしますか？");
        if(confirmed) {
            signOut();
        }
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button className="bg-blue-500 hover:bg-blue-400" onClick={signInWithGoogle} >
                    Googleでログイン
                </Button>
            </div>
        )
    } else {
        return (
            <div className="flex items-center gap-2">
                <Button variant="link" onClick={handleSignOutButton}>
                    ログアウト
                </Button>
                <div>
                    <Image
                        src={user.user_metadata.avatar_url}
                        alt="User avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                </div>
            </div>
        )
    }

}
