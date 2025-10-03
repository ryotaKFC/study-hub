import { Navigation } from '@/components/navigation';
import { fetchLobbyById } from '@/features/lobby/api/fetch-lobby';
import Chat from '@/features/lobby/detail/components/lobby-chat';
import Member from '@/features/lobby/detail/components/lobby-member';
import Timer from '@/features/lobby/detail/components/lobby-timer';
import Tips from '@/features/lobby/detail/components/lobby-tips';
import LobbyTitle from '@/features/lobby/detail/components/lobby-title';
import { WelcomeForm } from '@/features/lobby/detail/components/lobby-welcome-form';
import { LobbyProvider } from '@/features/lobby/detail/lobby-provider';


export default async function Lobby({ params }: { params: Promise<{ id:string }> }) {
    const lobby = await fetchLobbyById((await params).id)

    return (
        <LobbyProvider lobby={lobby}>
            <WelcomeForm />
            <div className="min-h-screen bg-emerald-50">
                <Navigation />
                <main className="mx-5 sm:mx-14 my-7 space-y-5">
                    <LobbyTitle />
                    <Timer />
                    <Chat />
                    <Member />
                    <Tips />
                </main>
            </div>
        </LobbyProvider>
    )
}


