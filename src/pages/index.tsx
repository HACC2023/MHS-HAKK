import Navbar from "~/components/navbar";
import Head from "next/head";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <Head>
        <title>Landing page</title>
        <meta name="description" content="this is the LANDING page"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>

      <Image src="/motto.png" alt="lmao" width={200} height={200} className="w-full h-50"/>

      <div className="p-4 h-full w-full space-x-2 space-y-10">
        <div className="text-center text-7xl">Get started!</div>
        <div className="text-center text-5xl italic opacity-50">I am...</div>
        <div className="justify-center w-full flex">
          <a className="btn text-5xl p-4 h-auto btn-outline mr-20 btn-success ">QUEST Insured</a>
          <a className="btn text-5xl p-4 h-auto btn-outline btn-error">Not Insured</a>
        </div>
        <div className="text-center text-7xl">About us</div>
        <div className="text-center">medicare</div>
      </div>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        {/* copyright */}
        <aside>
          <p>© 2023 <a href="https://www.mililanihs.org/" className="link">Mililani High School.</a> All Rights Reserved.</p>
        </aside>
      </footer>
    </>
  );
} 