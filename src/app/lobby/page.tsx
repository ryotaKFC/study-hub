import { Navigation } from "@/components/navigation";
import Timer from "./components/Timer";
import Discription from "./components/Discription";


export default function LobbyPage() {
    return (
        <div className="min-h-screen bg-emerald-50">
            <Navigation />
            <main className=" ">
                
                {/* ヘッダー */}
                <div className="text-center my-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">🏠 Study Lobby</h1>
                    <p>集中して勉強しましょう</p>

                </div>

                {/* メイン */}
                <div className="space-y-7 mx-auto mt-5 p-6 w-5/6 flex flex-col bg-white rounded-xl">
                    
                    {/* タイマー */}
                    <div>
                        <Timer />
                    </div>
                    <div>
                        <Discription />
                    </div>
                </div>
            </main>
        </div>
    )
}
