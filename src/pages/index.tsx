import Head from "next/head";

export default function Home() {


  return (
    <>
      <Head>
        <title>MHS HAKK</title>
        <meta name="description" content="created by the MHS HAKK team" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {/* menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Homepage</a></li>
              <li><a>Health Centers</a></li>
              <li><a>Insurance Price Calculator</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          {/* search */}
          <div className="join">
            <select className="select select-bordered join-item">
              <option disabled selected>Filter</option>
              <option>Federally Qualified Health Centers</option>
              <option>Rural Health Centers</option>
              <option>QUEST Providers</option>
            </select>
            <div>
              <div>
                <input className="input input-bordered join-item" placeholder="Search Provider" />
              </div>
            </div>
              <button className="btn btn-success btn-outline btn-circle join-item"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
          </div>
        </div>
        <div className="navbar-end">
          {/* link */}
          <a className="btn btn-ghost normal-case text-xl" href="https://github.com/jhung-mililani/MHSHAKK">MHS-HAKK</a>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        {/* copyright */}
        <aside>
          <p>© 2023 <a href="https://www.mililanihs.org/" className="link">Mililani High School.</a> All Rights Reserved.</p>
        </aside>
      </footer>
    </>
  );
} 