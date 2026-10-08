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

A couple of weeks ago I wrote that Anthropic had [stayed out of the fight]({% post_url 2026-09-26-downstream-of-deepseek %}) at the cheap end of the market. Yesterday it joined in. Haiku 5.5 costs $0.10 per million input tokens and $0.50 per million output, a tenth of what Haiku 4.5 cost and exactly what OpenAI charges for Luna. On paper it's the better model. But it uses so many tokens to get there that, per task, it often costs a lot more than Luna, and at the top of its range OpenAI's mid-tier model does more for the same money.

<!--more-->

## Why now

Haiku 4.5's price hadn't moved since it launched a year ago, while OpenAI cut Luna's by 90% over the summer. Anthropic took more than two months to respond.

My guess is that its customers pushed it. In the early days of agents everyone was token-maxxing; now organisations want budgets, and you hear of teams burning through a quarter's allowance in a couple of weeks.

I've seen how quickly it adds up. At work I use Claude through a company account, and I'm not a heavy user, but on some days my spend has been well over $100. Add that up over a month, then across a whole organisation, and it's easy to see why budgets are squeezed.

A lot of that spend goes on work that a cheap model would handle fine, such as implementing a well-written specification. Enterprises that have standardised on Anthropic can't just send that work to DeepSeek or OpenAI, because governance won't allow it. So their only cheap option was Haiku 4.5, and it wasn't good value. I suspect that's what changed Anthropic's mind.

## Two good numbers and two bad ones

Artificial Analysis has already benchmarked Haiku 5.5, and the headline figures look great. At maximum effort it scores 43 on their Intelligence Index against Luna's 38, and it generates output at about 240 tokens a second, nearly twice Luna's rate.

The other two numbers go the opposite way. At maximum effort Haiku takes over five minutes to produce its first token, three times as long as Luna, and each task costs about three times as much: $0.21 against $0.07. The two are connected. Haiku spends that time thinking, and it writes two to three times as many tokens as Luna to get to an answer, so the fast output speed is spent mostly on reasoning. A five-point lead in intelligence doesn't justify three times the cost in a market that is all about value.

<figure>
  <p class="figure-title">OpenAI matches or beats Haiku at every price</p>
  <img src="{{ '/assets/images/haiku-joins-the-price-war/haiku-luna-sol-cost.svg' | relative_url }}" alt="Line chart of Intelligence Index against cost per task, log scale, at five effort levels for each model. GPT-6 Luna runs from 22 points at $0.0045 to 38 at $0.07. Claude Haiku 5.5 runs from 29 at $0.02 to 43 at $0.21, level with or just below OpenAI's models throughout. GPT-6.1 Sol runs from 42 at $0.13 to 52 at $0.72. At $0.21 a task, Haiku on max effort scores 43 and takes 323 seconds to its first token; Sol on medium scores 48 and takes 6 seconds.">
  <figcaption>Artificial Analysis Intelligence Index against average cost per task in US dollars, log scale. Each point is an effort level, from low to max. Source: Artificial Analysis, 8 October 2026.</figcaption>
</figure>

## Haiku's sweet spot

At matched scores, Haiku comes out ahead. On high effort it scores 38, the same as Luna on max, for about the same cost per task ($0.08 against $0.07), and it reaches its first token in 26 seconds instead of 109. Luna's quality, four times sooner, for the same money: this is one of the few places where Haiku makes sense. Below it, Luna gives you much the same for a little less. Above it, Sol gives you more for the same money.

## Squeezed from the middle

So why wouldn't you just use a mid-tier model? Look at what OpenAI's GPT-6.1 Sol does for the same $0.21 a task that Haiku costs on max effort: on medium effort, it scores 48 and starts answering in six seconds. Sol's list price is 20 times Haiku's, but it is much more frugal with tokens. In the open market, Haiku sits in the gap between the bottom end and the mid-tier, and Sol already fills most of it.

Within Anthropic's own range the picture is different, because Sonnet 5.5 is the opposite of frugal. On medium effort Sonnet matches Haiku's score on extra-high, 41, and starts answering in two seconds instead of 71, but costs four times as much per task. So for a customer who's locked in, Haiku is still the cheap option and Sonnet the quick one.

## Who it's for

If you can choose your provider, Haiku 5.5 won't make much difference. The ones who gain are enterprises locked into Anthropic, which finally have a viable low-cost model for simpler work. Maybe that's all Anthropic wanted.

## Further reading

- Anthropic, [Introducing Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5), October 2026. The launch post, with prices, the long-prompt surcharge and Anthropic's own benchmarks against Luna.
- Artificial Analysis, [Claude Haiku 5.5 vs GPT-6 Luna](https://artificialanalysis.ai/models/releases/comparisons/claude-haiku-5-5-vs-gpt-6-luna), accessed 8 October 2026. The independent figures in this post, broken down by effort level.
- VentureBeat, [Anthropic launches Claude Haiku 5.5 with 90% API price reduction, matching GPT-6 Luna](https://venturebeat.com/technology/anthropic-launches-claude-haiku-5-5-with-90-api-price-reduction-matching-gpt-6-luna), October 2026. A useful summary of the launch.
- Anthropic, [Pricing](https://platform.claude.com/docs/en/docs/about-claude/pricing), accessed 8 October 2026. Current prices for every Claude model, including Haiku 4.5 for comparison.
