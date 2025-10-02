import { createClient } from "@/lib/supabase/server";
import { Lobby } from "../types/lobby";


const supabaseClient = await createClient();

export async function fetchLobbies() {
    const { data, error } = await supabaseClient
        .from("lobbies")
        .select("*")
        .eq("isPrivate", "false")
        .order("createdAt", { ascending: false});
    if(error) {
        console.error("ロビーの取得に失敗", error)
        throw error;
    }
    return (data as Lobby[]);
}

export async function fetchLobbyById(lobbyId: string) {
    const { data, error} = await supabaseClient
        .from("lobbies")
        .select("*")
        .eq("id", lobbyId)
        .single();
    if(error) {
        console.error(error);
        throw error;
    }
    return (data as Lobby);
}
