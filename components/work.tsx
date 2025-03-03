import React from "react";

export class Work {
    name: string;
    image: string; // src
    // TODO: image gallery?
    link: string; // link to the company's website
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
            className="m-6 ml-auto mr-auto flex max-w-[90vw] flex-col rounded-2xl border border-slate-700 p-4 shadow-lg md:flex-row"
            style={{
                background:
                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
        >
            <div className="relative mb-4 min-h-96 w-full pt-4 md:mb-0 md:mr-8 md:w-[35%]">
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
            <div className="w-full pr-0 pt-4 md:w-[65%] md:pr-10">
                <h2 className="mb-2 text-xl font-bold">{work.name}</h2>
                <h3 className="mb-2 text-lg font-semibold">
                    {work.position}{" "}
                    <span className="block md:float-right">
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
