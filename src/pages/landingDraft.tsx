import { useState } from "react";
import Link from "next/link";

export default function searchPage() {

    const [price, setPrice] = useState("");

    return (
        <>
            <div className="overflow-x-hidden">
                {/* <div className="bg-slate-800 w-screen h-screen absolute flex items-center justify-center">
                <div className="bg-slate-100 w-11/12 h-5/6 rounded-3xl shadow-md shadow-red-500 p-5">
                    <div className="text-center text-xl">Heal thy Care</div>
                    <div className="text-lg">Maximum affordable price</div>
                    
                    <input id="price" type="range" className="mr-4" step={10} min={0} max={1000} onInput={e => e.target instanceof HTMLInputElement && setPrice(e.target.value)}/>
                    <label htmlFor="price">{!price.length ? "$500" : price === "0" ? "Free" : price === "1000" ? ">$1000" : ('$' + price)}</label>


                </div>
            </div> */}
                {/* Nav bar */}
                <div className="sticky top-0 w-screen h-24 flex flex-row text-black bg-white border-gray-500 border-b overflox-x-hidden scrollbar-hide">
                    <div className="flex flex-row w-4/12 font-bold">
                        <img className="h-12 my-auto mx-6" src="https://upload.wikimedia.org/wikipedia/en/b/bf/Tyler_Technologies_logo.svg"></img>
                        <a href="landing" className="w-20 h-16 bg-black text-white inline-flex items-center justify-center rounded-md my-auto mx-6 hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-9 h-9">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </a>
                        <a href="" className="w-20 h-12 bg-black text-white inline-flex items-center justify-center rounded-md my-auto mx-6 hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex flex-row w-4/12 text-xl items-center justify-center">
                        <h1 className="font-semibold font-mono">Tyler Healthcare Hawaii</h1>
                    </div>
                    <div className="flex flex-row w-4/12 justify-end">
                        <a target="_blank" href="https://medquest.hawaii.gov/en/faq.html" className="h-12 w-28 border border-gray-500 text-black flex items-center justify-center text-center my-auto mx-3 rounded-md hover:bg-gray-200">Med-QUEST Eligibility</a>
                        <a href="" className="h-12 w-28 border border-gray-500 bg-white text-black flex items-center justify-center my-auto mx-6 mr-10 rounded-md hover:bg-gray-200 px-6 text-center">Leave a Review</a>
                    </div>
                </div>
                <div className="h-96 overscroll-none overflow-hidden">
                    <div className="absolute left-1/2 mt-12">
                        <h1 className="font-bold font-mono text-6xl relative -left-1/2 text-center drop-shadow-lg text-black">Tyler Healthcare Hawaii</h1>
                    </div>
                    <img className="w-screen -mt-80" src="https://c8.alamy.com/comp/D0DCNJ/white-peak-mountains-D0DCNJ.jpg"></img>
                </div>
                <div>
                    <h1 className="p-5 text-3xl text-center mt-5">About this website</h1>
                    <p className="text-lg mx-16 mb-3 indent-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet massa vitae tortor condimentum. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Id ornare arcu odio ut sem nulla pharetra diam sit. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. At varius vel pharetra vel turpis nunc eget lorem. Et tortor at risus viverra adipiscing at in tellus integer. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Cras pulvinar mattis nunc sed blandit libero. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Molestie a iaculis at erat pellentesque. Massa enim nec dui nunc mattis enim ut tellus. Tortor id aliquet lectus proin nibh nisl condimentum. Sit amet tellus cras adipiscing. Ultrices gravida dictum fusce ut placerat orci. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sed tempus urna et pharetra pharetra massa massa ultricies.
                    </p>
                    <p className="text-lg mx-16 my-3 indent-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet massa vitae tortor condimentum. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Id ornare arcu odio ut sem nulla pharetra diam sit. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. At varius vel pharetra vel turpis nunc eget lorem. Et tortor at risus viverra adipiscing at in tellus integer. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Cras pulvinar mattis nunc sed blandit libero. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Molestie a iaculis at erat pellentesque. Massa enim nec dui nunc mattis enim ut tellus. Tortor id aliquet lectus proin nibh nisl condimentum. Sit amet tellus cras adipiscing. Ultrices gravida dictum fusce ut placerat orci. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sed tempus urna et pharetra pharetra massa massa ultricies.
                    </p>
                    <p className="text-lg mx-16 my-3 indent-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet massa vitae tortor condimentum. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Id ornare arcu odio ut sem nulla pharetra diam sit. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. At varius vel pharetra vel turpis nunc eget lorem. Et tortor at risus viverra adipiscing at in tellus integer. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Cras pulvinar mattis nunc sed blandit libero. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Molestie a iaculis at erat pellentesque. Massa enim nec dui nunc mattis enim ut tellus. Tortor id aliquet lectus proin nibh nisl condimentum. Sit amet tellus cras adipiscing. Ultrices gravida dictum fusce ut placerat orci. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sed tempus urna et pharetra pharetra massa massa ultricies.
                    </p>
                    <p className="text-lg mx-16 my-3 mb-7 indent-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet massa vitae tortor condimentum. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Id ornare arcu odio ut sem nulla pharetra diam sit. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. At varius vel pharetra vel turpis nunc eget lorem. Et tortor at risus viverra adipiscing at in tellus integer. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Cras pulvinar mattis nunc sed blandit libero. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Molestie a iaculis at erat pellentesque. Massa enim nec dui nunc mattis enim ut tellus. Tortor id aliquet lectus proin nibh nisl condimentum. Sit amet tellus cras adipiscing. Ultrices gravida dictum fusce ut placerat orci. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sed tempus urna et pharetra pharetra massa massa ultricies.
                    </p>
                </div>
                <div>
                    <h1 className="p-5 text-3xl text-center mt-5">What is Med-QUEST</h1>
                    <p className="text-lg mx-16 mb-3 indent-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet massa vitae tortor condimentum. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Id ornare arcu odio ut sem nulla pharetra diam sit. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. At varius vel pharetra vel turpis nunc eget lorem. Et tortor at risus viverra adipiscing at in tellus integer. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Cras pulvinar mattis nunc sed blandit libero. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Molestie a iaculis at erat pellentesque. Massa enim nec dui nunc mattis enim ut tellus. Tortor id aliquet lectus proin nibh nisl condimentum. Sit amet tellus cras adipiscing. Ultrices gravida dictum fusce ut placerat orci. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sed tempus urna et pharetra pharetra massa massa ultricies.
                    </p>
                    <p className="text-lg mx-16 my-3 indent-16">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Amet massa vitae tortor condimentum. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Id ornare arcu odio ut sem nulla pharetra diam sit. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. At varius vel pharetra vel turpis nunc eget lorem. Et tortor at risus viverra adipiscing at in tellus integer. Pretium nibh ipsum consequat nisl vel pretium lectus quam. Cras pulvinar mattis nunc sed blandit libero. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Molestie a iaculis at erat pellentesque. Massa enim nec dui nunc mattis enim ut tellus. Tortor id aliquet lectus proin nibh nisl condimentum. Sit amet tellus cras adipiscing. Ultrices gravida dictum fusce ut placerat orci. Curabitur vitae nunc sed velit dignissim sodales ut eu sem. Sed tempus urna et pharetra pharetra massa massa ultricies.
                    </p>
                </div>
                <div className="bg-white">
                    <h1 className="p-5 text-3xl text-center">Get started!</h1>
                    <div className=" flex flex-row justify-center">
                        <a href="" className="mx-9 w-48 h-28 flex rounded-md text-center justify-center items-center bg-green-500 hover:bg-green-400 border-4 border-green-600 text-xl p-5 text-black font-semibold">I have QUEST insurace</a>
                        <a href="" className="mx-9 w-48 h-28 flex rounded-md text-center justify-center items-center bg-green-500 hover:bg-green-400 border-4 border-green-600 text-xl p-5 text-black font-semibold">I do not have insurance</a>
                    </div>
                </div>
            </div>
        </>
    );
}