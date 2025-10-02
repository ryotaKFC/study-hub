import { createClient } from "@/lib/supabase/server";
import { Lobby, LobbyCreationDate } from "../types/lobby";

const supabaseClient = await createClient();

export async function storeLobby(lobbyData: LobbyCreationDate) {
    if (!lobbyData.name.trim()) return;

    const { data, error } = await supabaseClient
        .from("lobbies")
        .insert([{
            name: lobbyData.name,
            studyMin: lobbyData.studyMin,
            breakMin: lobbyData.breakMin,
            startTime: new Date(),
            isPrivate: lobbyData.isPrivate,
            location: lobbyData.location,
        }])
        .select("*")
        .single();
    if (error) {
        console.error("ロビーの作成に失敗しました", error);
        throw error;
    }
    return (data as Lobby);
}
