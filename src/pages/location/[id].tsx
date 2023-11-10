import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { ReviewPage } from "~/pages/review/[healthCenterID]";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const LocationDestination: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.healthcare.getById.useQuery({ id });
    const [map, setMap] = useState("&q=" + data?.address);
    const [mobileViewChange, setMORV] = useState(true);
    return (
        <>
            <Navbar />
            <div className="w-full font-tyler ">
                {data ? (
                    <>
                        <div className="flex flex-col w-screen text-white bg-dark-blue gap-4 sm:py-16 px-[calc(15%)]">
                            <div className="flex-col text-4xl font-bold text-center sm:text-left  break-words pt-4">
                                {data.names[0]}
                            </div>
                            <div className="items-center text-xl font-bold ">
                                {data.procedureTypes.map((p) => p.name)[0]} {data.procedureTypes.map((p) => p.name)[1]} {data.procedureTypes.map((p) => p.name)[2]}
                            </div>
                        </div>

                        <div className="h-[calc(100%-5rem)] w-screen block sm:hidden">
                            <div className=" mr-1 flex w-full space-x-4 p-5 pt-0">
                                <div className="join">
                                    <a
                                        onClick={() => window.history.back()}
                                        className={"join-item normal-case btn w-40 h-20 text-xl ml-7 mt-5 bg-light-green hover:bg-hover-green text-green-gray border-white "}
                                    >
                                        Go Back
                                    </a>
                                    <a
                                        className={"join-item normal-case btn w-40 h-20 text-xl mt-5 bg-light-green hover:bg-hover-green text-green-gray border-white "}
                                    >
                                        Planning to visit clinic
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="h-[calc(100%-5rem)] w-screen block sm:hidden">
                            <div className="pl-5 pt-3">Select View</div>
                            <div className="ml-auto mr-auto flex w-full space-x-4 p-5 pt-0">
                                <div className="join">
                                    <a
                                        onClick={() => setMORV(true)}
                                        className={(mobileViewChange ? "bg-slate-200" : "bg-transparent") + " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] px-2 text-center"}
                                    >
                                        Description
                                    </a>
                                    <a
                                        onClick={() => setMORV(false)}
                                        className={(!mobileViewChange ? "bg-slate-200" : "bg-transparent") + " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] px-2 text-center"}
                                    >
                                        Directions
                                    </a>
                                </div>
                            </div>
                        </div>


                        {mobileViewChange ? (
                            <div className="flex ">
                                <div className="w-auto ml-2.5 mr-6 mt-1  pt-3 relative bg-gray-100 rounded-l-xl rounded-r-xl pb-56">

                                    <div className="h-96 p-7">
                                        <h1 className="w-full text-2xl font-semibold">Clinic Description:</h1>
                                        <div className="divider"></div>
                                        <div className="mr-4 pb-6 sm:flex flex-col">



                                            <div className=" lg:join-horizontal pt-4">
                                                <h2 className="join-item text-xl font-semibold">Clinic Website</h2>
                                                <a className="italic join-item text-xl indent-16 pl-16" href={data.website && JSON.stringify(data.website).includes("https://") ? data.website : "https://" + data.website}>{data.website}</a>
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

                            </div>
                        ) : (
                            <div className=" sm:pr-60 pt-10">
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
                                    className="w-96 ml-4 rounded-r-xl rounded-l-xl h-96"
                                    src={
                                        "https://www.google.com/maps/?output=embed" + map
                                    }
                                />
                            </div>)}

                        <ReviewPage healthCenterID={id} />

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



