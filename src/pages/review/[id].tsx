import React from "react";
import "leaflet/dist/leaflet.css";
import Navbar from "~/components/Navbar";
import type { GetStaticProps, NextPage } from "next";
import getServerSideHelper from "~/server/helpers/ServerSideHelper";
import { api } from "~/utils/api";

const ReviewPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.healthcare.getById.useQuery({ id });

  return (
    <>
      <Navbar />
      <div className="h-[calc(100%-5rem)] w-screen p-4">
        <div className="text-2xl">
          {JSON.stringify(data ?? !{ "not found": "bruh" }, null, "\t")}
        </div>
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

export default ReviewPage;
