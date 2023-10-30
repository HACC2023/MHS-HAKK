import Image from "next/image";

export default function getNavBar():React.JSX.Element {
    return (
        <div className="navbar bg-base-200">
            <div className="navbar-start space-x-2">
                {/* search */}
                <Image src="/bestlogo.png" width={40} height={440} alt="Bruh"/>
                <a className="btn btn-outline">Home</a>
                <a className="btn btn-outline btn-success">Search</a>
            </div>
            <div className="navbar-end space-x-2">
                {/* link */}
                <a className="btn btn-outline">Am I eligible for medquest?</a>
                <a className="btn btn-outline">Write a review (returning user)</a>
                <a className="btn btn-ghost normal-case text-xl" href="https://github.com/jhung-mililani/MHSHAKK">MHS-HAKK</a>
            </div>
        </div>
    )
}