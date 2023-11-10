// import { useState } from "react";
// import SearchBarAutocomplete from "~/components/SearchBar/AutoComplete";
import Image  from "next/image";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import islandImage from "~/assets/img/index-image-island.jpg"

export default function searchPage() {
    return (
        <>
            <Navbar />
            <div>
                {/* <SearchBarAutocomplete /> */}
            </div>
            <div className="font-tyler">
                <div className="h-80 w-full bg-dark-blue flex flex-row font-tyler">
                    <div className="ml-60 pt-16 w-2/3">
                        <h1 className="text-white text-6xl font-bold">Tyler Healthcare Hawaii</h1>
                        <p className="text-white text-3xl mt-6 font-semi-bold">Healthcare clinic finder for the uninsured and underinsured</p>
                        <a href="Search" className="normal-case mt-6 btn w-40 h-14 text-xl bg-light-green hover:bg-hover-green text-green-gray border-0 ">Start Now</a>
                    </div>
                </div>
                <div className="flex flex-co mb-10 pt-14 ">
                    <div className="w-1/2 pl-60 pr-24">
                        <h1 className="text-3xl  font-semibold">Finding a Clinic</h1>
                        <p className="text-2xl  font-semibold pt-4 text-dark-blue">1) Search by Clinic Name or Procedure Type</p>
                        <p className="text-xl  font-medium pt-2 pl-10">Use the search bar above and enter a clinic name or the type of procedure</p>
                        <p className="text-2xl  font-semibold pt-4 text-dark-blue">2) Check Information</p>
                        <p className="text-xl  font-medium pt-2 pl-10">Review the list of the clinics and their information</p>
                        <p className="text-2xl  font-semibold pt-4 text-dark-blue">3) Contact Clinic</p>
                        <p className="text-xl  font-medium pt-2 pl-10">Use the listed information to learn more about the clinic and to contact them directly</p>

                        <h1 className="text-3xl  font-semibold pt-8">What is Med-QUEST?</h1>
                        <p className="text-xl  font-medium pt-4">Med-QUEST is a government health insurance plan for the uninsured. QUEST covers a wide variety of healthcare services, so check if you may qualify for these benefits by checking</p>
                        <div className="flex justify-center">
                            <a className="normal-case btn  text-lg font-semibold mt-6 h-14 bg-light-green hover:bg-hover-green text-green-gray border-0" target="_blank" href="https://medquest.hawaii.gov/en/contact-us.html">Med-QUEST Eligibilty</a>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <Image className="h-full w-3/4 object-cover" loading="eager" width={1280} height={720} alt="Image of Hawaii" src={islandImage}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}