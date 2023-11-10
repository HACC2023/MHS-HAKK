import Link from "next/link";
import { api } from "~/utils/api";
import SearchBarAutocomplete from "~/components/SearchBar/Autocomplete";


export default function Navbar() {

  const { data } = api.healthcare.getAllProcedureTypes.useQuery();

  return (
    <div className="navbar sticky top-0 flex h-20 flex-row border-b-2 bg-white">
      <div className="navbar-start">
        <Link href="/Landing" className="btn btn-ghost my-auto h-16 ml-30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="tyler Hawaii logo"
            className="h-12 hidden md:block"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"
          />
          <img
            alt="tyler Hawaii logo compact"
            className="h-12 block md:hidden"
            src="/Shrink_Tyler_Technologies_logo.svg.png"
          />
        </Link>
      </div>
      <div className="join w-21 sm:w-1/2 justify-center hidden md:flex navbar-center">
        <div className="w-2/5">
          <SearchBarAutocomplete />
        </div>
        <div className="w-1/4">
          <select className="select join-item select-bordered h-10 w-full text-lg" defaultValue={"Procedures"}>
            <option disabled>Procedures</option>
            {data?.map(proType => (<option key={Math.random()}>{proType.name}</option>))}
          </select>
        </div>
        <div className="indicator">
          <button className="btn btn-secondary join-item h-10 w-12 border-0 bg-med-blue text-white hover:bg-dark-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="navbar-end">
        {/* <a target="_blank"href="https://www.tylertech.com/client-support" className="btn btn-ghost h-14 text-lg mr-60">
          Contact us
        </a> */}
      </div>
    </div>
  );
}
