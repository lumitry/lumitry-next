import React, { useState } from "react";

export type TechnologyItem = {
    image: string;
    name: string;
    confidence: number;
    description: string;
};

export function TechnologyCard({ item }: { item: TechnologyItem }) {
    const [open, setOpen] = useState(false);

    const getConfidenceColor = (confidence: number) => {
        switch (confidence) {
            case 1:
                return "bg-red-500";
            case 2:
                return "bg-orange-500";
            case 3:
                return "bg-yellow-500";
            case 4:
                return "bg-lime-500";
            case 5:
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <li className="relative w-[150px] max-w-full flex-shrink-0">
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="technology-card relative w-full rounded-2xl border border-b-0 border-slate-700 px-8 py-6 text-left hover:cursor-pointer"
                style={{
                    background:
                        "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
                }}
            >
                <div
                    className={`absolute right-2 top-2 h-4 w-4 rounded-full ${getConfidenceColor(
                        item.confidence,
                    )}`}
                />
                <img
                    src={item.image}
                    alt=""
                    width={100}
                    height={100}
                    draggable={false}
                />
                <h3 className="max-w-xs !pb-2 !pt-4 text-center text-base font-bold text-slate-100">
                    {item.name}
                </h3>
            </button>
            {open ? (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-96 -translate-x-1/2 rounded-md border bg-popover p-4 text-popover-foreground shadow-md">
                    <p>
                        <span className="font-bold">Confidence:</span>{" "}
                        {item.confidence}/5
                    </p>
                    <p>{item.description}</p>
                </div>
            ) : null}
        </li>
    );
}
