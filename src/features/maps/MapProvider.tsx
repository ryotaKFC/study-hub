"use client"

import { APIProvider } from '@vis.gl/react-google-maps';

type Props = {
    children: React.ReactNode,
}

export default function MapProvider({children}: Props) {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            {children}
        </APIProvider>
    )
}
