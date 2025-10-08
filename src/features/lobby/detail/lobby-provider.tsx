"use client"

import { createContext, Dispatch, SetStateAction, use, useCallback, useState } from "react";
import { Lobby } from "../types/lobby";
import { useLobbySubscription } from "./use-lobby-subscription";
import { useAuth } from "@/features/auth/auth-provider";
import { usePomodoroTimer } from "../hooks/use-pomodoro-timer";

type Props = {
    lobby: Lobby;
    previewMode: boolean;
    children: React.ReactNode;
}

export type Chat = {
    chatId: string;
    userId: string;
    displayName: string;
    content: string;
}

export type Member = {
    user_id: string;
    display_name: string;
    user_goal: string
}

type LobbyContextType = {
    previewMode: boolean;
    lobby: Lobby;
    members: Member[];
    chats: Chat[];
    time: string;
    isStudyTime: boolean;
    setGoal: Dispatch<SetStateAction<string>>
    sendMessage: (content: string) => Promise<void>;
}

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProvider({ lobby, previewMode, children }: Props) {
    const [ goal, setGoal] = useState("");
    const { channel, chats, members } = useLobbySubscription(lobby.id, goal);
    const { user } = useAuth();
    const { time, isStudyTime} = usePomodoroTimer(lobby);

    // メッセージの送信
    const sendMessage = useCallback( async (content: string) => {
        if(!content.trim() || !user || !channel) return;
    
        const payload = {
            chatId: crypto.randomUUID(),
            userId: user.id,
            displayName: user.user_metadata.name || "ななしさん",
            content: content,
        }

        await channel.send({
            type: "broadcast",
            event: "chat",
            payload: payload,
        });
    }, [channel, user])


    if (!lobby) {
        return <div>Loading...</div>
    }
    
    return (
        <LobbyContext.Provider value={{ previewMode, lobby, chats, members, isStudyTime, time, sendMessage, setGoal }}>
            {children}
        </LobbyContext.Provider>
    )
}

export const useLobby = () => {
    const context = use(LobbyContext)
    if (context === undefined) {
        throw new Error("ロビーが見つかりませんでした：LobbyProviders.tsx");
    }
    return context;
};
