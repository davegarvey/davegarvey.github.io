---
layout: post
title: In my own words
date: 2026-10-05 11:32:29 +0200
description: Working with AI has taught me a lot, and I want to write it down without publishing AI slop under my name. This is the process I use.
image:
  path: /assets/images/cards/in-my-own-words-e550d9ce.png
  width: 1200
  height: 630
  alt: A person and a robot linked by two curved arrows. A sound waveform runs from the person to the robot, and lines of text run back, under the title In my own words.
tags:
  - how-i-ai
  - llms
  - writing
---

Working with AI has become an unexpected source of learning for me, and that's why I started this blog. But I don't want an LLM writing things under my name that aren't really me. So I use a process that keeps the posts mine: I talk, the LLM asks questions and drafts, and I read every word before anything is published. This post was made the same way.

<!--more-->

## Where the learning comes from

In the early days, AI was a tool for autocomplete, or for writing the odd snippet. Now you can give it a goal and it will work on it for hours and come back with a result. That can work very well, but for me it's missing something important: learning along the way.

I like to learn by exploring ideas before committing to them. I use OpenSpec, which has an explore skill for the start of a piece of work: you bring an idea and talk it through with the LLM before anything is written. We discuss technologies, user experience, interface and workflow. It often raises questions I hadn't thought of, or proposes a technology I haven't used, and I can ask why. That wasn't the case when I started using LLMs, but it is now, and all that exploring has introduced me to a lot of new things.

## Why write it down

Writing documentation, delivering training, giving a presentation: each time, I've had to prepare, dig in and understand everything about what I'm going to say before I commit to it. A blog is the same. I want what I write to be reasonable, defensible and of value to the reader.

What I don't want is AI slop. I could ask an LLM to write a post and put my name on it. It might even produce something useful, but it wouldn't be me, and I want to stand behind everything on this blog.

## The process

Here's how each post gets made, written as steps you could follow yourself.

1. **Dictate.** Talk through the topic until you've said enough. Rambling is fine; it gets cut later. [Becoming a dictator]({% post_url 2026-09-24-becoming-a-dictator %}) explains why I talk rather than type.
2. **Get the LLM to ask questions.** Before it drafts anything, have it ask about the substance: gaps, missed points, places where an example would help. You won't always reach the most interesting points on your own.
3. **Give it style rules.** Keep them in a file the agent reads every time, such as `AGENTS.md`. Mine are adapted from The Economist's approach to writing and charts: plain words, active voice, no sensationalism, and charts that make one point simply. Take only the rules you like. I use more headings than The Economist would, for example.
4. **Have it draft from the whole conversation**, monologue and answers together.
5. **Read every word.** Change anything that doesn't sound like you or isn't what you'd say. Add what's missing and cut what has little value. Repeat until you're happy to put your name to it, then read it once more from start to finish. Edits that look right in isolation can still jar when you read them together.
6. **If the draft drifts, start again from an outline.** Sometimes a draft wanders from your point or stops sounding like you, often when research piles up and takes over. When that happens, ask for an outline and dictate against it.
7. **Keep your style rules up to date.** Add what's missing and remove what you no longer want. Every draft starts from these rules, so a wrong one means making the same correction every time.

None of this is groundbreaking, but I suspect plenty of people share the worry about AI putting words in their mouth. If that's you, I hope this gives you a way to use AI and still sound like yourself.

## Further reading

- Fission AI, [OpenSpec](https://github.com/Fission-AI/OpenSpec). The spec framework I use. Its [explore command](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md) is where the exploring happens.
- The Economist, [Style Guide, preface and introduction](https://cdn.static-economist.com/sites/default/files/pdfs/style_guide_12.pdf), 12th edition, 2018. The essentials of the style, in 20 pages.
- George Orwell, [Politics and the English Language](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/), 1946. The six rules The Economist's guide starts from.
- Sarah Leo, [Mistakes, we've drawn a few](https://medium.com/the-economist/mistakes-weve-drawn-a-few-8cdd8a42d368), The Economist, March 2019. The Economist's data team picks apart its own misleading and confusing charts, and redraws them. I followed The Economist's approach for the charts in [Downstream of DeepSeek]({% post_url 2026-09-26-downstream-of-deepseek %}).
- Rosamund Pearce, [Why you sometimes need to break the rules in data viz](https://medium.com/the-economist/why-you-sometimes-need-to-break-the-rules-in-data-viz-4d8ece284919), The Economist, February 2020. Five chart conventions, why they exist, and when The Economist breaks them.
- Simon Willison, [Slop is the new name for unwanted AI-generated content](https://simonwillison.net/2024/May/8/slop/), May 2024. Argues that sharing AI-generated content you haven't reviewed is rude.
- [AGENTS.md](https://agents.md/). The open format for a file of instructions that coding agents read. Mine holds my style rules.
