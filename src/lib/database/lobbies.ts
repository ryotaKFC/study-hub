"use server"

import { supabase } from "@/lib/supabase/client";
import type { Lobby, LobbyCreationDate } from "@/types/lobby";


export async function createLobby(lobbyData: LobbyCreationDate) {
    const supabaseClient = supabase;
    if (!lobbyData.name.trim()) return;

    const { data, error } = await supabaseClient
        .from("lobbies")
        .insert([{
            name: lobbyData.name,
            studyMin: lobbyData.studyMin,
            breakMin: lobbyData.breakMin,
            startTime: new Date(),
            location: null,
            isPrivate: lobbyData.isPrivate,
        }])
        .select("*")
        .single();
    if (error) {
        console.error("ロビーの作成に失敗しました", error);
        throw error;
    }
    return (data as Lobby);
}

export async function getLobbies() {
    const supabaseClient = supabase;
    const { data, error } = await supabaseClient
        .from("lobbies")
        .select("*")
        .order("createdAt", { ascending: false});
    if(error) {
        console.error("ロビーの取得に失敗", error)
        throw error;
    }
    return (data as Lobby[]);
}

export async function getLobbyById(lobbyId: string) {
    const supabaseClient = supabase;
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
