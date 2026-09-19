"use client";

import { cn } from "@/lib/utils/cn";
import React, { useEffect, useRef, useState } from "react";
import { TechnologyCard, type TechnologyItem } from "./TechnologyCard";

const SPEED_PX_PER_SEC = {
    fast: 400,
    normal: 140,
    slow: 70,
} as const;

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: TechnologyItem[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLUListElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const track = trackRef.current;
        if (!scroller || !track) return;

        const applyMetrics = () => {
            const distance = track.offsetWidth;
            if (!distance) return;

            scroller.style.setProperty("--scroll-distance", `${distance}px`);
            scroller.style.setProperty(
                "--animation-duration",
                `${distance / SPEED_PX_PER_SEC[speed]}s`,
            );
            scroller.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse",
            );
            setReady(true);
        };

        applyMetrics();

        // Track width is content-sized, so this only fires on zoom / content
        // changes — not every window resize — and never grows the DOM.
        const observer = new ResizeObserver(applyMetrics);
        observer.observe(track);
        return () => observer.disconnect();
    }, [items, direction, speed]);

    const renderTrack = (copy: "a" | "b") => (
        <ul
            ref={copy === "a" ? trackRef : undefined}
            className="m-0 flex shrink-0 list-none gap-4 p-0 pr-4"
        >
            {items.map((item) => (
                <TechnologyCard key={`${copy}-${item.name}`} item={item} />
            ))}
        </ul>
    );

    return (
        <div
            className={cn(
                "relative z-20 w-full overflow-x-clip overflow-y-visible",
                className,
            )}
        >
            <div
                ref={scrollerRef}
                className={cn(
                    "flex w-max will-change-transform",
                    ready && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {renderTrack("a")}
                {renderTrack("b")}
            </div>
        </div>
    );
};
