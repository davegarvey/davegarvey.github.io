---
layout: post
title: Worktrees for impatient people
date: 2026-10-13 09:00:00 +0200
description: Waiting on a slow agent, I started running several at once, each in its own Git worktree. Worktrees have become the way to run agents in parallel on your own machine. Here's how I set them up and what they cost.
tags:
  - how-i-ai
  - llms
  - tools
---

Have you ever found yourself waiting for an agent?

I have, many times, and it's happening more often. Not long ago, agents couldn't do much on their own, so they handed back control quickly. Now they can work through a whole task by themselves, and that can take a long time. To fill the wait, I started running several at once. But keep that up and sooner or later you'll find the agents interfering with each other's work. Fortunately, there's an answer: Git worktrees.

<!--more-->

## Waiting on Luna

I've been using OpenAI's GPT-6 Luna, and for a while I ran it at Max, its highest reasoning level. The results were good, but I hadn't realised how much longer Max takes. On Hex's DataBench, a benchmark of agents doing data analysis, it doubles the time a task takes for about six more points.

<figure>
  <p class="figure-title">Max doubles the time for six more points</p>
  <img src="{{ '/assets/images/worktrees-for-impatient-people/luna-reasoning-levels.svg' | relative_url }}" alt="Line chart across GPT-6 Luna's reasoning levels, Low to Max, with median seconds per task on the left axis and DataBench score on the right. Time per task rises from 64 seconds at Low to 117 at Medium, 175 at High and 189 at Xhigh, then jumps to 353 at Max. The score rises from 30% at Low to 43% at Medium and 46% at High, stays at 46% at Xhigh, and reaches 52% at Max.">
  <figcaption>Median seconds per task and score on Hex's 100 data-analysis tasks. Checked 7 October 2026. Source: Hex DataBench v1.1.</figcaption>
</figure>

That isn't worth the wait, so I've dropped to High. Even so, on a big task there's still time to fill.

## Early squabbles

My first attempts at wrangling several agents at once ended in conflict: not between me and the agents, but between the agents themselves. I've been writing software for years, often as a technical lead with plenty of people on a project, but my own machine was always mine alone. Running agents on it was like having several people working at the same keyboard, all changing things at once.

Three or four agents would be working in the same checkout, and one agent's edits would affect another's. When I tried to open a PR for one piece of work, the others' uncommitted changes got in the way. When I asked the agent how to stop them treading on each other, it suggested Git worktrees.

## One worktree per agent

A Git worktree is a second working directory for the same repository, with its own branch and files but shared history. Give each agent its own, and its changes stay out of the others' way until you merge them.

As the ancient proverb goes: give four agents one checkout and they'll squabble all day. Give each its own worktree and they'll work in peace.

I was using OpenCode at the time, which didn't create worktrees for you, so I set it up myself. I added a `.worktrees` directory to the project, told Git to ignore it, and added a rule to `AGENTS.md`: every change goes in its own worktree in there. I'd use one even when only one agent is working on a project. A worktree costs almost nothing, and if you change your mind partway through, or want to switch focus, the work is set aside and `main` stays clean.

## Worktrees took off with agents

Worktrees have been in Git since 2015, but I'd never come across them until I started running several agents at once, and it turns out hardly anyone was searching for them before agents came along. Searches nearly tripled in the week the Codex app launched with built-in worktrees.

<figure>
  <p class="figure-title">Searches for worktrees took off with coding agents</p>
  <img src="{{ '/assets/images/worktrees-for-impatient-people/worktrees-search-interest.svg' | relative_url }}" alt="Line chart of weekly Google search interest in worktrees, January 2024 to September 2026. Interest is close to zero until late May 2025, when Claude Code became generally available, then rises slowly. It doubles in the week Cursor 2.0 launched parallel agents at the end of October 2025, and nearly triples in the week the Codex app launched with built-in worktrees in February 2026. It peaks in late May 2026, then falls, with a second rise in September.">
  <figcaption>Weekly worldwide Google search interest in "worktrees"; 100 is the peak week. Source: Google Trends, retrieved 8 October 2026.</figcaption>
</figure>

When I later moved to Claude Code and Codex, I found both had worktrees built in. It feels like the way every agent will go, because there's little to lose.

## Why I keep it local

Cloud agents offer the same isolation, with each task in its own sandbox, but they tie your environment and workflow to one vendor. Worktrees are plain Git. They work with any agent, on the machine I already have set up, with my tools and local database to hand.

## Why I turn the built-in option off

The built-in options work, but each tool puts its worktrees in its own place: Claude Code under `.claude/worktrees` in the repository, Codex in its own home directory. They also create the worktree before the agent has read anything, so my rule never comes into play.

So I turn the built-in option off and leave it to the rule. Codex, Claude Code and OpenCode all read `AGENTS.md`, so the setup works the same whichever agent I run, and all the worktrees end up in one place. The agent also creates the worktree after reading the project's instructions, so it follows conventions such as how to name branches. What I lose is the guarantee: Claude Code's built-in option, for example, blocks edits to the main checkout, whereas a rule relies on the agent following it. In my experience, they do.

## What worktrees don't solve

Worktrees isolate the files, but agents that change the same code can still produce PRs that conflict when you merge them. Keeping each piece of work small and tightly scoped helps. Anything outside the repository is shared too: in one project, all the worktrees use the same local development database, so one agent's schema change affects every other agent using it. And files Git ignores don't come with a new worktree, so each one needs its dependencies installed and local config such as `.env` copied across.

## The cost: switching context

I'd recommend running agents this way, as long as you're happy switching between them. One finishes, so you look at what it did and think about what to ask it next. Then another finishes, and it's on a different subject with a whole different set of information in it. It's like managing a small team of developers who report back every few minutes asking what to do next.

Keeping each piece of work tightly scoped helps here as well, because there's less to load into your head each time you switch. I've managed four or five sessions at once, but by around four I'm busy the whole time and the agents are waiting on me more than I'm waiting on them. The reasoning level changes the sums: at Max I needed several sessions to fill the wait, and at High, which hands back control sooner, I need fewer.

## Further reading

- Hex, [DataBench](https://hex.tech/databench/). The leaderboard behind the first chart, with score, cost, tokens and time per task for each model and reasoning level.
- Google Trends, [worktrees](https://trends.google.com/trends/explore?date=today%205-y&q=worktrees). The search data behind the second chart, which you can extend or compare with other terms.
- Git, [git-worktree](https://git-scm.com/docs/git-worktree). The reference for creating, listing and removing worktrees.
- Anthropic, [Run parallel sessions with worktrees](https://code.claude.com/docs/en/worktrees). How Claude Code's built-in option creates worktrees, where it puts them, and how it stops a session editing the main checkout.
- OpenAI, [Git worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees). The same for Codex, including how to change where its worktrees go.
- [AGENTS.md](https://agents.md/). The open format for a file of instructions that coding agents read, and where I keep my worktree rule.
