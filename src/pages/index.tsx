import Head from "next/head";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>MHS HAKK</title>
        <meta name="description" content="created by the MHS HAKK team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar></Navbar>
      <Footer></Footer>
    </>
  );
} 