"use client"

import Card from "@/components/ui/card";
import Member from "./Member";
import { useAuth } from "@/lib/supabase/auth-provider";

export default function MemberCard() {
    const { user } = useAuth();
    if (!user) return;
    return (
        <Card variant="background">
            <h1 className="text-xl font-bold bg-emerald-800 bg-clip-text text-transparent">👥参加者</h1>
            <div className="p-7 text-center text-xl rounded-xl text-emerald-900">
                <Member />
            </div>
        </Card>
    )
}
