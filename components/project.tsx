// "use client";

import Image from "next/image";
import React from "react";

export class Project {
    name: string;
    image: string; // src
    // TODO: image gallery?
    description: string;
    date?: Date;

    constructor(name: string, image: string, description: string, date?: Date) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.date = date;
    }
}

export default function ProjectComponent({ project }: { project: Project }) {
    // TODO should probably figure out a way to refactor this and WorkComponent together
    return (
        <div
            className="m-6 ml-auto mr-auto flex max-w-[80vw] flex-col rounded-2xl border border-slate-700 p-4 shadow-lg md:flex-row"
            style={{
                background:
                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
        >
            <div className="relative mb-4 min-h-96 w-full md:mb-0 md:mr-8 md:w-[45%]">
                {/* TODO figure out sizing for the images, its such a mess rn.
                like literally try resizing the window, its awful */}
                <img
                    src={project.image}
                    alt={project.name}
                    className="mb-4 ml-auto mr-auto"
                    // fill
                />
            </div>
            <div className="w-full pr-0 pt-4 md:w-[65%] md:pr-10">
                <h2 className="mb-2 text-xl font-bold">{project.name}</h2>
                <p className="text-gray-200">
                    {project.description.split("\n").map((line, i) => (
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
