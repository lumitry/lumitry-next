import { TechnologiesScroller } from "./cards";
import Projects from "./projects";

export default function Home() {
    return (
        <main>
            {/* <p>Hi!</p> */}
            <TechnologiesScroller />
            <Projects />
            {/* TODO: projects component */}
        </main>
    );
}
