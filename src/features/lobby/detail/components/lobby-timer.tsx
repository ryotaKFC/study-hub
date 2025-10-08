"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLobby } from "../lobby-provider";


export default function LobbyTimer() {
    const { time, isStudyTime } = useLobby();

    const titleText = isStudyTime ? "勉強中..." : "休憩時間";
    const discriptionText = isStudyTime ? 
    "🎯 集中して勉強しましょう！チャットは休憩時間に利用できます" :
    "🍵 少し休憩しましょう！チャットで雑談もOKです";

    return (
        <Card className="space-y-3 sm:px-10">
            <CardHeader>
                <h1 className="text-3xl font-bold text-emerald-800 text-center">{titleText}</h1> 
            </CardHeader>
            <CardContent >
                <Card className="py-9 bg-emerald-100">
                    <h1 className='text-emerald-800 text-center text-7xl sm:text-8xl'>
                        {time}
                    </h1 >
                </Card>
            </CardContent>
            <CardFooter>
                <Card className="bg-emerald-50/50 w-full">
                    <p className="mx-3 text-emerald-800 text-center">{discriptionText}</p>
                </Card>
            </CardFooter>
        </Card>
    )
}
