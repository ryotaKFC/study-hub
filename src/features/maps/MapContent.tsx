"use client"

import { APIProvider, Map} from '@vis.gl/react-google-maps';

export default function MapContent() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                id='main-mp'
                className='w-full h-100 '
                defaultCenter={{lat: 35.681236, lng: 139.767125 }}
                defaultZoom={14}
                gestureHandling='greedy'
                onClick={(e) => {
                    if (!e.detail.latLng) return;
                    const lat = e.detail.latLng.lat;
                    const lng = e.detail.latLng.lng;
                    console.log(lat, lng);
                }}

                disableDefaultUI
            />
        </ APIProvider>
    )
}
