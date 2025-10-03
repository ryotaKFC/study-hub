"use client"

import { useMap } from "@vis.gl/react-google-maps"
import { useEffect } from "react";

type Props = {
    location: {
        lat: number,
        lng: number,
    }
}

export function MapControls({location}: Props) {
    const map = useMap();
    useEffect(() => {
        if(!location || !map) return;
        map.panTo(location);
    }, [location, map])
    return null
}
