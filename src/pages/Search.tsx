import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import type { InsuranceProviders } from "~/server/api/routers/HealthcareRouter";
import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import { LoadingSpinner } from "~/components/Loading";
import Link from "next/link";
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
});

const SearchPage: React.FC = () => {
  // this is used for filtering.
  // allow user to set insurance status (QUEST, none, or both)
  const [insurance, setInsurance] = useState<InsuranceProviders | undefined>();
  const [procedure, setProcedure] = useState<string | undefined>();

  const [mobileOnResultsView, setMORV] = useState(true);

  // if no insurance selected, select first 100 clinics.
  // if there is, plug it into our api.
  // this really needs to be one procedure with the insurance being optional.
  // this is unsorted. it is sorted however mongodb wants to sort it :)
  const { data: centers, isLoading } =
    insurance !== undefined
      ? api.healthcare.getByPlan.useQuery({ insurance })
      : api.healthcare.getSome.useQuery();

  return (
    <div
      className={
        "h-screen overflow-x-hidden font-tyler md:block md:overflow-y-auto " +
        (!mobileOnResultsView && "fixed overflow-y-hidden")
      }
    >
      <Navbar />
      {/* Desktop view */}
      <div className="hidden h-[calc(100%-5rem)] w-screen md:flex">
        <div
          className="0 
                h-full w-1/5 flex-col bg-gray-100"
        >
          <p className="mb-2 mt-4 text-center text-xl font-semibold">
            Search Filters:
          </p>
          <div className="form-control w-full px-6">
            <label className="label">
              <span className="label-text text-base font-semibold">
                Insurance type
              </span>
            </label>
            <SelectInsurance setInsurance={setInsurance} />
            <label className="label">
              <span className="label-text text-base font-semibold">
                Procedure type
              </span>
            </label>
            <SelectProcedure setProcedure={setProcedure} />
          </div>

        </div>
        <div
          className="h-full w-1/2 flex-col overflow-y-scroll
                border-l-2 border-r-2 bg-white"
        >
          <p className="mb-6 mt-4 rounded-xl text-center text-4xl font-semibold">
            Search Results:
          </p>
          {/* tell the user to wait if we are still waiting on data to come in. 
                    DO NOT USE STATIC SITE GENERATION BECAUSE YOUTUBE DOESN'T DO THIS WHEN YOU SEARCH FOR VIDEOS
                    then, when we get the data we can map it out into a DIV for each center. rn we are missing a more info <button className=""></button>
                    */}
          {isLoading || !centers ? (
            <div className="mt-12 grid justify-items-center justify-self-center">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                "Could not find any centers. Try clearing filters?"
              )}
            </div>
          ) : (
            <ClinicResults centers={centers} />
          )}
        </div>
        {/* possibly feed the list of locations into here, it was requested/needed that the leaflet map should only show endpoints
                that are in the search results, but I bring up the problem of pagination again. */}
        <LeafletMap key={0} />
      </div>

      {/* Mobile view */}
      <div className="flex h-[calc(100vh-5rem)] w-screen flex-col md:hidden">
        <dialog id="optionsDialogue" className="modal">
          <div className="modal-box space-y-4">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <h3 className="text-lg font-bold">Select Insurance Provider</h3>
              <SelectInsurance setInsurance={setInsurance} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Select Procedure Type</h3>
              <SelectProcedure setProcedure={setProcedure} />
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button/>
          </form>
        </dialog>
        <div className="flex max-h-fit pb-1 pl-5 pt-3">
          Pick Insurance / Procedures
        </div>
        <div className="mx-auto flex max-h-fit w-full space-x-4 p-5 pt-0">
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="select-bordered w-full rounded-lg border border-[hsl(var(--bc)/var(--tw-border-opacity))] p-2 px-2 text-center"
            onClick={() =>
              (
                document.getElementById("optionsDialogue") as HTMLDialogElement
              ).showModal()
            }
          >
            Click for options
          </button>
          <div className="join">
            <a
              onClick={() => setMORV(true)}
              className={
                (mobileOnResultsView
                  ? "bg-slate-200"
                  : "flex-grow bg-transparent") +
                " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] p-2 px-2 text-center"
              }
            >
              Results
            </a>
            <a
              onClick={() => setMORV(false)}
              className={
                (!mobileOnResultsView ? "bg-slate-200" : "bg-transparent") +
                " join-item select-bordered flex flex-col content-center justify-center border border-[hsl(var(--bc)/var(--tw-border-opacity))] p-2 px-2 text-center"
              }
            >
              Map
            </a>
          </div>
        </div>
        <div
          className={
            mobileOnResultsView
              ? "flex-1 pb-4"
              : "h-full flex-1 overflow-y-hidden"
          }
        >
          {mobileOnResultsView ? (
            isLoading || !centers ? (
              <div className="mt-12 grid justify-items-center justify-self-center">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  "Could not find any centers. Try clearing filters?"
                )}
              </div>
            ) : (
              <ClinicResults centers={centers} />
            )
          ) : (
            <LeafletMap key={0} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

function SelectInsurance(props: {
  setInsurance: (
    value: React.SetStateAction<InsuranceProviders | undefined>,
  ) => void;
}) {
  return (
    <select
      className="select select-bordered w-full text-base"
      defaultValue={"Pick one"}
      onChange={(sel) =>
        props.setInsurance(sel.target.value as InsuranceProviders | undefined)
      }
    >
      <option disabled>Pick one</option>
      <option value={"FQHC"}>Uninsured</option>
      <option value={"QI"}>Med-QUEST</option>
      <option value={undefined}>Any</option>
    </select>
  );
}

function SelectProcedure(props: {
  setProcedure: (value: React.SetStateAction<string | undefined>) => void;
}) {
  return (
    <select
      className="select select-bordered w-full text-base"
      defaultValue={"Pick one"}
      onChange={(sel) => props.setProcedure(sel.target.value)}
    >
      <option disabled>Pick one</option>
      <option value={"Comprehensive Care"}>Comprehensive Care</option>
      <option value={undefined}>Any</option>
    </select>
  );
}

function ClinicResults(props: {
  centers: {
    id: string;
    address: string;
    names: string[];
    website: string | null;
    healthCenterNumbers: string[];
    supportedInsurances: string[];
    procedureTypeNames: string[];
    procedureTypeIDs: string[];
    doctorIDs: string[];
  }[];
}) {
  return props.centers.map((c) => (
    <div
      className={
        "mx-4 mb-4 rounded-xl border-2 border-gray-100 bg-gray-100 p-4"
      }
      key={c.id}
    >
      <div className="l-20 text-2xl font-semibold">
        <Link
          href={"/location/" + c.id}
          className={
            c.supportedInsurances.includes("QI")
              ? "text-dark-blue"
              : "text-dark-blue"
          }
        >
          {c.names[0] + " (" + (false || "Comprehensive Care") + ")"}
        </Link>
      </div>

      <div className="flex">
        <div className="min-w-full break-words text-justify">
          {c.website && (
            <a
              className="italic text-blue-700 underline"
              href={"https://" + c.website}
            >
              {c.website}
            </a>
          )}
          <div>{c.address}</div>
          {c.healthCenterNumbers[0] && (
            <div>
              {(() => {
                const num = c.healthCenterNumbers[0];
                return (
                  "(" +
                  num.slice(0, 3) +
                  ") " +
                  num.slice(3, 6) +
                  "-" +
                  num.slice(6)
                );
              })()}
            </div>
          )}
          <div>
            {c.supportedInsurances.includes("QI") && "Quest Insured"}
            {c.supportedInsurances.includes("FQHC") &&
              "Federally Qualified Health Center"}
          </div>
        </div>
      </div>
    </div>
  ));
}
