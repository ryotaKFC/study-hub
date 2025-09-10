import Card from "@/components/ui/card";
import Member from "./Member";

export default function MemberCard() {
    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">👥参加者</h1>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                <Member />
            </div>
        </Card>
    )
}
