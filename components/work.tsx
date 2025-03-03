// "use client";

// import Image from "next/image";
import React from "react";

export class Work {
    name: string;
    image: string; // src
    // TODO: image gallery?
    link: string; // link to the company's websitep
    position: string;
    description: string;
    dateStart?: Date;
    dateEnd?: Date;

    constructor(
        name: string,
        image: string,
        link: string,
        position: string,
        description: string,
        dateStart?: Date,
        dateEnd?: Date,
    ) {
        this.name = name;
        this.image = image;
        this.link = link;
        this.position = position;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }
}

export default function WorkComponent({ work }: { work: Work }) {
    return (
        <div
            className="m-4 ml-auto mr-auto flex max-w-[80vw]  flex-row rounded-2xl border border-slate-700 p-4 shadow-lg"
            style={{
                background:
                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
        >
            <div className="relative mr-8 min-h-96 w-[35%] pt-4">
                {/* TODO figure out sizing for the images, its such a mess rn.
                like literally try resizing the window, its awful */}
                <a href={work.link} target="_blank" rel="noreferrer">
                    <img
                        src={work.image}
                        alt={work.name}
                        className="mb-4 ml-auto mr-auto"
                        // fill
                    />
                </a>
            </div>
            <div className="w-[65%] pr-10 pt-4">
                <h2 className="mb-2 text-xl font-bold">{work.name}</h2>
                <h3 className="mb-2 text-lg font-semibold">
                    {work.position}{" "}
                    <span className="float-right">
                        {work.dateStart?.toLocaleDateString()} -{" "}
                        {work.dateEnd?.toLocaleDateString()}
                    </span>
                </h3>
                {/* <h4 className="float-right mb-2 font-semibold"></h4> */}
                <p className="pt-4 text-gray-200">
                    {work.description.split("\n").map((line, i) => (
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
