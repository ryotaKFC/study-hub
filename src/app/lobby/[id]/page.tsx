"use client"

import { useParams } from 'next/navigation';
import TimerCard from "./components/TimerCard";
import MemberCard from "./components/MemberCard";
import Card from "@/components/ui/card";
import { Chat, useLobby, User } from "./hooks/useLobby";
import { Navigation } from '@/components/navigation';
import { useEffect, useState } from 'react';

export default function Lobby() {
    const lobbyId = Number(useParams().id);
    const [ isStudyTime, setIsStudyTime ] = useState(false);
    
    const { 
        joinLobby, 
        leaveLobby, 
        subscribeToUsers, 
        unsubscribeFromUsers, 
        subscribeToChats, 
        unsubscribeFromChats, 
        users, chats, lobby
    } = useLobby();

    
   useEffect(() => {
        joinLobby();
        subscribeToUsers();
        subscribeToChats();
        const handleBeforeUnload = () => {
            leaveLobby();
            unsubscribeFromChats();
            unsubscribeFromUsers();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            handleBeforeUnload();
        }

    }, [joinLobby, leaveLobby, subscribeToChats, subscribeToUsers, unsubscribeFromChats, unsubscribeFromUsers])

    if(!lobby) {
        return (
            <div>
                ロード中...
            </div>
        )
    }

    
    return (
        <div className="min-h-screen bg-emerald-50">
            <Navigation />
            <main className="mx-14 my-7">
                {/* ヘッダー */}
                <div className="text-center hidden sm:inline">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏠 ロビー #{lobbyId}</h1>
                    <p>集中して勉強しましょう</p>
                </div>

                {/* タイマー */}
                <TimerCard lobby={lobby} setIsStudyTime={setIsStudyTime} />

                {/* チャット */}
                

                {/* <ChatCard /> */}
                {/* <ChatCard/>
                <Card>
                    {users.map(user => (
                        <li key={user.id} className="">
                            {user.display_name ?? user.user_id}
                        </li>
                    ))}
                </Card> */}

                {/* メンバー */}
                <MemberCard users={users} />
            </main>
        </div>
    )
}
