"use client"

import { useEffect, useState } from "react";
import { useLobby } from "../../_context/LobbyProviders";
import { useAuth } from "@/lib/supabase/auth-provider";

type PresenceMember= {
    user_id: string;
    display_name: string;
}

export default function Member() {
    const { members } = useLobby();

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
