import Link from "next/link";
import Navbar from "~/components/Navbar";

export default function NotFoundPage() {
    return (
        <div className="overflow-hidden h-screen">
            <Navbar />
            <div className="h-[calc(100%-5rem)] w-screen bg-lime-600 flex">
                <div className="text-center m-auto">
                    <h1 className="text-white text-6xl font-bold pb-3">Page not found</h1>
                    <Link href="/" className="text-white underline">Go home</Link>
                </div>
            </div>
        </div>
    )
}