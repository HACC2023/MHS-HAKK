// import Head from "next/head";
// import Link from "next/link";
import { useState, useRef } from "react";
import React from "react";
import { api } from "~/utils/api";
import type { NextPage, GetStaticProps } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import Link from "next/link";

const activeYesBtnCSS = "bg-light-green hover:bg-hover-green";
const activeNoBtnCSS  = "bg-red-400 hover:bg-red-500";

export const ReviewPage: NextPage<{ healthCenterID: string }> = ({
  healthCenterID,
}) => {
  const [status, setStatus] = useState("");
  const formRef =
    useRef() as unknown as React.MutableRefObject<HTMLFormElement>;

  const [questCovered, setQuestCovered] = useState<undefined|boolean>(undefined);
  const [covered, setCovered] = useState<undefined|boolean>(undefined);

  const createReviewMutation = api.healthcare.createReview.useMutation({
    onSuccess() {
      setStatus("All done loading! Thank you for your submission!");
    },
  });

  const foundHealthCenter = api.healthcare.getById.useQuery({
    id: healthCenterID,
  }).data;
  if (!foundHealthCenter) {
    return (
      <>
        <p>Center not found</p>
      </>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setStatus("Processing...");
      const form = formRef.current;

      // TS has no idea what our page looks like, so expect some red squiggly errors.
      // TODO: use states or something? Migrate this to a React.Component class so it looks nicer to other people working on the backend.
      const procedureName: string = (form.procedureName as HTMLInputElement).value;
      const procedureType: string = (form.procedureType as HTMLInputElement).value;
      //const questcovered = (form.questcoveredy as HTMLInputElement).checked ? true : (form.questcoveredn as HTMLInputElement) ? false : undefined;
      //const covered = (form.coveredy as HTMLInputElement) ? true : (form.coveredn as HTMLInputElement).checked ? false : undefined;

      // make sure they respond to our form...
      if (questCovered === undefined || covered === undefined || !procedureType.length || !procedureName.length)
        throw "SubmitSomethingBro";

      const foundProcedureType = foundHealthCenter.procedureTypes.find(
        (thisProcedureType) => thisProcedureType.name.toLowerCase() === procedureType.toLowerCase(),
      );
      if (!foundProcedureType) {
        throw "ProcedureTypeNameInvalid";
      }

      const reviewedProceduresArray = [];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const reviewedProcedure = {
        type: procedureType,
        name: procedureName,
        covered: covered,
        hadQuest: questCovered,
        healthCenterID,
        procedureTypeID: foundProcedureType.id,
      };
      reviewedProceduresArray.push(reviewedProcedure);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      createReviewMutation.mutate({
        hadQuest: questCovered,
        healthCenterID,
        reviewedProcedures: reviewedProceduresArray
      });
    } catch (e) {
      switch (e) {
        case "ProcedureTypeNameInvalid":
          setStatus("Procedure type name not found in center.");
          break;
        case "SubmitSomethingBro":
          setStatus("Please fill out the form fully.");
          break;
        default:
          console.log(e);
          setStatus("Unknown error occurred. Please try again later.");
          break;
      }
    }
  };

  return (
    <div className="h-fit overflow-hidden " >
      <div className="ml-auto mr-auto w-fit p-7 sm:p-3 sm:py-24">
        <h3 className="pb-3 text-center text-5xl sm:text-6xl font-bold text-green-gray">
          Were you able to get care?
        </h3>
        <div className="pb-2 text-xl text-center">
          {"Reviewing " + foundHealthCenter.address + ". "}<br/>
        </div>
        <div className="w-full flex justify-center">
        <Link href="/Search" className="text-blue-400 underline">
          Wrong address?
        </Link>
        </div>
        <p className="text-center mt-5 text-3xl">{status}</p>
        <form onSubmit={handleSubmit} className="justify-items-center text-center" ref={formRef}>
          <table className="text-left mb-5 w-full">
            <tbody>

              <tr className="h-16">
                <td>
                  <label htmlFor="procedureName " className="text-lg">Procedure Name: </label>
                </td>
                <td>
                  <input type="text" id="procedureName" name="procedureName" className="input input-bordered w-full" />
                </td>
              </tr>

              <tr className="h-16">
                <td>
                  <label htmlFor="procedureType" className="text-lg">Procedure Type: </label>
                </td>
                <td>
                  <input type="text" id="procedureType" name="procedureType" className="input input-bordered w-full" />
                </td>
              </tr>
              <tr className="h-16">
                <td>
                  <label htmlFor="questcovered" className="text-lg">
                    Was this procedure QUEST covered?:{" "}
                  </label>
                </td>
                <td>
                  <div className="join w-full text-lg">
                    <div className="join join-item join-horizontal border border-gray-300 w-6/12 justify-evenly">

                      <input
                        className={"input join-item w-full " + (questCovered === true ? activeYesBtnCSS : 'hover:bg-slate-300')}
                        type="button"
                        name="questcovered"
                        id="questcoveredy"
                        value="Yes"
                        onClick={() => setQuestCovered(true)}
                      ></input>
                    </div>



                    <div className="join join-item join-horizontal border border-gray-300 w-6/12 justify-evenly">
                      <input
                        className={"input join-item w-full " + (questCovered === false ? activeNoBtnCSS : 'hover:bg-slate-300')}
                        type="button"
                        name="questcovered"
                        id="questcoveredn"
                        value="No"
                        onClick={() => setQuestCovered(false)}
                      ></input>
                    </div>
                  </div>
                </td>
              </tr>


              <tr className="h-16">
                <td>
                  <label htmlFor="covered" className="text-lg">
                    Was this procedure covered?:{" "}
                  </label>
                </td>
                <td>
                  <div className="join w-full text-lg">
                    <div className="join join-item join-horizontal border border-gray-300 w-6/12 justify-evenly">
                      <input
                        className={"input join-item w-full " + (covered === true ? activeYesBtnCSS : 'hover:bg-slate-300')}
                        type="button"
                        name="covered"
                        id="coveredy"
                        value="Yes"
                        onClick={() => setCovered(true)}
                      ></input>
                    </div>

                    <div className="join join-item join-horizontal border border-gray-300 w-6/12 justify-evenly">
                      <input
                        className={"input join-item w-full " + (covered === false ? activeNoBtnCSS : 'hover:bg-slate-300')}
                        type="button"
                        name="covered"
                        id="coveredn"
                        value="No"
                        onClick={() => setCovered(false)}
                      ></input>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <input className="btn bg-light-green hover:bg-hover-green text-green-gray text-lg border-0" type="submit" value="submit!" />
        </form>
      

        {/* idk what this was for but i removed it bc it just said "comprehensive care" */}
        {/* <p className="mt-5 text-3xl">{foundHealthCenter.procedureTypes.map(pT=>pT.name).join(", ")}</p> */}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = getServerSideHelper();
  const healthCenterID = context.params?.healthCenterID;
  if (typeof healthCenterID !== "string") throw new Error("Health center ID not found");
  await ssg.healthcare.getById.prefetch({ id: healthCenterID });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      healthCenterID,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ReviewPage;
