"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TechnologiesScroller() {
  return (
    <div>
      <h2 className="max-w-l !pb-2 !m-0 font-bold text-center text-3xl text-slate-100">Technologies</h2>
      <p className="text-center italic">(Try clicking on one!)</p>
      <div className="h-[20rem] rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={technologies}
        direction="right"
        speed="fast"
      />
      </div>
    </div>
  );
}

const technologies = [
  {
    image: "/python.png",
    name: "Python",
    href: "#python",
  },
  {
    image: "/python.png",
    name: "Python",
    href: "#python",
  },
  {
    image: "/python.png",
    name: "Python",
    href: "#python",
  },
  {
    image: "/python.png",
    name: "Python",
    href: "#python",
  },
  {
    image: "/python.png",
    name: "Python",
    href: "#python",
  },
];
