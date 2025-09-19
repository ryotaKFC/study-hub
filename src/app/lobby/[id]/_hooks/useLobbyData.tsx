"use client"

import { useCallback, useEffect, useState } from "react";
import {useSupabase} from "@/lib/supabase/supabase-provider"
import { Lobby } from "@/types/lobby"

type Props = {
    lobbyId: number;
}

export function useLobbyData({ lobbyId }: Props) {
    const supabaseClient = useSupabase();
    const [lobby, setLobby] = useState<Lobby | null>(null);

    const fetchLobby = useCallback(async () => {
        const { data, error } = await supabaseClient
            .from("lobbies")
            .select("*")
            .eq("id", lobbyId)
            .single();
        if(error) {
            console.error(error);
            return;
        }
        setLobby(data as Lobby);
    }, [lobbyId, supabaseClient]);

    useEffect(() => {
        fetchLobby();
    }, [fetchLobby])

    return { lobby };
}
