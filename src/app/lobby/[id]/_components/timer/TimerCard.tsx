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
        <Card variant="background">
            <h1 className="text-3xl font-bold text-emerald-800 text-center">{titleText}</h1>
            <Card className="p-7 bg-emerald-100 ">
                <Timer /> 
            </Card>
            <Card className="bg-emerald-50 text-center">
                <p className="text-emerald-800">{discriptionText}</p>
            </Card>
        </Card>
    )
}
