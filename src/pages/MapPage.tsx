import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const MapPageLazy: React.FC = () => {
    const [mapKey, setMapKey] = useState(0);

    const handleMapReload = () => {
        setMapKey((prevKey) => prevKey + 1);
    };

    return (
        <div>
            {/* Other page content */}
            <button onClick={handleMapReload}>Reload Map</button>
            <LeafletMap key={mapKey} />
        </div>
    );
};

export default MapPageLazy;