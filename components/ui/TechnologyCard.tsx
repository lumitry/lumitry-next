// "use client";

import React, { useState } from "react";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card"; // Adjust the import path as needed
import Image from "next/image";

export function TechnologyCard({
    // key,
    item,
}: {
    // key: number;
    item: {
        image: string; // src
        name: string;
        confidence: number;
        description: string;
        // TODO: show the confidence value somewhere on the CARD (i.e. without clicking on it)
    };
}) {
    const [isHoverCardOpen, setIsHoverCardOpen] = useState(false);
    const handleClick = () => {
        // console.log("clicked");
        setIsHoverCardOpen(!isHoverCardOpen);
    };

    return (
        <div onClick={handleClick}>
            <li
                className="technology-card relative w-[150px] max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 px-8 py-6 hover:cursor-pointer md:w-[150px]"
                style={{
                    background:
                        "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                }}
                // key={key}
                // onClick={handleClick}
            >
                <div
                    aria-hidden="true"
                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                {/* <div className="flex flex-col justify-between"> */}
                <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                />
                <h3 className="max-w-xs !pb-2 !pt-4 text-center text-base font-bold text-slate-100">
                    {item.name}
                </h3>
                <HoverCard open={isHoverCardOpen}>
                    <HoverCardTrigger></HoverCardTrigger>
                    <HoverCardContent side="bottom" className="w-96">
                        <div>
                            <p>
                                <span className="font-bold">Confidence:</span>{" "}
                                {item.confidence}/5
                            </p>
                            <p>{item.description}</p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
                {/* </div> */}
            </li>
        </div>
    );
}
