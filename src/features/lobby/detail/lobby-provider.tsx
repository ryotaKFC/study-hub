"use client"

import { createContext, Dispatch, SetStateAction, use, useCallback, useState } from "react";
import { Lobby } from "../types/lobby";
import { useLobbySubscription } from "./use-lobby-subscription";
import { useAuth } from "@/features/auth/auth-provider";
import { usePomodoroTimer } from "../hooks/use-pomodoro-timer";

type Props = {
    lobby: Lobby;
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
}

type LobbyContextType = {
    lobby: Lobby;
    members: Member[];
    chats: Chat[];
    time: string;
    isStudyTime: boolean;
    setIsFormSubmitted: Dispatch<SetStateAction<boolean>>
    sendMessage: (content: string) => Promise<void>;
}

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProvider({ lobby, children }: Props) {
    const [ isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { channel, chats, members } = useLobbySubscription(lobby.id, isFormSubmitted);
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
        <LobbyContext.Provider value={{ lobby, chats, members, isStudyTime, time, sendMessage, setIsFormSubmitted }}>
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
