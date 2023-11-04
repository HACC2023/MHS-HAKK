// import Head from "next/head";
// import Link from "next/link";
import { useState, useRef } from 'react';
import React from 'react';
import { api } from "~/utils/api";
import type { NextPage, GetStaticProps } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";

const ReviewPage: NextPage<{ healthCenterID: string }> = ({ healthCenterID }) => {
  const [status, setStatus] = useState("");
  const formRef = useRef() as unknown as React.MutableRefObject<HTMLFormElement>;

  const createReviewMutation = api.healthcare.createReview.useMutation({
    onSuccess() {      
      setStatus("All done loading! Thank you for your submission!")
      // $("form[id*=reviewForm]").trigger("reset");
    }
  });

  const submitReview = (hadQuest: boolean, healthCenterID: string, reviewedProcedures: Array<{type: string, name: string, covered: boolean, hadQuest: boolean, healthCenterID: string, procedureTypeID: string}>) => {
    createReviewMutation.mutate({hadQuest: hadQuest, healthCenterID: healthCenterID, reviewedProcedures: reviewedProcedures});
  }
  
  const foundHealthCenter = api.healthcare.getById.useQuery({id: healthCenterID}).data;
  if (!foundHealthCenter) {
    return (<>
      <p>Center not found</p>
    </>)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setStatus("Loading...");
      const form = formRef.current;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const foundProcedureType = foundHealthCenter.procedureTypes.find((procedureType) => procedureType.name == form.procedureType.value);
      if (!foundProcedureType) {
        throw "ProcedureTypeNameInvalid";
      }

      const reviewedProceduresArray = [];

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const reviewedProcedure = {type: form.procedureType.value, name: form.procedureName.value, covered: (form.covered.value == "y"), hadQuest: (form.questCoverage.value == "y"), healthCenterID: healthCenterID, procedureTypeID: foundProcedureType.id};
      reviewedProceduresArray.push(reviewedProcedure);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      void submitReview((form.questCoverage.value == "y"), healthCenterID, reviewedProceduresArray);
    } catch (e) {
      if (e =="ProcedureTypeNameInvalid") {
        setStatus("Procedure type not found in that center")
      } else {
        throw e;
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="reviewForm" ref={formRef}>

        <label htmlFor="questCoverage">Quest Coverage (y/n): </label>
        <input type="text" id="questCoverage" name="questCoverage" />
        <br />

        <label htmlFor="procedureName">Procedure Name: </label>
        <input type="text" id="procedureName" name="procedureName" />
        <br />

        <label htmlFor="procedureType">Procedure Type: </label>
        <input type="text" id="procedureType" name="procedureType" />
        <br />

        <label htmlFor="covered">Was this procedure covered? (y/n): </label>
        <input type="text" id="covered" name="covered" />
        <br />

        <input type="submit" value="submit!"/>
      </form>
      <br />
      <p>{status}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = getServerSideHelper();
  const healthCenterID = context.params?.healthCenterID;
  if (typeof healthCenterID !== "string") throw "Health center ID not found";
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