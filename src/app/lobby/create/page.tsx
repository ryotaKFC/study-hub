"use client"

import { Navigation } from "@/components/navigation";
import Card from "@/components/ui/card";
import { useState } from "react";
import {} from "@/components/ui/form"

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    lobbyname: z.string().min(5).max(12),
})



export default function Main() {
    const [newLobby, setNewLobby] = useState("");
    function handleCreate() {

    }
    return (
        <div>
            <Navigation />
            <main>
                <h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
                <Card className="">
                    
                    <form onSubmit={handleCreate} className="flex flex-col m-auto space-y-4">
                        <Input type="text" placeholder="ロビー名" className="text-center" />
                        <div className="flex justify-center text-center">
                            <Checkbox id="isPrivateRoom" className="" />
                            <Label htmlFor="isPrivateRoom">非公開</Label>
                        </div>

                    </form>
                </Card>
            </main>
        </div>
    )
}
