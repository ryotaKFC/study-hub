'use client';

import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

export default function LoginButton() {
    // const [user, setUser] = useState<string | null>(null);
    const [user, setUser] = useState< User | null>(null);
    const supabaseClient = createClient();

    useEffect(() => {
        const getUser = async () => {
        const {
            data: { user },
        } = await supabaseClient.auth.getUser()
            setUser(user)
        }

        getUser()
    }, [supabaseClient.auth])

    async function signInWithGoogle () {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
        })
        if (error) {
            console.error(error)
        }
    }

    async function signOut () {
        await supabaseClient.auth.signOut();
        setUser(null);
    }

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
