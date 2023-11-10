import classNames from "classnames";
import Link from "next/link";
import React, { memo, useRef, useState } from "react";
import type { IDToMeta } from "~/server/api/routers/HealthcareRouter";

type Props = {
    items: (IDToMeta | undefined);
    value: (string | undefined);
    onChange: (val: string | undefined) => void;
};

//we are using dropdown, input and menu component from daisyui
const Autocomplete = (props: Props) => {
    const { items, value, onChange } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <div
            // use classnames here to easily toggle dropdown open 
            className={classNames({
                "dropdown w-full": true,
                "dropdown-open": open,
            })}
            ref={ref}
        >
            <input
                type="text"
                className="input input-bordered h-12 w-full text-lg rounded-r-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search Location..."
                tabIndex={0}
            />
            {/* add this part */}
            <div className="dropdown-content bg-gray-100 top-14 max-h-96 overflow-auto flex-col rounded-md border">
                <ul
                    className="menu menu-compact "
                    // use ref to calculate the width of parent
                    style={{ width: ref.current?.clientWidth }}
                >
                    {items && Object.keys(items).length ? Object.keys(items).map((id, index) => {
                        return items[id]!.names.map((name, nIndex) => (
                            <li 
                                key={id+nIndex}
                                tabIndex={index + 1}
                                onClick={() => {
                                    onChange(name);
                                    setOpen(false);
                                }}
                                className="border-b border-b-base-content/10
                                "
                            >
                                <Link href={"/location/" + id}>{name}<div className="text-right text-sm italic text-slate-600">{items[id]!.address}</div></Link>
                            </li>
                        ))
                    }) : "No clinics found."}
                </ul>
                {/* add this part */}
            </div>
        </div>
    );
};

export default memo(Autocomplete);