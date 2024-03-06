"use client";

import React from "react";
import { Project } from "@/components/project";
import ProjectComponent from "@/components/project";

export default function Projects() {
    let projs = projects.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date();
        const dateB = b.date ? new Date(b.date) : new Date();
        return dateB.getTime() - dateA.getTime();
    });
    return (
        <div>
            <h2
                className="mt-4 scroll-m-20 pb-2 text-center text-3xl font-bold tracking-tight text-slate-100"
                id="Projects"
            >
                Projects
            </h2>
            <div className="items-center">
                {projs.map((project, idx) => (
                    <ProjectComponent project={project} key={idx} />
                ))}
            </div>
        </div>
    );
}

const projects = [
    new Project(
        "Hockey Jerseys E-Store",
        "/projects/e-store.png",
        `(Course: Intro to Software Engineering)\n
        - Developed a full-stack E-Store using Git for Version Control and agile development practices including standups and scrum in collaboration with team of four\n
        - Brainstormed and developed feature adds approved by product owner, analyzed product requirements using domain analysis and creating domain model\n
        - Lead team’s backend development efforts in Java and Spring to host web server and interact between REST API and product inventory stored in JSON files\n
        - Tested backend using JUnit and Mockito, achieving 90% code coverage via JaCoCo\n
        - Developed front-end with Angular and TypeScript, including inventory management, user reviews, and accounts
        `,
    ), // TODO write a more personal (not copied from linkedin) description
    new Project(
        "Ridesharing API",
        "/projects/Rideshare_API.png",
        `(Course: Web Engineering; Solo project)\n
    - Developed a ridesharing REST API using Flask, interfacing with PostgreSQL database via psycopg2\n
    - Designed and implemented SQL database schema using noun-verb analysis\n
    - Wrote dozens of unit tests and heavily documented code to justify design choices\n
    - Optimized API performance via migration from Python functions to PL/pgSQL procedures and functions`,
    ), // TODO add proper images and descriptions.
    // new Project("Test 3", "/logos/c.svg", "A ridesharing app"),
    // How am i going to host the images?
    // up to 25 MiB is supported by cloudflare pages, so i could just do that i guess
    // or cloudinary. or catbox
];
