---
title: LLM Thoughts
description: Notes on models I've used — strengths, quirks, and when I'd pick each one.
date: 2025-08-05
draft: true
---

# LLM Thoughts

## Grok 3 Mini

Desperate to use all its context, and always uses a ton of tokens. Outstandingly fast and cheap and fairly intelligent, but lacks some of the personality that I see from R1. Not the best for brainstorming, but it may be good for summarization (& my "selective summarization" concept, where you're getting it to summarize a document keeping only specific aspects in mind, e.g. here's 20k words of wikipedia, now tell me everything relevant to subject X). I haven't tried it for that yet, but it may be decent, especially for the price.

## Gemini 2.5 Pro

We all know this already, but it often flakes on tool calls. Great for long-context tasks (doesn't try to impress you by bringing up basic info from the system prompt like Grok 3 Mini does), but it's not exactly cheap compared to some other models.

## Gemini 2.5 Flash

This is the one that got away. I used to use 2.5 Flash Preview (non-thinking variant) for literally everything. It was fine at basic code and scripting, good for creative and at long context, et cetera... but then, after 2.5 Flash had been formally released for a little over a month (iirc), the preview model got sunsetted and my precious $0.15 / 1M in & and $0.60 / 1M out model was gone. The new 2.5 Flash is ~6x more expensive, sometimes more, and it often forgets to do reasoning entirely (even though I set `reasoning.effort` to `high`). To be fair, Grok 3 Mini also forgets sometimes, but it does so in its own way: Since G3M's reasoning data is provided to the user, I can see that it just forgets to reason entirely, starting the `<think>` tag's contents with a direct answer and never closing the tag. Gemini 2.5 Flash, on the other hand, most often just never sends any reasoning data at all. I've had it, on one occasion, send only a bunch of reasoning summaries and literally zero main completion text, but that was a one-off, and it was admittedly at ~20k context length. FWIW, I've used 2.5 Flash Preview at over 100k context length without major issues before, but that was the non-thinking variant, so it's not like I can really compare them. What I *will* say is that 2.5 Flash is a good model for general tasks, even if the value proposition got almost entirely destroyed by the new pricing.

2.5 Flash has horrible spatial understanding. At least with the preview model, I could literally draw a diagram (specifically a floor plan with draw.io) and tell it "north is on the right side of the image" and it would hallucinate every cardinal direction being in every other direction of the image. This may be less of an issue with reasoning time, but I don't have enough testing in that regard. I've also noticed degradation of response quality when you attach an image, but only for that first response. Afterwards, it seems to be just fine.

## Kimi K2

I love this model. It's fast, dirt cheap, and it's so incredibly quirky. I think the providers on OpenRouter must be using weird quants and/or default temperature settings because sometimes I'll send a message and it'll just give me a literal one-word answer, other times it will misinterpret part of my prompt as me asking it to respond in a certain kind of format and all the sudden it's speaking like a Shakespearean actor or whatever. It's also got weird formatting issues where it sometimes just uses plain text, no markdown, but I honestly haven't even looked into whether Moonshot specifies that it should be run with a system prompt specifying to use markdown, so that may be may bad.

My two gripes are that it is *not* a long context model by any means, and it often interprets prompts in unexpected ways. For example, if I ask it to help me come up with names and give some context on the kind of names I'm looking for, it will often just give me one pretty decent name, usually with no fluff or wasted tokens in the answer. That's great in theory, but I often want a few candidates to try out. In my experience, non-reasoning models (like K2) are typically more likely to give you a ton of options, with reasoning models still typically doing that but occasionally thinking that they've cooked up a really great idea and only responding with that one idea. K2 is the latter, despite not having a reasoning process, which is interesting to me.

But who cares about that when you can just ask it to generate a few options? Kimi K2 is genuinely the best model I've used for brainstorming names and one of the best models for fleshing out creative ideas. I'd argue Deepseek-V3-0324 and R1-0528 are better for the latter, but for coming up with names, K2 is the best I've used. Even Claude comes up with cliché names when you ask it not to, even if it *is* less likely to respond with "Doctor Elara Veyra Vex" or whatever. Kimi K2 has the lowest LLM slop rating on EQBench's [Creative Writing V3](https://eqbench.com/creative_writing.html) benchmark, with the worst slop it generates being "Kael" and "Keter". Gemini 2.5 Flash, for reference, has "Kaelen", "Elara", "Keter", "Lyra", etc., which gets really annoying really quick. Not everybody needs a primary antagonist type name. (K2 also gets the third-best slop rating on EQBench's [Longform Writing](https://eqbench.com/creative_writing_longform.html) benchmark, just behind Claude 4 Opus and Sonnet.)

## Deepseek R1-0528 (& Deepseek V3-0324)

I was surprised by how much personality R1 has. It doesn't have the same formatting quirks as Kimi, but it will mimic your style without feeling patronizing (unlike a certain 2.5 Flash I can name, who often responds to me saying "hey mate, (...)" with "Of course, mate!", which just irks me. don't act like we're friends, gemini, you're a robot). R1 is exceptionally smart, good at long context, fairly quick, and quite cheap. It's got some slop, but not nearly as much as Gemini, and in my (admittedly limited) experience with it, I haven't had any instances of it forgetting to close formatting tags. There was one instance where I said something along the lines of "Wait a minute, octopi can kill sharks?! That's so cool!" and Deepseek-Chat-V3-0324 responded with a random Javascript diff, which was weird, but that was admittedly a free version of the model, so I'll withhold judgment on that.

Here's the first few lines of that DSV3 response btw:
```diff
").json({
-  //       msg: "Sent too many request. Wait a minute...",
-  //     });
-  //   }
-
-  //   limiter.insert(key, true, duration);
-  //   next();
-  // };
-
-  const rateLimiterMiddleware = rateLimit({
+  const rateLimiterMiddleware = rateLimit(stsRatelessOptions);
+  const rateLimitedMiddleware = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
+  });
```

## LLaMA 3.1 405B

This is an old model, but it's probably the last of the "dense titans", and presumably will be the last dense model over 150B parameters for a very long time. I think even Mistral Large uses MoE nowadays, and that's only a 100-something-B model. LLaMA 3.1 405B is not creative, it's not up-to-date, it's super slow, and it's really expensive... but it's got near-unparalleled world knowledge that MoE models can't really compete with. I typically just use the free version of this from OpenRouter since it's not worth the money in most cases, and I only use it for one-off prompts that require world knowledge, but it's a great model for that use case.

## QwQ-32B

This model was something special, and it's a shame that Qwen3-32B is a downgrade in basically every way. QwQ had good world knowledge, it was decently creative, it had good long context performance (like, shockingly good, according to Fiction.Livebench), and it was cheap enough that I can run it locally. Some argue that it reasons too much which is kind of like a cheat for better performance, which may be fair, but I'd rather have a local model that's _still_ capable of competing with the big boys all these months later, instead of a local model that's slightly faster but becomes outdated in a few months' time. And, for what it's worth, Rombo and Snowdrop are both solid finetunes that make QwQ even faster—Rombo has shortened reasoning time and Snowdrop has no reasoning at all. I typically used Rombo v3.1 back when I was heavy into local models, at an IQ4_XS quant (squeezed out enough perf over Q4_K_M on my local setup to be worth the slight downgrade in quality), and it was excellent. Obviously hosted models nowadays are clearly better, but QwQ and its finetunes are still excellent. They captured a certain magic that Qwen 3 hasn't quite captured for me yet.

## Qwen 3 235B-A22B-Thinking-2507

Remember how QwQ got flack for taking too much time in the reasoning process? Well, the new Qwen 3 235B thinking checkpoint is explicitly designed to do the same thing. They say on their HF page that it eats up a ton of reasoning tokens so it's only recommended for tasks that require that level of scrutiny. I haven't tested this one at all yet, but I have high hopes that it can show similar gains to QwQ. Also, for what it's worth, the Qwen 3 Coder model being announced is exciting; I've heard that Qwen 2.5 Coder was better than Qwen 2.5's main checkpoints even in non-coding tasks, so hopefully we get Qwen 3 Coder at lower model sizes than 480B. I'd love nothing more than a ~100B model (dense or otherwise) so that I can run it locally.

... Update: so I've tested it. This model hallucinates so much. The non-thinking version seems a little better in that regard, but this one is nearly unusable with the hallucinations, at least for anything where you've got a set of facts you need to adhere to.

## Qwen 3 30B-A3B-Thinking-2507

This model is outstanding for its speed. I was genuinely shocked. But it's still not as good as 2.5 Flash with thinking enabled, despite Qwen's benchmarks claiming it is. That's not a big surprise to me since benchmarks from the model makers are never the most reliable thing in the world, but what *did* surprise me was how good it was regardless. Sure, it eats up a ton of thinking tokens (QwQ esque), but the result is a super intelligent model for the size that made me question what I thought I knew about MoE. I ran it at Unsloth's "dynamic" Q4_K_XL quant and got 125 tokens per second on my desktop since it could fit entirely in VRAM.

But it's worse enough compared to 2.5 Flash that I can't see myself switching back to fully local just yet. In my testing, it was simply not as good at world knowledge as 2.5 Flash. That makes sense since MoE is going to almost always be worse at world knowledge and this is a *very* small MoE compared to however big 2.5 Flash presumably is, so I wasn't really surprised about that, but it's a bit of a bummer. Here's to hoping they release new 32B checkpoints, or maybe even a 72B (even though they said they wouldn't).

I get 74 TPS on my macbook with Ollama and 84 TPS with LM Studio, so it's a very fast model. It only scores 1 point lower than QwQ on Artificial Analysis, but that seems to only be the non-thinking version? Not sure. The model released yesterday as I write this so it's all still up in the air right now. This model definitely has a lot of potential, but I'm just not sure if I can trust a model this small for anything important. That said, it's so fast and resource-efficient that it would be outstanding for a local code model.

The improvement between the original checkpoint and this new one is astonishing too. The original got a 43 on Artificial Analysis, while this one got a 57. That's only 3 points shy of the new 235B-A22B non-thinking checkpoint, and it's genuinely 4 points higher than Deepseek-V3-0324, which is a 671B MoE model.

Very impressive releases from the Qwen team, especially after the original Qwen 3 release which I found to be a little underwhelming. I just wish they'd make something that can fit better in my macbook's 128GB of RAM...