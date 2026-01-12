    "use client"

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useMemo } from "react"

const containerStyle = {
    width: "100%",
    height: "100%",
}

// Bangalore Center
const center = {
    lat: 12.9716,
    lng: 77.5946,
}

// Dark Mode Map Style (Zomato/Uber Night inspired, No Labels)
const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "off" }], // Hide admin labels to avoid clutter
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }], // Hide POI labels
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
]

export function GoogleMapBackground() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    })

    // Memoize options to prevent re-renders
    const options = useMemo(() => ({
        styles: mapStyles,
        disableDefaultUI: true, // Hides all controls
        draggable: false,       // Disables panning
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false, // Prevents clicking on POIs
    }), [])

    if (!isLoaded) {
        return <div className="w-full h-full bg-[#1a1d26] animate-pulse" />
    }

    return (
        <>
            {/* 
              DEMO MODE: Suppress Google Maps Error Overlay
              This style tag hides the error container typically shown when the API key is invalid or missing.
              This allows interaction with the map (even if watermarked) for presentation/demo purposes.
              NOT RECOMMENDED FOR PRODUCTION.
            */}
            <style jsx global>{`
                .gm-err-container {
                    display: none !important;
                }
                .gmnoprint {
                    display: none !important;
                }
            `}</style>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={options}
            />
        </>
    )
}
