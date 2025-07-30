"use client"; // must not be SSR for window.location

import React, { useState, useEffect } from "react";

const github_link = "https://github.com/lumitry/lumitry-next";
const linkedin_link = "https://www.linkedin.com/in/brighamtucker/";
const link_css_class = "text-blue-400 hover:text-blue-300";

// Function to get the appropriate email based on current domain
function getEmailForDomain(): string {
    const hostname = window.location.hostname;

    // Add your domain mappings here
    if (hostname.includes("briggstucker.com")) {
        return "web@briggstucker.com";
    } else if (hostname.includes("bstz.dev")) {
        return "web@bstz.dev";
    } else if (hostname.includes("lumitry.dev")) {
        return "web@lumitry.dev";
    }

    // Default fallback
    return "web@briggstucker.com";
}

export default function Footer() {
    const [emailAddress, setEmailAddress] = useState("web@briggstucker.com"); // default fallback

    useEffect(() => {
        // Only run on client-side after component mounts
        setEmailAddress(getEmailForDomain());
    }, []);
    return (
        <footer className="m-auto w-[50%] rounded-2xl bg-slate-900 p-4 text-center text-gray-200">
            <p>&copy; 2025 Briggs Tucker</p>
            <p>
                View this site&apos;s source code on{" "}
                <a className={link_css_class} href={github_link}>
                    GitHub
                </a>
            </p>
            <p>
                Feel free to get in touch, either through{" "}
                <a className={link_css_class} href={linkedin_link}>
                    my LinkedIn
                </a>
                , or by{" "}
                <a className={link_css_class} href={`mailto:${emailAddress}`}>
                    emailing me
                </a>
                .
            </p>
        </footer>
    );
}
