import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar sticky top-0 flex h-20 flex-row border-b-2 bg-white">
      <div className="navbar-start">
        <Link href="/Landing" className="btn btn-ghost my-auto h-16 ml-60">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="tyler Hawaii logo"
            className="h-12"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"
          />
        </Link>
      </div>
      <div className="join navbar-center w-1/2 justify-center">
        <div className="w-2/5">
          <input
            className="input join-item input-bordered h-14 w-full text-xl"
            placeholder="Search Locations"
          />
        </div>
        <div className="w-1/4">
          <select className="select join-item select-bordered h-14 w-full text-xl">
            <option disabled selected>
              Procedures
            </option>
            <option>Ex1</option>
            <option>Ex2</option>
            <option>Ex3</option>
          </select>
        </div>
        <div className="indicator">
          <button className="btn btn-secondary join-item h-14 w-16 border-0 bg-med-blue text-white hover:bg-dark-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="navbar-end">
        <a target="_blank"href="https://www.tylertech.com/client-support" className="btn btn-ghost h-14 text-lg mr-60">
          Contact us
        </a>
      </div>
    </div>
  );
}
