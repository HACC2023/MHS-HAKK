import React, { useRef, useEffect, useState } from "react";
import L, { type LocationEvent, type ErrorEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import * as jsonData from './Coordinates.json';
import { api } from "~/utils/api";
import type { CenterResult } from "~/server/api/routers/HealthcareRouter";
import { FormatURL } from "~/pages/Search";
type ModdedGSONObj = (GeoJSON.GeoJsonObject & {
    properties: {
        id: string;
        address: string;
        names: string[];
        website: string | null;
        healthCenterNumbers: string[];
        supportedInsurances: string[];
    }
});

L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

const LeafletMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const queryData = api.healthcare.getByPlan.useQuery({ forAutocomplete: false }).data as CenterResult | undefined;
    const [bruh, setBruh] = useState<ModdedGSONObj[]>([]);

    useEffect(() => {
        if (!queryData) return;

        const properties = queryData.map<ModdedGSONObj | null>((x, index) => {
            const c = jsonData[index];
            if (!c) return null;

            const { address, id, names, healthCenterNumbers, supportedInsurances } = x;
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [c.Longitude, c.Latitude],
                },
                properties: { id, address, names, website: x.website, healthCenterNumbers, supportedInsurances },
            };
        }).filter(Boolean) as ModdedGSONObj[];

        setBruh(properties);
    }, [queryData]);

    useEffect(() => {
        if (bruh.length > 0 && mapRef.current) {
            try {
                if (mapRef.current && bruh.length > 0) {
                    const geoJSONLayer = L.geoJSON(bruh, {
                        pointToLayer: function (feature: ModdedGSONObj, latlng) {
                            const { address, id, names, healthCenterNumbers, supportedInsurances, website } = feature.properties;
                            const marker = L.marker(latlng, {
                                title: address,
                            });
                            const formattedHealthCenterNumbers = healthCenterNumbers.map((number) => {
                                return number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                            }); 
                            const insuranceStuff = supportedInsurances.length > 0 ? `<p><strong>Insurance Plan(s): </strong>${supportedInsurances.join(', ')}</p>` : ''
                            const websiteLink = website ? `<p><strong>Website:</strong> <a href="https://${FormatURL(website)}" target="_blank">${FormatURL(website)}</a></p>` : '';
                            const popupContent = `
                            <div>
                                <h2><strong>${names.join(', ')}</strong></h2>
                                <a href=/location/${id}> (Click for more details)</a>
                                <p><strong>Address:</strong> ${address}</p>
                                <p><strong>Health Center Numbers:</strong> ${formattedHealthCenterNumbers.join(', ')}</p>
                                ${insuranceStuff}
                                ${websiteLink}
                            </div>
                            `;

                            marker.bindPopup(popupContent);
                            return marker;
                        }
                    });
                    const map = L.map(mapRef.current).setView([21.306944, -157.858337], 12);
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

                } else {
                    console.warn('mapRef.current && bruh.length > 0 === false')
                }
            } catch (error) {
                console.error("Error initializing map:", error);
            }
        }
    }, [bruh]);
    return <div ref={mapRef} className="h-full w-full md:w-2/5 ml-0 md:ml-auto md:border-t-transparent"></div>;
};

export default LeafletMap;
