"use client"

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabasse/client";

const supabaseClient = createClient();

type Lobby = {
    id: number;
    name: string;
    startTime: string;
    studyMin: number;
    breakMin: number;
    created_at: string;
}

type LobbyContextType = {
    lobbies: [ Lobby ];
    users: [ User | null];
    isLoading: boolean;
}

export function LobbyProvider({children}: {children: React.ReactNode}) {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const supabaseClient = createClient();

    useEffect(() => {
        const getLobbies = async () => {
            const {data, error} = await supabaseClient
                .from("lobbies")
                .select("*")
                .order("created_at", { ascending: false});
            if (error) {
                console.error(error);
                return
            }
            setLobbies(data as Lobby[]);
        }
    }, [supabaseClient]);

}
