import React from "react";

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
}: {
    href?: string;
    children: React.ReactNode;
}) {
    if (!href) {
        return children;
    }

    return (
        <a href={href} target="_blank" rel="noreferrer">
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

export default function ExperienceComponent({
    experience,
}: {
    experience: Experience;
}) {
    const dateRange = formatDateRange(experience.dateStart, experience.dateEnd);
    const showMeta = Boolean(experience.position || dateRange);

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
                <OptionalLink href={experience.link}>
                    <img
                        src={experience.image}
                        alt={experience.name}
                        className={`mb-4 ml-auto mr-auto${
                            experience.link
                                ? " transition-opacity hover:opacity-80"
                                : ""
                        }`}
                        // fill
                    />
                </OptionalLink>
            </div>
            <div className="w-full pr-0 pt-4 md:w-[65%] md:pr-10">
                <h2 className="mb-2 text-xl font-bold">
                    <OptionalLink href={experience.link}>
                        <span
                            className={
                                experience.link ? "hover:underline" : undefined
                            }
                        >
                            {experience.name}
                        </span>
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
