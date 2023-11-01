import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";

const LeafletMap = dynamic(() => import('~/components'), { ssr: false });

const mapPage: React.FC = () => {
    const [mapKey] = useState(0);
    return (
        <div>
            <LeafletMap key={mapKey}/>
        </div>
    )
}

export default mapPage;