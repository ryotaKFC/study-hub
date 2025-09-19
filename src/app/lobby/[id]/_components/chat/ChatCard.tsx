import Card from "@/components/ui/card";
import Chat from "./Chat";


export default function ChatCard() {

    return (
        <Card variant="background">
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬チャット</h1>
            <Chat />
        </Card>
    )
}
