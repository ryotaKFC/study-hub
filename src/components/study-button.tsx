"use client"

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "./ui/button";


export function StudyButton() {
    const [user, setUser] = useState("");
        const supabaseClient = createClient();
        const confirmationMessage = "ログインせずに勉強しますか？\n(ログインすることで、あなたの自習の記録が残ります)";

        useEffect(() => {
            const getUser = async () => {
            const {
                data: { user },
            } = await supabaseClient.auth.getUser()
                setUser(user ? user.email ?? user.id ?? "" : "")
            }
            getUser()
        }, [supabaseClient.auth])

        const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
            if (user !== "") return;
            if (!window.confirm(confirmationMessage)) {
            e.preventDefault();
            }
        };
        
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
