import Card from "@/components/ui/card";
import { useLobby } from "./LobbyProviders";



export default function Member() {
    const { users } = useLobby();
    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">👥参加者</h1>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                {users.map(user => 
                    <li key={user.user_id}>
                        {user.display_name}
                    </li>
                )}
            </div>
        </Card>
    )
}
