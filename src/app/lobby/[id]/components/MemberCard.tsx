import Card from "@/components/ui/card";
import { User } from "../hooks/useLobby"

type Props = {
    users: User[];
}

export default function Member({ users }: Props) {
    return (
        <Card>
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">👥参加者</h1>
            <div className="p-7 text-center text-8xl rounded-xl text-emerald-900">
                {users.map(user => 
                    <li key={user.id}>
                        {user.display_name}
                    </li>
                )}
            </div>
        </Card>
    )
}
