"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, OverlayView } from "@react-google-maps/api";
import { Contractor } from "@/data/contractors";
import Link from "next/link";
import Image from "next/image";

const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: 21.0285, // Hồ Gươm, Hà Nội
    lng: 105.8522,
};

interface ContractorMapProps {
    contractors: Contractor[];
    selectedContractorId?: string | null;
}

export default function ContractorMap({ contractors, selectedContractorId }: ContractorMapProps) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDs5wpHMtzeYeiiqDsQ0fpR4cgJ6nLl0wI",
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);

    const onLoad = useCallback(
        (map: google.maps.Map) => {
            // Set fixed center and zoom to Hồ Gươm area
            map.setCenter(center);
            map.setZoom(15);
            setMap(map);
        },
        []
    );

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);


    // Pan and zoom to selected contractor
    React.useEffect(() => {
        if (map && selectedContractorId) {
            const contractor = contractors.find((c) => c.id === selectedContractorId);
            if (contractor) {
                map.panTo(contractor.coordinates);
                map.setZoom(17); // Zoom closer when selecting a specific contractor
            }
        }
    }, [map, selectedContractorId, contractors]);

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center animate-pulse">
                <p className="text-gray-400">Loading Map...</p>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.business",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.attraction",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.government",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.medical",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.park",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.place_of_worship",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.school",
                        stylers: [{ visibility: "off" }]
                    },
                    {
                        featureType: "poi.sports_complex",
                        stylers: [{ visibility: "off" }]
                    }
                ]
            }}
        >
            {/* Contractor markers with names */}
            {contractors.map((contractor) => (
                <React.Fragment key={contractor.id}>
                    <Marker
                        position={contractor.coordinates}
                        onClick={() => setSelectedContractor(contractor)}
                        title={contractor.name}
                    />

                    {/* Custom label below marker - Google Maps style */}
                    <OverlayView
                        position={contractor.coordinates}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                transform: 'translate(-50%, 28px)', // Position below marker
                                background: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: '#202124',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                border: '1px solid rgba(0,0,0,0.1)'
                            }}
                            onClick={() => setSelectedContractor(contractor)}
                        >
                            {contractor.name}
                        </div>
                    </OverlayView>
                </React.Fragment>
            ))}

            {selectedContractor && (
                <InfoWindow
                    position={selectedContractor.coordinates}
                    onCloseClick={() => setSelectedContractor(null)}
                >
                    <div className="p-2 max-w-xs">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src={selectedContractor.avatar}
                                    alt={selectedContractor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-sm text-gray-800 line-clamp-1">{selectedContractor.name}</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{selectedContractor.location}</p>
                        <Link
                            href={`/nha-thau/${selectedContractor.id}`}
                            className="text-xs font-semibold text-brand-blue hover:underline block text-right"
                        >
                            Xem chi tiết →
                        </Link>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
