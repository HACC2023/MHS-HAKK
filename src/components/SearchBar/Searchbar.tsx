import classNames from "classnames";
import React, { memo, useRef, useState } from "react";
import type { IDToMeta } from "~/server/api/routers/HealthcareRouter";
import { LoadingSpinner } from "../Loading";
import { useRouter } from "next/router";

type Props = {
    items: (IDToMeta | undefined);
    value: (string);
    isLoading: (boolean);
    onChange: (val: string) => void;
};

//we are using dropdown, input and menu component from daisyui
const Autocomplete = (props: Props) => {

    const router = useRouter();
    const { items, value, isLoading, onChange } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <div
            // use classnames here to easily toggle dropdown open 
            className={classNames({
                "dropdown w-full": true,
                "dropdown-open": open
            })}
            ref={ref}
        >
            <input
                type="text"
                className="input input-bordered h-12 w-full text-lg rounded-r-none"
                value={value}
                onKeyUp={(e) => e.key === "Enter" && router.push("/Search?q=" + value, undefined, { shallow: true })}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search Location..."
                tabIndex={0}
            />
            {/* add this part */}
            <div className="w-full dropdown-content bg-gray-100 top-14 max-h-96 overflow-auto flex-col rounded-md border">
                <ul
                    className="menu menu-compact"

                >
                    {items?.length ? items.flatMap((center, index) => {
                        return center.names.map((name, nIndex) => (
                            <li 
                                key={index + 'b' + nIndex}
                                tabIndex={index + 1}
                                onClick={() => {
                                    onChange(name);
                                    setOpen(false);
                                }}
                                className="border-b border-b-base-content/10 last:border-b-0 py-2 first:pt-0 last:pb-0 break-words"
                            >
                                <a className="flex flex-wrap">
                                    {name}<div className="w-full"/>
                                    <div className="text-sm italic">{center.address}</div>
                                </a>
                            </li>
                        ))
                    }) : isLoading ? <div className="ml-auto mr-auto overflow-hidden my-2"><LoadingSpinner/></div> : "No clinics found."}
                </ul>
                {/* add this part */}
            </div>
        </div>
    );
};

export default memo(Autocomplete);