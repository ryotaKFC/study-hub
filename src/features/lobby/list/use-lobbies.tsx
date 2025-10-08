"use client"

import { useCallback,  useEffect,  useState } from "react";
// import { Lobby } from "../types/lobby";
import { fetchLobbies, fetchLobbiesOrderNear } from "../api/fetch-lobby";
import { Lobby } from "../types/lobby";

export function useLobbies() {
    const [isGeolocationGranted, setIsGeolocationGranted] = useState(false);
    const [location, setLocation] = useState<{lat:number | null, lng:number | null}>({lat:null, lng:null});
    const [lobbies, setLobbies] = useState<Lobby[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<unknown>()

    //　ロビーの取得
    useEffect(() => {
        // 位置情報許可されてたら近くのロビー取得
        if(isGeolocationGranted && location.lat && location.lng) {
            setIsLoading(true);
            (async (lat:number, lng:number) => {
                try {
                    const newLobbies = await fetchLobbiesOrderNear(lat, lng);
                    setLobbies(newLobbies);
                } catch (error) {
                    console.error("エラー", error);
                } finally {
                    setIsLoading(false);
                }
            })(location.lat, location.lng);
        // 位置情報拒否されてたら全ロビー取得
        } else {
            setIsLoading(true);
            (async () => {
                try {
                    const newLobbies = await fetchLobbies();
                    setLobbies(newLobbies);
                } catch(error) {
                    console.error("エラー", error)
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [isGeolocationGranted, location.lat, location.lng])

    const enableNearbyLobbyMode = useCallback(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setIsGeolocationGranted(true)
                    setLocation({lat:pos.coords.latitude, lng:pos.coords.longitude});
                },
                (err) => {
                    setIsGeolocationGranted(false)
                    console.error("位置情報の取得に失敗", err)
                }
            )
        } else {
            setIsGeolocationGranted(false)
        }
    }, [])

    return { lobbies, isLoading, isGeolocationGranted, enableNearbyLobbyMode }
}
