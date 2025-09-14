"use client"

import { useEffect, useState } from "react";
import { useLobby } from "../../_context/LobbyProviders";
import { useAuth } from "@/lib/supabase/auth-provider";

type PresenceMember= {
    user_id: string;
    display_name: string;
}

export default function Member() {
    const { user } = useAuth();
    const { channel } = useLobby();
    const [ members, setMembers ] = useState<PresenceMember[]>([]);

    useEffect(() => {
        if (!user) return;
        
        channel.on("presence", { event: "sync" }, () => {
            const state = channel.presenceState<PresenceMember>();
            const new_members: PresenceMember[] = Object.values(state).flat();


            setMembers(new_members);
            console.log(new_members);
        });

        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.track({
                    user_id: user.id,
                    display_name: user.user_metadata.name || "ななしさん",
                });
            }
        });
    }, [channel, user])

    return (
        <div>
            {members.map(member => 
                    <li key={member.user_id} className="list-item ">
                        {member.display_name}
                    </li>
                )}
        </div>
    )
    
}
