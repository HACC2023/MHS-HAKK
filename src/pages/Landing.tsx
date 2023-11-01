import { useState } from "react";
import Link from "next/link";

export default function searchPage() {

    const [price, setPrice] = useState("");

    return (
        <>
            <div className="navbar sticky flex flex-row top-0 h-20 bg-gray-200">
                <div className="w-3/12">
                    <a href="landing" className="btn btn-ghost h-14 my-auto mx-3">
                        <img className="h-10" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"></img>
                    </a>
                    <a href="search" className="btn btn-ghost h-14 my-auto mx-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                        </svg>
                    </a>
                </div>
                <div className="w-1/2 justify-center join">
                    <div>
                        <input className="w-96 input input-bordered join-item" placeholder="Search" />
                    </div>
                    <select className="select select-bordered join-item">
                        <option disabled selected>Filter</option>
                        <option>Ex1</option>
                        <option>Ex2</option>
                        <option>Ex3</option>
                    </select>
                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary">new</span>
                        <button className="btn join-item">Search</button>
                    </div>
                </div>
                <div className="w-3/12 justify-end mx-3">
                    <a href="" className="btn btn-ghost h-14">Review a Clinic</a>
                </div>
            </div>
            <div>
                <h1 className="text-9xl">1</h1>
                <h1 className="text-9xl">2</h1>
                <h1 className="text-9xl">3</h1>
                <h1 className="text-9xl">4</h1>
                <h1 className="text-9xl">5</h1>
                <h1 className="text-9xl">6</h1>
                <h1 className="text-9xl">7</h1>
                <h1 className="text-9xl">8</h1>
                <h1 className="text-9xl">9</h1>
                <h1 className="text-9xl">10</h1>
                <h1 className="text-9xl">11</h1>
                <h1 className="text-9xl">12</h1>
                <h1 className="text-9xl">13</h1>
                <h1 className="text-9xl">14</h1>
                <h1 className="text-9xl">15</h1>
            </div>
        </>
    );
}