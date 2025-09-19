import { Navigation } from '@/components/navigation';
import MemberCard from './_components/members/MemberCard';
import TimerCard from './_components/timer/TimerCard';
import { LobbyProviders } from './_context/LobbyProviders';
import ChatCard from './_components/chat/ChatCard';
import LobbyTitle from './_components/LobbyTitle';


export default async function Lobby({ params }: { params: Promise<{ id:string }> }) {
    const lobbyId = (await params).id;
    
    return (
        <LobbyProviders lobbyId={lobbyId}>
            <div className="min-h-screen bg-emerald-50">
                <Navigation />
                <main className="mx-5 sm:mx-14 my-7">
                    {/* ヘッダー */}
                    <LobbyTitle />

                    <TimerCard />
                    
                    <ChatCard />

                    <MemberCard />
                </main>
            </div>
        </LobbyProviders>
    )
}


