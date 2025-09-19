"use client"

import { useAuth } from "@/lib/supabase/auth-provider";
import { createContext, Dispatch, SetStateAction, useCallback, useContext,  useState } from "react";
import { Lobby } from "@/types/lobby"
import { useLobbySubscription } from "../_hooks/useLobbySubscription";
import { useLobbyData } from "../_hooks/useLobbyData";

type Props = {
    lobbyId: number;
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
    lobby: Lobby,
    members: Member[];
    chats: Chat[];
    isStudyTime: boolean;
    setIsStudyTime: Dispatch<SetStateAction<boolean>>;
    sendMessage: (content: string) => Promise<void>;
}

const LobbyContext = createContext<LobbyContextType | undefined>(undefined);

export function LobbyProviders({ lobbyId, children }: Props) {
    const [isStudyTime, setIsStudyTime] = useState(true);
    // const [channel, setChannel] = useState<RealtimeChannel | null>(null);
    // const [chats, setChats] = useState<Chat[]>([]);
    // const [members, setMembers] = useState<Member[]>([]);
    // const [lobby, setLobby] = useState<Lobby | null>(null);
    const { lobby } = useLobbyData({lobbyId});

    const { channel, chats, members } = useLobbySubscription({lobbyId});

    const { user } = useAuth();
    
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



    if (!lobby || !channel) {
        return <div>Loading...</div>
    }
    
    return (
        <LobbyContext.Provider value={{ lobby, chats, members, isStudyTime, setIsStudyTime, sendMessage }}>
            {children}
        </LobbyContext.Provider>
    )
}

export const useLobby = () => {
    const context = useContext(LobbyContext)
    if (context === undefined) {
        throw new Error("ロビーが見つかりませんでした：LobbyProviders.tsx");
    }
    return context;
};
