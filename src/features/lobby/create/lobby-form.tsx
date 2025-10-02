"use client"

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useRouter } from "next/navigation";
import { AdvancedMarker, Map, MapMouseEvent, useMapsLibrary } from "@vis.gl/react-google-maps";
import { LobbyCreationDate } from "../types/lobby";
import { storeLobby } from "../api/insert-lobby";


const lobbyNameSchema = z.string()
    .min(2, {message: "ロビー名は2文字以上で入力してください!"})
    .max(15, {message: "ロビー名は15文字以内で入力してください!"});

type Props = {
    isPrivateParam: boolean,
}


export default function LobbyForm({isPrivateParam}: Props) {
    const [error, setError] = useState("");
    const [lobbyName, setLobbyName] = useState("");
    const [isPrivate, setIsPrivate] = useState<boolean>(isPrivateParam);
    const [studyMin, setStudyMin] = useState([25]);
    const [breakMin, setBreakMin] = useState([5]);

    const [placeName, setPlaceName] = useState("")
    const [point, setPoint] = useState<{lat:number, lng:number}>({lat: 35.681236, lng: 139.767125 });
    // const [userLocation, setUserLocation] = useState<{lat:number, lng:number}>({lat: 35.681236, lng: 139.767125 });
    
    const placesLib = useMapsLibrary("places");
    const [lobbyData, setLobbyData] = useState<LobbyCreationDate | null>()
    
    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPoint({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                },
                () => {
                    setPoint({ lat: 35.681236, lng: 139.767125 })
                }
            )
        }
    }, [])

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
        if(lobbyData) return;
        const newLobbyData: LobbyCreationDate = {
            name: lobbyName,
            startTime: (new Date()).toString(),
            studyMin: studyMin[0],
            breakMin: breakMin[0],
            isPrivate: isPrivate,
            location: point
        }
        setLobbyData(newLobbyData)
        const newLobby = await storeLobby(newLobbyData);
        router.push("/lobby/"+newLobby?.id)
        setLobbyData(null);
    }

    async function handleMapClick(e: MapMouseEvent) {
        if (!placesLib || !e.detail.placeId) return;
        const place = new placesLib.Place({
            id: e.detail.placeId,
            requestedLanguage: "ja",
        })
        await place.fetchFields({ fields: ["displayName", "location"]});
        
        if (!place.location || !place.displayName) return;
        setPlaceName(place.displayName)
        setPoint({
            lat: place.location.lat(),
            lng: place.location.lng(),
        })
    }

    return (
        <form onSubmit={handleCreate} className="flex flex-col space-y-4">
            <Input type="text" placeholder="ロビー名" className="text-center" onChange={(e) => varidationLobbyName(e.target.value)} />
            {error && <p className="text-red-500 text-xs mx-auto">{error}</p>}
            <Label className="mx-auto">勉強時間<p>（{studyMin}分）</p></Label>
            <Slider defaultValue={[25]} min={0} max={60} step={5} onValueChange={setStudyMin} className="mx-auto"/>

            <Label className="mx-auto">休憩時間<p>（{breakMin}分）</p></Label>
            <Slider defaultValue={[5]} min={0} max={15} step={1} onValueChange={setBreakMin} className=" mx-auto" />
            
            <div className="flex justify-center space-x-2">
                <Checkbox id="isPrivate" className="" checked={isPrivate} onCheckedChange={(checked) => setIsPrivate(checked === true)} />
                <Label htmlFor="isPrivate">非公開</Label>
            </div>

            
            <h1 className="text-center">
                自習場所：<span className="font-bold">{placeName}</span>
            </h1>

            <Map
                className='w-full h-100 '
                mapId={"9b534672f1b3ee81bab3a217"}
                defaultCenter={point}
                defaultZoom={14}
                gestureHandling='greedy'
                onClick={(e) => {
                    if (!e.detail.placeId || !placesLib) return;
                    handleMapClick(e);
                }}
                disableDefaultUI
                >
                
                {point && <AdvancedMarker position={point} />}
            </Map>

            <Button type="submit" disabled={!lobbyName || !placeName || error ? true : false}>作成</Button>
        </form>
    )
}
