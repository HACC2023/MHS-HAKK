import Image from "next/image";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import islandImage from "~/assets/images/index-image-island.jpg"
import Link from "next/link";
import Head from "next/head";

export default function searchPage() {
    return (
        <>
            <Head>
                <title>Welcome! - HelpCare</title>
            </Head>
            <Navbar />
            <div className="font-tyler">
                <div className="bg-dark-blue py-16 text-center lg:text-left
                2xl:px-60 xl:px-40 lg:px-20 px-10">
                    <h1 className="text-white text-6xl font-bold">Tyler Healthcare Hawaii</h1>
                    <p className="text-white text-3xl mt-6 font-semi-bold">Healthcare clinic finder for the uninsured and underinsured</p>
                    <Link shallow={true} href="/Search" className="normal-case mt-6 btn w-40 h-14 text-xl bg-light-green hover:bg-hover-green text-green-gray border-0">Start Now</Link>
                </div>

                <div className="flex flex-co mb-10 pt-14 ">
                    <div className="xl:w-1/2 lg:pr-24 justify-center
                    2xl:pl-60 lg:px-40 md:px-20 px-10
                    2xl:pr-24 xl:pr-12">
                        <h1 className="text-4xl font-semibold text-center lg:text-left">Finding a Clinic</h1>
                        <p className="text-2xl font-semibold pt-4 text-dark-blue">1) Search by Clinic Name or Procedure Type</p>
                        <p className="text-xl font-medium pt-2 pl-10">Use the search bar above and enter a clinic name or the type of procedure</p>
                        <p className="text-2xl font-semibold pt-4 text-dark-blue">2) Check Information</p>
                        <p className="text-xl font-medium pt-2 pl-10">Review the list of clinics and their information</p>
                        <p className="text-2xl font-semibold pt-4 text-dark-blue">3) Contact Clinic</p>
                        <p className="text-xl font-medium pt-2 pl-10">Use the listed information to learn more about the clinic and to contact them directly</p>

                        <h1 className="text-4xl  font-semibold pt-8 text-center md:text-left">What is Med-QUEST?</h1>
                        <p className="text-xl  font-medium pt-4">Med-QUEST is a government health insurance plan for the uninsured. QUEST covers a wide variety of healthcare services. Check if you qualify:</p>
                        <div className="flex justify-center">
                            <a className="normal-case btn text-lg font-semibold mt-6 h-14 bg-light-green hover:bg-hover-green text-green-gray border-0"
                                target="_blank" href="https://medquest.hawaii.gov/en/contact-us.html">Med-QUEST Eligibility</a>
                        </div>
                    </div>
                    <div className="hidden xl:block w-1/2">
                        {/* use sizes to decrease loading times for LCP image */}
                        <Image
                            className="h-full w-3/4 object-cover"
                            loading="eager"
                            sizes="(min-width: 1280px) 75vw (max-width: 1279px) 0vw"
                            alt="Image of Hawaii"
                            src={islandImage}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}