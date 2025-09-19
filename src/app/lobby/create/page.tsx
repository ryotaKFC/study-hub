"use client"

import { Navigation } from "@/components/navigation";
import Card from "@/components/ui/card";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { createLobby } from "@/lib/database/lobbies";
import type {LobbyCreationDate} from "@/types/lobby"
import z from "zod";
import { useRouter } from "next/navigation";

const lobbyNameSchema = z.string()
    .min(2, {message: "ロビー名は2文字以上で入力してください!"})
    .max(15, {message: "ロビー名は15文字以内で入力してください!"})


export default function Main() {
    const [error, setError] = useState("");
    const [lobbyName, setLobbyName] = useState("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [studyMin, setStudyMin] = useState([25])
    const [breakMin, setBreakMin] = useState([5])

    const router = useRouter();

    function varidationLobbyName(name: string) {
        const result = lobbyNameSchema.safeParse(name);
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }
        setLobbyName(name);
        setError("");
    }

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const newLobbyData: LobbyCreationDate = {
            name: lobbyName,
            startTime: (new Date()).toString(),
            studyMin: studyMin[0],
            breakMin: breakMin[0],
            isPrivate: isPrivate,
        }
        const newLobby = await createLobby(newLobbyData);

        router.push("/lobby/"+newLobby?.id)
    }

    return (
        <div>
            <Navigation />
            <main>
                <h1 className="font-bold text-3xl text-center m-5">ロビーの作成</h1>
                <Card className="">
                    <form onSubmit={handleCreate} className="flex flex-col m-auto space-y-4">
                        <Input type="text" placeholder="ロビー名" className="text-center" onChange={(e) => varidationLobbyName(e.target.value)} />
                        {error && <p className="text-red-500 text-xs">{error}</p>}
                        <Label>勉強時間<p>（{studyMin}分）</p></Label>
                        <Slider defaultValue={[25]} min={0} max={60} step={5} onValueChange={setStudyMin} className="w-[60%]"/>

                        <Label>休憩時間<p>（{breakMin}分）</p></Label>
                        <Slider defaultValue={[5]} min={0} max={15} step={1} onValueChange={setBreakMin} className="w-[60%]" />
                        
                        <div className="flex justify-center space-x-2">
                            <Checkbox id="isPrivate" className="" checked={isPrivate} onCheckedChange={(checked) => setIsPrivate(checked === true)} />
                            <Label htmlFor="isPrivate">非公開</Label>
                        </div>
                        <Button type="submit" disabled={!lobbyName ||error ? true : false}>作成</Button>
                    </form>
                </Card>
            </main>
        </div>
    )
}
