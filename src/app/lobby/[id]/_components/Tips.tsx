"use client"

import { useAuth } from "@/lib/supabase/auth-provider"

export default function Tips () {
    const { user } = useAuth()
    if(!user) {
        return(
            <div className="m-6 text-center">
                Tips:ログインすることで、みんなと交流することができます！
            </div>
        )
    }
}
