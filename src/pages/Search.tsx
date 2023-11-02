import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";
import type { InsuranceProviders } from '~/server/api/routers/HealthcareRouter';
import { api } from '~/utils/api';

const LeafletMap = dynamic(() => import('../components/LeafletMap'), { ssr: false });

const MapPageLazy: React.FC = () => {

    // this is used for filtering.
    // allow user to set insurance status (QUEST, none, or both)
    const [insurance, setInsurance] = useState<InsuranceProviders | undefined>();
    const [mapKey, setMapKey] = useState(0);

    // if no insurance selected, select first 10 clinics.
    // if there is, plug it into our api.
    // this really needs to be one procedure with the insurance being optional.
    // this is unsorted. it is sorted however mongodb wants to sort it :)
    const { data: centers, isLoading } = insurance !== undefined ?
        api.healthcare.getByPlan.useQuery({ insurance }) :
        api.healthcare.getSome.useQuery();


    // useless coz idk how to put the reload map button in the same flex as our map
    const handleMapReload = () => {
        setMapKey((prevKey) => prevKey + 1);
    };

    return (
        <body className="h-screen">
            <div className="h-20 w-full bg-slate-400">
                NAV GOES HERE (Consider making it a component?)
            </div>
            <div className="w-screen h-full flex">
                {/* why the hell does this overflow 80 px over the page? fix the navbar or play with random tailwind properties here.  */}
                <div className="h-full bg-slate-30
                0 flex-col bg-slate-300 w-1/5">
                    <div>
                        <details className="dropdown">
                            {/* copy pasted drop down from daisyui / tailwinds because i am lazy. */}
                            <summary className="m-1 btn">CHOOSE YOUR INSURANCE</summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                { /* this does NOT filter the entries you have already fetched. clicking on any of these buttons will query the DB again.
                                 Consider fetching entries on page load and filtering based on this. but HOW WOULD PAGINATION WORK??? */}
                                <li><a onClick={p => setInsurance("FQHC")}>Uninsured</a></li>
                                <li><a onClick={p => setInsurance("QI")}>Med-QUEST</a></li>
                                <li><a onClick={p => setInsurance(undefined)}>Any</a></li>
                            </ul>
                        </details>
                    </div>
                </div>
                <div className="h-full w-1/2 bg-slate-500
                0 flex-col overflow-y-scroll">
                    { /* tell the user to wait if we are still waiting on data to come in. 
                    DO NOT USE STATIC SITE GENERATION BECAUSE YOUTUBE DOESN'T DO THIS WHEN YOU SEARCH FOR VIDEOS
                    then, when we get the data we can map it out into a DIV for each center. rn we are missing a more info <button className=""></button>
                    */ }
                    {isLoading ? "Pls wait" : centers?.map(c => (
                        <div className={'m-2 bg-slate-100 h-40 rounded-3xl p-2'} key={c.id}>
                            <div className='text-2xl border-b-2'>{c.HEALTH_CENTER_NAME + " (" + (c.SERVICE_NAME || "Comprehensive Care") + ')'}</div>
                            <div>{c.DOCTOR_NAME}</div>
                            <div>{c.ADDRESS}</div>
                            <div>{c.HOSPITAL_NUMBER}</div>
                            <div>{c.INSURANCE_PLAN}</div>
                        </div>
                    ))
                    }
                </div>
                { /* possibly feed the list of locations into here, it was requested/needed that the leaflet map should only show endpoints
                that are in the search results, but I bring up the problem of pagination again. */}
                <LeafletMap key={mapKey} />
            </div>
        </body>
    );
};

export default MapPageLazy;