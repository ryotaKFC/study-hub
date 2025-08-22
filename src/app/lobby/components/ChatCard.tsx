import Card from "./ui/card";
import Chat from "./Chat";

export default function ChatCard() {
    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬絵文字チャット</h1>
            <div className="p-7 text-center text-8xl rounded-xl text-emerald-900">
            </div>
            <Chat />
        </Card>
    )
}
