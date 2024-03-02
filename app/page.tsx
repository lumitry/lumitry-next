import { TechnologiesScroller } from "./cards";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Briggs Tucker</h1>
      <p>Hi!</p>
      <TechnologiesScroller></TechnologiesScroller>
      {/* <HoverCard>
                <HoverCardTrigger data-state="open">Hover</HoverCardTrigger>
                <HoverCardContent>
                  The React Framework – created and maintained by @vercel.
                </HoverCardContent>
              </HoverCard> */}
      {/* TODO: replace these with technologies (java, spring, js, ts, python, html, css, svelte, scss, react, etc.) */}
    </main>
  );
}
