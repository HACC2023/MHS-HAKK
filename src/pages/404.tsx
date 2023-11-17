import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/Navbar";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page not found - HelpCare</title>
      </Head>
      <div className="h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-[calc(100%-5rem)] w-screen bg-med-green">
          <div className="m-auto text-center">
            <h1 className="pb-3 text-6xl font-bold text-white">
              Page not found
            </h1>
            <Link href="/" className="text-white underline">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
