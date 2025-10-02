"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lobby } from "../types/lobby";


export function useLobbiesSubscriptions(setLobbies: React.Dispatch<React.SetStateAction<Lobby[]>>) {
    const supabaseClient = createClient();

    // 購読処理
    useEffect(() => {
        const channel = supabaseClient
            .channel("public:lobbies")
            .on(
                "postgres_changes",
                { 
                    event: "INSERT", 
                    schema: "public", 
                    table: "lobbies",
                    filter: "isPrivate=eq.false",
                },
                (payload) => {
                    setLobbies(prev => [payload.new as Lobby, ...prev]);
                }
            )
            .subscribe();
        return () => {
            supabaseClient.removeChannel(channel);
        };
    }, [setLobbies, supabaseClient]);
}
