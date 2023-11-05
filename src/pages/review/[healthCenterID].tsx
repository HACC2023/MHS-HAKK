// import Head from "next/head";
// import Link from "next/link";
import { useState, useRef } from "react";
import React from "react";
import { api } from "~/utils/api";
import type { NextPage, GetStaticProps } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import Navbar from "~/components/Navbar";
import Link from "next/link";

const ReviewPage: NextPage<{ healthCenterID: string }> = ({
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
      const procedureName: string = form.procedureName.value as string;
      const procedureType: string = form.procedureType.value as string;
      const questcovered          = form.questcoveredy.checked ? true : form.questcoveredn.checked ? false : undefined;
      const covered               = form.coveredy.checked ? true : form.coveredn.checked ? false : undefined;

      // make sure they respond to our form...
      if(questcovered === undefined || covered === undefined || !procedureType.length || !procedureName.length) 
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
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="ml-auto mr-auto w-fit p-3">
        <h1 className="pb-3 text-center text-6xl font-bold text-white">
          Submit a review
        </h1>
        <div className="pb-2">
          {"Reviewing " + foundHealthCenter.address + ". "}
          <Link href="/Search" className="text-blue-400 underline">
            Wrong address?
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="justify-items-center text-center" ref={formRef}>
          <table className="text-left mb-5">
            <tbody>

              <tr>
                <td>
                  <label htmlFor="procedureName">Procedure Name: </label>
                </td>
                <td>
                  <input type="text" id="procedureName" name="procedureName" />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="procedureType">Procedure Type: </label>
                </td>
                <td>
                  <input type="text" id="procedureType" name="procedureType" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="questcovered">
                    Was this procedure QUEST covered? (y/n):{" "}
                  </label>
                </td>
                <td>
                  <label htmlFor="questcoveredy">Yes</label>
                  <input
                    type="radio"
                    name="questcovered"
                    id="questcoveredy"
                    value="Yes"
                  ></input>
                  <label htmlFor="questcoveredn">No</label>
                  <input
                    type="radio"
                    name="questcovered"
                    id="questcoveredn"
                    value="No"
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="covered">
                    Was this procedure covered? (y/n):{" "}
                  </label>
                </td>
                <td>
                  <label htmlFor="coveredy">Yes</label>
                  <input
                    type="radio"
                    name="covered"
                    id="coveredy"
                    value="Yes"
                  ></input>
                  <label htmlFor="coveredn">No</label>
                  <input
                    type="radio"
                    name="covered"
                    id="coveredn"
                    value="No"
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <input className="btn bg-light-green hover:bg-hover-green text-green-gray border-0 " type="submit" value="submit!" />
        </form>
        <p className="text-center mt-5 text-3xl">{status}</p>
        <p className="mt-5 text-3xl">{foundHealthCenter.procedureTypes.map(pT=>pT.name).join(", ")}</p>
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
