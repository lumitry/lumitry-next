"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X, ZoomIn } from "lucide-react";

export type ExperienceData = {
    name: string;
    image: string;
    description: string;
    link?: string;
    position?: string;
    dateStart?: Date;
    dateEnd?: Date;
};

export class Experience {
    name: string;
    image: string; // src
    // TODO: image gallery?
    description: string;
    link?: string;
    position?: string;
    dateStart?: Date;
    dateEnd?: Date;

    constructor({
        name,
        image,
        description,
        link,
        position,
        dateStart,
        dateEnd,
    }: ExperienceData) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.link = link;
        this.position = position;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }
}

function OptionalLink({
    href,
    children,
    className,
}: {
    href?: string;
    children: React.ReactNode;
    className?: string;
}) {
    if (!href) {
        return children;
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={className}
        >
            {children}
        </a>
    );
}

function formatDateRange(start?: Date, end?: Date) {
    if (!start && !end) {
        return null;
    }

    const startLabel = start?.toLocaleDateString();
    const endLabel = end?.toLocaleDateString() ?? (start ? "Present" : undefined);

    if (startLabel && endLabel) {
        return `${startLabel} - ${endLabel}`;
    }

    return startLabel ?? endLabel ?? null;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 8;
const ZOOM_INTENSITY = 0.00175;

function ImageLightbox({
    src,
    alt,
    open,
    onClose,
}: {
    src: string;
    alt: string;
    open: boolean;
    onClose: () => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const transformRef = useRef({ scale: 1, x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    const applyTransform = useCallback(() => {
        const image = imageRef.current;
        if (!image) {
            return;
        }

        const { scale, x, y } = transformRef.current;
        image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }, []);

    const resetTransform = useCallback(() => {
        transformRef.current = { scale: 1, x: 0, y: 0 };
        applyTransform();
    }, [applyTransform]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) {
            return;
        }

        resetTransform();

        const previouslyFocused = document.activeElement as HTMLElement | null;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
            if (event.key === "Tab") {
                event.preventDefault();
                closeRef.current?.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus();
        };
    }, [open, onClose, resetTransform]);

    useEffect(() => {
        if (!mounted || !open) {
            return;
        }

        const stage = stageRef.current;
        if (!stage) {
            return;
        }

        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            event.stopPropagation();

            const rect = stage.getBoundingClientRect();
            const mx = event.clientX - rect.left;
            const my = event.clientY - rect.top;
            const transform = transformRef.current;
            const nextScale = Math.min(
                MAX_ZOOM,
                Math.max(
                    MIN_ZOOM,
                    transform.scale * Math.exp(-event.deltaY * ZOOM_INTENSITY),
                ),
            );

            if (nextScale === transform.scale) {
                return;
            }

            if (nextScale === MIN_ZOOM) {
                transform.scale = MIN_ZOOM;
                transform.x = 0;
                transform.y = 0;
            } else {
                const localX = (mx - transform.x) / transform.scale;
                const localY = (my - transform.y) / transform.scale;
                transform.scale = nextScale;
                transform.x = mx - localX * nextScale;
                transform.y = my - localY * nextScale;
            }

            applyTransform();
        };

        stage.addEventListener("wheel", onWheel, { passive: false });
        return () => stage.removeEventListener("wheel", onWheel);
    }, [applyTransform, mounted, open]);

    if (!mounted || !open) {
        return null;
    }

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={onClose}
        >
            <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full border border-slate-600 bg-slate-900/80 p-2 text-slate-100 transition hover:bg-slate-800"
                aria-label="Close image"
            >
                <X className="h-5 w-5" />
            </button>
            <figure
                className="flex max-h-[90vh] max-w-[min(92vw,1100px)] flex-col items-center animate-in fade-in-0 zoom-in-95 duration-200"
                onClick={(event) => event.stopPropagation()}
            >
                <div ref={stageRef} className="cursor-zoom-in">
                    <img
                        ref={imageRef}
                        src={src}
                        alt={alt}
                        className="max-h-[82vh] w-auto max-w-full origin-top-left rounded-lg border border-slate-700 object-contain shadow-2xl will-change-transform"
                    />
                </div>
                <figcaption className="mt-3 text-center text-sm text-slate-300">
                    {alt}
                    <span className="mt-1 block text-xs text-slate-500">
                        Scroll to zoom
                    </span>
                </figcaption>
            </figure>
        </div>,
        document.body,
    );
}

export default function ExperienceComponent({
    experience,
}: {
    experience: Experience;
}) {
    const dateRange = formatDateRange(experience.dateStart, experience.dateEnd);
    const showMeta = Boolean(experience.position || dateRange);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const closeLightbox = useCallback(() => setLightboxOpen(false), []);

    return (
        <div
            className="m-6 ml-auto mr-auto flex max-w-[90vw] flex-col rounded-2xl border border-slate-700 p-4 shadow-lg md:flex-row"
            style={{
                background:
                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
        >
            <div className="relative mb-4 min-h-96 w-full pt-4 md:mb-0 md:mr-8 md:w-[35%]">
                {/* TODO figure out sizing for the images, its such a mess rn.
                like literally try resizing the window, its awful */}
                <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="group relative mx-auto mb-4 block w-fit cursor-zoom-in"
                    aria-label={`Enlarge ${experience.name} image`}
                >
                    <img
                        src={experience.image}
                        alt={experience.name}
                        className="transition-opacity group-hover:opacity-80"
                        // fill
                    />
                    <span className="pointer-events-none absolute bottom-2 right-2 rounded-md border border-slate-600 bg-slate-900/80 p-1.5 text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <ZoomIn className="h-4 w-4" />
                    </span>
                </button>
                <ImageLightbox
                    src={experience.image}
                    alt={experience.name}
                    open={lightboxOpen}
                    onClose={closeLightbox}
                />
            </div>
            <div className="w-full pr-0 pt-4 md:w-[65%] md:pr-10">
                <h2 className="mb-2 text-xl font-bold">
                    <OptionalLink
                        href={experience.link}
                        className="group/link inline-flex items-center gap-2 transition-colors hover:text-white"
                    >
                        {experience.name}
                        {experience.link ? (
                            <ExternalLink
                                className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover/link:text-slate-200"
                                aria-hidden
                            />
                        ) : null}
                    </OptionalLink>
                </h2>
                {showMeta && (
                    <h3 className="mb-2 text-lg font-semibold">
                        {experience.position}{" "}
                        {dateRange && (
                            <span className="block md:float-right">
                                {dateRange}
                            </span>
                        )}
                    </h3>
                )}
                <p className="pt-4 text-gray-200">
                    {experience.description.split("\n").map((line, i) => (
                        <span key={i}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}
