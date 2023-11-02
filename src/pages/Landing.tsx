import { useState } from "react";
import Link from "next/link";

export default function searchPage() {

    const [price, setPrice] = useState("");

    return (
        <>
            <div className="navbar sticky flex flex-row top-0 h-28 border-b bg-white">
                <div className="w-1/6">
                    <a href="landing" className="btn btn-ghost my-auto h-16 pl-60">
                        <img className="h-12" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"></img>
                    </a>
                </div>
                <div className="w-4/6 justify-center join">
                    <div className="w-2/5">
                        <input className="w-full h-14 input input-bordered join-item text-xl font-mono" placeholder="Search Locations" />
                    </div>
                    <div className="w-1/4">
                        <select className="select select-bordered join-item w-full h-14 text-xl font-mono">
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
                <div className="w-1/6 justify-end pr-60">
                    <a href="" className="btn btn-ghost h-14 text-lg font-mono">Review a Clinic</a>
                </div>
            </div>
            <div className="h-80 w-full bg-blue-800 flex flex-row">
                <div className="ml-60 pt-16 w-2/3">
                    <h1 className="text-white text-6xl font-mono font-bold">Tyler Healthcare Hawaii</h1>
                    <p className="text-white text-3xl font-mono mt-6 font-semi-bold">Very small and short description of the website</p>
                    <a href="" className="mt-3 btn btn-success w-36 h-16 font-mono text-xl">Start now</a>
                </div>
                {/* <div className="flex justify-center items-center w-1/3">
                    <a href="" className="btn btn-success w-40 h-20 font-mono text-xl">Start now</a>
                </div> */}
            </div>
            <div className="flex flex-co">
                <div className="w-1/2 pl-60">
                    <h1 className="text-3xl font-mono font-semibold pt-8">About this site</h1>
                    <p className="text-xl font-mono font-medium pt-4">For those who are uninsured, it is difficult and confusing to find affordable healthcare options. So this site was developed in order to make the process of finding hospitals and clinics easy. In order to get started, click on the button if you have QUEST insurance or are not insured. If you are not sure, click on the “Check Eligibility” button</p>

                    <h1 className="text-3xl font-mono font-semibold pt-8">What is Med-QUEST?</h1>
                    {/* <p className="text-xl font-mono font-medium pt-4">Med-QUEST is a government health insurance plan for the uninsured. QUEST covers a wide variety of healthcare services, so check if you may qualify for these benefits by checking <a className="text-blue-500 underline" target="_blank" href="https://humanservices.hawaii.gov/mqd/quest-overview/">https://humanservices.hawaii.gov/mqd/quest-overview</a> or calling the Med-QUEST Call Center at <a href="tel:18006031201" className="text-green-600 font-semibold">1-800-603-1201</a>
                    <br className="mb-4"/>If you qualify and haven’t already applied you can submit an online application at <a className="text-blue-500 underline" target="_blank" href="https://medical.mybenefits.hawaii.gov/register.html">https://medical.mybenefits.hawaii.gov/register.html</a>
                    </p> */}
                    <p className="text-xl font-mono font-medium pt-4">Med-QUEST is a government health insurance plan for the uninsured. QUEST covers a wide variety of healthcare services, so check if you may qualify for these benefits by checking</p>
                    <a className="btn btn-success font-mono text-lg font-semibold mt-2" target="_blank"href="https://humanservices.hawaii.gov/mqd/quest-overview/">humanservices.hawaii.gov</a>
                    <p className="text-xl font-mono font-medium pt-4">or calling the Med-QUEST Call Center at</p>
                    <a className="btn btn-success font-mono text-lg font-semibold mt-2" href="tel:18006031201">1-800-603-1201</a>
                    <p className="text-xl font-mono font-medium pt-6">If you qualify and haven’t already applied you can submit an online application at</p>
                    <a className="btn btn-success font-mono text-lg font-semibold mt-2 mb-4" target="_blank"href="https://medical.mybenefits.hawaii.gov/register.html">mybenefits.hawaii.gov</a>
                </div>
                <div className="w-1/2 pr-60">
                    <img className="pl-5 pt-5" src="https://cdn.shopify.com/s/files/1/0155/9294/7760/files/Jurassic_Waters_1024x1024.jpg?v=1679440299"></img>
                </div>
            </div>
        </>
    );
}