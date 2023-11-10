import type { GetStaticProps, NextPage } from "next";
import {useState } from "react";
import Navbar from "~/components/Navbar";
import { ReviewPage } from "~/pages/review/[healthCenterID]";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const LocationDestination: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.healthcare.getById.useQuery({ id });
    const [map, setMap] = useState("&q=" + data?.address);
    return (
        <>
            <Navbar />
            <div className="w-full font-tyler ">
                {data ? (
                    <>
                    <div className="flex flex-col w-screen text-white bg-dark-blue gap-4 py-16 px-60 ">
                        <div className="items-center text-6xl font-bold ">
                            {data.names[0]}
                        </div>
                        <div className="items-center text-xl font-bold ">
                            {data.procedureTypes.map((p) => p.name)[0]} {data.procedureTypes.map((p) => p.name)[1]} {data.procedureTypes.map((p) => p.name)[2]}
                        </div>
                    </div>
                    <div className="join join-horizontal ml-60 mt-6 grid-cols-2">
                        <a className="join-item normal-case btn w-40 h-14 text-xl bg-light-green hover:bg-hover-green text-green-gray border-white "
                            onClick={_ => window.history.back()}
                        >
                            Go back
                        </a>
                        <button className="join-item normal-case btn w-40 h-14 text-xl bg-light-green hover:bg-hover-green text-green-gray border-white ">Planning to visit clinic</button>
                    </div>



                    <div className="flex ">
                        <div className="w-1/2 ml-60 mt-10 pl-16 pt-6 relative bg-gray-100 rounded-l-xl">

                            <div className="h-96 p-4">
                                <h1 className="w-full text-2xl font-semibold">Clinic Description:</h1>
                                <div className="divider"></div>
                                <div className="mr-4 pb-6 flex flex-col">



                                    <div className="join join-vertical lg:join-horizontal pt-4">
                                        <h2 className="join-item text-xl font-semibold">Clinic Website</h2>
                                        <a className="italic join-item text-xl indent-16" href={data.website && JSON.stringify(data.website).includes("https://") ? data.website : "https://" + data.website}>{data.website}</a>
                                    </div>



                                    <div className="join join-vertical lg:join-horizontal pt-4">
                                        <h2 className="join-item text-xl font-semibold">Clinic Address</h2>
                                        <p className="join-item text-xl indent-16">{data.address}</p>
                                    </div>


                                    <div className="join join-vertical lg:join-horizontal pt-4">
                                        <h2 className="join-item text-xl font-semibold">Clinic Name</h2>
                                        <p className="join-item text-xl indent-16">{data.names[0]}</p>
                                    </div>



                                    <div className="join join-vertical lg:join-horizontal pt-4">
                                        <h2 className="join-item text-xl font-semibold">Clinic Phone</h2>
                                        <p className="join-item text-xl indent-16">({JSON.stringify(data.healthCenterNumbers[0]).split("")[1]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[2]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[3]}) {JSON.stringify(data.healthCenterNumbers[0]).split("")[4]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[5]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[6]}-{JSON.stringify(data.healthCenterNumbers[0]).split("")[7]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[8]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[9]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[10]}</p>
                                    </div>



                                    <div className="join join-vertical lg:join-horizontal pt-4">
                                        <h2 className="join-item text-xl font-semibold">Insurance Type</h2>
                                        <p className="join-item text-xl indent-16">{data.supportedInsurances.includes("QI") && "Quest Insured"}{data.supportedInsurances.includes("FQHC") && "Federally Qualified Health Center"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="w-3/5 pr-60 pt-10">
                                <iframe 
                                onLoad={async () => {
                                    if (navigator.geolocation) {
                                        setMap(await new Promise((res) =>
                                            navigator.geolocation.getCurrentPosition(
                                                p => res("&saddr=" + p.coords.latitude + ',' + p.coords.longitude + "&daddr=" + data.address),
                                                _err => res(''),
                                                {
                                                    enableHighAccuracy: true
                                                }
                                            )
                                        ) || map);
                                    };
                                    
                                }}
                                className="w-full h-full ml-auto rounded-r-xl"
                                    src={
                                        "https://www.google.com/maps/?output=embed" + map
                                    }
                                />
                            </div>
                        </div>


                        <ReviewPage healthCenterID={id}/>

                    </>

                ) : (
                    <>
                        <div className="mt-1/2 h-full text-center text-2xl ">
                            Clinic not found
                        </div>
                    </>
                )}
                

            </div>
        </>
    );
};

{/* weird code used for static site generation so we dont stress out the database or something */ }
export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = getServerSideHelper();
    {/* note how the file is called [id]. we get that parameter... */ }
    const id = context.params?.id;
    if (typeof id !== "string") throw new Error("ID Not found");

    {/* and pre-fetch it on our side, so when loaded in the above function, we dont have to make the end user come to us asking for it */ }
    await ssg.healthcare.getById.prefetch({ id });
    return {
        props: {
            // dude idk how this works
            trpcState: ssg.dehydrate(),

            // give the id so we can pull it from the object in the main function
            id,
        },
    };
};

// neither does this
export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default LocationDestination;



