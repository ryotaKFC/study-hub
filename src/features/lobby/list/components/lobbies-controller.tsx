"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch";
import Link from "next/link"

type Props = {
    isGeolocationGranted: boolean,
    handleSwitchChange: () => void,
}

export function LobbiesController({isGeolocationGranted, handleSwitchChange}: Props){
    return (
            <div>
                <Switch checked={isGeolocationGranted} onCheckedChange={handleSwitchChange} />
                <Link href="/lobby/create">
                            <Button type="button" size={"lg"} >ロビーの作成</Button>
                </Link>
            </div>
    )
}
