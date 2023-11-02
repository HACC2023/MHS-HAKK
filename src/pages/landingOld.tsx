import { useState } from "react";
import Link from "next/link";

export default function searchPage() {

    const [price, setPrice] = useState("");

    return (
        <>
            <div className="navbar sticky flex flex-row top-0 h-28 border-b bg-white">
                <div className="w-1/6 pl-5">
                    <a href="landing" className="btn btn-ghost my-auto h-14">
                        <img className="h-10" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"></img>
                    </a>
                </div>
                <div className="w-4/6 justify-center join">
                    <div className="w-2/5">
                        <input className="w-full h-14 input input-bordered join-item text-xl" placeholder="Search Locations" />
                    </div>
                    <div className="w-1/4">
                        <select className="select select-bordered join-item w-full h-14 text-xl">
                            <option disabled selected>Procedures</option>
                            <option>Ex1</option>
                            <option>Ex2</option>
                            <option>Ex3</option>
                        </select>
                    </div>
                    <div className="indicator">
                        <button className="btn btn-secondary border-0 bg-red-600 hover:bg-red-500 text-white join-item w-16 h-14">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-1/6 justify-end pr-5">
                    <a href="" className="btn btn-ghost h-14 text-lg">Review a Clinic</a>
                </div>
            </div>
            <div>
                <h1 className="text-center text-7xl my-5">Tyler Healthcare Hawaii</h1>
                <div className="flex justify-center">
                    <a href="" className="text-green-500 text-5xl underline">Get started!</a>
                </div>
                <div className="flex justify-center my-5">
                    <div className="collapse static w-2/3">
                        <input type="checkbox" />
                        <div className="collapse-title text-3xl font-medium static text-center ml-4">What is Med-QUEST?</div>
                        <div className="collapse-content text-center text-2xl">
                            <p>
                                Med-QUEST is a government health insurance plan for the uninsured. QUEST covers a wide variety of healthcare services, so check if you may qualify for these benefits by checking
                                <a target="_blank" className="text-blue-500 underline" href="https://humanservices.hawaii.gov/mqd/quest-overview/"> https://humanservices.hawaii.gov/mqd/quest-overview/ </a>

                                <br className="mb-5" />Or you can call the Med-QUEST Call Center at 1-800-603-1201

                                <br className="mb-5" />If you qualify and haven’t already apply you can submit an online application at
                                <a target="_blank" className="text-blue-500 underline" href="https://medical.mybenefits.hawaii.gov/register.html"> https://medical.mybenefits.hawaii.gov/register.html </a></p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center my-5">
                    <div className="collapse static w-2/3">
                        <input type="checkbox" />
                        <div className="collapse-title text-3xl font-medium static text-center ml-4">About this Site</div>
                        <div className="collapse-content text-center text-2xl">
                            <p>
                                For those who are uninsured, it is difficult and confusing to find affordable healthcare options. So this site was developed in order to make the process of finding hospitals and clinics easy. In order to get started, click on the button if you have QUEST insurance or are not insured. If you are not sure, click on the “Check Eligibility” button</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}