import { useState } from "react";
import Link from "next/link";

export default function searchPage() {

    const [price, setPrice] = useState("");

    return (
        <>
            {/* <div className="bg-slate-800 w-screen h-screen absolute flex items-center justify-center">
                <div className="bg-slate-100 w-11/12 h-5/6 rounded-3xl shadow-md shadow-red-500 p-5">
                    <div className="text-center text-xl">Heal thy Care</div>
                    <div className="text-lg">Maximum affordable price</div>
                    
                    <input id="price" type="range" className="mr-4" step={10} min={0} max={1000} onInput={e => e.target instanceof HTMLInputElement && setPrice(e.target.value)}/>
                    <label htmlFor="price">{!price.length ? "$500" : price === "0" ? "Free" : price === "1000" ? ">$1000" : ('$' + price)}</label>


                </div>
            </div> */}
            {/* Nav bar */}
            <div className="sticky top-0 w-screen h-16 m-0 flex flex-row bg-gray-500 text-white ">
                <a href="Landing" className="h-12 w-24 bg-black text-white flex items-center justify-center my-auto mx-3 rounded-md hover:bg-gray-800">Home</a>
                <a href="Categories" className="h-12 w-24 bg-black text-white flex items-center justify-center my-auto mx-3 rounded-md hover:bg-gray-800">Categories</a>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  />
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
            </div>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
            <h1>a</h1>
        </>
    );
}