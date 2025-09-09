import Card from "@/components/ui/card";
import { useLobby } from "../../_context/LobbyProviders";

export default function Chat() {
    const { chats } = useLobby();
    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">💬チャット</h1>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                {chats.map(chat => 
                    <li key={chat.content}>
                        {chat.content}
                    </li>
                )}
            </div>
        </Card>
    )
}
