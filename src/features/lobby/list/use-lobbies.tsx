"use client"

import { useCallback,  useState } from "react";
// import { Lobby } from "../types/lobby";
import { fetchLobbies, fetchLobbiesOrderNear } from "../api/fetch-lobby";
import useSWR from "swr";

export function useLobbies() {
    const [location, setLocation] = useState<{lat:number | null, lng:number | null}>({lat:null, lng:null});
    const lobbiesFetcher = async ([ , lat, lng]: [string, number | null, number | null]) => {
        if(lat && lng) {
            return fetchLobbiesOrderNear(lat, lng);
        }
        return fetchLobbies();
    }
    
    const { data, error, isLoading} = useSWR(
        ["lobbies", location?.lat ?? null, location?.lng ?? null],
        lobbiesFetcher
    )
    // setLobbies(data)

    const searchNearByLobbies = useCallback(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({lat:pos.coords.latitude, lng:pos.coords.longitude});
                },
                (err) => {
                    console.error("位置情報の取得に失敗", err)
                }
            )
        }
    }, [])

    return { data, error, isLoading, searchNearByLobbies}
}
