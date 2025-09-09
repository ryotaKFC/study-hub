"use client"

import { Button } from "./ui/button";
import Image from "next/image";
import { useAuth } from "@/lib/supabase/auth-provider";


export default function LoginButton() {
    const { user, signInWithGoogle, signOut } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="link" onClick={signInWithGoogle} >
                    ログイン
                </Button>
            </div>
        )
    } else {
        return (
            <div className="flex items-center gap-2">
                <Button variant="link" onClick={signOut}>
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
