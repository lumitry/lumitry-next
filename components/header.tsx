"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className="bg-slate-900">
            <h1 className="mb-3 scroll-m-20 pt-5 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
                Briggs Tucker
            </h1>
            <nav>
                <div className="m-auto flex max-w-xl items-center justify-around pb-3 text-xl font-medium">
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                    <Link href="#Technologies">
                        <p>Technologies</p>
                    </Link>
                    <Link href="#Projects">
                        <p>Projects</p>
                    </Link>
                    {/* <Link href="/resume">
                        <p>Resume</p>
                    </Link> */}
                    {/* TODO: make a resume */}
                </div>
            </nav>
        </header>
    );
}
