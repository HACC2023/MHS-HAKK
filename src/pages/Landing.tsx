import { useState } from "react";
import Link from "next/link";

export default function searchPage() {

    const [price, setPrice] = useState("");

    return (
        <>
            <div className="navbar sticky flex flex-row top-0 h-28 border-b-2  bg-white">
                <div className="w-1/6">
                    <a href="landing" className="btn btn-ghost my-auto h-16 pl-60">
                        <img className="h-12" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"></img>
                    </a>
                </div>
                <div className="w-4/6 justify-center join">
                    <div className="w-2/5">
                        <input className="w-full h-14 input input-bordered join-item text-xl font-tyler" placeholder="Search Locations" />
                    </div>
                    <div className="w-1/4">
                        <select className="select select-bordered join-item w-full h-14 text-xl font-tyler">
                            <option disabled selected>Procedures</option>
                            <option>Ex1</option>
                            <option>Ex2</option>
                            <option>Ex3</option>
                        </select>
                    </div>
                    <div className="indicator">
                        <button className="btn btn-secondary border-0 bg-med-blue hover:bg-dark-blue text-white join-item w-16 h-14">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-1/6 justify-end pr-60">
                    <a href="" className="btn btn-ghost h-14 text-lg font-tyler">Review a Clinic</a>
                </div>
            </div>
            <div className="h-80 w-full bg-dark-blue flex flex-row">
                <div className="ml-60 pt-16 w-2/3">
                    <h1 className="text-white text-6xl font-tyler font-bold">Tyler Healthcare Hawaii</h1>
                    <p className="text-white text-3xl font-tyler mt-6 font-semi-bold">Healthcare clinic finder for the uninsured and underinsured</p>
                    <a href="" className="mt-3 btn w-36 h-16 font-tyler text-xl bg-light-green hover:bg-hover-green text-green-gray border-0 ">Start now</a>
                </div>
            </div>
            <div className="flex flex-co mb-10 pt-14 ">
                <div className="w-1/2 pl-60 pr-24">
                    <h1 className="text-3xl font-tyler font-semibold">Finding a Clinic:</h1>
                    <p className="text-2xl font-tyler font-semibold pt-4 text-dark-blue">1) Search by Clinic Name or Procedure Type</p>
                    <p className="text-xl font-tyler font-medium pt-2 pl-10">Use the search bar above and enter a clinic name or the type of procedure</p>
                    <p className="text-2xl font-tyler font-semibold pt-4 text-dark-blue">2) Check Information</p>
                    <p className="text-xl font-tyler font-medium pt-2 pl-10">Review the list of the clinics their information.</p>
                    <p className="text-2xl font-tyler font-semibold pt-4 text-dark-blue">3) Contact Clinic</p>
                    <p className="text-xl font-tyler font-medium pt-2 pl-10">Use the listed information to learn more about the clinic and to contact them directly.</p>

                    <h1 className="text-3xl font-tyler font-semibold pt-8">What is Med-QUEST?</h1>
                    <p className="text-xl font-tyler font-medium pt-4">Med-QUEST is a government health insurance plan for the uninsured. QUEST covers a wide variety of healthcare services, so check if you may qualify for these benefits by checking</p>
                    <div className="flex justify-center">
                        <a className="btn font-tyler text-lg font-semibold mt-2 h-16 bg-light-green hover:bg-hover-green text-green-gray border-0" target="_blank" href="https://humanservices.hawaii.gov/mqd/quest-overview/">Med-QUEST eligibilty</a>
                    </div>
                </div>
                <div className="w-1/2">
                    <img className="h-full w-3/4 object-cover" src="https://cdn.shopify.com/s/files/1/0155/9294/7760/files/Jurassic_Waters_1024x1024.jpg?v=1679440299"></img>
                </div>
            </div>
        </>
    );
}