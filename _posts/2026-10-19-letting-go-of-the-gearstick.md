---
layout: post
title: Letting go of the gearstick
date: 2026-10-19 01:11:30 +0200
feed_id: https://davegarvey.github.io/2026/10/19/letting-go-of-the-gearstick
description: Choosing a model for every prompt is like changing gear by hand. I built a plugin to test whether a new kind of model, Jev, could be the automatic gearbox. It did well, but I'm not ready to give up control yet.
image:
  path: /assets/images/cards/letting-go-of-the-gearstick-bf939ad7.png
  width: 1200
  height: 630
  alt: "A manual gearbox's H-shaped shift pattern with three gates labelled S, M and L, for small, medium and large models. The L gate glows orange and leads down to a fourth position marked AUTO."
tags:
  - llms
---

Anyone who works with AI knows about model choice: before you ask something, you pick which model will answer, and how hard it will think. For many people, that choice will go the way of the manual gearbox. Everyone used to drive a manual and choose the right gear for their speed; now most new cars are automatic, and few people miss the gearstick.

Last month TypeSafe released Jev, a new kind of model built for making decisions. It occurred to me that this kind of model could become the automatic gearbox for LLMs, so I wrote a small plugin to test it against other ways of choosing the model. Jev came out on top, and on the hardest cases it chose correctly every time. Even so, I'm not ready to give up control yet.

<!--more-->

## Choosing a model adds friction

Most providers offer a family of models of different sizes, capabilities and costs. That's good for the user, who can pick what suits the job. Some models are fast but not very intelligent. Some can describe what's in an image and some can't. Some are expensive but very capable.

But it's up to you to pick the right one, and that adds friction at the start of every task. Similarly, most drivers just want to get where they're going and don't care which gear gets them there. And as with gears, picking the wrong model has a cost: a big model wastes money on a simple question, and a small one makes a mess of a hard one.

There's also the paradox of choice: given too many options, people find it harder to choose. I think that's why most providers offer two or three variants of their latest range, and no more. When OpenAI added Astra at the top of its GPT-6 range, it left out Terra, the middle tier of GPT-5.6, so the range stayed at three. Gearboxes are the same. Manuals usually had five gears, six in a fancy car. Automatics now have eight to ten. Ten gears in a manual would be infuriating, but in an automatic they make sense: you get exactly the right gear without thinking about it. Once the choice is automatic, more options become an advantage.

You can already see this in chatbots. Open ChatGPT as a new user and you get no choice at all, just a box to type in. Pay for an account and you can choose instant, medium or high. You don't see the model or the reasoning level; it's been boiled down to three options, a bit like a car that offers eco, comfort and sport. I hope you're enjoying the car metaphor.

## Can a model choose the model?

TypeSafe markets Jev as the first "System One" model (also known as a decision model). Unlike the LLMs we've all got used to, it doesn't respond with text. You give it some context and a set of options, and it tells you how likely each one is to be right. That felt like a good match for choosing a model, and I wondered how good it would be.

To find out, I tested Jev 1.13 against three alternatives:

- **Embeddings.** A well-established way to classify text. You turn the request into an embedding, a vector that captures its meaning, and match it to the most similar labelled examples. I used EmbeddingGemma.
- **A small general LLM.** You can make an LLM answer to a fixed JSON schema, so in theory a small one could mimic a System One model's output. I used Gemma 4 E2B.
- **An open-source decision model.** Kev is an open-source equivalent of Jev. A router runs on every request, so I like the idea of one I can host myself. I used Kev-4B, built on Qwen 3.5.

## The test

The test was simple. I set up three tiers of model, gave each router a series of requests with an intended tier, and counted how often it chose that tier.

I gave each router a description of the work each tier was for:

- **Small:** quick, low-stakes requests, such as explaining a short snippet, a one-line fix or running a command.
- **Medium:** typical coding work, such as implementing a well-specified feature, writing tests or routine debugging.
- **Large:** hard problems that need careful reasoning, such as a subtle bug, an architecture decision or a large refactor.

There were two sets of requests:

- **39 short, clear requests**, including an 18-turn coding session.
- **15 harder cases:** long prompts of about 2,000 to 3,300 tokens, where the request is buried in pasted material, and a session with terse follow-ups such as "now fix it", whose right tier depends on what came before.

To run it, I built a plugin for OpenCode, an open-source coding agent that lets plugins change the model and reasoning level for each turn. Before each turn runs, the plugin asks a router which tier should handle it, then switches the model to match.

## What it showed

Jev was the most accurate router on both sets of requests, and the only one to get every hard case right.

<figure>
  <p class="figure-title"><strong>Only Jev kept up on the hard cases</strong></p>
  <img src="{{ '/assets/images/letting-go-of-the-gearstick/router-agreement.svg' | relative_url }}" alt="Dot chart of the share of test requests each router sent to the intended tier, for 39 short, clear requests and 15 hard ones. Jev: 95% and 100%. Gemma 4 E2B: 74% and 80%. Kev: 77% and 60%. Embeddings: 77% and 53%.">
  <figcaption>Share of test requests sent to the intended tier. Hard cases are long prompts and terse follow-ups. Samples are small: on the hard cases, the 95% intervals span about 20 points either side. Source: auto-model, October 2026.</figcaption>
</figure>

On short, clear requests, every router did respectably. Jev chose the intended tier for 37 of 39, and the others for about three in four. Their mistakes were mostly the safe kind, sending a simple task to a bigger model than it needed. Gemma was the exception: it sent five of 13 medium tasks to the small model.

The hard cases separated them. Jev got all 15 right. Gemma managed 12, Kev nine and the embedding router eight.

## Confidence matters

A router needs to know when it might be wrong, so it can fall back to a safe default. This was Gemma's weak spot. It reported at least 90% confidence every time, including on three long prompts it got wrong. In contrast, Jev's confidence was well placed: in the short set, all 31 of its answers at 80% confidence or above were right.

Confidence scores need care, though. Kev copies Jev's API and uses the same scale, but its scores ran much lower: a median of 25%, against Jev's 95%. A threshold that suits one model can be wrong for another.

## Switching has a cost

So my test suggests a router can choose well. Whether it should switch is another matter. The point of moving to a smaller model is to save money, but the switch itself can cost more than it saves.

When you switch model, the new one has to read the whole conversation again. Say you start a hard task on a big model, switch to a small one for a simple question, then switch back for a harder one. Each switch can mean reading the full context again at the full input price.

Had you stayed on the big model, it would have read most of that context from its cache, and providers now discount cached tokens heavily. On Claude Opus 5.5, reading 100,000 cached tokens costs 2 cents. Switching that conversation to the cheaper Sonnet 5.5 costs at least 20 cents just to read it in, 10 times as much. By trying to be clever, you can end up paying more.

One way round this is to stay on one model and change only its reasoning level. That can be almost free, because the model can reuse the conversation it has already read. But whether it does depends on where the model's prompt format puts the setting.

My medium and large tiers were the same model, Qwen 3.6 35B, with thinking off and on. Qwen puts its thinking switch at the end, so switching between the two tiers took just 39 ms: the cached conversation was reused. Conversely, gpt-oss puts its effort level near the start, so changing it took 7.8 s: the whole conversation had to be read again.

So a switch pays off only if the smaller model saves more on output and thinking than it costs to re-read the conversation. Tiers that share a model and its cache avoid most of that cost.

## Why I still choose

The funny thing is, the test suggests a router can do the job, caveats and all, yet I'm not about to use one. I like choosing my own models.

Plenty of people feel the same. When OpenAI launched GPT-5 in August 2025, ChatGPT used a router to choose between its variants for each prompt. For part of launch day the router was out of action, and Sam Altman admitted it made GPT-5 seem "way dumber". OpenAI promised to make it clearer which model was answering, and let Plus subscribers go back to GPT-4o.

I had a small taste of this myself. When I started using AI for coding, I had a GitHub Copilot subscription, which offered an auto mode with a 10% discount. I tried it and never used it again. I preferred some models over others, for how they responded and frankly for how good they were, and I thought I chose better than auto did.

I still feel that way. My subscriptions have a five-hour quota and a weekly one, and I choose my own models to make them last, like driving economically to save fuel. If I handed that to an automatic selector, it might decide my question was hard, pick a large model and eat my quota.

I expect to change my mind, though. Once I trust a router to make the choices I would, why wouldn't I use it? When I hire a car now, I always pick an automatic.

## Where should the gearbox go?

My test put the gearbox in the coding harness, but there are three places it could go, and each suits different people.

**In the model.** Some models already decide for themselves how hard to think. This is the easiest option, because nobody has to choose anything. But the choice is baked in, so you can't adjust it, and it can only vary how hard one model thinks. It can never send a simple question to a cheaper model.

**In the harness.** This is what I tested. Taking the choice out of the model means it can pick any model from any provider, as well as the reasoning level. For an individual it's a small job: a plugin and a config file in a tool you already use. But it depends on what the harness lets you change. Open-source harnesses such as OpenCode tend to be built for it; with a closed one, you get whatever its makers chose to expose. It also scales badly. If you look after a team of developers, every change has to be made on every machine.

**In a gateway.** An AI gateway sits between applications and the models they call, so the choice is made in one place, under rules you set. That's what organisations want. They may use models from several providers, run on premises, in a private cloud or through hosted APIs, and alongside routing they need access control, payload inspection, quotas, and analytics and observability.

For an individual, central governance matters less: it's just you. But a gateway still pays off for anyone building software. If your app calls a gateway, changing provider becomes a configuration change. You don't have to swap your OpenAI integration for an Anthropic one; the gateway does that work.

## Keeping the gearstick, for now

I don't expect manual model selection to go away any time soon, at least among enthusiasts and professionals like me. But for everyone else, automatic selection is only a matter of time. My test suggests the models to do it are already here; what's missing is everything around them.

To gain widespread adoption, automatic selection needs to be built into the harnesses people already use, and be good enough to earn their trust. Now it's up to model vendors and harness developers to convince the market.

## Further reading

- David Garvey, [auto-model](https://github.com/davegarvey/auto-model/tree/blog-2026-10), GitHub, October 2026. Everything behind this post: the plugin, the test cases and the report from every run, including the details I've left out here.
- TypeSafe, [Introducing System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), September 2026. TypeSafe's own case for a model that answers questions without writing any text.
- Jared Palmer, [Kev](https://github.com/jaredpalmer/kev), GitHub, September 2026. The open equivalent of Jev, if you want to try a System One model on your own machine.
- Carl Franzen, [OpenAI returns old models to ChatGPT as Sam Altman admits 'bumpy' GPT-5 rollout](https://venturebeat.com/ai/openai-returns-old-models-to-chatgpt-as-sam-altman-admits-bumpy-gpt-5-rollout), VentureBeat, August 2025. What happens when an automatic gearbox ships before it's ready.
- GitHub, [Auto model selection is generally available in GitHub Copilot in Visual Studio Code](https://github.blog/changelog/2025-12-10-auto-model-selection-is-generally-available-in-github-copilot-in-visual-studio-code/), December 2025. Copilot's auto mode, and the discount it offers for handing over the choice.
- Anthropic, [Pricing](https://platform.claude.com/docs/en/about-claude/pricing), accessed October 2026. Compare the base input price with the price of a cache hit to see why switching models mid-conversation adds up.
- Anthropic, [Steering thinking](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost), accessed October 2026. How Claude decides for itself whether to think and how much, and why changing the effort level mid-conversation can throw away the cache.
- Barry Schwartz, [The paradox of choice](https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice), TED, 2005. The case that more options can leave us worse off.
