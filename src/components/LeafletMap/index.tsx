import React, { useRef, useEffect, useState } from "react";
import L, { IconOptions, LeafletMouseEvent, LocationEvent, ErrorEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import geoJsonData from './geoJSON.json';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

const LeafletMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = () => {
            try {
                if (mapRef.current) {
                    const map = L.map(mapRef.current).setView([21.306944, -157.858337], 13);
                    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        attribution:
                            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                        maxZoom: 18,
                    }).addTo(map);
                    
                    function onLocationFound(e: LocationEvent) {
                        var radius = e.accuracy;

                        L.marker(e.latlng).addTo(map)
                            .bindPopup("You are within " + radius + " meters from this point").openPopup();

                        L.circle(e.latlng, radius).addTo(map);
                    }

                    map.on('locationfound', onLocationFound);
                    
                    function onLocationError(e: ErrorEvent) {
                        alert(e.message);
                    }

                    map.on('locationerror', onLocationError);

                    const geoJSONLayer = L.geoJSON(geoJsonData, {
                        pointToLayer: function (feature, latlng) {
                            const name = feature.properties.name;
                            const address = feature.properties.address
                            const marker = L.marker(latlng, {
                                title: name,
                            });

                            marker.bindPopup(feature.properties.name + `<br/>` + address);

                            return marker;
                        },
                        coordsToLatLng: function (coords) {
                            return new L.LatLng(coords[1], coords[0], coords[2]);
                        }
                    });

                    geoJSONLayer.addTo(map);
                }
            } catch (error) {
                console.log("Error initializing map:", error);
            }
        };

        initializeMap();
    }, []);

    return <div ref={mapRef} style={{ height: "800px", width: "1000px" }}></div>;
};

export default LeafletMap;
