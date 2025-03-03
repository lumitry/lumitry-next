import React from "react";

const github_link = "https://github.com/lumitry/lumitry-next";
const linkedin_link = "https://www.linkedin.com/in/brighamtucker/";
const link_css_class = "text-blue-400 hover:text-blue-300";

export default function Footer() {
    return (
        <footer className="m-auto w-[50%] rounded-2xl bg-slate-900 p-4 text-center text-gray-200">
            <p>&copy; 2024 Briggs Tucker</p>
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
                , or by emailing me:{" "}
                <a
                    className={link_css_class}
                    href="mailto:briggstuc04@gmail.com"
                >
                    briggstuc04@gmail.com
                </a>
            </p>
        </footer>
    );
}
