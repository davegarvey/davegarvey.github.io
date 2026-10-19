---
layout: post
title: Letting go of the gearstick
date: 2026-10-19 01:11:30 +0200
description: Choosing a model for every prompt is like changing gear by hand. I built a plugin to test whether a new kind of model, Jev, could be the automatic gearbox. It did well, but I'm not ready to give up control yet.
image:
  path: /assets/images/cards/letting-go-of-the-gearstick-bf939ad7.png
  width: 1200
  height: 630
  alt: "A manual gearbox's H-shaped shift pattern with three gates labelled S, M and L, for small, medium and large models. The L gate glows orange and leads down to a fourth position marked AUTO."
tags:
  - llms
---

Anyone who works with AI knows about model choice. Before you ask something, you pick which model will answer, and how hard it will think. For many people, that choice will go the way of the manual gearbox. Everyone used to drive a manual and choose the right gear for their speed; now most new cars are automatic, and few people miss the gearstick.

Last month TypeSafe released Jev, a new kind of model built for making decisions. It occurred to me that this kind of model could become the automatic gearbox for LLMs, so I wrote a small plugin to test it against other ways of choosing the model. Jev came out on top, and on the hardest cases it chose correctly every time. Even so, I'm not ready to give up control yet.

<!--more-->

## Choosing a model adds friction

Most providers offer a family of models of different sizes, capabilities and costs. That's good for the user, who can pick what suits the job. Some models are fast but not very intelligent. Some can describe what's in an image and some can't. Some are expensive but very capable.

But it's up to you to pick the right one, and that adds friction at the start of every task. Most drivers just want to get where they're going, and don't care which gear gets them there. And as with gears, picking the wrong model has a cost: a big model wastes money on a simple question, and a small one makes a mess of a hard one.

There's also the paradox of choice: given too many options, people find it harder to choose. I think that's why most providers offer two or three variants of their latest range, and no more. Gearboxes are the same. Manuals usually had five gears, six in a fancy car. Automatics now have eight to 10. Ten gears in a manual would be infuriating, but in an automatic they make sense: you get exactly the right gear without thinking about it. Once the choice is automatic, more options become an advantage.

You can already see this in chatbots. Go to chatgpt.com as a new user and you get no choice at all, just a box to type in. Pay for an account and you can choose instant, medium or high. You don't see the model or the reasoning level; it's been boiled down to three options, a bit like a car that offers eco, comfort and sport. I hope you're enjoying the car metaphor.

## Can a model choose the model?

TypeSafe markets Jev as the first "System One" model (also known as a decision model). Unlike the LLMs we've all got used to, it doesn't respond with text. You give it some context and a set of options, and it tells you how likely each one is to be right. That felt like a good match for choosing a model, and I wondered how good it would be.

Jev is only available as a hosted service. I wanted to test it against alternatives that run locally:

- **Embeddings.** A well-established way to classify text. You turn the request into an embedding, a vector that captures its meaning, and match it to the most similar labelled examples.
- **A small general LLM.** You can make an LLM answer to a fixed JSON schema, so in theory a small one could mimic a System One model's output, choice and confidence included. I used Gemma 4 E2B.
- **Kev.** An open-source equivalent of Jev, built on Qwen. A router runs on every request, so I like the idea of one I can host myself.

## The test

The test was simple. I set up three tiers of model, gave each router a series of requests with an intended tier, and counted how often it chose that tier.

The tiers were:

- **Small:** Gemma 4 E2B.
- **Medium:** Qwen 3.6 35B, with thinking off.
- **Large:** the same Qwen, with thinking on.

There were two sets of requests:

- **39 short, clear requests**, including an 18-turn coding session.
- **15 harder cases:** long prompts of about 2,000 to 3,300 tokens, where the request is buried in pasted material, and a session with terse follow-ups such as "now fix it", whose right tier depends on what came before.

To run it, I built a plugin for OpenCode, the open-source coding agent. Before each turn runs, the plugin asks a router which tier should handle it, then switches the model to match. OpenCode already lets a plugin change the model and reasoning level for each turn, so the whole thing, routing included, came to about 1,000 lines.

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

A router needs to know when it might be wrong, so it can fall back to a safe default. Gemma was no use for this. It reported at least 90% confidence every time, including on three long prompts it got wrong. In contrast, Jev's confidence was well placed: in the short set, all 31 of its answers at 80% confidence or above were right.

Confidence scores need care, though. Kev copies Jev's API and uses the same scale, but its scores ran much lower: a median of 25%, against Jev's 95%. A threshold that suits one model can be wrong for another.

## Switching has a cost

So a router can choose well. Whether it should switch is another matter. The point of moving to a smaller model is to save money, but the switch itself can cost more than it saves.

When you switch model, the new one has to read the whole conversation again. Say you start a hard task on a big model, switch to a small one for a simple question, then switch back for a harder one. Each switch can mean reading the full context again at the full input price.

Had you stayed on the big model, it would have read most of that context from its cache, and providers now discount cached tokens heavily. On Claude Opus 5.5, reading 100,000 cached tokens costs 2 cents. Switching that conversation to the cheaper Sonnet 5.5 costs at least 20 cents just to read it in, 10 times as much. By trying to be clever, you can end up paying more.

Changing the reasoning level within a model can be almost free, because the model can reuse the conversation it has already read. Whether it does depends on where the model's prompt format puts the setting. Qwen puts its thinking switch at the end, so everything before it is reused: in my tests, turning thinking on or off took 39 ms. gpt-oss puts its effort level near the top, so changing it means reading everything again, which took 7.8 s.

So switching only pays when the saving outweighs the cost of re-reading, and that favours tiers that share a model and its cache.

## Why I still choose

I like having control, and I don't think I'm alone. When OpenAI launched GPT-5 in August 2025, ChatGPT used a router to choose between its variants for each prompt. For part of launch day the router was out of action, and Sam Altman admitted it made GPT-5 seem "way dumber". OpenAI promised to make it clearer which model was answering, and let Plus subscribers go back to GPT-4o.

I had a small taste of this myself. When I started using AI for coding, I had a GitHub Copilot subscription, which offered an auto mode with a 10% discount. I tried it and never used it again. I preferred some models over others, for how they responded and frankly for how good they were, and I thought I chose better than auto did.

I still feel that way. My subscriptions have a five-hour quota and a weekly one, and I choose my own models to make them last, like driving economically to save fuel. If I handed that to an automatic selector, it might decide my question was hard, pick a large model and eat my quota.

## Control goes beyond the model

Everything so far has been about one person choosing models for themselves. My test put the gearbox in the coding harness, as a plugin, which suits an individual.

In a professional setting, organisations want control in one place, under their own rules. They may use models from several providers, run on premises, in a private cloud or through hosted APIs. That brings two kinds of need:

- **Technical:** translating between formats and protocols, and routing each request to the right model.
- **Governance:** access control, payload inspection, quotas and rate limits, analytics and observability.

With all that to manage, it makes sense to move the gearbox somewhere central as well, and that's what AI gateways are for. For an organisation, it means the decision about which model gets a request is made outside the model, under rules the organisation sets.

## Keeping the gearstick, for now

I think manual selection is here to stay for a while, and like the manual gearbox, it will last longest with enthusiasts, especially those on a budget. For most people, though, automatic will be better, and my test suggests the models to do it are already here. The friction is in everything around it.

## Further reading

- David Garvey, [auto-model](https://github.com/davegarvey/auto-model/tree/blog-2026-10), GitHub, October 2026. Everything behind this post: the plugin, the test cases and the report from every run, including the details I've left out here.
- TypeSafe, [Introducing System One models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev), September 2026. TypeSafe's own case for a model that answers questions without writing any text.
- Jared Palmer, [Kev](https://github.com/jaredpalmer/kev), GitHub, September 2026. The open equivalent of Jev, if you want to try a System One model on your own machine.
- Carl Franzen, [OpenAI returns old models to ChatGPT as Sam Altman admits 'bumpy' GPT-5 rollout](https://venturebeat.com/ai/openai-returns-old-models-to-chatgpt-as-sam-altman-admits-bumpy-gpt-5-rollout), VentureBeat, August 2025. What happens when an automatic gearbox ships before it's ready.
- GitHub, [Auto model selection is generally available in GitHub Copilot in Visual Studio Code](https://github.blog/changelog/2025-12-10-auto-model-selection-is-generally-available-in-github-copilot-in-visual-studio-code/), December 2025. Copilot's auto mode, and the discount it offers for handing over the choice.
- Anthropic, [Pricing](https://platform.claude.com/docs/en/about-claude/pricing), accessed October 2026. Compare the base input price with the price of a cache hit to see why switching models mid-conversation adds up.
- Barry Schwartz, [The paradox of choice](https://www.ted.com/talks/barry_schwartz_the_paradox_of_choice), TED, 2005. The case that more options can leave us worse off.
