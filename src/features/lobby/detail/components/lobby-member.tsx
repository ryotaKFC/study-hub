"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLobby } from "../lobby-provider";

export default function LobbyMember() {
    const { members } = useLobby();

    return (
        <Card className="sm:px-10">
            <CardHeader>
                <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">👥参加者</h1>
            </CardHeader>
            <CardContent>
                <ul className="px-7">
                    {members.map(member => 
                        <li key={member.user_id} className="text-emerald-900 list-none flex flex-row text-xl">
                            <p>
                                {member.display_name}：{member.user_goal}
                            </p>
                        </li>
                    )}
                </ul>
            </CardContent>
        </Card>
    )
    
}
