// "use client" // if errors happen, this might be the cause, i'm new to next

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useState, useRef } from "react";
import { TechnologyCard } from "./TechnologyCard";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        image: string;
        name: string;
        confidence: number;
        description: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [clonedItems, setClonedItems] = useState(items);
    const [started, setStarted] = useState(false);

    // pre-map speed → duration
    const speedMap = { fast: "20s", normal: "40s", slow: "80s" } as const;

    useEffect(() => {
        if (!containerRef.current || !scrollerRef.current) return;

        const calculateClones = () => {
            if (!containerRef.current || !scrollerRef.current) return;

            // measure how wide the container is vs one pass of your items
            const cw = containerRef.current.offsetWidth;
            const sw = scrollerRef.current.scrollWidth;

            // how many times do we need to repeat to cover at least one full scroll?
            const times = Math.ceil(cw / sw) + 1;

            // build that cloned array
            const buffer: typeof items = [];
            for (let i = 0; i < times; i++) {
                buffer.push(...items);
            }
            setClonedItems(buffer);

            // set CSS custom props once
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse",
            );
            containerRef.current.style.setProperty(
                "--animation-duration",
                speedMap[speed],
            );

            // kick off the animation
            setStarted(true);
        };

        calculateClones();
        window.addEventListener("resize", calculateClones);
        return () => window.removeEventListener("resize", calculateClones);
    }, [items, direction, speed]);

    return (
        <div
            ref={containerRef}
            className={cn("relative z-20 h-96 max-h-96 max-w-7xl", className)}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
                    started && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {clonedItems.map((item, idx) => (
                    <TechnologyCard key={idx} item={item} />
                ))}
            </ul>
        </div>
    );
};
