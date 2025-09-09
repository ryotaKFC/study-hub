"use client";
import { createContext, useContext, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js"

type SupabaseContext = {
    supabase: SupabaseClient;
}

type Props = {
    children: React.ReactNode;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({ children }: Props) {
    const [ supabase ] = useState(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ));

    return (
        <Context.Provider value={{ supabase }}>{children}</Context.Provider>
    )
}

export function useSupabase() {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error("useSupabase must be used within a SupabaseProvider");
    }
    return context.supabase;
}
