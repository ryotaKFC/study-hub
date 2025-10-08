"use server"

import { createClient } from "@/lib/supabase/server"

export async function updateLobbyMemberCount(lobbyId:string, memberCount: number) {
    const supabaseClient = await createClient()
    const { error } = await supabaseClient
        .from("lobbies")
        .update({ memberCount: memberCount })
        .eq("id", lobbyId)
    if (error) {
        console.error("error", error);
        throw error;
    }
    
}
