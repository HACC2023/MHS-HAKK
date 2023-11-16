import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { ReviewPage } from "~/pages/review/[healthCenterID]";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";
import { FormatURL } from "../Search";

const LocationDestination: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.healthcare.getById.useQuery({ id });
  const [map, setMap] = useState("&q=" + data?.address);
  const [mobileView, setMORV] = useState<"desc" | "map" | "review">("desc");

  const MapFrame = (
    <iframe
      onLoad={async () => {
        if (navigator.geolocation && data) {
          setMap(
            await new Promise((res) =>
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
                (_err) =>
                  res(
                    "&saddr=21.5004057,-158.0393896" + "&daddr=" + data.address,
                  ),
                {
                  enableHighAccuracy: true,
                },
              ),
            ),
          );
        }
      }}
      className="h-full w-full lg:rounded-r-xl lg:rounded-l-none"
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
                "flex w-full flex-col gap-4 bg-dark-blue px-[calc(5%)] py-16 pb-10 text-white lg:px-[calc(15%)] " +
                (mobileView === "map" ? "hidden" : "")
              }
            >
              <h1
                title={
                  data.names.length > 1
                    ? "Also known as " + data.names.slice(1).join(", ")
                    : undefined
                }
                className="flex-col break-words pt-4 text-center text-5xl font-bold text-white lg:text-left"
              >
                {data.names[0]}
              </h1>
              <div className="items-center text-center text-xl font-bold lg:text-left">
                {data.procedureTypeNames.join(", ")}
              </div>
              <div className="flex w-full flex-wrap justify-center lg:justify-normal">
                {data.procedureReviews
                  .map((procedureReviews, index) => (
                    <div
                      key={index + 1}
                      className="mx-1 mb-2 inline-block w-fit break-all rounded-full bg-slate-50 p-2 px-4 font-medium text-black"
                    >
                      {procedureReviews.name}
                    </div>
                  ))}
              </div>
              <div
                className="tooltip tooltip-bottom inline-flex justify-center space-x-1 opacity-90 text-opacity-100 lg:w-fit lg:justify-normal"
                data-tip="We compiled information on multiple clinics and will be crowdsourcing from the community. If this page does not accurately reflect your experience, please let us know how your experience went."
              >
                <p className="text-left font-semibold">
                  Coverage disclaimer
                </p>
                <svg
                  height={20}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
              <div className="mr-1 flex w-full space-x-4 pt-0 mb-7">
                <div className="join mx-auto flex lg:mx-0">
                  <a
                    onClick={() => window.history.back()}
                    className={
                      "border-1 btn join-item mt-6 h-full w-1/2 bg-light-green text-xl normal-case text-green-gray hover:bg-hover-green"
                    }
                  >
                    Go Back
                  </a>
                  <a
                    onClick={() =>
                      /* ACCESS USING JSON.parse(localStorage.getItem("visiting")) */
                      localStorage.setItem(
                        "visiting",
                        JSON.stringify({ id: data.id, time: Date.now() }),
                      )
                    }
                    className={
                      "border-1 btn join-item mt-6 h-full w-1/2 bg-light-green text-xl normal-case text-green-gray hover:bg-hover-green"
                    }
                  >
                    Planning to visit this clinic
                  </a>
                  {/*
                  this can be added later.
                  <a
                    onClick={() => {
                      /* We need to do something here!!! * /
                    }}
                    className={
                      "btn join-item mt-5 h-20 w-40 border-white bg-light-green text-2xl normal-case text-green-gray hover:bg-hover-green "
                    }
                  >
                    Planning to visit clinic
                  </a>
                  */}
                </div>
              </div>
            </div>

            {/**
             * Was Your Care Covered? TOOLTIP
             */}
            <div
              className={
                "w-full lg:block " + (mobileView === "map" ? "hidden" : "")
              }
            >
              <div className="flex">
                <div className="toast toast-end opacity-90">
                  <div
                    className={
                      (mobileView === "review" ? "hidden md:flex" : "flex") +
                      " alert alert-info tooltip tooltip-top bg-dark-blue text-white"
                    }
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/**
             * SELECT VIEW FOR MOBILE
             */}
            <div className="mb-5 flex h-full w-screen flex-col lg:hidden ">
              <div className="mx-auto h-full">
                <div className="pb-1 pt-5 text-center text-3xl font-semibold">
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
                "w-full lg:join lg:mt-4 lg:flex " +
                (mobileView === "desc" ? "mb-3 flex" : "hidden")
              }
            >
              <div className="static mx-3 w-full rounded-xl bg-gray-100 lg:mr-0 lg:min-w-[55%] lg:max-w-[55%] lg:rounded-r-none lg:border-r-4">
                <div className="min-h-96 px-4 py-7 sm:p-7">
                  <div className="text-center text-3xl font-semibold lg:text-start">
                    Clinic Description
                  </div>
                  <div className="divider mb-0 mt-2" />
                  <table className="mx-auto table-fixed border-separate border-spacing-x-3 border-spacing-y-4 text-xl lg:mx-0">
                    <tbody>
                      {data.website ? (
                        <tr className="align-text-top">
                          <td>
                            <h2 className="font-semibold">Clinic Website</h2>
                          </td>
                          <td>
                            <Link
                              className="break-all italic text-blue-700 underline"
                              href={"https://" + FormatURL(data.website)}
                              target="_blank"
                            >
                              {FormatURL(data.website)}
                            </Link>
                          </td>
                        </tr>
                      ) : null}
                      <tr className="align-text-top">
                        <td>
                          <h2 className="font-semibold">Clinic Address</h2>
                        </td>
                        <td className="break-words">
                          <p className="">{data.address}</p>
                        </td>
                      </tr>

                      <tr className="align-text-top">
                        <td>
                          <h2 className="font-semibold">Clinic Phone</h2>
                        </td>
                        <td>
                          <p className="">
                            {(() => {
                              const num = JSON.stringify(
                                data.healthCenterNumbers[0],
                              );
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
                      <tr className="align-text-top">
                        <td>
                          <h2 className="font-semibold">Insurance Type</h2>
                        </td>
                        <td>
                          <p className="">
                            {data.supportedInsurances
                              .join(", ")
                              .replace("QI", "Quest Insured")
                              .replace(
                                "FQHC",
                                "Federally Qualified Health Center",
                              )}
                          </p>
                        </td>
                      </tr>
                      {data.supportedInsurances.includes("FQHC") && (
                        <tr className="align-text-top">
                          <td>
                            <h2 className="font-semibold">Payment Details</h2>
                          </td>
                          <td>
                            <p className="max-w-md">
                              Without insurance, clinics will charge based on
                              your income and the number of people in your
                              household. For more information, please contact
                              the clinic.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {data.doctors.length > 0 && (
                    <>
                      <div className="text-center text-3xl font-semibold lg:text-start">
                        Doctors
                      </div>
                      <div className="divider mb-0 mt-2" />
                      <table className="mx-auto table-fixed border-separate border-spacing-x-3 border-spacing-y-5 text-xl lg:mx-0">
                        <tbody>
                          {data.doctors.map((doctor, i) => {
                            const number = doctor.availabilities.find(
                              (availability) =>
                                availability.healthCenterID == id,
                            )!.phoneNumber;
                            return (
                              <tr key={i} className="align-text-top">
                                <td className="w-1/2 pr-2">
                                  <h2 className="font-semibold">
                                    {doctor.name}
                                    <br />
                                    <p className="font-normal italic">
                                      (
                                      {doctor.procedureTypes.map(
                                        (procedureType) => procedureType.name,
                                      )}
                                      )
                                    </p>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    {number
                                      ? "(" +
                                        number.slice(0, 3) +
                                        ") " +
                                        number.slice(3, 6) +
                                        "-" +
                                        number.slice(6)
                                      : ""}
                                  </h2>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
              <div className="mr-3 hidden w-full rounded-r-xl lg:flex">
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
