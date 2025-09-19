"use client"

import { useLobby } from "../../_context/LobbyProviders";



export default function Member() {
    const { members } = useLobby();

    return (
        <div>
            {members.map(member => 
                    <li key={member.user_id} className="list-none flex flex-row">
                        {member.display_name}
                    </li>
                )}
        </div>
    )
    
}
