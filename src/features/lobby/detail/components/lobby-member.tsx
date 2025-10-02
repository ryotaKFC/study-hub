"use client"

import Card from "@/components/ui/card";
import { useLobby } from "../lobby-provider";

export default function LobbyMember() {
    const { members } = useLobby();

    return (
        <Card variant="background">
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">👥参加者</h1>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                <div>
                    {members.map(member => 
                            <li key={member.user_id} className="list-none flex flex-row">
                                <p>
                                    {member.display_name}：{member.user_goal}
                                </p>
                            </li>
                        )}
                </div>
            </div>
        </Card>
    )
    
}
