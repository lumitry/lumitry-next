"use client";

import React from "react";
import { Experience } from "@/components/experience";
import ExperienceComponent from "@/components/experience";

export default function WorkExperience() {
    let jobs = experience.sort((a, b) => {
        const dateA = a.dateEnd ?? a.dateStart ?? new Date();
        const dateB = b.dateEnd ?? b.dateStart ?? new Date();
        return dateB.getTime() - dateA.getTime();
    });
    return (
        <div>
            <h2
                className="mt-4 scroll-m-20 pb-2 text-center text-3xl font-bold tracking-tight text-slate-100"
                id="WorkExperience"
            >
                Work Experience
            </h2>
            <div className="items-center">
                {jobs.map((job, idx) => (
                    <ExperienceComponent experience={job} key={idx} />
                ))}
            </div>
        </div>
    );
}

const experience = [
    new Experience({
        name: "Rochester Software Associates",
        image: "/logos/RSA.png",
        link: "https://www.rocsoft.com/",
        position: "Software Development Co-op",
        description: `- Added numerous customer-requested features in legacy Java codebase and modern React frontend\n
        - Fixed numerous issues in legacy Java codebase\n
        - Created rigorous API testing suite using JMeter with custom Grafana dashboard & Dockerized setup\n
        - Participated in full scrum process including code review & validation
        `,
        dateStart: new Date("2025-08-25"),
        dateEnd: new Date("2025-12-12"),
    }),
    new Experience({
        name: "Rochester Software Associates",
        image: "/logos/RSA.png",
        link: "https://www.rocsoft.com/",
        position: "Software Quality Assurance Co-op",
        description: `- Wrote Selenium tests for React-based web app\n
        - Adapted 150+ comprehensive tests from old UI & codebase to work with new UI\n
        - Maintained constant contact with development to be aware of changes that impacted tests\n
        - Identified, confirmed, and wrote-up dozens of bugs and feature regressions, then verified dev's fixes\n
        `,
        dateStart: new Date("2024-05-15"),
        dateEnd: new Date("2024-12-13"),
    }),
    new Experience({
        name: "New York State Arthur O. Eve Higher Education Opportunity Program",
        image: "/logos/RIT_w.png",
        link: "https://www.rit.edu/diversity/higher-education-opportunity-program-heop",
        position: "Academic Tutor",
        description: `- Charged with assisting underrepresented students in in one-on-one and in-person sessions\n
        - Helped students become more confident in software development by connecting basic principles to more advanced concepts\n
        - Personalized session plans based on course content and individualized learning objectives`,
        dateStart: new Date("2023-09-19"),
        dateEnd: new Date("2024-05-04"),
    }),
];
