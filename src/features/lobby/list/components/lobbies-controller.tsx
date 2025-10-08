"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link"
import Image from "next/image"

type Props = {
    isGeolocationGranted: boolean,
    handleSwitchChange: () => void,
    handleUpdateButton: () => void,
}

export function LobbiesController({isGeolocationGranted, handleSwitchChange, handleUpdateButton}: Props){
    return (
            <div className="flex flex-col justify-center items-center my-5 space-y-4">
                <div className="space-x-4 ">
                    <Link href="/lobby/create">
                        <Button className="inline-block align-middle hover:cursor-pointer">ロビーの作成</Button>
                    </Link>
                    <Button onClick={handleUpdateButton} variant={"outline"} className="inline-block align-middle hover:cursor-pointer">
                        <Image src="/reload.svg" alt="reload icon" width={20} height={20} />
                    </Button>
                </div>
                <div className="flex space-x-2">
                    <Label htmlFor="geolocationSwitch">近い順に並び替え</Label>
                    <Switch id="geolocationSwitch" checked={isGeolocationGranted} onCheckedChange={handleSwitchChange} />
                </div>
            </div>
    )
}
