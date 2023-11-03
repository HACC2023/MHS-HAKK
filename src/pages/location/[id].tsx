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
              <div className="mr-auto align-middle text-2xl">
                {data.names[0] + " (" + data.address + ")"}
              </div>
              <a
                href={"/review/" + data.id}
                className="btn-success ml-auto w-auto rounded-md  border-2 p-2 text-center align-middle text-2xl font-semibold text-black"
              >
                Review this clinic
              </a>
            </div>
            <iframe
              src={
                "https://www.google.com/maps/?output=embed&t=k&q=" +
                data.address
              }
              className="m-auto h-3/5 w-4/5 pt-2"
            />
            <div className="w-full p-4 text-3xl">Tell me more</div>
            <p className="mx-16 mb-3 indent-16 text-lg">
              {"This doctor likes doing " +
                JSON.stringify(data.procedureTypes.map((p) => p.name)) +
                " at " +
                data.names[0] +
                " check out the website at " +
                data.website +
                " and give them a call at " +
                data.healthCenterNumbers[0]}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = getServerSideHelper();
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("ID Not found");
  await ssg.healthcare.getById.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default LocationDestination;
