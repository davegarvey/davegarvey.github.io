---
layout: post
title: "Listening: Is there an AI bubble? A debate"
date: 2026-10-17 23:14:32 +0200
description: Ezra Klein's debate between Paul Kedrosky and Azeem Azhar on whether AI is a bubble, and the points that stuck with me.
image:
  path: /assets/images/cards/is-there-an-ai-bubble-3e36f2f6.png
  width: 1200
  height: 630
  alt: "Two speech bubbles, one orange and one blue, overlapping in the middle, where the shared area is shaded. The title reads: Is there an AI bubble? A debate."
tags:
  - llms
  - economics
---

I listened to this episode of The Ezra Klein Show today: **[Is There an A.I. Bubble? A Debate.](https://www.nytimes.com/2026/10/16/opinion/ezra-klein-podcast-azeem-azhar-paul-kedrosky.html)** I really enjoyed it. Klein's guests are Paul Kedrosky, a venture capitalist at SK Ventures and a fellow at MIT, who thinks AI is a bubble, and Azeem Azhar, a technology entrepreneur and analyst behind Exponential View, who sees a productive boom that's starting to show warning signs. Both bring strong arguments and plenty of data, and what they say makes a lot of sense, even though they strongly disagree on the fundamentals.

<!--more-->

What resonated with me:

- **It's a race no one can leave.** Kedrosky describes the labs as stuck in a prisoner's dilemma: each might like to slow down, but none can while the others carry on.

  *My take:* with labs in China and Europe in the race too, I can't see how an agreement to slow down could work. Dario Amodei's call last month to "pace the frontier" hasn't changed anything so far: new models and tools are still arriving as fast as ever.

- **Most people don't need the frontier.** Kedrosky warns against reading too much into the soaring number of tokens. More tokens doesn't mean more money for the labs. The price per token is falling fast, and most people are happy with cheaper models.

  *My take:* from my own use, I agree: today's cheaper models are about as capable as the best ones were [a year ago](https://artificialanalysis.ai/models/comparisons/gpt-6-luna-vs-gpt-5). [Usage data](https://openrouter.ai/data/newsletter/the-token-state-of-play) suggests open-weight models now carry most of the tokens, while closed models still take most of the money, though less than they did.

- **The computing will be needed whoever wins.** Azhar argues that if companies switch to cheaper models, the labs' margins suffer, but the demand for computing just moves elsewhere.

  *My take:* as a user, I can see the shortage Azhar describes: I've occasionally had requests fail because the [servers were overloaded](https://platform.claude.com/docs/en/api/errors). Then again, as Kedrosky warns, a shortage today doesn't rule out a glut later. The risk I can see is on the consumer side. Models that run on phones and laptops keep getting better ([I already run one on mine]({% post_url 2026-09-26-downstream-of-deepseek %})), and once the assistant on your phone does its own inference, much of that demand won't need a data centre at all.

- **The costs move downstream.** Azhar points out that AI pushes extra work onto other people. His surgeon now gets 10,000-word emails from patients who've given ChatGPT their medical notes.

  *My take:* I see it in software. GitHub has had [far more outages](https://leaddev.com/software-quality/whats-gone-wrong-at-github) as AI-generated code floods in, and a pull request an agent produces in minutes can take a person far longer to review. You can even do it to yourself. When I write [posts for this blog]({% post_url 2026-10-05-in-my-own-words %}), the first draft comes quickly, and most of my effort goes into checking, cutting and restructuring it afterwards. The time you save generating, you often spend reviewing.

- **Regulation is coming, probably after something goes wrong.** Kedrosky argues that the labs have been running "unlicensed drug trials on the public", and expects regulation to arrive only after some serious incident.

  *My take:* I'm surprised the labs haven't faced any real consequences yet for models breaking out of their test environments and into other organisations' systems. There have been several documented cases, including [an Australian government Medicare portal](https://beinsure.com/news/openai-agent-breached-australian-medicare-portal/). Surely it's only a matter of time.

- **Jobs will go faster than new ones appear.** Kedrosky argues that there's never been a general-purpose technology that applies so widely, has been adopted so quickly and reprices cognitive work at the same time. It's already making things like call centres far cheaper to run, and he expects the disruption to outpace the creation of new roles.

  *My take:* I think we're only seeing the start of it. I'd be surprised to find an organisation that isn't looking at how to use AI to optimise its business, and that will likely change how businesses work and which roles they need. A [Stanford study](https://digitaleconomy.stanford.edu/news/canariesaug26/) suggests it's already starting with entry-level jobs. Young workers in the jobs most exposed to AI have fared noticeably worse than those in other jobs.

---

**Update:** Kedrosky followed up with [a short post](https://paulkedrosky.com/ezra-klein-appearance-is-there-an-ai-bubble/) restating his point: AI works and can be very useful, but what concerns him is the money being spent on it. Then, that same week, Anthropic's figures for investors showed its growth slowing sharply, though its revenue is still rising fast. In the episode, Azhar said he'd worry if growth in enterprise AI spending halved two quarters running. He [puts this slowdown down to an unusual second quarter](https://www.exponentialview.co/p/anthropic-the-agony-and-the-ecstasy), but it's the kind of signal he said he'd watch for. By Friday, the Nasdaq had [fallen 4.5%](https://abcnews.com/Business/wireStory/major-us-stock-indexes-fared-friday-10162026-137331951) over the week.
