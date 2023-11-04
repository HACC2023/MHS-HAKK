import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar sticky flex flex-row top-0 h-28 border-b-2 font-tyler bg-white">
                <div className="w-1/6 pl-60">
                    <a href="" className="btn btn-ghost my-auto h-16">
                        <img className="h-12" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"></img>
                    </a>
                </div>
                <div className="w-4/6 justify-center join">
                    <div className="w-2/5">
                        <input className="w-full h-14 input input-bordered join-item text-xl " placeholder="Search Locations" />
                    </div>
                    <div className="w-1/4">
                        <select className="select select-bordered join-item w-full h-14 text-xl ">
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
                    <a href="" className="btn btn-ghost h-14 text-lg ">Review a Clinic</a>
                </div>
            </div>
  );
}
