"use client"

import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

const CONFIRMATION_MESSAGE = "ログインせずに勉強しますか？\n(ログインすることで、あなたの自習の記録が残ります)";

export function StudyButton() {
    const [user, setUser] = useState<User | null>(null);
        const supabaseClient = supabase;

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
        if (!window.confirm(CONFIRMATION_MESSAGE)) {
            e.preventDefault();
        }
    }
        
        return (
            <>
                <Link href="/lobby">
                    <Button variant="default" onClick={handleClick}>
                        一人で勉強！
                    </Button>
                </Link>
                <Link href="/lobby">
                    <Button variant="outline" onClick={handleClick}>
                        誰かと勉強！
                    </Button>
                </Link>
            </>
        )
}
