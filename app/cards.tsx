"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TechnologiesScroller() {
    return (
        <div>
            {/* <h2 className="max-w-l !pb-2 !m-0 font-bold text-center text-3xl text-slate-100">Technologies</h2> */}
            <h2 className="mt-4 scroll-m-20 pb-2 text-center text-3xl font-bold tracking-tight text-slate-100">
                Technologies
            </h2>
            <p className="text-center">
                I&apos;m a learner at heart, and always seek to diversify my
                knowledge. Try clicking on a card to see more information!
            </p>
            <br />

            <div className="m-auto max-w-6xl bg-slate-900 bg-opacity-50 p-2 text-center italic text-muted-foreground">
                {/* <span className=""> */}
                For reference, a confidence value of 4 or 5 means I&apos;m
                confident enough in that technology to work on it with minimal
                help/supervision. A 3 means I&apos;d need some extra help, and a
                1 or a 2 means I&apos;d have to take steps to learn the
                technology before being confident in my abilities.
                {/* </p> */}
            </div>

            <div className="dark:bg-grid-white/[0.05] relative flex max-h-96 flex-col  items-center justify-center overflow-visible rounded-md antialiased">
                <InfiniteMovingCards
                    items={technologies}
                    direction="right"
                    speed="normal"
                />
            </div>
        </div>
    );
}

const technologies = [
    {
        image: "/logos/python.png",
        name: "Python",
        confidence: 5,
        description:
            "I've used Python for around 4 years now, and I'm confident in my ability to use it to create a variety of applications, from simple scripts to RESTful APIs using Flask. I've used it for many class projects and assignments, and for dozens of scripts and personal projects.",
    },
    {
        image: "/logos/flask.png",
        name: "Flask",
        confidence: 2,
        description:
            "I'm able to use Flask (specifically Flask-RESTful) to create a RESTful API, which I used on the ridesharing project alongside a PostgreSQL database, using Pytest for unit tests. While I'm likely not using it to its full potential, I'm confident in my ability to use it to create a basic API.",
    },
    {
        image: "/logos/pytest.svg",
        name: "Pytest",
        confidence: 4,
        description:
            "I've used Pytest for many class projects and assignments, and I'm confident in my ability to use it to create detailed unit tests for Python code.",
    },
    {
        image: "/logos/java.png",
        name: "Java",
        confidence: 4,
        description:
            "I've used Java for a while, and I'm confident in my ability to use it to create a variety of applications, from simple command-line programs to complex web applications. I've used it for a great number of class projects and assignments. While there are likely many things I have yet to learn about Java, I'm confident in my ability to learn them as needed.",
    },
    {
        image: "/logos/spring.png",
        name: "Java Spring",
        confidence: 3,
        description:
            "I used Java Spring on the Hockey Jersey E-Store project, and I'm confident in my ability to use it to create a RESTful API.",
    },
    {
        image: "/logos/junit5.png",
        name: "JUnit5",
        confidence: 4,
        description:
            "I used JUnit5 on the Hockey Jersey E-Store project and for various other Java projects and assignments, and I'm confident in my ability to use it to create detailed unit tests for Java code.",
    },
    {
        image: "/logos/mockito.png",
        name: "Mockito",
        confidence: 2,
        description:
            "I used Mockito on the Hockey Jersey E-Store project, and I'm somewhat confident in my ability to use it to create basic mocks for unit tests.",
    },
    {
        image: "/logos/javascript.png",
        name: "JavaScript",
        confidence: 3,
        description:
            "While I prefer TypeScript in general, JS is still plenty capable and there's a lot about it that I still have left to explore (Node.js, for example). However, I believe that I'm proficient enough in it to create dynamic and engaging web pages.",
    },
    {
        image: "/logos/typescript.png",
        name: "TypeScript",
        confidence: 4,
        description:
            "I've used TypeScript quite a few times, and I always prefer using it over JavaScript, but due to its type safety, it can sometimes be a bit more difficult to use (a worthwhile tradeoff, though).",
    },
    {
        image: "/logos/react.png",
        name: "React",
        confidence: 3,
        description:
            "I've used React to create a nutrition tracking app for a class project, and I'm using it to make this website. I enjoy using React, but I'm still learning how to use it to its full potential.",
    },
    {
        image: "/logos/angular.svg",
        name: "Angular",
        confidence: 2,
        description:
            "I used Angular on the Hockey Jersey E-Store project, which required learning Angular, Java Spring, and TypeScript all at once. I'm very proud of how the UI turned out for that project, but I'm not a master of Angular by any means.",
    },
    {
        image: "/logos/primeng.svg",
        name: "PrimeNG",
        confidence: 3,
        description:
            "I used PrimeNG on the Hockey Jersey E-Store project, and I'm pretty confident in my ability to use it to create a good-looking, responsive, and accessible UI. However, due to how difficult it is to customize individual components, I'm not as confident in my ability to use it to create a *unique* UI.",
    },
    {
        image: "/logos/svelte.svg",
        name: "Svelte",
        confidence: 1,
        description:
            "I've used Svelte and SvelteKit on a personal project that's still in the early stages (along with Tauri and Rust, but I'm not nearly confident in those). I'm still definitely learning Svelte, but it seems like a very promising framework.",
    },
    // this will be included once i know what is going on with next, but for now i'm just going to leave it out
    // {
    //   image: "/logos/next.svg",
    //   name: "Next.js",

    //   confidence: 1,
    // },
    {
        image: "/logos/html5.svg",
        name: "HTML5",
        confidence: 5,
        description:
            "I'm very confident in my ability to write vanilla HTML, which I used to create many websites before I started using frameworks like React and Angular.",
    },
    {
        image: "/logos/css.svg",
        name: "CSS3",
        confidence: 4,
        description:
            "I'm confident in my ability to write vanilla CSS, which I used to style many websites before I started using SCSS and Tailwind (which I'm still learning).",
    },
    {
        image: "/logos/sass.webp",
        name: "SCSS",
        confidence: 2,
        description:
            "I'm still learning SCSS, but I've used it to style a few websites, and I'm comfortable using it to write custom stylesheets. At the moment, I mostly just use it as a way to write more organized (read: 'nested') CSS.",
    },
    {
        image: "/logos/git.svg",
        name: "Git",
        confidence: 3,
        description:
            "I respect git as an exceptionally powerful tool that I only know the basics of, but it's more than enough to work on a project collaboratively. I've used it for all of my college projects, and the fast majority of my personal projects and small scripts. Additionally, I've made very minor contributions to open-source projects in the past.",
    },
    {
        image: "/logos/github.svg",
        name: "GitHub",
        confidence: 4,
        description:
            "While I haven't looked into GitHub Actions just yet, I've used GitHub to host around 2 dozen repositories, including multiple collaborative class projects, as well as some personal projects of mine. I've also used GitHub Pages to host my old personal website, before migrating it to CloudFlare Pages.",
    },
    {
        image: "/logos/gitlab.svg",
        name: "GitLab",
        confidence: 2,
        description:
            "I have used GitLab for a few class projects, but I'm more familiar with GitHub.",
    },
    {
        image: "/logos/docker.svg",
        name: "Docker",
        confidence: 1,
        description:
            "I have used Docker in a cybersecurity course, and I've used it to self-host some services like NextCloud, tt-rss, and firefly-iii. I know how to make and connect basic containers, but for more complex setups, I'm still learning.",
    },
    {
        image: "/logos/postgresql.svg",
        name: "PostgreSQL",
        confidence: 3,
        description:
            "I have some experience with PostgreSQL, such as using it for a rideshare project's database, and I made a point of learning some PL/pgSQL to optimize some queries.",
    },
    {
        image: "/logos/sqlite.svg",
        name: "Sqlite3",
        confidence: 1,
        description:
            "I started learning Sqlite3 for a project that's still in the very early stages, but I'm not very familiar with it; however, from what I can tell, it shares enough similarities with SQL that I'm comfortable including it here. The main thing I've learned is that it's a lot more limited than PostgreSQL since it doesn't support as many types, and it doesn't support stored procedures or triggers.",
    },
    {
        image: "/logos/c.svg",
        name: "C",
        confidence: 1,
        description:
            "While I have classroom experience with C (Intro to Software Engineering focused on C and some C++), I'm only confident in the very basics of the language.",
    },
];
