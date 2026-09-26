---
layout: post
title: Downstream of DeepSeek
date: 2026-09-26 22:28:53 +0200
description: OpenAI cut its prices as DeepSeek's low-cost models took off, then DeepSeek raised its own. Some notes from the receiving end.
tags:
  - llms
  - economics
---

In August, DeepSeek doubled its prices, a move that cost me half my monthly quota. I knew they were too good to last, but the sudden change still caught me by surprise. I've been coding with agents for a while now, and I've learnt that what these tools cost can change a lot, and fast, whenever something shifts upstream.

<!--more-->

DeepSeek has shaken up the market before. In January 2025 it released R1, which was very capable and cost far less than the competition. Then it went quiet for a long time, the market settled and prices crept up. OpenAI's flagship went from $1.25 per million input tokens for GPT-5 in August 2025 to $5 for GPT-5.5 this April.

That same month DeepSeek released a preview of V4, including V4 Flash. Flash didn't just undercut OpenAI on price; it was roughly as capable as OpenAI's equivalent models. What's more, cached input on Flash cost a fraction of a cent, which suited agents that work through a lot of context over long sessions. Developers noticed. DeepSeek's share of tokens in OpenRouter's published usage data doubled over the first half of the year, and by mid-May it topped the charts.

In July OpenAI launched Luna, its new budget model, at $1 per million input tokens, well above Flash. Three weeks later it cut the price by 80%, and on 22 September it halved it again with GPT-6. OpenAI puts the cuts down to serving its models more efficiently, and I'm sure that's part of it, but I don't think the timing is a coincidence. Whatever the reason, the cuts have certainly won OpenAI users. This month Sarah Friar, OpenAI's finance chief, said Luna's usage had risen about tenfold since the first cut.

## The end of Cheapseek

It's kind of crazy when you think about it. DeepSeek is a frontier lab with the huge upfront cost of training its own models, and then it gives the weights away. Between January and July it lost about $100m. Clever design keeps Flash cheap to run, but that doesn't pay for the training.

DeepSeek is reportedly raising about $7bn, its first outside funding, and plans a stock market listing, so it will need a path to profit. It also has form when it comes to raising prices. It launched V3 in late 2024 at a promotional price, then roughly doubled the input price and quadrupled the output price once the offer ended. The August rise that caught me out looked like the same pattern, and plenty of people on Reddit were soon asking for [Cheapseek](https://www.reddit.com/r/opencode/comments/1wdo58o/what_happened_to_opencode_go_cheapseek/) back.

So OpenAI and DeepSeek are now moving in opposite directions: OpenAI's prices are coming down just as DeepSeek's go up. In April, Flash was the obvious choice for me. Now it isn't.

## Cheap to leave

That's the problem for OpenAI at the budget end of the market. The users it has won by cutting prices can leave just as easily. OpenAI's API format has become the de facto standard, so for most developers switching provider is a simple configuration change. Anthropic's format is widely supported too; DeepSeek even publishes a guide to running Claude Code on its models.

OpenAI says the GPT-6 prices are permanent. I think it has little choice, because if it raised them, the volume it has bought would go elsewhere.

## Staying out of the fight

Anthropic has taken a different route. It got to the enterprise first, with Claude Code leading the way for agentic coding, and by the end of 2025, according to Menlo Ventures, it had about 40% of enterprise spending on model APIs against OpenAI's 27%. Enterprise customers pay well, and I suspect that has spared Anthropic from fighting at the bottom of the market.

You can see it in OpenRouter's usage data. Its users are exactly the kind who switch models when prices move. There, Anthropic's models make up less than 3% of requests, against a quarter for DeepSeek. Anthropic's budget model, Haiku, hasn't had a price cut since it launched last October, and it doesn't make the top 20 by usage. The price of staying out of that fight is staying at the frontier, which means spending heavily on training, release after release.

## Going to the source

Until recently, I didn't use the frontier labs directly. I had accounts with GitHub Copilot and then OpenCode, which bundle the labs' models into a subscription, so these price battles reached me through them. Copilot charged per request, however much work an agent did behind it, and in April GitHub tightened its limits. I moved to OpenCode and DeepSeek Flash, until the August price rise, which I only noticed when my allowance suddenly ran low halfway through the month. Neither was really to blame. Both were largely passing my requests on to the labs, so when a lab moved its prices, they had to pass that on too. GitHub at least gave good notice. With OpenCode, I found out by burning through my quota.

So I went to the labs themselves. My problem was less the price than not knowing what I'd get from one month to the next. After the cuts, Luna was in the same ballpark as Flash, and with 'permanent' prices straight from the lab, it looked far more dependable. I have long back-and-forth conversations with models when I'm designing something, and I want those to stay affordable, with the option of a better model when I need one. I took OpenAI's $20-a-month plan and added Anthropic's equivalent so I wouldn't have to ration either. The labs can change their plans too, of course, but there's one less layer between me and a price change. I now spend about four times what I did, but I have predictability — for now, at least.

If all else fails, I have Qwen running on my laptop. Models like it are no match for the big hosted ones, and may never be, because the frontier keeps moving. But imagine something as good as today's leading models running on a laptop. The labs would still have something better, though you wouldn't need them for most things. I'm pretty sure that day will come. When it does, I won't be downstream of anyone, and nobody will be able to halve my quota overnight.

## Further reading

- CNBC, [OpenAI cuts prices for two of its GPT-5.6 AI models as companies grow sensitive to costs](https://www.cnbc.com/2026/07/30/open-ai-price-cut-gpt.html), July 2026.
- Yahoo Finance, [OpenAI CFO Sarah Friar says Luna undercuts Chinese AI on price](https://finance.yahoo.com/technology/ai/articles/openai-cfo-sarah-friar-says-123936035.html), September 2026.
- VentureBeat, [OpenAI releases GPT-6 Sol and Luna models, slashing API costs 50% or more](https://venturebeat.com/technology/openai-releases-gpt-6-sol-and-luna-models-slashing-api-costs-50-or-more), September 2026.
- OpenRouter, [DeepSeek V4 is earning agentic token share](https://openrouter.ai/blog/insights/deepseek-v4-adoption/), June 2026.
- TechNode, [DeepSeek-V3 ends promotional pricing, updates API service rates](https://technode.com/2025/02/10/deepseek-v3-ends-promotional-pricing-updates-api-service-rates/), February 2025.
- OpenRouter, [current LLM rankings](https://openrouter.ai/rankings), accessed 26 September 2026.
- Menlo Ventures, [2025: The state of generative AI in the enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), December 2025.
