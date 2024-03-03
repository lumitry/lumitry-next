"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
    return (
        <header className="bg-slate-900">
            <h1 className="pt-5 scroll-m-20 text-4xl font-extrabold text-center tracking-tight lg:text-5xl mb-3">
                Briggs Tucker
            </h1>
            <nav>
                <div className="flex items-center justify-around m-auto max-w-xl text-xl font-medium pb-3">
                    <Link href="/"><p>Home</p></Link>
                    <Link href="/resume"><p>Resume</p></Link>
                    {/* TODO: make a resume */}
                </div>
            </nav>
        </header>
);
}