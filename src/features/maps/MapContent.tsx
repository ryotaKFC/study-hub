"use client"

import { Map } from '@vis.gl/react-google-maps';

export default function MapContent() {

    return (
            <Map
                id='main-map'
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
    )
}
