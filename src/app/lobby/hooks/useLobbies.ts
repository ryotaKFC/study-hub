"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

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
    const supabaseClient = supabase;

    // ロビーの取得
    const fetchLobbies = useCallback( async () => {
        const { data, error } = await supabaseClient
            .from("lobbies")
            .select("*")
            .order("created_at", { ascending: false});
        if (error) {
            console.error(error);
            return;
        }
        setLobbies(data as Lobby[]);
    }, [supabaseClient])
        
    // ロビーの作成
    const createLobby = useCallback( async (name: string) => {
        if (!name.trim()) return;
        const { data, error } = await supabaseClient
            .from("lobbies")
            .insert([{ name: name, start_time: new Date() }])
            .select()
            .single();
        if (error) {
            console.error(error);
            return;
        }
        setLobbies(prev => [data as Lobby, ...prev]);
    }, [supabaseClient])

    // 購読処理
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

    return { lobbies,  createLobby };
}
