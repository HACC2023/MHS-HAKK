import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";
import Navbar from '~/components/navbar';
import Footer from '~/components/footer';

const LeafletMap = dynamic(() => import('~/components/mapCreation'), { ssr: false });

const mapPage: React.FC = () => {
    {/**@todo wrap mapKey in a react component */}
    const [mapKey] = useState(0);
    return (
        <>
            <Navbar></Navbar>
            <div>
                <LeafletMap key={mapKey} />
            </div>
            <Footer></Footer>
        </>
    )
}

export default mapPage;