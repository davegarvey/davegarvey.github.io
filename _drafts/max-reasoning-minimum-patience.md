---
layout: post
title: Max reasoning, minimum patience
date: 2026-10-07 09:00:00 +0200
description: Some models take a long time to answer. I fill the wait by running several agents at once, each in its own Git worktree. Here's how that works and what it costs.
tags:
  - how-i-ai
  - llms
  - tools
---

Some models are slow to answer. I found myself getting bored and restless while waiting for them. So I started opening new sessions and running several agents in parallel, each in its own Git worktree so they don't trip over each other. I'd recommend it, as long as you're happy context switching.

<!--more-->

## Waiting on Luna

I've been using OpenAI's GPT-6 Luna a lot, and for a while I ran it at Max, its highest reasoning level. The results were good, but on complex tasks it could take a long time to hand back control.

You might assume a slow model is one that produces few tokens a second. According to Artificial Analysis, Luna's output speed is much the same at every reasoning level, between 112 and 128 tokens a second. That's about average for reasoning models at its price, though Anthropic's Claude Haiku 5.5, released this week, manages 180 to 240. What changes from level to level is how long Luna thinks before it starts to answer: about 11 seconds at High, 25 at Xhigh and 106 at Max. Incidentally, Haiku 5.5 shows the same pattern: at the time of writing, it waits about four times as long at Max as at Xhigh, just like Luna.

On a small request, the extra thinking costs a few seconds and I barely notice. The gap grows with the size of the task, and on a bigger one it runs to minutes. Hex's DataBench, a benchmark of agents doing data analysis, shows what that means for a whole task.

<figure>
  <p class="figure-title">Max doubles the time for six more points</p>
  <img src="{{ '/assets/images/max-reasoning-minimum-patience/luna-reasoning-levels.svg' | relative_url }}" alt="Line chart across GPT-6 Luna's reasoning levels, Low to Max, with median seconds per task on the left axis and DataBench score on the right. Time per task rises from 64 seconds at Low to 117 at Medium, 175 at High and 189 at Xhigh, then jumps to 353 at Max. The score rises from 30% at Low to 43% at Medium and 46% at High, stays at 46% at Xhigh, and reaches 52% at Max.">
  <figcaption>Median seconds per task and score on Hex's 100 data-analysis tasks. Checked 7 October 2026. Source: Hex DataBench v1.1.</figcaption>
</figure>

Going from Xhigh to Max doubles the time a task takes, for about six more points. Xhigh scores the same as High and takes a little longer. I've since dropped to High. I'm happy with the results, and it helps, though on a big task there's still a wait.

Max isn't always better, either. On the same benchmark, GPT-6 Sol, Luna's bigger sibling, unexpectedly scores lower at Max than at Xhigh, while using twice as many tokens. Sometimes Max doesn't finish at all. When Simon Willison gave Claude Opus 5.5 his usual test of drawing a pelican riding a bicycle at max effort, it used up its entire 128,000-token output allowance while still reasoning, and returned nothing. It did the same on a second try.

## Early squabbles

My first attempts at wrangling several agents at once ended in conflict: not between me and the agents, but between the agents themselves. I've been writing software for years, often as a technical lead with plenty of people on a project, but my own machine was always mine alone. Running agents on it was like having several people working at the same keyboard, all changing things at once.

Three or four agents would be working in the same checkout, and one agent's edits would affect another's. When I tried to open a PR for one piece of work, the others' uncommitted changes got in the way. The agents usually sorted it out in the end, but there's no reason to invite that hassle.

## One worktree per agent

A Git worktree is a second working directory for the same repository, with its own branch and files but shared history. They've been in Git since 2015, but I'd never actually come across them until I started running several agents at once, and it turns out hardly anyone was searching for them before agents came along. Searches nearly tripled in the week the Codex app launched with built-in worktrees.

<figure>
  <p class="figure-title">Searches for worktrees took off with coding agents</p>
  <img src="{{ '/assets/images/max-reasoning-minimum-patience/worktrees-search-interest.svg' | relative_url }}" alt="Line chart of weekly Google search interest in worktrees, January 2024 to September 2026. Interest is close to zero until late May 2025, when Claude Code became generally available, then rises slowly. It doubles in the week Cursor 2.0 launched parallel agents at the end of October 2025, and nearly triples in the week the Codex app launched with built-in worktrees in February 2026. It peaks in late May 2026, then falls, with a second rise in September.">
  <figcaption>Weekly worldwide Google search interest in "worktrees"; 100 is the peak week. Source: Google Trends, retrieved 8 October 2026.</figcaption>
</figure>

As the ancient proverb goes: give four agents one checkout and they'll squabble all day. Give each its own worktree and they'll work in peace.

I'd use one even when only one agent is working on a project. A worktree costs almost nothing, and if you change your mind partway through, or want to switch focus to something else, the work is set aside and `main` stays clean.

Worktrees don't solve everything. They isolate the files, but agents that change the same code can still produce PRs that conflict when you merge them. Keeping each piece of work small and tightly scoped helps. Anything outside the repository is shared too. In one project, all the worktrees use the same local development database. I could run a separate instance for each worktree, but I don't, so one agent's schema change affects every other agent using that database.

## Built in, but each in its own place

Codex and Claude Code both offer worktrees as a built-in option. I also have a rule in the `AGENTS.md` in my projects: use a worktree for any change, kept in a `.worktrees` directory in the repository and ignored by Git. I use several coding tools, and I wanted every agent to use the same place, whichever tool it ran in.

The built-in options don't use that rule, though. They create the worktree before the agent has read anything, and each puts it in its own place: Claude Code under `.claude/worktrees` in the repository, Codex in its own home directory. I'd rather they all used one place, but I understand that a product has to decide where things go.

On balance, I'd use the built-in option. When you tick the box, the tool enforces the isolation itself. Claude Code, for example, blocks edits to the main checkout while a session is in a worktree. A rule in `AGENTS.md` relies on the agent reading it and doing what it says. Agents are reliable about that now, in my experience, but a guarantee is better, and you don't need the rule at all. The price is worktrees scattered in a few different places.

## The cost: switching context

Running several agents means switching between them. One finishes, so you look at what it did and think about what to ask it next. Then another finishes, and it's on a different subject with a whole different set of information in it. It's like managing a small team of developers who report back every few minutes asking what to do next.

Keeping each piece of work tightly scoped helps here as well, because there's less to load into your head each time you switch. I've managed four or five sessions at once, but by around four I'm busy the whole time and the agents are waiting on me more than I'm waiting on them. The reasoning level changes the sums: at Max I needed several sessions to fill the wait, and at High, which hands back control sooner, I need fewer.

## Further reading

- Hex, [DataBench](https://hex.tech/databench/). The leaderboard behind the chart, with score, cost, tokens and time per task for each model and reasoning level.
- Artificial Analysis, [GPT-6 Luna](https://artificialanalysis.ai/models/gpt-6-luna). Benchmarks for each reasoning level, including output speed and the wait before the first token.
- Google Trends, [worktrees](https://trends.google.com/trends/explore?date=today%205-y&q=worktrees). The search data behind the second chart, which you can extend or compare with other terms.
- Simon Willison, [Claude Opus 5.5, GPT-6 Sol, GPT-6 Luna, and a new price war](https://simonwillison.net/2026/Sep/22/opus-and-sol-and-luna/), September 2026. Where Opus 5.5 at max effort reasons its way through its whole output allowance and never draws the pelican.
- Git, [git-worktree](https://git-scm.com/docs/git-worktree). The reference for creating, listing and removing worktrees.
- Anthropic, [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees). How Claude Code creates worktrees, where it puts them, and how it stops a session editing the main checkout.
- OpenAI, [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees). The same for Codex, including how to change where its worktrees go.
- [AGENTS.md](https://agents.md/). The open format for a file of instructions that coding agents read, and where I keep my worktree rule.
