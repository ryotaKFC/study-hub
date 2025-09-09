"use client"

import { useParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import MemberCard from './_components/members/MemberCard';
import TimerCard from './_components/timer/TimerCard';
import { LobbyProviders } from './_context/LobbyProviders';
import ChatCard from './_components/chat/ChatCard';

export default function Lobby() {
    const lobbyId = Number(useParams().id);
    
    return (
        <LobbyProviders lobbyId={lobbyId}>
            <div className="min-h-screen bg-emerald-50">

                <Navigation />
                <main className="mx-14 my-7">
                    {/* ヘッダー */}
                    <div className="text-center hidden sm:inline">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏠 ロビー #{lobbyId}</h1>
                        <p>集中して勉強しましょう</p>
                    </div>

                    <TimerCard />
                    
                    <ChatCard />
                    
                    <MemberCard />
                </main>
            </div>
        </LobbyProviders>
    )
}

