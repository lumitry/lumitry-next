import { TechnologiesScroller } from "./cards";
import Projects from "./projects";

export default function Home() {
    return (
        <main>
            {/* <p>Hi!</p> */}
            <TechnologiesScroller />
            <Projects />
            {/* TODO: "Values" component
            stuff like appreciation for open-source and stuff? */}
            {/* TODO: also add splashes of color, probably purple, like to the technology box gradients and the project box gradients (they're the same)
            its pretty bland right now */}
        </main>
    );
}
