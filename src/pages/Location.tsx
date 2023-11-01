import type { Prisma } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";

const LocationDestination:NextPage<{center:Prisma.DataSelectScalar}> = ({ center:data }) => {
    return (
        <>
            <div className="h-20 w-full bg-slate-400">
                NAV GOES HERE (Consider making it a component?)
            </div>
            <div className="p-4 w-full h-screen">
                <div className="border-b-2 border-slate-800 navbar">
                    <div className="text-2xl">{data.DOCTOR_NAME + " (" + data.ADDRESS + ")"}</div>
                    <a className="ml-auto w-auto rounded-md text-center items-center btn-success border-2 text-2xl p-2 text-black font-semibold">Review this clinic</a>
                </div>
                <iframe 
                    src={"https://www.google.com/maps/?output=embed&t=k&q=" + data.ADDRESS}
                    className="w-4/5 h-3/5 pt-2 m-auto"
                />
                <div className="w-full text-3xl p-4">Tell me more</div>
                <p className="text-lg mx-16 mb-3 indent-16">
                    {"This doctor likes doing " + data.SERVICE_NAME + " at " + data.HEALTH_CENTER_NAME + " check out the website at " + data.HOSPITAL_WEBSITE + " and give them a call at " + data.HOSPITAL_NUMBER + " or " + data.DOCTOR_NUMBER}
                </p>
            </div>
        </>
    );
}

export const getStaticProps:GetStaticProps = async () => {
    const ssg = getServerSideHelper();
    const center = await ssg.healthcare.getRandom.fetch();
    return {
        props: {
            trpcState: ssg.dehydrate(),
            center
        }
    }
    // await ssg.post.getById.prefetch({ id });
    // return {
    //   props: {
    //     trpcState: ssg.dehydrate(),
    //     id
    //   }
    // };
}
export default LocationDestination;