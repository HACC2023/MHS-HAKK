import Link from "next/link";
import Navbar from "~/components/Navbar";

export default function NotFoundPage() {
    return (
        <div className="overflow-hidden h-screen">
            <Navbar />
            <div className="h-[calc(100%-5rem)] w-screen bg-dark-blue">
                <div className="text-center h-full pt-16">
                    <h1 className="text-white text-6xl font-bold">Not found, go <Link href="/" className="underline">home</Link> bro</h1>
                </div>
            </div>
        </div>
    )
}