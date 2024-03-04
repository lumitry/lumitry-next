"use client"; // todo can i remove this? like let this render on the server?

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useState } from "react";
import { TechnologyCard } from "./TechnologyCard";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        image: string; // src
        name: string;
        confidence: number;
        description: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const itemsRef = React.useRef(items);

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            itemsRef.current.push(...items);

            // remove items if the array gets too long (the easiest hack i could think of to prevent memory leaks)
            // this is still a memory leak, but it's a slow one at least...
            if (itemsRef.current.length > 1000) {
                itemsRef.current = itemsRef.current.slice(0, 150);
            }

            getDirection();
            getSpeed();
            setStart(true);
        }
    }, [items]);
    const [start, setStart] = useState(false);

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards",
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse",
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s",
                );
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "50s",
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "80s",
                );
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "relative  z-20 h-96 max-h-96 max-w-7xl",
                "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className,
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {items.map((item, idx) => (
                    <TechnologyCard key={idx} item={item} />
                ))}
            </ul>
        </div>
    );
};
