import Image from "next/image";

import { InfiniteMovingCardsDemo } from "./cards";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>Hi!</p>
      <InfiniteMovingCardsDemo></InfiniteMovingCardsDemo>
    </main>
  );
}
