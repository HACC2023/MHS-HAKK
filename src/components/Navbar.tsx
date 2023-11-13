import Link from "next/link";
import { useState } from "react";
import SearchBarAutocomplete from "~/components/SearchBar/Autocomplete";

export default function Navbar() {

  // this state is used for autocomplete.
  const [input, setInput] = useState("");

  return (
    <div className="navbar top-0 flex h-20 flex-row border-b-2 bg-white">
      {/* untested on mobile ^ got rid of sticky because leaflet map on search hid the search results from the dropdown in here. navbar will not stay at the top, PLEASE FIX SOMEONE!! */}
      <div className="navbar-start w-fit sm:w-1/2 mr-5 sm:mr-0">
        <Link href="/Landing" className="btn btn-ghost my-auto h-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="tyler Hawaii logo"
            className="hidden h-12 sm:block"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Tyler_Technologies_logo.svg/640px-Tyler_Technologies_logo.svg.png"
          />
          <img
            alt="tyler Hawaii logo compact"
            className="block h-12 sm:hidden"
            src="/Shrink_Tyler_Technologies_logo.svg.png"
          />
        </Link>
      </div>
      <div className="join navbar-end flex w-full md:w-1/2 md:navbar-center ml-auto md:ml-0 z-[9999] mr-1 md:mr-0">
        <div className="w-full">
          <SearchBarAutocomplete input={input} setInput={setInput} />
        </div>
        <div className="indicator">

          {/* shallow makes it so if the user types in another clinic, it wont wipe the filters they set (update the path of the current page without rerunning stuff) */}
          <Link 
          href={{pathname: "/Search", query: { q: input }}}
          shallow={true}
          className="btn btn-secondary join-item h-10 w-12 border-0 bg-med-blue text-white hover:bg-dark-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>
        </div>
      </div>
      {/* do we still need or want this? */}
      <div className="navbar-end hidden md:flex">
        {/* <a target="_blank"href="https://www.tylertech.com/client-support" className="btn btn-ghost h-14 text-lg mr-60">
          Contact us
        </a> */}
      </div>
    </div>
  );
}