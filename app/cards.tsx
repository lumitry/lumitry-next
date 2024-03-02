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
    onClick: () => {
      console.log("Python");
    }
  },
  {
    image: "/java.png",
    name: "Java",
    onClick: () => {
      console.log("Java");
    }
  },
  {
    image: "/spring.png",
    name: "Java Spring",
    onClick: () => {
      console.log("Java Spring");
    }
  },
  {
    image: "/javascript.png",
    name: "JavaScript",
    onClick: () => {
      console.log("JavaScript");
    }
  },
  {
    image: "/typescript.png",
    name: "TypeScript",
    onClick: () => {
      console.log("TypeScript");
    }
  },
  {
    image: "/react.png",
    name: "React",
    onClick: () => {
      console.log("React");
    }
  },
  // TODO add more, right now it looks kinda silly cus you can see both ends at once
];
