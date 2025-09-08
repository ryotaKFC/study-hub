import { Lobby } from "../hooks/useLobby";
import Timer from "./Timer";
import Card from "@/components/ui/card";

type Props = {
    lobby: Lobby,
    setIsStudyTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimerCard({ lobby, setIsStudyTime }: Props) {
    
    return (
        <Card>
            <h1 className="text-3xl font-bold text-emerald-800 text-center">集中時間</h1>
            <Timer lobby={lobby} setIsStudyTime={setIsStudyTime} />
            <div className="bg-emerald-50 rounded-sm text-center p-4">
                <p className="text-emerald-800">🎯 集中して勉強しましょう！チャットは休憩時間に利用できます</p>
            </div>
        </Card>
    )
}
