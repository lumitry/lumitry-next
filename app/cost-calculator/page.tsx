"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import type { Chart as ChartType } from "chart.js";

export default function CostCalculatorPage() {
    const [allModels, setAllModels] = useState<any[]>([]);
    const [providers, setProviders] = useState<string[]>([]);
    const [filter, setFilter] = useState("");
    const [model, setModel] = useState("");
    const [inputCost, setInputCost] = useState("");
    const [outputCost, setOutputCost] = useState("");
    const [inputTokens, setInputTokens] = useState("");
    const [outputTokens, setOutputTokens] = useState("");
    const [result, setResult] = useState("");
    const [comparison, setComparison] = useState<
        { id: string; inputPrice: number; outputPrice: number }[]
    >([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<ChartType | null>(null);

    // Load persisted data on component mount
    useEffect(() => {
        // console.log("🔄 Load effect running...");
        const savedComparison = localStorage.getItem(
            "llm-cost-calculator-comparison",
        );
        const savedInputTokens = localStorage.getItem(
            "llm-cost-calculator-input-tokens",
        );
        const savedOutputTokens = localStorage.getItem(
            "llm-cost-calculator-output-tokens",
        );
        const savedModel = localStorage.getItem(
            "llm-cost-calculator-selected-model",
        );
        const savedInputCost = localStorage.getItem(
            "llm-cost-calculator-input-cost",
        );
        const savedOutputCost = localStorage.getItem(
            "llm-cost-calculator-output-cost",
        );

        // console.log(
        //     "📦 Raw savedComparison from localStorage:",
        //     savedComparison,
        // );

        if (savedComparison) {
            try {
                const parsedComparison = JSON.parse(savedComparison);
                // console.log("✅ Loading saved comparison:", parsedComparison);
                setComparison(parsedComparison);
            } catch (e) {
                // console.error("❌ Failed to parse saved comparison data:", e);
            }
        } else {
            // console.log("ℹ️ No saved comparison found in localStorage");
        }
        if (savedInputTokens) {
            setInputTokens(savedInputTokens);
        }
        if (savedOutputTokens) {
            setOutputTokens(savedOutputTokens);
        }
        if (savedModel) {
            setModel(savedModel);
        }
        if (savedInputCost) {
            setInputCost(savedInputCost);
        }
        if (savedOutputCost) {
            setOutputCost(savedOutputCost);
        }

        // Mark that we've loaded from storage
        // console.log("✅ Marking isInitialized as true");
        setIsInitialized(true);
    }, []);

    // Persist comparison data when it changes
    useEffect(() => {
        // console.log(
        //     "💾 Save effect running with isInitialized:",
        //     isInitialized,
        //     "comparison:",
        //     comparison,
        // );

        // Don't save on initial render before we've loaded from storage
        if (!isInitialized) {
            // console.log("⏸️ Skipping save because isInitialized is false");
            return;
        }

        // console.log("💾 Saving comparison to localStorage:", comparison);
        localStorage.setItem(
            "llm-cost-calculator-comparison",
            JSON.stringify(comparison),
        );
    }, [comparison, isInitialized]);

    // Persist token counts when they change
    useEffect(() => {
        localStorage.setItem("llm-cost-calculator-input-tokens", inputTokens);
    }, [inputTokens]);

    useEffect(() => {
        localStorage.setItem("llm-cost-calculator-output-tokens", outputTokens);
    }, [outputTokens]);

    // Persist selected model and costs when they change
    useEffect(() => {
        localStorage.setItem("llm-cost-calculator-selected-model", model);
    }, [model]);

    useEffect(() => {
        localStorage.setItem("llm-cost-calculator-input-cost", inputCost);
    }, [inputCost]);

    useEffect(() => {
        localStorage.setItem("llm-cost-calculator-output-cost", outputCost);
    }, [outputCost]);

    interface Model {
        id: string;
        inputPrice: number;
        outputPrice: number;
    }
    interface ModelsResponse {
        data: Model[];
    }

    const fetchModels = useCallback(async function () {
        try {
            const res = await fetch("https://openrouter.ai/api/v1/models");

            const { data } = (await res.json()) as ModelsResponse;

            setAllModels(data);

            const providerNames = data.map((m) => m.id.split("/")[0]);
            const allUniqueProviders = Array.from(
                new Set(providerNames),
            ).sort();

            // Priority providers to show at the top
            const priorityProviders = [
                "anthropic",
                "deepseek",
                "google",
                "meta-llama",
                "mistralai",
                "moonshotai",
                "openai",
                "qwen",
                "x-ai",
            ];

            // Filter priority providers that exist in the data
            const availablePriorityProviders = priorityProviders.filter((p) =>
                allUniqueProviders.includes(p),
            );

            // Get remaining providers (excluding priority ones)
            const remainingProviders = allUniqueProviders.filter(
                (p) => !priorityProviders.includes(p),
            );

            // Combine: priority providers first, then remaining ones
            const uniqueProviders = [
                ...availablePriorityProviders,
                ...remainingProviders,
            ];

            setProviders(uniqueProviders);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchModels();
    }, [fetchModels]);

    function calculateCost(
        costIn: number,
        costOut: number,
        inT: number,
        outT: number,
    ) {
        if ([costIn, costOut, inT, outT].some(isNaN)) return null;
        return (inT / 1e6) * costIn + (outT / 1e6) * costOut;
    }

    function showResult() {
        const total = calculateCost(
            parseFloat(inputCost),
            parseFloat(outputCost),
            parseInt(inputTokens),
            parseInt(outputTokens),
        );
        setResult(
            total !== null
                ? `Total estimated cost: $${total.toFixed(6)}`
                : "Please fill in all fields correctly.",
        );
    }

    function addToComparison() {
        if (!model) return;
        const { id, inputPrice, outputPrice } = JSON.parse(model);
        if (!comparison.some((m) => m.id === id)) {
            setComparison([...comparison, { id, inputPrice, outputPrice }]);
        }
    }

    function removeFromComparison(id: string) {
        setComparison(comparison.filter((m) => m.id !== id));
    }

    // update Chart.js whenever comparison or token counts change
    useEffect(() => {
        if (!chartRef.current) return;
        const ctx = chartRef.current.getContext("2d")!;
        const labels = comparison.map((m) => m.id.split("/")[1] || m.id);

        const newInputCosts = comparison.map((m) => {
            const inputCost =
                (parseInt(inputTokens) / 1e6) * (m.inputPrice * 1e6);
            return isNaN(inputCost) ? 0 : inputCost;
        });

        const newOutputCosts = comparison.map((m) => {
            const outputCost =
                (parseInt(outputTokens) / 1e6) * (m.outputPrice * 1e6);
            return isNaN(outputCost) ? 0 : outputCost;
        });

        if (chartInstance.current) {
            chartInstance.current.data.labels = labels;
            chartInstance.current.data.datasets[0].data = newInputCosts;
            chartInstance.current.data.datasets[1].data = newOutputCosts;
            chartInstance.current.update();
        } else {
            chartInstance.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Input Cost (USD)",
                            data: newInputCosts,
                            backgroundColor: "rgba(59, 130, 246, 0.8)", // blue
                            borderColor: "rgba(59, 130, 246, 1)",
                            borderWidth: 1,
                        },
                        {
                            label: "Output Cost (USD)",
                            data: newOutputCosts,
                            backgroundColor: "rgba(34, 197, 94, 0.8)", // green
                            borderColor: "rgba(34, 197, 94, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { stacked: true },
                        y: {
                            beginAtZero: true,
                            stacked: true,
                        },
                    },
                    plugins: {
                        tooltip: {
                            mode: "index",
                            intersect: false,
                            callbacks: {
                                footer: function (tooltipItems) {
                                    const dataIndex = tooltipItems[0].dataIndex;
                                    // Get current data from the chart itself
                                    const chart = tooltipItems[0].chart;
                                    const inputCost =
                                        (chart.data.datasets[0].data[
                                            dataIndex
                                        ] as number) || 0;
                                    const outputCost =
                                        (chart.data.datasets[1].data[
                                            dataIndex
                                        ] as number) || 0;
                                    const total = inputCost + outputCost;
                                    return `Total: $${total.toFixed(6)}`;
                                },
                            },
                        },
                    },
                },
            });
        }
    }, [comparison, inputTokens, outputTokens]);

    return (
        <div className="mx-auto flex max-w-6xl gap-6 p-6">
            {/* main */}
            <div className="flex-1">
                <h2 className="mb-4 text-2xl font-bold">LLM Cost Calculator</h2>
                <p className="mb-4">
                    Estimate the cost of using various LLMs based on your input
                    and output token usage.
                </p>
                <p className="mb-4">
                    Cost data is sourced from the OpenRouter API. Click{" "}
                    <a
                        href="https://openrouter.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        here
                    </a>{" "}
                    for more information about OpenRouter. Currently fetches the
                    lowest pricing for each model, which may include providers
                    that train on data.
                </p>
                <label className="mb-4 block">
                    Provider Filter:
                    <select
                        className="mt-1 w-full border p-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">— All Providers —</option>
                        {providers.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="mb-4 block">
                    Select Model:
                    <select
                        className="mt-1 w-full border p-2"
                        value={model}
                        onChange={(e) => {
                            setModel(e.target.value);
                            if (e.target.value) {
                                const { inputPrice, outputPrice } = JSON.parse(
                                    e.target.value,
                                );
                                setInputCost((inputPrice * 1e6).toFixed(6));
                                setOutputCost((outputPrice * 1e6).toFixed(6));
                            } else {
                                setInputCost("");
                                setOutputCost("");
                            }
                        }}
                    >
                        <option value="">— Select a model —</option>
                        {allModels
                            .filter(
                                (m) => !filter || m.id.startsWith(filter + "/"),
                            )
                            .map((m) => {
                                const ip = +m.pricing.prompt || 0;
                                const op = +m.pricing.completion || 0;
                                return (
                                    <option
                                        key={m.id}
                                        value={JSON.stringify({
                                            id: m.id,
                                            inputPrice: ip,
                                            outputPrice: op,
                                        })}
                                    >
                                        {`${m.id} ($${(ip * 1e6).toFixed(4)}/1M in, $${(op * 1e6).toFixed(4)}/1M out)`}
                                    </option>
                                );
                            })}
                    </select>
                </label>
                <div className="mb-4 flex gap-4">
                    <label className="flex-1">
                        Input cost per 1M tokens:
                        <input
                            readOnly
                            className="mt-1 w-full border bg-gray-900 p-2"
                            value={inputCost}
                        />
                    </label>
                    <label className="flex-1">
                        Output cost per 1M tokens:
                        <input
                            readOnly
                            className="mt-1 w-full border bg-gray-900 p-2"
                            value={outputCost}
                        />
                    </label>
                </div>
                <label className="mb-4 block">
                    Number of input tokens:
                    <input
                        type="number"
                        className="mt-1 w-full border p-2"
                        value={inputTokens}
                        onChange={(e) => setInputTokens(e.target.value)}
                    />
                </label>
                <label className="mb-4 block">
                    Expected number of output tokens:
                    <input
                        type="number"
                        className="mt-1 w-full border p-2"
                        value={outputTokens}
                        onChange={(e) => setOutputTokens(e.target.value)}
                    />
                </label>
                <p className="mb-4 block text-sm text-gray-500">
                    (Note: Changes to token counts will propagate to all
                    calculations. <strong>Be careful with this</strong>, since
                    different models produce different numbers of
                    tokens—especially reasoning models!)
                </p>
                <button
                    className="mr-2 bg-blue-600 px-4 py-2 text-white"
                    onClick={showResult}
                >
                    Calculate
                </button>
                <button
                    className="bg-green-600 px-4 py-2 text-white"
                    onClick={addToComparison}
                >
                    Add to Comparison
                </button>
                <div className="mt-4 font-semibold">{result}</div>

                <p className="mt-4 block text-sm text-gray-500">
                    (Disclaimer: This calculator is for estimation purposes
                    only. Notably, it does not account for models with pricing
                    tiers based on context length like Gemini 2.5 Pro and Grok
                    4, nor does it consider factors like image processing,{" "}
                    <a
                        href="https://openrouter.ai/docs/features/web-search#pricing"
                        className="text-blue-500 hover:underline"
                    >
                        web search costs
                    </a>
                    ,{" "}
                    <a
                        href="https://openrouter.ai/docs/features/prompt-caching"
                        className="text-blue-500 hover:underline"
                    >
                        prompt caching
                    </a>
                    ,{" "}
                    <a
                        href="https://openrouter.ai/docs/features/images-and-pdfs#pricing"
                        className="text-blue-500 hover:underline"
                    >
                        PDF processing
                    </a>
                    , etc.)
                </p>
            </div>

            {/* sidebar */}
            <div className="flex max-h-[90vh] w-96 flex-col border-l pl-4">
                <h3 className="mb-2 text-xl font-semibold">Comparison</h3>

                <div className="mb-4 h-80">
                    <canvas ref={chartRef} />
                </div>

                <div className="flex-1 overflow-y-auto">
                    {comparison.map((m) => {
                        const cost = calculateCost(
                            m.inputPrice * 1e6,
                            m.outputPrice * 1e6,
                            parseInt(inputTokens),
                            parseInt(outputTokens),
                        );
                        return (
                            <div key={m.id} className="mb-4 border-b pb-2">
                                <strong>{m.id}</strong>
                                <br />${`${(m.inputPrice * 1e6).toFixed(4)}`}/1M
                                in, ${`${(m.outputPrice * 1e6).toFixed(4)}`}/1M
                                out
                                <br />
                                Est:{" "}
                                {cost !== null
                                    ? `$${cost.toFixed(6)}`
                                    : "Invalid"}
                                <br />
                                <button
                                    className="mt-2 bg-red-500 px-2 py-1 text-white"
                                    onClick={() => removeFromComparison(m.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// TODO: make the "Remove" button into an X floted to the right of the model cost calculation, since most model names are short enough to fit on one line even with some space clipped away
// TODO: should we use 'proper' model names instead of model IDs (e.g., "OpenAI GPT-4" instead of "openai/gpt-4")?
// TODO: Add support for images (probably: add image cost next to input/output cost boxes, then make the input and output boxes flex to fit on one line just like the cost boxes and add a third box for image cost, so you get a 2x3 grid of boxes, the upper row of which is not editable.) Image cost should be included as a segment of the chart stack! (Or should it just be included as part of the 'input' cost?)
//  Be sure to consider the fact that some models don't support images at all! Should we add a warning when a model in the comparison doesn't support images but the user-inputted image count is nonzero?
// TODO: Make the dropdown boxes look nicer? Maybe add provider icons, even? In an ideal world, it would be a search box that filters the model list as you type, but that would require a lot of work to implement.
// TODO: Maybe the 'upper row' (cost row) of boxes should just be text? It isn't editable, so we could save space by not making it a full input box.
// TODO: Add warning if input tokens exceed context length
// TODO: Add support for dynamic pricing models (e.g., Gemini 2.5 Pro, Grok 4) (probably has to be hard-coded though, since it's not available via the API)
// TODO: Add an 'independent' mode where token counts are linked to model instead of being global.
// TODO: Add rough model performance metrics to comparison chart as a second axis, probably based on Artificial Analysis' API (see https://artificialanalysis.ai/documentation). Note that this requires attribution and response caching to avoid exceeding the API rate limits, as per their documentation.
// TODO: Skip providers who train on data (see https://github.com/lumitry/vela-chat/issues/66; may either require doing the second method or storing the model list on the server since I obviously can't just give people my API key)

// Note: If you want straight-up input and output prices, not estimated costs based on token counts, see https://model-prices.vercel.app built by theo (github: @t3dotgg)
