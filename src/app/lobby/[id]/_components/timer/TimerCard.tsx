"use client"

import { useLobby } from "../../_context/LobbyProviders";
import Timer from "./Timer";
import Card from "@/components/ui/card";

export default function TimerCard() {
    const { isStudyTime } = useLobby();

    const titleText = isStudyTime ? "勉強中..." : "休憩時間";
    const discriptionText = isStudyTime ? 
    "🎯 集中して勉強しましょう！チャットは休憩時間に利用できます" :
    "🍵 少し休憩しましょう！チャットで雑談もOKです";
    return (
        <Card>
            <h1 className="text-3xl font-bold text-emerald-800 text-center">{titleText}</h1>
            <Timer />
            <div className="bg-emerald-50 rounded-sm text-center p-4">
                <p className="text-emerald-800">{discriptionText}</p>
            </div>
        </Card>
    )
}
