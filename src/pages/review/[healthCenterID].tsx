// import Head from "next/head";
// import Link from "next/link";
import { useState, useRef } from "react";
import React from "react";
import { api } from "~/utils/api";
import type { NextPage, GetStaticProps } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import Link from "next/link";

export const ReviewPage: NextPage<{ healthCenterID: string }> = ({
  healthCenterID,
}) => {
  const [status, setStatus] = useState("");
  const formRef =
    useRef() as unknown as React.MutableRefObject<HTMLFormElement>;

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
      const questcovered = (form.questcoveredy as HTMLInputElement).checked ? true : (form.questcoveredn as HTMLInputElement) ? false : undefined;
      const covered = (form.coveredy as HTMLInputElement) ? true : (form.coveredn as HTMLInputElement).checked ? false : undefined;

      // make sure they respond to our form...
      if (questcovered === undefined || covered === undefined || !procedureType.length || !procedureName.length)
        throw "SubmitSomethingBro";

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
        hadQuest: questcovered,
        healthCenterID,
        procedureTypeID: foundProcedureType.id,
      };
      reviewedProceduresArray.push(reviewedProcedure);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      createReviewMutation.mutate({
        hadQuest: questcovered,
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
    <div className="h-screen overflow-hidden " >
      <div className="ml-auto mr-auto w-fit p-3 py-24">
        <h3 className="pb-3 text-center text-6xl font-bold text-green-gray h-32">
          Was Your Care Covered?
        </h3>
        <div className="pb-2 text-xl">
          {"Reviewing " + foundHealthCenter.address + ". "}
          <Link href="/Search" className="text-blue-400 underline">
            Wrong address?
          </Link>
        </div>
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
                        className="input join-item "
                        type="radio"
                        name="questcovered"
                        id="questcoveredy"
                        value="Yes"
                      ></input>
                      <label htmlFor="questcoveredy" className="label join-item">Yes</label>

                    </div>



                    <div className="join join-item join-horizontal border border-gray-300 w-6/12 justify-evenly">
                      <input
                        className="input join-item"
                        type="radio"
                        name="questcovered"
                        id="questcoveredn"
                        value="No"
                      ></input>
                      <label htmlFor="questcoveredn" className="label join-item">No</label>
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
                        className="input join-item"
                        type="radio"
                        name="covered"
                        id="coveredy"
                        value="Yes"
                      ></input>
                      <label htmlFor="coveredy" className="label join-item">Yes</label>
                    </div>

                    <div className="join join-item join-horizontal border border-gray-300 w-6/12 justify-evenly">
                      <input
                        className="input join-item"
                        type="radio"
                        name="covered"
                        id="coveredn"
                        value="No"
                      ></input>
                      <label htmlFor="coveredn" className="label join-item">No</label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <input className="btn bg-light-green hover:bg-hover-green text-green-gray text-lg border-0 w-2/12" type="submit" value="submit!" />
        </form>
        <p className="text-center mt-5 text-3xl">{status}</p>
      

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
