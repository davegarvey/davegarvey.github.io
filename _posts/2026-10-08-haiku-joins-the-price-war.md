---
layout: post
title: Haiku joins the price war
date: 2026-10-08 11:57:22 +0200
image:
  path: /assets/images/cards/haiku-joins-the-price-war-95a4f4f1.png
  width: 1200
  height: 630
  alt: Two identical price tags, one blue and one orange, each attached to a receipt. The orange receipt is three times as long as the blue one. The title reads Haiku joins the price war.
description: Anthropic has cut Haiku to Luna's price. It's smarter and faster per token, but it uses so many more tokens that it often costs a lot more per task.
tags:
  - llms
  - economics
---

A couple of weeks ago I wrote that Anthropic had [stayed out of the fight]({% post_url 2026-09-26-downstream-of-deepseek %}) at the cheap end of the market. Yesterday it joined in. The new Haiku 5.5 is 90% cheaper than the previous version, which brings it down to what OpenAI charges for Luna, its equivalent model. On paper it's the better model. But it uses so many tokens to get there that, per task, it often costs a lot more than Luna, and at the top of its range OpenAI's mid-tier model does more for the same money.

<!--more-->

## Why now

Haiku 4.5's price hadn't moved since it launched a year ago, while OpenAI cut Luna's by 90% over the summer. Anthropic took more than two months to respond.

My guess is that its customers pushed it, driven by a desire to control AI spending. In the early days of agents everyone was token-maxxing; now organisations set budgets, and some are hitting them a lot earlier than expected. Uber [used up its entire 2026 AI budget by April](https://www.forbes.com/sites/janakirammsv/2026/05/17/uber-burns-its-2026-ai-budget-in-four-months-on-claude-code/), after Claude Code spread across its engineers.

I've seen how quickly the cost mounts. At work I use Claude through a company account, and although I'm not a heavy user, my daily spend can sometimes be surprisingly high. Scale that up over a month, then across a whole organisation, and it's easy to see why budgets are squeezed.

A lot of that spend goes on work that a cheap model would handle fine, such as implementing a well-written specification. Enterprises that have standardised on Anthropic can't just send that work to DeepSeek or OpenAI, because governance won't allow it. So their only cheap option was Haiku 4.5, and it wasn't good value. That left a gap at the bottom of Anthropic's range, and a growing risk that its own customers would look elsewhere to fill it.

## Two good numbers and two bad ones

Artificial Analysis has already benchmarked Haiku 5.5, and the headline figures look great. At maximum effort it scores 43 on their Intelligence Index against Luna's 38, and it generates output at about 240 tokens a second, nearly twice Luna's rate.

But it's not all good news. At maximum effort Haiku takes over five minutes to start answering, three times as long as Luna, and each task costs about three times as much. Both have the same cause. Haiku seems to get its higher score by thinking for longer, writing two to three times as many tokens as Luna before it answers, and the cost of those tokens adds up. What doesn't add up is paying three times as much for a five-point lead in intelligence.

<figure>
  <p class="figure-title">OpenAI matches or beats Haiku at every price</p>
  <img src="{{ '/assets/images/haiku-joins-the-price-war/haiku-luna-sol-cost.svg' | relative_url }}" alt="Line chart of Intelligence Index against cost per task, log scale, at five effort levels for each model. GPT-6 Luna runs from 22 points at $0.0045 to 38 at $0.07. Claude Haiku 5.5 runs from 29 at $0.02 to 43 at $0.21, level with or just below OpenAI's models throughout. GPT-6.1 Sol runs from 42 at $0.13 to 52 at $0.72. At $0.21 a task, Haiku on max effort scores 43 and takes 323 seconds to its first token; Sol on medium scores 48 and takes 6 seconds.">
  <figcaption>Artificial Analysis Intelligence Index against average cost per task in US dollars, log scale. Each point is an effort level, from low to max. Source: Artificial Analysis, 8 October 2026.</figcaption>
</figure>

## Haiku's sweet spot

Another way to compare the two is on an equal footing: adjust each model's reasoning effort until they score the same, then see which is quicker and cheaper. Do that, and Haiku comes out ahead. On high effort it matches Luna on max for about the same cost per task, but it starts answering in under half a minute, where Luna takes nearly two. If you want Luna's quality and don't want to wait for it, this is one of the few places where Haiku makes sense. Below it, Luna gives you much the same for a little less.

## Squeezed from the middle

So far the comparison has been at the bottom and middle of Haiku's range. But what about the top? There, OpenAI's mid-tier model is the better buy. For what Haiku costs per task on max effort, GPT-6.1 Sol on medium effort scores higher and starts answering in seconds instead of minutes. Sol's list price is 20 times Haiku's, but it uses far fewer tokens. In the open market, Haiku sits in the gap between the cheap models and the mid-tier, and Sol already fills most of it.

Within Anthropic's own range the picture is different, because Sonnet 5.5 is the opposite of frugal. On medium effort it matches Haiku's score on extra-high and starts answering in seconds where Haiku takes over a minute, but it costs four times as much per task. So for a customer who's locked in, Haiku is still the cheap option and Sonnet the quick one.

## Why it matters

If you can choose your provider, Haiku 5.5 won't make much difference, because there are already plenty of good cheap models to choose from. The ones who gain are enterprises locked into Anthropic, which now have a viable low-cost model for simpler work again.

They're the customers I think this launch is really for. Anthropic doesn't need to win the cheap end of the market, but it does need to stop its customers churning, and some can leave more easily than others.

Individuals like me can switch at any time. I pay for both OpenAI and Anthropic, and I use both on every project. I've switched between them many times, and I like to spend my tokens efficiently, so small, capable models matter to me. If Anthropic doesn't have one that's good value, I'll use an alternative.

Organisations care about price too; they're just slower to act on it. Governance holds them in place, but not for ever.

Haiku 4.5 was competitive when it launched, but it had gone stale. Haiku 5.5 puts Anthropic back in the running, and for now that's probably enough.

## Further reading

- Anthropic, [Introducing Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5), October 2026. The launch post, with prices, the long-prompt surcharge and Anthropic's own benchmarks against Luna.
- Artificial Analysis, [Claude Haiku 5.5 vs GPT-6 Luna](https://artificialanalysis.ai/models/releases/comparisons/claude-haiku-5-5-vs-gpt-6-luna), accessed 8 October 2026. The independent figures in this post, broken down by effort level.
- VentureBeat, [Anthropic launches Claude Haiku 5.5 with 90% API price reduction, matching GPT-6 Luna](https://venturebeat.com/technology/anthropic-launches-claude-haiku-5-5-with-90-api-price-reduction-matching-gpt-6-luna), October 2026. A useful summary of the launch.
- Janakiram MSV, [Uber burns its 2026 AI budget in four months on Claude Code](https://www.forbes.com/sites/janakirammsv/2026/05/17/uber-burns-its-2026-ai-budget-in-four-months-on-claude-code/), Forbes, May 2026. What happens when a coding agent spreads faster than the finance model behind it.
- Anthropic, [Pricing](https://platform.claude.com/docs/en/docs/about-claude/pricing), accessed 8 October 2026. Current prices for every Claude model, including Haiku 4.5 for comparison.
