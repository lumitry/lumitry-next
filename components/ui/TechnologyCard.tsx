"use client";

import React from "react";
import Image from "next/image";

export function TechnologyCard({
    key,
    item,
}: {
    key: number;
    item: {
        image: string; // path
        name: string;
        onClick: () => void;
        // TODO: implement the popup, also show the confidence value somewhere on the card
    };
}) {
    return (
        <li
            className="technology-card relative w-[150px] max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 px-8 py-6 md:w-[150px]"
            style={{
                background:
                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={key}
            // onClick={item.onClick}
        >
            <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
            ></div>
            {/* <div className="flex flex-col justify-between"> */}
            <Image src={item.image} alt={item.name} width={100} height={100} />
            <h3 className="max-w-xs !pb-2 !pt-4 text-center text-base font-bold text-slate-100">
                {item.name}
            </h3>
            {/* </div> */}
        </li>
    );
}
