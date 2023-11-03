import type { GetStaticProps, NextPage } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const LocationDestination:NextPage<{id: string}> = ({ id }) => {

    const { data } = api.healthcare.getById.useQuery({ id });
    if(!data) return <div>404</div>;

    return (
        <>
            <div className="h-20 w-full bg-slate-400">
                NAV GOES HERE (Consider making it a component?)
            </div>
            <div className="p-4 w-full h-screen">
                <div className="border-b-2 border-slate-800 navbar">
                    <div className="text-2xl">{data.names[0] + " (" + data.address + ")"}</div>
                    <a className="ml-auto w-auto rounded-md text-center items-center btn-success border-2 text-2xl p-2 text-black font-semibold">Review this clinic</a>
                </div>
                <iframe 
                    src={"https://www.google.com/maps/?output=embed&t=k&q=" + data.address}
                    className="w-4/5 h-3/5 pt-2 m-auto"
                />
                <div className="w-full text-3xl p-4">Tell me more</div>
                <p className="text-lg mx-16 mb-3 indent-16">
                    {"This doctor likes doing " + JSON.stringify(data.procedureTypes.map(p=>p.name)) + " at " + data.names[0] + " check out the website at " + data.website + " and give them a call at " + data.healthCenterNumbers[0]}
                </p>
            </div>
        </>
    );
}

export const getStaticProps:GetStaticProps = async (context) => {
    const ssg = getServerSideHelper();
    const id = context.params?.id;
    if(typeof id !== "string") throw new Error("ID Not found");
    await ssg.healthcare.getById.prefetch({ id });
    return {
        props: {
            trpcState: ssg.dehydrate(),
            id
        }
    }
}

export const getStaticPaths = () => {
    return {paths: [], fallback: "blocking"};
}

export default LocationDestination;