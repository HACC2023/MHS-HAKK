import React, { useRef, useEffect } from "react";
import L, { type LocationEvent, type ErrorEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import * as jsonData from './Coordinates.json';
type ModdedGSONObj = (GeoJSON.GeoJsonObject & { properties: { address: string } });
const data: ModdedGSONObj[] = jsonData.map((c) => {
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [
                c.Longitude,
                c.Latitude
            ],
        },
        properties: {
            address: c.address
        },
    };
});

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

const LeafletMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = () => {
            try {
                if (mapRef.current) {
                    const geoJSONLayer = L.geoJSON(data, {
                        pointToLayer: function (feature: ModdedGSONObj, latlng) {
                            const address = feature.properties.address;
                            const marker = L.marker(latlng, {
                                title: address,
                            });

                            marker.bindPopup(address);

                            return marker;
                        },
                        coordsToLatLng: function (coords) {
                            return new L.LatLng(coords[1], coords[0], coords[2]);
                        }
                    });


                    const map = L.map(mapRef.current).setView([21.306944, -157.858337], 13);
                    geoJSONLayer.addTo(map);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                        maxZoom: 18,
                    }).addTo(map);

                    function onLocationFound(e: LocationEvent) {
                        const radius = e.accuracy;

                        L.marker(e.latlng).addTo(map)
                            .bindPopup("You are within " + radius + " meters from this point").openPopup();

                        L.circle(e.latlng, radius).addTo(map);
                    }

                    map.on('locationfound', onLocationFound);

                    function onLocationError(e: ErrorEvent) {
                        alert(e.message);
                    }

                    map.on('locationerror', onLocationError);

                }
            } catch (error) {
                console.log("Error initializing map:", error);
            }
        };

        initializeMap();
    }, []);

    return <div ref={mapRef} className="w-2/5 h-full ml-auto"></div>;
};

export default LeafletMap;
