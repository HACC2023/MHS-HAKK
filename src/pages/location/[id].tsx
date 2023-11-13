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

  // imported variables for reviewTagDisplay
  const foundHealthCenter = api.healthcare.getById.useQuery({
    id: id,
  }).data;

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
    <div
      className={
        "w-full font-tyler lg:block lg:overflow-y-auto " +
        (mobileView === "map" ? "fixed overflow-y-hidden" : "")
      }
    >
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
              <div className="flex">
                <div className="toast toast-end">
                  <div
                    className="alert alert-info tooltip tooltip-top flex bg-dark-blue text-white "
                    data-tip="Let us know if your care was covered"
                  >
                    <div>Was Your Care Covered?</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 shrink-0 stroke-current"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
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
              <div className="static mx-3 w-full rounded-xl bg-gray-100 lg:mr-0 lg:w-4/5 lg:rounded-r-none lg:border-r-4">
                <div className="min-h-96 w-full py-7 px-3 sm:p-7">
                <div className="text-3xl font-semibold w-full text-center lg:text-start">Clinic Description</div>
                <div className="divider mt-0 mb-0"/>
                <table className="table-fixed mx-auto lg:mx-0">
                  <tbody className="border-spacing-2">

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
                        <p className="text-xl">
                          {(() => {
                            const num = JSON.stringify(data.healthCenterNumbers[0]);
                            return (
                              "(" +
                              num.slice(1, 4) +
                              ") " +
                              num.slice(4, 7) +
                              "-" +
                              num.slice(7, 11)
                            );
                          })()}
                        </p>                      
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
                          <p className="text-lg max-w-md">Without insurance, clinics will charge based on your income and the number of people in your household. For more information, please contact the clinic.</p>
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

                    {
                      <tr>
                        <td>
                          {/* Making a tooltip static caused the tooltip to disappear */}
                          <div className="flex tooltip tooltip-bottom w-full" data-tip="We compiled information on multiple clinics and will be crowdsourcing from the community. If this page does not accurately reflect your experience, please let us know how your experience went.">
                            <h3 className="text-lx font-semibold flex md:gap-x-1">Coverage disclaimer<svg xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg></h3>
                          </div>
                        </td>
                        <td className="text-lg">
                          {foundHealthCenter?.procedureReviews.map((procedureReviews) => procedureReviews.name).join(", ")}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
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
