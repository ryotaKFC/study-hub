import { Navigation } from "@/components/navigation";
import Timer from "./components/TimerCard";
import Chat from "./components/ChatCard";
import Member from "./components/MemberCard";

export default function LobbyPage() {
    return (
        <div className="min-h-screen bg-emerald-50">
            <Navigation />
            <main className="mx-14 my-7">
                {/* ヘッダー */}
                <div className="text-center hidden sm:inline">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏠 Study Lobby</h1>
                    <p>集中して勉強しましょう</p>
                </div>

                {/* タイマー */}
                <Timer />
                {/* チャット */}
                <Chat />
                {/* メンバー */}
                <Member />
            </main>
        </div>
    )
}
