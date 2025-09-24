"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Lobby } from "@/types/lobby"
import { getLobbies } from "@/lib/database/lobbies";


export function useLobbies() {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const supabaseClient = supabase;

    const fetchLobbies = useCallback(async () => {
        const newLobbies = await getLobbies()
        setLobbies(newLobbies);
    }, [])

    // 購読処理
    useEffect(() => {
        fetchLobbies();
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
    }, [fetchLobbies, supabaseClient]);

    return { lobbies };
}
