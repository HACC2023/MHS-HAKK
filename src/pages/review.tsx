import Head from "next/head";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Review a Clinic</title>
        <meta name="description" content="WIP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Make <span className="text-[hsl(280,100%,70%)]">Review</span> Page 😵
          </h1>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}