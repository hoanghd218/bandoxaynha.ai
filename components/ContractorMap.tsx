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
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center animate-fadeIn">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Đang tải bản đồ...</p>
                </div>
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
                                transform: 'translate(-50%, 28px)',
                                background: 'white',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#1E293B',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                border: '1px solid #E2E8F0',
                                transition: 'all 0.2s'
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
                    <div className="p-3 max-w-xs">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-slate-200 shadow-md">
                                <Image
                                    src={selectedContractor.avatar}
                                    alt={selectedContractor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-slate-900">{selectedContractor.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{selectedContractor.location}</p>
                            </div>
                        </div>
                        <Link
                            href={`/nha-thau/${selectedContractor.id}`}
                            className="block text-center text-xs font-semibold text-white bg-brand-blue hover:bg-brand-blue/90 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer"
                        >
                            Xem chi tiết →
                        </Link>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
