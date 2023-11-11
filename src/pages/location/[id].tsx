import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { ReviewPage } from "~/pages/review/[healthCenterID]";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const LocationDestination: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.healthcare.getById.useQuery({ id });
    const [map, setMap] = useState("&q=" + data?.address);

    const doctorCount = data?.doctors.length

    return (
        <>
            <Navbar />
            <div className="w-full font-tyler ">
                {data ? (
                    <>
                        <div className="flex flex-col w-screen text-white bg-dark-blue gap-4 pt-16 pb-10 px-60 ">
                            <div className="items-center text-6xl font-bold ">
                                {data.names[0]}
                            </div>
                            <div className="items-center text-xl font-bold ">
                                {data.procedureTypes.map((p) => p.name)[0]} {data.procedureTypes.map((p) => p.name)[1]} {data.procedureTypes.map((p) => p.name)[2]}
                            </div>
                            <div className="join join-horizontal static mt-6 grid-cols-2">
                                <a className="join-item normal-case btn w-40 h-14 text-xl bg-light-green hover:bg-hover-green text-green-gray border-dark-blue"
                                    onClick={_ => window.history.back()}
                                >
                                    Go back
                                </a>
                                <button className="join-item normal-case btn w-40 h-14 text-xl bg-light-green hover:bg-hover-green text-green-gray border-dark-blue">Planning to visit clinic</button>
                            </div>
                        </div>

                        <div className="flex static w-60 ml-72 mt-6 text-lg tooltip tooltip-right font-semibold" data-tip="We compiled information on multiple clinics and will be crowdsourcing from the community. If this page does not accurately reflect your experience, please let us know how your experience went.">
                            <h3 className="mr-2">Coverage disclaimer</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>


                        <div className="flex">
                            <div className="toast toast-end">
                                <div className="flex alert alert-info tooltip tooltip-top " data-tip="Let us know if your care was covered">
                                    <div>Was Your Care Covered?</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                                </div>
                            </div>

                            <div className="static ml-60 mt-4 w-1/2 px-12 pb-10 pt-6 bg-gray-100 rounded-l-xl">
                                <div className="join join-horizontally min-h-96">

                                    <table className="table-fixed">
                                        <tbody>
                                            <tr className="border-gray-100">
                                                <td className="text-2xl font-semibold w-56 ">Clinic Description</td>
                                                <td>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="divide-solid"></div>
                                                </td>
                                            </tr>

                                            {data.website ?
                                                <tr>
                                                    <td>

                                                        <h2 className="text-xl font-semibold">Clinic Website</h2>
                                                    </td>
                                                    <td>
                                                        <a className="text-lg italic underline text-blue-700" href={data.website && JSON.stringify(data.website).includes("https://") ? data.website : "https://" + data.website}>{data.website}</a>
                                                    </td>
                                                </tr>
                                                :
                                                null}
                                            <tr>
                                                <td>
                                                    <h2 className="text-xl font-semibold">Clinic Address</h2>
                                                </td>
                                                <td>
                                                    <p className="text-lg">{data.address}</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <h2 className="text-xl font-semibold">Clinic Phone</h2>
                                                </td>
                                                <td>
                                                    <p className="text-lg">({JSON.stringify(data.healthCenterNumbers[0]).split("")[1]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[2]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[3]}) {JSON.stringify(data.healthCenterNumbers[0]).split("")[4]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[5]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[6]}-{JSON.stringify(data.healthCenterNumbers[0]).split("")[7]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[8]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[9]}{JSON.stringify(data.healthCenterNumbers[0]).split("")[10]}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h2 className="text-xl font-semibold">Insurance Type</h2>
                                                </td>
                                                <td>
                                                    <p className="text-lg">{data.supportedInsurances.includes("QI") && "Quest Insured"}{data.supportedInsurances.includes("FQHC") && "Federally Qualified Health Center"}</p>
                                                </td>
                                            </tr>
                                            {data.supportedInsurances.includes("FQHC") &&
                                                <tr>
                                                    <td>
                                                        <h2 className="text-xl font-semibold">Payment Details</h2>
                                                    </td>
                                                    <td>
                                                        <p className="text-lg">Without insurance, clinics will charge based on your income and the number of people in your household. For more information, please contact the clinic.</p>
                                                    </td>
                                                </tr>
                                            }
                                            {data.doctors.map((doctor) => {
                                                const number = doctor.availabilities.find((availability) => availability.healthCenterID == id)!.phoneNumber;
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <h2 className="text-xl font-semibold">Doctor Name:</h2>
                                                            </td>
                                                            <td>
                                                                {doctor.name} ({doctor.procedureTypes.map((procedureType) => procedureType.name)})
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <h2 className="text-xl font-semibold">Doctor Number:</h2>
                                                            </td>
                                                            <td>
                                                                <h2 className="text-xl">{number ? '(' + number.slice(0, 3) + ") " + number.slice(3, 6) + '-' + number.slice(6) : ""}</h2>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="w-1/2 mr-60 pt-4">
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



