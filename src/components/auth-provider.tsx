"use client"

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient }from "@/lib/supabase/client"

const supabaseClient = createClient();

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProviders({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const {data: {user}} = await supabaseClient.auth.getUser();
                setUser(user);
            } catch(error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        getUser();
    }, []);

    async function signInWithGoogle () {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
        })
        if (error) {
            console.error(error)
        }
    }

    async function signOut () {
        await supabaseClient.auth.signOut();
        setUser(null);
    }

    const value = { user, isLoading, signInWithGoogle, signOut};

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
