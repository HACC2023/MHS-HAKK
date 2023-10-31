// https://github.com/smeijer/leaflet-geosearch
import React, { useRef, useEffect } from "react";
import L, { type LocationEvent, type ErrorEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { api } from "../../utils/api";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

const LeafletMap: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const geoJsonData = api.dataExport.getAll.useQuery().data;
    useEffect(() => {
        const initializeMap = async () => {
            try {
                if (mapRef.current) {
                    const fetchAddress = "95-1249 Meheula Pkwy, Mililani, HI 96789"
                    const modifiedString = fetchAddress.replace(/[\s,-]/g, '+');
                    const apiData = fetch(`https://geocode.maps.co/search?q=${modifiedString}&format=geojson`)
                        .then(response => response.json())
                        .then(data => {
                            return data
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    if (geoJsonData) {
                        const geoJsonLayer = L.geoJSON(await apiData, {
                            pointToLayer: (feature, latlng) => {
                                const name = feature.properties.name;
                                const address = feature.properties.address;
                                const marker = L.marker(latlng, { title: name });

                                marker.on('click', function () {
                                    document.querySelectorAll('p').forEach(allP => allP.remove());

                                    const pElement = document.createElement("p");
                                    pElement.textContent = `${name} \n ${address}`;
                                    document.body.appendChild(pElement);
                                });

                                marker.bindPopup(name + `<br/>` + address);
                                return marker;
                            },
                            coordsToLatLng: (coords) => {
                                return new L.LatLng(coords[1], coords[0], coords[2]);
                            },
                        });
                        const map = L.map(mapRef.current).setView([21.306944, -157.858337], 13);
                        geoJsonLayer.addTo(map)
                        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                            maxZoom: 18,
                        }).addTo(map);

                        map.locate({ setView: true, maxZoom: 16 });

                        function onLocationFound(e: LocationEvent) {
                            const radius = e.accuracy;
                            L.marker(e.latlng).addTo(map).bindPopup(`You are within ${radius} meters from this point`);
                            L.circle(e.latlng, radius).addTo(map);
                        }

                        map.on('locationfound', onLocationFound);

                        function onLocationError(e: ErrorEvent) {
                            alert(e.message);
                        }

                        map.on('locationerror', onLocationError);

                        const provider = new OpenStreetMapProvider();
                        const searchBar = GeoSearchControl({
                            provider: provider
                        });
                        map.addControl(searchBar)
                        const address = "Anania Drive, Mililani Town, Honolulu County, Hawaii, 96789, United States";
                        const latlng = provider.search({ query: address })
                        latlng.then((result) => {
                            result.forEach((item) => {
                                if (item.bounds) {
                                    const marker = L.marker(item.bounds[0], {
                                        title: address
                                    });
                                    marker.bindPopup(address);
                                    marker.addTo(map);
                                } else {
                                    console.log("No data found");
                                }
                            });
                        });
                    } else {
                        console.log("No data found");
                    }
                } else {
                    console.log("MapRef does not exist")
                }
            } catch (error) {
                console.log(error);
            }

        };
        initializeMap();
    }, [geoJsonData]); // Add empty dependency array here

    return <div ref={mapRef} style={{ height: "800px", width: "1000px" }}></div>;
};

export default LeafletMap;