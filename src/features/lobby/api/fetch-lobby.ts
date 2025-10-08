"use server"

import { createClient } from "@/lib/supabase/server";
import { Lobby } from "../types/lobby";



export async function fetchLobbies() {
    const supabaseClient = await createClient();
    const { data, error } = await supabaseClient
        .from("lobbies")
        .select("*")
        .eq("isPrivate", "false")
        .order("createdAt", { ascending: false});
    if(error) {
        console.error("ロビーの取得に失敗", error);
        throw error;
    }
    return data as Lobby[];
}

export async function fetchLobbiesOrderNear(lat: number, lng: number) {
    const supabaseClient = await createClient();
    const { data, error } = await supabaseClient
        .rpc("lobbies_near", { user_lat: lat, user_lng: lng});
    if (error) {
        console.error("ロビー取得失敗", error);
        throw error;
    }

    return data as Lobby[];
}

export async function fetchLobbyById(lobbyId: string) {
    const supabaseClient = await createClient();
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
