"use client";

import React from "react";
import { Experience } from "@/components/experience";
import ExperienceComponent from "@/components/experience";

export default function Projects() {
    let projs = projects.sort((a, b) => {
        const dateA = a.dateEnd ?? a.dateStart ?? new Date();
        const dateB = b.dateEnd ?? b.dateStart ?? new Date();
        return dateB.getTime() - dateA.getTime();
    });
    return (
        <div>
            <h2
                className="mt-12 scroll-m-20 pb-2 text-center text-3xl font-bold tracking-tight text-slate-100"
                id="Projects"
            >
                Projects
            </h2>
            <div className="items-center">
                {projs.map((project, idx) => (
                    <ExperienceComponent experience={project} key={idx} />
                ))}
            </div>
        </div>
    );
}

const projects = [
    new Experience({
        name: "Talos",
        image: "/projects/Talos.png",
        description: `(Senior Project; Team of 6; ONGOING)\n
        - Inherited an existing student project to repurpose existing educational robotic arms to be used as automatic camera operator\n
        - Creating a versatile interface for multiple generations of Scorbot robotic arms, with a custom controller implementation on an ESP32 in addition to a Raspberry Pi Operator software that interfaces with stock controller\n
        - Utilizing computer vision to track a consistent subject as they move across the frame\n
        - Designing algorithms to make interesting, engaging camera shots\n
        (Note: Due to the ongoing nature of the project, my exact major contributions are not yet clear. However, I have taken a generalist role, and plan to get experience with as much of the project as possible.)`,
        link: "https://github.com/talos-rit",
        dateStart: new Date("2026-08-27"),
        dateEnd: undefined, // will be until ~2027-05-01
    }),
    new Experience({
        name: "Trellinatrix",
        image: "/projects/trellinatrix.png",
        description: `(Course: Trends in Software Development Process; Team of 5)\n
        - Created a browser extension for automatically generating Trello cards from a product description in the context of an existing Trello board\n
        - Utilized Trello and OpenRouter APIs for getting board information and generating cards\n
        - Used WXT and browser APIs to create a miniature, ephemeral LLM harness inside a multi-browser-compatible extension\n
        \n
        (Note: This was an exercise in examining one possible future of software development in the age of AI; we do not believe that using AI to generate user stories is a productive or accurate way of creating user stories.)`,
        dateStart: new Date("2026-02-01"),
        dateEnd: new Date("2026-03-02"),
    }),
    new Experience({
        name: "Pillarboxd",
        image: "/projects/Pillarboxd_UI.png",
        description: `(Course: Human-Centered Requirements and Design)\n
        - Worked in team of 5 to conceptualize, sketch, wireframe, and prototype a mobile app similar to Letterboxd for tracking movies, TV shows, and books\n
        - Created various types of diagrams & documentation to help focus in on the needs and viewpoints of end users\n
        - Expanded on the group's vision via creation of a functional prototype in Figma\n
        - Received, processed, and acted upon feedback from peers & users in target population`,
        dateStart: new Date("2025-01-20"), // some time in late january, not sure when
        dateEnd: new Date("2025-05-01"),
    }),
    new Experience({
        name: "Multi-User Dungeon (MUD)",
        image: "/projects/MUD_Game.png",
        description: `(Course: Software Subsystems Engineering)\n
        - Analyzed requirements document and created domain model\n
        - Worked with team of 5 to create subsystem class diagrams and sequence diagrams\n
        - Implemented Terminal User Interface using the Command pattern to control game events\n
        - Implemented GUI with JavaFX following addition of new product requirements`,
        dateStart: new Date("2024-02-01"),
        dateEnd: new Date("2024-05-01"),
    }),
    new Experience({
        name: "Hockey Jerseys E-Store",
        image: "/projects/e-store.png",
        description: `(Course: Intro to Software Engineering)\n
        - Developed a full-stack E-Store using Git for Version Control and agile development practices including standups and scrum in collaboration with team of four\n
        - Brainstormed and developed feature adds approved by product owner, analyzed product requirements using domain analysis and creating domain model\n
        - Lead team’s backend development efforts in Java and Spring to host web server and interact between REST API and product inventory stored in JSON files\n
        - Tested backend using JUnit and Mockito, achieving 90% code coverage via JaCoCo\n
        - Developed front-end with Angular and TypeScript, including inventory management, user reviews, and accounts
        `,
        dateStart: new Date("2023-09-01"),
        dateEnd: new Date("2023-11-30"),
    }), // TODO write a more personal (not copied from linkedin) description
    new Experience({
        name: "Ridesharing API",
        image: "/projects/Rideshare_API.png",
        description: `(Course: Web Engineering; Solo project)\n
        - Developed a ridesharing REST API using Flask, interfacing with PostgreSQL database via psycopg2\n
        - Designed and implemented SQL database schema using noun-verb analysis\n
        - Wrote dozens of unit tests and heavily documented code to justify design choices\n
        - Optimized API performance via migration from Python functions to PL/pgSQL procedures and functions`,
        dateStart: new Date("2023-09-01"),
        dateEnd: new Date("2023-10-31"),
    }), // TODO add proper images and descriptions.
    // How am i going to host the images?
    // up to 25 MiB is supported by cloudflare pages, so i could just do that i guess
    // or cloudinary. or catbox
];
