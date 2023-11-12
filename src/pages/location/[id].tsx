import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { ReviewPage } from "~/pages/review/[healthCenterID]";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const LocationDestination: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.healthcare.getById.useQuery({ id });
  const [map, setMap] = useState("&q=" + data?.address);
  const [mobileView, setMORV] = useState<"desc" | "map" | "review">("desc");

  const MapFrame = (
    <iframe
      onLoad={async () => {
        if (navigator.geolocation && data) {
          setMap(
            (await new Promise((res) =>
              navigator.geolocation.getCurrentPosition(
                (p) =>
                  res(
                    "&saddr=" +
                      p.coords.latitude +
                      "," +
                      p.coords.longitude +
                      "&daddr=" +
                      data.address,
                  ),
                (_err) => res(""),
                {
                  enableHighAccuracy: true,
                },
              ),
            )) || map,
          );
        }
      }}
      className={
        "h-full w-full " + (mobileView === "desc" ? "rounded-r-xl" : "")
      }
      src={"https://www.google.com/maps/?output=embed" + map}
    />
  );

  return (
    <div className={"w-full font-tyler lg:block lg:overflow-y-auto " + (mobileView === "map" ? "fixed overflow-y-hidden" : "")}>
      <Navbar />
      <div>
        {data ? (
          <>
            <div
              className={
                "flex w-full flex-col gap-4 bg-dark-blue px-[calc(5%)] py-16 text-white sm:px-[calc(15%)] " +
                (mobileView === "map" ? "hidden" : "")
              }
            >
              <div
                title={
                  data.names.length > 1
                    ? "Also known as " + data.names.slice(1).join(", ")
                    : undefined
                }
                className="flex-col break-words pt-4 text-center text-4xl font-bold  md:text-left"
              >
                {data.names[0]}
              </div>
              <div className="items-center text-center text-xl font-bold md:text-left">
                {data.procedureTypeNames.join(" ")}
              </div>
            </div>

            <div
              className={
                "w-full lg:block " + (mobileView === "map" ? "hidden" : "")
              }
            >
              <div className="mr-1 flex w-full space-x-4 p-5 pt-0">
                <div className="join mx-auto">
                  <a
                    onClick={() => window.history.back()}
                    className={
                      "btn join-item mt-5 h-20 w-40 border-white bg-light-green text-xl normal-case text-green-gray hover:bg-hover-green "
                    }
                  >
                    Go Back
                  </a>
                  <a
                    onClick={() => {
                      /* We need to do something here!!! */
                    }}
                    className={
                      "btn join-item mt-5 h-20 w-40 border-white bg-light-green text-xl normal-case text-green-gray hover:bg-hover-green "
                    }
                  >
                    Planning to visit clinic
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-5 flex h-full w-screen flex-col lg:hidden ">
              <div className="mx-auto h-full">
                <div className="pb-1 pt-3 text-center text-2xl font-semibold">
                  Select View
                </div>
                <div className="mx-auto flex w-full space-x-4 pt-0">
                  <div className="join">
                    <a
                      onClick={() => setMORV("desc")}
                      className={
                        (mobileView === "desc"
                          ? "bg-slate-200"
                          : "bg-transparent") +
                        " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] p-2 px-2 text-center"
                      }
                    >
                      Overview
                    </a>
                    <a
                      onClick={() => setMORV("map")}
                      className={
                        (mobileView === "map"
                          ? "bg-slate-200"
                          : "bg-transparent") +
                        " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] p-2 px-2 text-center"
                      }
                    >
                      Directions
                    </a>
                    <a
                      onClick={() => setMORV("review")}
                      className={
                        (mobileView === "review"
                          ? "bg-slate-200"
                          : "bg-transparent") +
                        " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] p-2 px-2 text-center"
                      }
                    >
                      Review
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/*
             * DESKTOP VIEW: SHOW DESC|MAP
             * MOBILE VIEW : SHOW DESC
             */}
            <div
              className={
                "w-full lg:join lg:flex " +
                (mobileView === "desc" ? "mb-3 flex" : "hidden")
              }
            >
              <div className="static mx-3 rounded-xl bg-gray-100 lg:mr-0 w-full lg:w-4/5 lg:rounded-r-none lg:border-r-4">
                <div className="min-h-96 w-full p-7">
                  <h1 className="w-full text-center text-3xl font-semibold lg:text-left">
                    Clinic Description
                  </h1>
                  <div className="divider" />
                  <div>
                    <div className="pt-4">
                      <h2 className="join-item text-xl font-semibold">
                        Clinic Website
                      </h2>
                      <Link
                        className="join-item pl-4 text-xl italic text-blue-400 underline md:pl-16"
                        href={
                          data.website && data.website.startsWith("https://")
                            ? data.website
                            : "https://" + data.website
                        }
                      >
                        {data.website}
                      </Link>
                    </div>

                    <div className="pt-4">
                      <h2 className="join-item text-xl font-semibold">
                        Clinic Address
                      </h2>
                      <p className="join-item pl-4 text-xl md:pl-16">
                        {data.address}
                      </p>
                    </div>

                    <div className="pt-4">
                      <h2 className="join-item text-xl font-semibold">
                        Clinic Name
                      </h2>
                      <p className="join-item pl-4 text-xl md:pl-16">
                        {data.names[0]}
                      </p>
                    </div>

                    {data.healthCenterNumbers[0] && (
                      <div className="pt-4">
                        <h2 className="join-item text-xl font-semibold">
                          Clinic Phone
                        </h2>
                        <p className="join-item pl-4 text-xl md:pl-16">
                          {(() => {
                            const num = data.healthCenterNumbers[0];
                            return (
                              "(" +
                              num.slice(0, 3) +
                              ") " +
                              num.slice(3, 6) +
                              "-" +
                              num.slice(6)
                            );
                          })()}
                        </p>
                      </div>
                    )}

                    <div className="pt-4">
                      <h2 className="join-item text-xl font-semibold">
                        Insurance Type
                      </h2>
                      <p className="join-item space-x-4 pl-4 text-xl md:pl-16">
                        {data.supportedInsurances.includes("QI") &&
                          "Quest Insured"}
                        {data.supportedInsurances.includes("FQHC") &&
                          "Federally Qualified Health Center"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-3 hidden w-3/5 rounded-r-xl lg:flex">
                {MapFrame}
              </div>
            </div>

            {/**
             * DESKTOP VIEW: N/A
             * MOBILE VIEW: SHOW MAP
             */}
            <div
              className={
                "h-[calc(100vh-11.89rem)] lg:hidden " +
                (mobileView === "map" ? "block" : "hidden")
              }
            >
              {MapFrame}
            </div>

            {/**
             * DESKTOP VIEW: N/A
             * MOBILE VIEW: SHOW REVIEW
             */}
            <div
              className={
                "lg:block " + (mobileView === "review" ? "block" : "hidden")
              }
            >
              <ReviewPage healthCenterID={id} />
            </div>
          </>
        ) : (
          <>
            <div className="mt-1/2 h-full text-center text-2xl ">
              Clinic not found
            </div>
          </>
        )}
      </div>
    </div>
  );
};

{
  /* weird code used for static site generation so we dont stress out the database or something */
}
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = getServerSideHelper();
  {
    /* note how the file is called [id]. we get that parameter... */
  }
  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("ID Not found");

  {
    /* and pre-fetch it on our side, so when loaded in the above function, we dont have to make the end user come to us asking for it */
  }
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
