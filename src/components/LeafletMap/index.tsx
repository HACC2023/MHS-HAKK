import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})

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

                    function onMapClick(e) {
                        L.marker(e.latlng).addTo(map)
                    }
                    map.locate({ setView: true, maxZoom: 16 });
                    map.on('click', onMapClick);
                    function onLocationFound(e) {
                        var radius = e.accuracy;

                        L.marker(e.latlng).addTo(map)
                            .bindPopup("You are within " + radius + " meters from this point").openPopup();

                        L.circle(e.latlng, radius).addTo(map);
                    }

                    map.on('locationfound', onLocationFound);
                    function onLocationError(e) {
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

    return <div ref={mapRef} style={{ height: "800px", width: "1200px" }}></div>;
};

export default LeafletMap;