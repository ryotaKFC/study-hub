"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Lobby = {
    id: number;
    name: string;
    start_time: string;
    study_min: number;
    break_min: number;
    created_at: string;
}

export function useLobbies() {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const supabaseClient = createClient();

    const fetchLobbies = useCallback( async () => {
        const { data, error } = await supabaseClient
            .from("lobbies")
            .select("*")
            .order("created_at", { ascending: false});
        if (error) {
            console.error(error);
            return
        }
        setLobbies(data as Lobby[]);
    }, [supabaseClient])
        
    useEffect(() => {
        fetchLobbies();
        
        const channel = supabaseClient
            .channel("public:lobbies")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "lobbies"},
                (payload) => {
                    setLobbies(prev => [payload.new as Lobby, ...prev]);
                }
            )
            .subscribe();
        return () => {
            supabaseClient.removeChannel(channel);
        };
    }, [fetchLobbies, supabaseClient]);

    
    async function createLobby(name: string) {
        if (!name.trim()) return;
        const { data, error } = await supabaseClient
            .from("lobbies")
            .insert([{ name }])
            .select()
            .single();
        if (error) {
            console.error(error);
            return;
        }
        setLobbies(prev => [data as Lobby, ...prev]);
    }

    return { lobbies,  createLobby };
}
