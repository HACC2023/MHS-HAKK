import type { GetStaticProps, NextPage } from "next";
import Navbar from "~/components/Navbar";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const LocationDestination: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.healthcare.getById.useQuery({ id });

    return (
        <>
            <Navbar />
            <div className="h-screen w-full p-4">
                {data ? (
                    <>
                        <div className="flex border-b-2 border-slate-800">
                            <a
                                onClick={_ => window.history.back()}
                                className="btn-success p-5"
                            >
                                {"go back"}
                            </a>
                            <div className="mr-auto align-middle text-2xl">
                                {/* pull first name provided in db & concat with the address */}
                                {data.names[0] + " (" + data.address + ")"}
                            </div>
                            {/* send user to the corresponding review page when clicked */}
                            <a
                                href={"/review/" + data.id}
                                className="btn-success ml-auto w-auto rounded-md  border-2 p-2 text-center align-middle text-2xl font-semibold text-black"
                            >
                                Review this clinic
                            </a>
                        </div>
                        {/* show google map's embed given to us that doesnt require an api key. t=k is satellite view, q= supplies the center's address */}
                        <iframe
                            src={
                                "https://www.google.com/maps/?output=embed&t=k&q=" +
                                data.address
                            }
                            className="m-auto h-3/5 w-4/5 pt-2"
                        />
                        <button
                            onClick={async (_) => {
                                let loc = "";
                                console.log(navigator.geolocation)
                                if (navigator.geolocation) {
                                    loc = await new Promise((res) =>
                                        navigator.geolocation.getCurrentPosition(
                                            p => res(p.coords.latitude + ',' + p.coords.longitude),
                                            _err => res(""),
                                            {
                                                enableHighAccuracy: true
                                            }
                                        )
                                    );
                                };
                                window.open("https://www.google.com/maps/dir/" + loc + "/" + data.address);
                            }}
                            rel="noopener noreferrer" className="btn-success rounded-xl ml-auto h-fit mt-4 p-2 align-middle inline-block">Get Directions</button>
                        <div className="w-full p-4 text-3xl">Tell me more</div>
                        {/* ugliest code that lists some details of the center and procedures they have. */}
                        <p className="mx-16 mb-3 indent-16 text-lg">
                            {"These doctors like doing " +
                                data.procedureTypes.map((p) => p.name).join(", ") +
                                " at " +
                                data.names[0] +
                                " check out the website at " +
                                data.website +
                                " and give them a call at " +
                                data.healthCenterNumbers[0]}
                        </p>
                        <div className="w-full p-4 text-3xl">Reviews</div>
                        <p className="mx-16 mb-3 indent-16 text-lg">
                            {/* hacky code that makes the reviews show up not as [object Object] */}
                            {JSON.stringify(data.reviews, null, '\t')}
                        </p>
                    </>
                ) : (
                    <>
                        <div className="mt-1/2 h-full text-center text-2xl">
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
