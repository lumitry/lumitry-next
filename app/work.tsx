"use client";

import React from "react";
import { Work } from "@/components/work";
import WorkComponent from "@/components/work";

export default function WorkExperience() {
    let projs = experience.sort((a, b) => {
        const dateA = a.dateEnd ? new Date(a.dateEnd) : new Date();
        const dateB = b.dateEnd ? new Date(b.dateEnd) : new Date();
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
                {projs.map((work, idx) => (
                    <WorkComponent work={work} key={idx} />
                ))}
            </div>
        </div>
    );
}

const experience = [
    new Work(
        "Rochester Software Associates",
        "/logos/RSA.png",
        "https://www.rocsoft.com/",
        `Software Quality Assurance Co-op`,
        `- Wrote Selenium tests for React-based web app\n
        - Adapted 150+ comprehensive tests from old UI & codebase to work with new UI\n
        - Maintained constant contact with development to be aware of changes that impacted tests\n
        - Identified, confirmed, and wrote-up dozens of bugs and feature regressions, then verified dev's fixes\n
        `,
        new Date("2024-05-15"),
        new Date("2024-12-13"),
    ),
    new Work(
        "New York State Arthur O. Eve Higher Education Opportunity Program",
        "/logos/RIT_w.png",
        "https://www.rit.edu/diversity/higher-education-opportunity-program-heop",
        `Academic Tutor`,
        `- Charged with assisting underrepresented students in in one-on-one and in-person sessions\n
        - Helped students become more confident in software development by connecting basic principles to more advanced concepts\n
        - Personalized session plans based on course content and individualized learning objectives`,
        new Date("2023-09-19"),
        new Date("2024-05-04"),
    ),
];
