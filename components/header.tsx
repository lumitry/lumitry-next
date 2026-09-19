"use client";

import React from "react";

export default function Header() {
    return (
        <header className="bg-slate-900">
            <a href="/">
                <img
                    src="/logos/bst_logo.png"
                    alt="Briggs Tucker's Logo"
                    width={64}
                    height={64}
                    className="absolute left-0 top-0 m-4 invert"
                />
            </a>
            <h1 className="mb-3 scroll-m-20 pt-5 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
                <a href="/">Briggs Tucker</a>
            </h1>
            <nav>
                <div className="m-auto flex max-w-xl items-center justify-around pb-3 text-xl font-medium">
                    <a href="/">
                        <p>Home</p>
                    </a>
                    <a href="/#Technologies">
                        <p>Technologies</p>
                    </a>
                    <a href="/#WorkExperience">
                        <p>Work</p>
                    </a>
                    <a href="/#Projects">
                        <p>Projects</p>
                    </a>
                    {/* <a href="/resume">
                        <p>Resume</p>
                    </a> */}
                    {/* TODO: make a resume */}
                    {/* TODO: add a "Tools" page that links to the LLM cost calculator and anything else */}
                    <a href="/cost-calculator">LLM Cost Calculator</a>
                </div>
            </nav>
        </header>
    );
}
