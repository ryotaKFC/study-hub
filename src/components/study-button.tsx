"use client"

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

const CONFIRMATION_MESSAGE = "ログインせずに勉強しますか？\n(ログインすることで、みんなで勉強することができます)";

export function StudyButton() {
    const [user, setUser] = useState<User | null>(null);
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

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        if (user) return;
        // if (!window.confirm(CONFIRMATION_MESSAGE)) {
        //     e.preventDefault()
        // }
    }
        
        return (
            <>
                <Link href="/lobby/create?isPrivate=true">
                    <Button variant="outline" onClick={handleClick}>
                        一人で勉強！
                    </Button>
                </Link>
                <Link href="/lobby">
                    <Button variant="default" onClick={handleClick}>
                        誰かと勉強！
                    </Button>
                </Link>
            </>
        )
}
