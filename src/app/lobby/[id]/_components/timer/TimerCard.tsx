import Timer from "./Timer";
import Card from "@/components/ui/card";

export default function TimerCard() {

    return (
        <Card>
            <h1 className="text-3xl font-bold text-emerald-800 text-center">集中時間</h1>
            <Timer />
            <div className="bg-emerald-50 rounded-sm text-center p-4">
                <p className="text-emerald-800">🎯 集中して勉強しましょう！チャットは休憩時間に利用できます</p>
            </div>
        </Card>
    )
}
