"use client"

import { useEffect, useState } from "react";
import { useLobby } from "../../_context/LobbyProviders";

type PresenceMember= {
    user_id: string;
    display_name: string;
}

export default function Member() {
    const { channel } = useLobby();
    const [ members, setMembers ] = useState<PresenceMember[]>([]);

    useEffect(() => {
        channel.on("presence", { event: "sync" }, () => {
            const state = channel.presenceState<PresenceMember>();
            const new_members: PresenceMember[] = Object.values(state).flat();
            setMembers(new_members);
            console.log(new_members);
        });
    }, [channel])
    
    return (
        <div>
            {members.map(member => 
                    <li key={member.user_id}>
                        {member.display_name}
                    </li>
                )}
        </div>
    )
    
}
