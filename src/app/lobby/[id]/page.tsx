"use client"

import { useParams } from 'next/navigation';
import TimerCard from "./components/TimerCard";
import MemberCard from "./components/MemberCard";
import Card from "@/components/ui/card";
import { useLobby } from "./hooks/useLobby";
import { Navigation } from '@/components/navigation';

export default function Lobby() {
    const params = useParams();
    const lobbyId = Number(params.id);
    
    const { lobby } = useLobby();

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
                <TimerCard />
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
                <MemberCard />
            </main>
        </div>
    )
}
