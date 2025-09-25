"use client"

import React from 'react';
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';

export default function MapContent() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                className='w-full h-100 '
                defaultCenter={{lat: 35.681236, lng: 139.767125 }}
                defaultZoom={14}
                gestureHandling='greedy'
                disableDefaultUI
            />
            {/* <AdvancedMarker position={{ lat: 35.656, lng: 139.737 }} /> */}
        </ APIProvider>
    )
}
