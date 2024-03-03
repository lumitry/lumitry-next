"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TechnologiesScroller() {
  return (
    <div>
      {/* <h2 className="max-w-l !pb-2 !m-0 font-bold text-center text-3xl text-slate-100">Technologies</h2> */}
      <h2 className="scroll-m-20 pb-2 text-3xl tracking-tight first:mt-0 font-bold text-center text-slate-100">
      Technologies
    </h2>
      <p className="text-center">I&apos;m a learner at heart, and always seek to diversify my knowledge. Try clicking on a card to see more information!</p>

      <br />

      <p className="italic text-center text-muted-foreground bg-slate-900 bg-opacity-50 m-6">For reference, a confidence value of 4 or 5 means I&apos;m confident enough in that technology to work on it with minimal help/supervision. A 3 means I&apos;d need some extra help, and a 1 or a 2 means I&apos;d have to take steps to learn the technology before being confident in my abilities.</p>
      <div className="h-[20rem] rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
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
    image: "/python.png",
    name: "Python",
    onClick: () => {
      console.log("Python");
    },
    confidence: 5,
    description: "I've used Python for around 4 years now, and I'm confident in my ability to use it to create a variety of applications, from simple scripts to RESTful APIs using Flask. I've used it for many class projects and assignments, and for dozens of scripts and personal projects."
  },
  {
    image: "/flask.png",
    name: "Flask",
    onClick: () => {
      console.log("Flask");
    },
    confidence: 2,
    description: "I'm able to use Flask (specifically Flask-RESTful) to create a RESTful API, which I used on the ridesharing project alongside a PostgreSQL database, using Pytest for unit tests. While I'm likely not using it to its full potential, I'm confident in my ability to use it to create a basic API."
  },
  {
    image: "/pytest.svg",
    name: "Pytest",
    onClick: () => {
      console.log("Pytest");
    },
    confidence: 4,
    description: "I've used Pytest for many class projects and assignments, and I'm confident in my ability to use it to create detailed unit tests for Python code."
  },
  {
    image: "/java.png",
    name: "Java",
    onClick: () => {
      console.log("Java");
    },
    confidence: 4,
    description: "I've used Java for a while, and I'm confident in my ability to use it to create a variety of applications, from simple command-line programs to complex web applications. I've used it for a great number of class projects and assignments. While there are likely many things I have yet to learn about Java, I'm confident in my ability to learn them as needed."
  },
  {
    image: "/spring.png",
    name: "Java Spring",
    onClick: () => {
      console.log("Java Spring");
    },
    confidence: 3,
    description: "I used Java Spring on the Hockey Jersey E-Store project, and I'm confident in my ability to use it to create a RESTful API."
  },
  {
    image: "/junit5.png",
    name: "JUnit5",
    onClick: () => {
      console.log("JUnit5");
    },
    confidence: 4,
    description: "I used JUnit5 on the Hockey Jersey E-Store project and for various other Java projects and assignments, and I'm confident in my ability to use it to create detailed unit tests for Java code."
  },
  {
    image: "/mockito.png",
    name: "Mockito",
    onClick: () => {
      console.log("Mockito");
    },
    confidence: 2,
    description: "I used Mockito on the Hockey Jersey E-Store project, and I'm somewhat confident in my ability to use it to create basic mocks for unit tests."
  },
  {
    image: "/javascript.png",
    name: "JavaScript",
    onClick: () => {
      console.log("JavaScript");
    },
    confidence: 3,
    description: "While I prefer TypeScript in general, JS is still plenty capable and there's a lot about it that I still have left to explore (Node.js, for example). However, I believe that I'm proficient enough in it to create dynamic and engaging web pages."
  },
  {
    image: "/typescript.png",
    name: "TypeScript",
    onClick: () => {
      console.log("TypeScript");
    },
    confidence: 4,
    description: "I've used TypeScript quite a few times, and I always prefer using it over JavaScript, but due to its type safety, it can sometimes be a bit more difficult to use (a worthwhile tradeoff, though)."
  },
  {
    image: "/react.png",
    name: "React",
    onClick: () => {
      console.log("React");
    },
    confidence: 3,
    description: "I've used React to create a nutrition tracking app for a class project, and I'm using it to make this website. I enjoy using React, but I'm still learning how to use it to its full potential."
  },
  {
    image: "/angular.svg",
    name: "Angular",
    onClick: () => {
      console.log("Angular");
    },
    confidence: 2,
    description: "I used Angular on the Hockey Jersey E-Store project, which required learning Angular, Java Spring, and TypeScript all at once. I'm very proud of how the UI turned out for that project, but I'm not a master of Angular by any means."
  },
  {
    image: "/primeng.svg",
    name: "PrimeNG",
    onClick: () => {
      console.log("PrimeNG");
    },
    confidence: 3,
    description: "I used PrimeNG on the Hockey Jersey E-Store project, and I'm pretty confident in my ability to use it to create a good-looking, responsive, and accessible UI. However, due to how difficult it is to customize individual components, I'm not as confident in my ability to use it to create a *unique* UI."
  },
  {
    image: "/svelte.svg",
    name: "Svelte",
    onClick: () => {
      console.log("Svelte"); // same as sqlite3, i only have a little experience with this one
    },
    confidence: 1,
    description: "I've used Svelte and SvelteKit on a personal project that's still in the early stages (along with Tauri and Rust, but I'm not nearly confident in those). I'm still definitely learning Svelte, but it seems like a very promising framework."
  },
  // this will be included once i know what is going on with next, but for now i'm just going to leave it out
  // {
  //   image: "/next.svg",
  //   name: "Next.js",
  //   onClick: () => {
  //     console.log("Next.js");
  //   }
  // },
  {
    image: "/html5.svg",
    name: "HTML5",
    onClick: () => {
      console.log("HTML5");
    },
    confidence: 5,
    description: "I'm very confident in my ability to write vanilla HTML, which I used to create many websites before I started using frameworks like React and Angular."
  },
  {
    image: "/css.svg",
    name: "CSS3",
    onClick: () => {
      console.log("CSS3");
    },
    confidence: 4,
    description: "I'm confident in my ability to write vanilla CSS, which I used to style many websites before I started using SCSS and Tailwind (which I'm still learning)."
  },
  {
    image: "/sass.webp",
    name: "SCSS",
    onClick: () => {
      console.log("SCSS");
    },
    confidence: 2,
    description: "I'm still learning SCSS, but I've used it to style a few websites, and I'm comfortable using it to write custom stylesheets. At the moment, I mostly just use it as a way to write more organized (read: 'nested') CSS."
  },
  {
    image: "/git.svg",
    name: "Git",
    onClick: () => {
      console.log("Git");
    },
    confidence: 3,
    description: "I respect git as an exceptionally powerful tool that I only know the basics of, but it's more than enough to work on a project collaboratively. I've used it for all of my college projects, and the fast majority of my personal projects and small scripts. Additionally, I've made very minor contributions to open-source projects in the past."
  },
  {
    image: "/github.svg",
    name: "GitHub",
    onClick: () => {
      console.log("GitHub");
    },
    confidence: 4,
    description: "While I haven't looked into GitHub Actions just yet, I've used GitHub to host around 2 dozen repositories, including multiple collaborative class projects, as well as some personal projects of mine. I've also used GitHub Pages to host my old personal website, before migrating it to CloudFlare Pages."
  },
  {
    image: "/gitlab.svg",
    name: "GitLab",
    onClick: () => {
      console.log("GitLab");
    },
    confience: 2,
    description: "I have used GitLab for a few class projects, but I'm more familiar with GitHub."
  },
  {
    image: "/docker.svg",
    name: "Docker",
    onClick: () => {
      console.log("Docker");
    },
    confidence: 1,
    description: "I have used Docker in a cybersecurity course, and I've used it to self-host some services like NextCloud, tt-rss, and firefly-iii. I know how to make and connect basic containers, but for more complex setups, I'm still learning."
  },
  {
    image: "/postgresql.svg",
    name: "PostgreSQL",
    onClick: () => {
      console.log("PostgreSQL");
    },
    confidence: 3,
    description: "I have some experience with PostgreSQL, such as using it for a rideshare project's database, and I made a point of learning some PL/pgSQL to optimize some queries."
  },
  {
    image: "/sqlite.svg",
    name: "Sqlite3",
    onClick: () => {
      console.log("Sqlite3");
    },
    confidence: 1,
    description: "I started learning Sqlite3 for a project that's still in the very early stages, but I'm not very familiar with it; however, from what I can tell, it shares enough similarities with SQL that I'm comfortable including it here. The main thing I've learned is that it's a lot more limited than PostgreSQL since it doesn't support as many types, and it doesn't support stored procedures or triggers."
  },
];
